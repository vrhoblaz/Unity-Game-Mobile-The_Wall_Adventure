#pragma strict

var ShieldIndicator1 : Image;
var ShieldIndicator2 : Image;
var ShieldIndicator3 : Image;
var ShieldIndicator4 : Image;
var ShieldIndicator5 : Image;

var ShieldIndObject3 : GameObject;
var ShieldIndObject4 : GameObject;

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
var ShieldBuyButton : GameObject;

//cost texts
var ShieldCostText : Text;

private var ShieldUpgradeCost : int;

//for sound
private var soundScript : MenuSounds;

function Awake ()
{
	soundScript = GetComponent (MenuSounds);
}

function Start ()
{
	//Shield Time
	if (PlayerPrefs.HasKey ("ShieldTime") == false)
	{
		PlayerPrefs.SetFloat ("ShieldTime", 10f);
	}
	Shield.timeShield = PlayerPrefs.GetFloat ("ShieldTime");
	ShieldBuyButton.SetActive (false);
}

function ShieldPopUp ()
{	
	CoinImage1.SetActive (true);
	ShieldBuyButton.SetActive (true);
	titleText.text = "Shield Upgrade:";
	descriptionText.text = "Decrese HEALTH instead of DYING.\nWith each purchase the Shield PowerUp time EXTENDS FOR 5 seconds.";
	PopUpImage.SetActive (true);

	//To show all indicators
	ShieldIndObject3.SetActive (true);
	ShieldIndObject4.SetActive (true);

	//all red - naprej v if-ih v zelene tisti ki morajo biti
	ShieldIndicator1.color = Color.red;
	ShieldIndicator2.color = Color.red;
	ShieldIndicator3.color = Color.red;
	ShieldIndicator4.color = Color.red;
	ShieldIndicator5.color = Color.red;

	//Setting Coin price according to current state
	if (Shield.timeShield == 10f)
	{
		PlayerPrefs.SetInt ("ShieldCost", 1000);
	}
	if (Shield.timeShield == 15f)
	{
		PlayerPrefs.SetInt ("ShieldCost", 5000);
		ShieldIndicator1.color = Color.green;
	}
	if (Shield.timeShield == 20f)
	{
		PlayerPrefs.SetInt ("ShieldCost", 10000);
		ShieldIndicator1.color = Color.green;
		ShieldIndicator2.color = Color.green;
	}
	if (Shield.timeShield == 25f)
	{
		PlayerPrefs.SetInt ("ShieldCost", 30000);
		ShieldIndicator1.color = Color.green;
		ShieldIndicator2.color = Color.green;
		ShieldIndicator3.color = Color.green;
	}
	if (Shield.timeShield == 30f)
	{
		PlayerPrefs.SetInt ("ShieldCost", 100000);
		ShieldIndicator1.color = Color.green;
		ShieldIndicator2.color = Color.green;
		ShieldIndicator3.color = Color.green;
		ShieldIndicator4.color = Color.green;
		descriptionText.text = "With the last purchase the Shield PowerUp time EXTENDS FOR 15 seconds.";
	}
	//če je že vse kupljeno
	if (Shield.timeShield >= 45f)
	{
		ShieldCostText.text = "MAX";
		CoinImage1.SetActive (false);
		ShieldBuyButton.SetActive (false);
		ShieldIndicator1.color = Color.green;
		ShieldIndicator2.color = Color.green;
		ShieldIndicator3.color = Color.green;
		ShieldIndicator4.color = Color.green;
		ShieldIndicator5.color = Color.green;
	}
	if (Shield.timeShield < 45f)
	{
		ShieldUpgradeCost = PlayerPrefs.GetInt ("ShieldCost");
		ShieldCostText.text = ((ShieldUpgradeCost/1000).ToString("F0") + " 000");
	}
	PlayerPrefs.Save ();
}

function ShieldUpgrade ()
{
	if (GameMaster.coinTotal >= ShieldUpgradeCost && Shield.timeShield <= 25f)
	{
		soundScript.PlayMoneyDropSound();
		Shield.timeShield += 5f;
		GameMaster.coinTotal -= ShieldUpgradeCost;
		PlayerPrefs.SetFloat ("ShieldTime", Shield.timeShield);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		if (Shield.timeShield == 15f)
		{
			ShieldUpgradeCost = 5000;
			ShieldIndicator1.color = Color.green;
		}
		if (Shield.timeShield == 20f)
		{
			ShieldUpgradeCost = 10000;
			ShieldIndicator2.color = Color.green;
		}
		if (Shield.timeShield == 25f)
		{
			ShieldUpgradeCost = 30000;
			ShieldIndicator3.color = Color.green;
		}
		if (Shield.timeShield == 30f)
		{
			ShieldUpgradeCost = 100000;
			ShieldIndicator4.color = Color.green;
			descriptionText.text = "With the last purchase the Shield PowerUp time EXTENDS FOR 15 seconds.";
		}
		PlayerPrefs.SetInt ("ShieldCost", ShieldUpgradeCost);
		ShieldCostText.text = ((ShieldUpgradeCost/1000).ToString("F0") + " 000");

	}
	else if (GameMaster.coinTotal >= ShieldUpgradeCost && Shield.timeShield == 30f)
	{
		soundScript.PlayMoneyDropSound();
		Shield.timeShield += 15f;
		GameMaster.coinTotal -= ShieldUpgradeCost;
		PlayerPrefs.SetFloat ("ShieldTime", Shield.timeShield);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		//ker je potem max sledi
		if (Shield.timeShield >= 45f)
		{
			CoinImage1.SetActive (false);
			ShieldBuyButton.SetActive (false);
			ShieldCostText.text = "MAX";
			ShieldIndicator5.color = Color.green;
		}
	}
	else if (GameMaster.coinTotal < ShieldUpgradeCost)
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

