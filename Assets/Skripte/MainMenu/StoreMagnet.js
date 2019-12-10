#pragma strict

var MagnetIndicator1 : Image;
var MagnetIndicator2 : Image;
var MagnetIndicator3 : Image;
var MagnetIndicator4 : Image;
var MagnetIndicator5 : Image;

var MagnetIndObject3 : GameObject;
var MagnetIndObject4 : GameObject;

var titleText : Text;
var descriptionText : Text;
var ErrorMessageText : Text;
var PopUpImage : GameObject;
var ErrorMessageImage : GameObject;

//cel blok samo za error in njegov fade
//ta 2 sta za zmanjsanje opacity error message + ErrorMessageText ki je že zgoraj
var ErrorMessageTrans1 : Image;
var ErrorMessageTrans2 : Image;
//vrednost prosojnosti (alpha)
private var Transperancy : float;
//hitrost zmanjševanja Transperancy-a
private var fadeSpeed = 40;
//šteje čas ki preteče preden se začne fade
private var t :float;

//coins ob ceni upgrada - za namen deaktivacije ob dosegi MAX Upgrada
var CoinImage1 : GameObject;
var MagnetBuyButton : GameObject;

//cost texts
var MagnetCostText : Text;

private var MagnetUpgradeCost : int;

//for sound
private var soundScript : MenuSounds;

function Awake ()
{
	soundScript = GetComponent (MenuSounds);
}

function Start ()
{
	//Magnet Time
	if (PlayerPrefs.HasKey ("MagnetTime") == false)
	{
		PlayerPrefs.SetFloat ("MagnetTime", 10f);
	}
	Magnet.timeMagnet = PlayerPrefs.GetFloat ("MagnetTime");
	MagnetBuyButton.SetActive (false);
}

function MagnetPopUp ()
{	
	CoinImage1.SetActive (true);
	MagnetBuyButton.SetActive (true);
	titleText.text = "Magnet Upgrade:";
	descriptionText.text = "With each purchase the Magnet PowerUp time EXTENDS FOR 5 seconds.";
	PopUpImage.SetActive (true);

	//To show all indicators
	MagnetIndObject3.SetActive (true);
	MagnetIndObject4.SetActive (true);

	//all red - naprej v if-ih v zelene tisti ki morajo biti
	MagnetIndicator1.color = Color.red;
	MagnetIndicator2.color = Color.red;
	MagnetIndicator3.color = Color.red;
	MagnetIndicator4.color = Color.red;
	MagnetIndicator5.color = Color.red;

	//Setting Coin price according to current state
	if (Magnet.timeMagnet == 10f)
	{
		PlayerPrefs.SetInt ("MagnetCost", 1000);
	}
	if (Magnet.timeMagnet == 15f)
	{
		PlayerPrefs.SetInt ("MagnetCost", 5000);
		MagnetIndicator1.color = Color.green;
	}
	if (Magnet.timeMagnet == 20f)
	{
		PlayerPrefs.SetInt ("MagnetCost", 10000);
		MagnetIndicator1.color = Color.green;
		MagnetIndicator2.color = Color.green;
	}
	if (Magnet.timeMagnet == 25f)
	{
		PlayerPrefs.SetInt ("MagnetCost", 30000);
		MagnetIndicator1.color = Color.green;
		MagnetIndicator2.color = Color.green;
		MagnetIndicator3.color = Color.green;
	}
	if (Magnet.timeMagnet == 30f)
	{
		PlayerPrefs.SetInt ("MagnetCost", 100000);
		MagnetIndicator1.color = Color.green;
		MagnetIndicator2.color = Color.green;
		MagnetIndicator3.color = Color.green;
		MagnetIndicator4.color = Color.green;
		descriptionText.text = "With the last purchase the Magnet PowerUp time EXTENDS FOR 15 seconds.";
	}
	//če je že vse kupljeno
	if (Magnet.timeMagnet >= 45f)
	{
		MagnetCostText.text = "MAX";
		CoinImage1.SetActive (false);
		MagnetBuyButton.SetActive (false);
		MagnetIndicator1.color = Color.green;
		MagnetIndicator2.color = Color.green;
		MagnetIndicator3.color = Color.green;
		MagnetIndicator4.color = Color.green;
		MagnetIndicator5.color = Color.green;
	}
	if (Magnet.timeMagnet < 45f)
	{
		MagnetUpgradeCost = PlayerPrefs.GetInt ("MagnetCost");
		MagnetCostText.text = ((MagnetUpgradeCost/1000).ToString("F0") + " 000");
	}
	PlayerPrefs.Save ();
}

