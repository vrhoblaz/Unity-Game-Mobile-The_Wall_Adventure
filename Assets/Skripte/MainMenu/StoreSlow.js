#pragma strict

var SlowIndicator1 : Image;
var SlowIndicator2 : Image;
var SlowIndicator3 : Image;
var SlowIndicator4 : Image;
var SlowIndicator5 : Image;

var SlowIndObject3 : GameObject;
var SlowIndObject4 : GameObject;

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
var SlowBuyButton : GameObject;

//cost texts
var SlowCostText : Text;

private var SlowUpgradeCost : int;

//for sound
private var soundScript : MenuSounds;

function Awake ()
{
	soundScript = GetComponent (MenuSounds);
}

function Start ()
{
	//Slow Time
	if (PlayerPrefs.HasKey ("SlowTime") == false)
	{
		PlayerPrefs.SetFloat ("SlowTime", 10f);
	}
	Slow.timeSlow = PlayerPrefs.GetFloat ("SlowTime");
	SlowBuyButton.SetActive (false);
}

function SlowPopUp ()
{	
	CoinImage1.SetActive (true);
	SlowBuyButton.SetActive (true);
	titleText.text = "Slow Upgrade:";
	descriptionText.text = "With each purchase the Slow PowerUp time EXTENDS FOR 5 seconds.";
	PopUpImage.SetActive (true);

	//To show all indicators
	SlowIndObject3.SetActive (true);
	SlowIndObject4.SetActive (true);

	//all red - naprej v if-ih v zelene tisti ki morajo biti
	SlowIndicator1.color = Color.red;
	SlowIndicator2.color = Color.red;
	SlowIndicator3.color = Color.red;
	SlowIndicator4.color = Color.red;
	SlowIndicator5.color = Color.red;

	//Setting Coin price according to current state
	if (Slow.timeSlow == 10f)
	{
		PlayerPrefs.SetInt ("SlowCost", 1000);
	}
	if (Slow.timeSlow == 15f)
	{
		PlayerPrefs.SetInt ("SlowCost", 5000);
		SlowIndicator1.color = Color.green;
	}
	if (Slow.timeSlow == 20f)
	{
		PlayerPrefs.SetInt ("SlowCost", 10000);
		SlowIndicator1.color = Color.green;
		SlowIndicator2.color = Color.green;
	}
	if (Slow.timeSlow == 25f)
	{
		PlayerPrefs.SetInt ("SlowCost", 30000);
		SlowIndicator1.color = Color.green;
		SlowIndicator2.color = Color.green;
		SlowIndicator3.color = Color.green;
	}
	if (Slow.timeSlow == 30f)
	{
		PlayerPrefs.SetInt ("SlowCost", 100000);
		SlowIndicator1.color = Color.green;
		SlowIndicator2.color = Color.green;
		SlowIndicator3.color = Color.green;
		SlowIndicator4.color = Color.green;
		descriptionText.text = "With the last purchase the Slow PowerUp time EXTENDS FOR 15 seconds.";
	}
	//če je že vse kupljeno
	if (Slow.timeSlow >= 45f)
	{
		SlowCostText.text = "MAX";
		CoinImage1.SetActive (false);
		SlowBuyButton.SetActive (false);
		SlowIndicator1.color = Color.green;
		SlowIndicator2.color = Color.green;
		SlowIndicator3.color = Color.green;
		SlowIndicator4.color = Color.green;
		SlowIndicator5.color = Color.green;
	}
	if (Slow.timeSlow < 45f)
	{
		SlowUpgradeCost = PlayerPrefs.GetInt ("SlowCost");
		SlowCostText.text = ((SlowUpgradeCost/1000).ToString("F0") + " 000");
	}
	PlayerPrefs.Save ();
}

function SlowUpgrade ()
{
	if (GameMaster.coinTotal >= SlowUpgradeCost && Slow.timeSlow <= 25f)
	{
		soundScript.PlayMoneyDropSound();
		Slow.timeSlow += 5f;
		GameMaster.coinTotal -= SlowUpgradeCost;
		PlayerPrefs.SetFloat ("SlowTime", Slow.timeSlow);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		if (Slow.timeSlow == 15f)
		{
			SlowUpgradeCost = 5000;
			SlowIndicator1.color = Color.green;
		}
		if (Slow.timeSlow == 20f)
		{
			SlowUpgradeCost = 10000;
			SlowIndicator2.color = Color.green;
		}
		if (Slow.timeSlow == 25f)
		{
			SlowUpgradeCost = 30000;
			SlowIndicator3.color = Color.green;
		}
		if (Slow.timeSlow == 30f)
		{
			SlowUpgradeCost = 100000;
			SlowIndicator4.color = Color.green;
			descriptionText.text = "With the last purchase the Slow PowerUp time EXTENDS FOR 15 seconds.";
		}
		PlayerPrefs.SetInt ("SlowCost", SlowUpgradeCost);
		SlowCostText.text = ((SlowUpgradeCost/1000).ToString("F0") + " 000");

	}
	else if (GameMaster.coinTotal >= SlowUpgradeCost && Slow.timeSlow == 30f)
	{
		soundScript.PlayMoneyDropSound();
		Slow.timeSlow += 15f;
		GameMaster.coinTotal -= SlowUpgradeCost;
		PlayerPrefs.SetFloat ("SlowTime", Slow.timeSlow);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		//ker je potem max sledi
		if (Slow.timeSlow >= 45f)
		{
			CoinImage1.SetActive (false);
			SlowBuyButton.SetActive (false);
			SlowCostText.text = "MAX";
			SlowIndicator5.color = Color.green;
		}
	}
	else if (GameMaster.coinTotal < SlowUpgradeCost)
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

