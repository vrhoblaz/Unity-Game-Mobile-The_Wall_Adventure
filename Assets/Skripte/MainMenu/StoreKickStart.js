#pragma strict

var KickStartIndicator1 : Image;
var KickStartIndicator2 : Image;

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
var KickStartBuyButton : GameObject;

//cost texts
var KickStartCostText : Text;

private var KickStartUpgradeCost : int;

//za kickstart kupovat - in ne upgradat
var KickStartInBankText : Text;
var KickStartBuyOneCostText : Text;
private var KickStartBuyCost : int = 250;
var BuyOneKickStart : GameObject;

//for sound
private var soundScript : MenuSounds;

function Awake ()
{
	soundScript = GetComponent (MenuSounds);
}

function Start ()
{
	BuyOneKickStart.SetActive (false);
	//KickStart - Število kupljenih
	if (PlayerPrefs.HasKey ("NumKickStart") == false)
	{
		PlayerPrefs.SetInt ("NumKickStart", 0);
	}
	KickStart.kickStartNum = PlayerPrefs.GetInt ("NumKickStart");
	KickStartInBankText.text = "x " + KickStart.kickStartNum;
	//KickStart - Distance - odvisno od upgrade-a
	if (PlayerPrefs.HasKey ("DistKickStart") == false)
	{
		PlayerPrefs.SetInt ("DistKickStart", 250);
	}
	KickStart.kickStartDist = PlayerPrefs.GetInt ("DistKickStart");

	KickStartBuyButton.SetActive (false);
}

function KickStartPopUp ()
{	
	KickStart.kickStartNum = PlayerPrefs.GetInt ("NumKickStart");
	KickStartInBankText.text = "x " + KickStart.kickStartNum;

	BuyOneKickStart.SetActive (true);
	CoinImage1.SetActive (true);
	KickStartBuyButton.SetActive (true);
	titleText.text = "KickStart:";
	descriptionText.text = "Gain extra distance right from the beginning of the game.\n<i>Upgrade:</i> The DISTANCE is incresed for 250 m.";
//	KickStartBuyOneCostText.text = "250";
	PopUpImage.SetActive (true);

	//all red - naprej v if-ih v zelene tisti ki morajo biti
	KickStartIndicator1.color = Color.red;
	KickStartIndicator2.color = Color.red;

	//Setting Coin price according to current state
	if (KickStart.kickStartDist == 250)
	{
		PlayerPrefs.SetInt ("KickStartCost", 5000);
		PlayerPrefs.SetInt ("BuyOneCostKickStart", 250);
	}
	if (KickStart.kickStartDist == 500)
	{
		PlayerPrefs.SetInt ("KickStartCost", 30000);
		KickStartIndicator1.color = Color.green;
		PlayerPrefs.SetInt ("BuyOneCostKickStart", 350);
	}

	//če je že vse kupljeno
	if (KickStart.kickStartDist >= 750)
	{
		PlayerPrefs.SetInt ("BuyOneCostKickStart", 500);
		KickStartCostText.text = "MAX";
		CoinImage1.SetActive (false);
		KickStartBuyButton.SetActive (false);
		KickStartIndicator1.color = Color.green;
		KickStartIndicator2.color = Color.green;
	}
	if (KickStart.kickStartDist < 750)
	{
		KickStartUpgradeCost = PlayerPrefs.GetInt ("KickStartCost");
		KickStartCostText.text = ((KickStartUpgradeCost/1000).ToString("F0") + " 000");
	}
	KickStartBuyCost = PlayerPrefs.GetInt ("BuyOneCostKickStart");
	KickStartBuyOneCostText.text = KickStartBuyCost.ToString();
	PlayerPrefs.Save ();
}

function KickStartUpgrade ()
{
	if (GameMaster.coinTotal >= KickStartUpgradeCost && KickStart.kickStartDist <= 500)
	{
		soundScript.PlayMoneyDropSound();
		KickStart.kickStartDist += 250;
		GameMaster.coinTotal -= KickStartUpgradeCost;
		PlayerPrefs.SetInt ("DistKickStart", KickStart.kickStartDist);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		if (KickStart.kickStartDist == 500)
		{
			KickStartUpgradeCost = 30000;
			KickStartIndicator1.color = Color.green;
			KickStartBuyCost = 350;
		}

		PlayerPrefs.SetInt ("KickStartCost", KickStartUpgradeCost);
		KickStartCostText.text = ((KickStartUpgradeCost/1000).ToString("F0") + " 000");

		if (KickStart.kickStartDist >= 750)
		{
			KickStartCostText.text = "MAX";
			CoinImage1.SetActive (false);
			KickStartBuyButton.SetActive (false);
			KickStartIndicator2.color = Color.green;
			KickStartBuyCost = 500;
		}
		PlayerPrefs.SetInt ("BuyOneCostKickStart", KickStartBuyCost);
		KickStartBuyOneCostText.text = KickStartBuyCost.ToString();
	}
	else if (GameMaster.coinTotal < KickStartUpgradeCost)
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

function KickStartBuyOne ()
{
	if (GameMaster.coinTotal >= KickStartBuyCost)
	{
		soundScript.PlayConsMoneyDropSound();
		KickStart.kickStartNum ++;
		GameMaster.coinTotal -= KickStartBuyCost;
		PlayerPrefs.SetInt ("NumKickStart", KickStart.kickStartNum);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		KickStartInBankText.text = "x " + KickStart.kickStartNum;
	}
	else if (GameMaster.coinTotal < KickStartBuyCost)
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