function MagnetUpgrade ()
{
	if (GameMaster.coinTotal >= MagnetUpgradeCost && Magnet.timeMagnet <= 25f)
	{
		soundScript.PlayMoneyDropSound();
		Magnet.timeMagnet += 5f;
		GameMaster.coinTotal -= MagnetUpgradeCost;
		PlayerPrefs.SetFloat ("MagnetTime", Magnet.timeMagnet);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		if (Magnet.timeMagnet == 15f)
		{
			MagnetUpgradeCost = 5000;
			MagnetIndicator1.color = Color.green;
		}
		if (Magnet.timeMagnet == 20f)
		{
			MagnetUpgradeCost = 10000;
			MagnetIndicator2.color = Color.green;
		}
		if (Magnet.timeMagnet == 25f)
		{
			MagnetUpgradeCost = 30000;
			MagnetIndicator3.color = Color.green;
		}
		if (Magnet.timeMagnet == 30f)
		{
			MagnetUpgradeCost = 100000;
			MagnetIndicator4.color = Color.green;
			descriptionText.text = "With the last purchase the Magnet PowerUp time EXTENDS FOR 15 seconds.";
		}
		PlayerPrefs.SetInt ("MagnetCost", MagnetUpgradeCost);
		MagnetCostText.text = ((MagnetUpgradeCost/1000).ToString("F0") + " 000");

	}
	else if (GameMaster.coinTotal >= MagnetUpgradeCost && Magnet.timeMagnet == 30f)
	{
		soundScript.PlayMoneyDropSound();
		Magnet.timeMagnet += 15f;
		GameMaster.coinTotal -= MagnetUpgradeCost;
		PlayerPrefs.SetFloat ("MagnetTime", Magnet.timeMagnet);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		//ker je potem max sledi
		if (Magnet.timeMagnet >= 45f)
		{
			CoinImage1.SetActive (false);
			MagnetBuyButton.SetActive (false);
			MagnetCostText.text = "MAX";
			MagnetIndicator5.color = Color.green;
		}
	}
	else if (GameMaster.coinTotal < MagnetUpgradeCost)
	{
		soundScript.PlayNoGoClickSound();
		Transperancy = 1f;
		t = 0.9f;
		ErrorMessageTrans1.color.a = 1f;
		ErrorMessageTrans2.color.a = 1f;
		ErrorMessageText.color.a = 1f;
		ErrorMessageImage.SetActive (true);
		ErrorMessageText.text = "Not Enough Coins!";
		errorClose ();
	}

	PlayerPrefs.Save();
}

function errorClose ()
{
	//čas ko je Transperancy na 1
	while (t > 0f)
	{
		t -= Time.deltaTime;
		yield;
	}

	//fading
	while (Transperancy > 0 && t <= 0f)
	{
		Transperancy -= 0.05f * Time.deltaTime * fadeSpeed;
		ErrorMessageText.color.a = Transperancy;
		ErrorMessageTrans1.color.a = Transperancy;
		ErrorMessageTrans2.color.a = Transperancy;
		yield;
	}

	//close error when finished
	if (Transperancy <= 0)
	{
		t = 0;
		ErrorMessageImage.SetActive (false);
	}
}

