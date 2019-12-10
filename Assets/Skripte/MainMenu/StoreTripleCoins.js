#pragma strict

var TripleCoinIndObject4 : GameObject;

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

var TripleCoinBuyButton : GameObject;
var CoinImage1 : GameObject;

//cost texts
var TripleCoinCostText : Text;

private var TripleCoinUpgradeCost : int = 250;

var InBankText : Text;
var TripleCoinNumImage : GameObject;

//for sound
private var soundScript : MenuSounds;

//daily counter
static var dailyCounterTriple : int;
static var dailyCounterTripleMax : int;


function Awake ()
{
	soundScript = GetComponent (MenuSounds);
}

function Start ()
{
	//maxTripleCoin
	if (PlayerPrefs.HasKey ("NumTripleCoin") == false)
	{
		PlayerPrefs.SetInt ("NumTripleCoin", 0);
	}
	dailyCounterTriple = PlayerPrefs.GetInt ("DailyTripleCoins");
	dailyCounterTripleMax = PlayerPrefs.GetInt ("MaxDailyTripleCoins");
	GameMaster.tripleCoinNum = PlayerPrefs.GetInt ("NumTripleCoin");
	TripleCoinBuyButton.SetActive (false);
}

function TripleCoinPopUp ()
{
	TripleCoinNumImage.SetActive (true);
	InBankText.text = "x " + GameMaster.tripleCoinNum;
	CoinImage1.SetActive (true);
	TripleCoinBuyButton.SetActive (true);
	titleText.text = "Triple coins:";
	descriptionText.text = "All collected coins are TRIPLED at the END of the game.\nMax 3 purchases per day. You can unlock more purchases by watching an ad.";
	PopUpImage.SetActive (true);
	//no indicator needed for TripleCoin
	TripleCoinIndObject4.SetActive (false);
	TripleCoinCostText.text = "   " + TripleCoinUpgradeCost;
	
	PlayerPrefs.Save ();
}

function TripleCoinUpgrade ()
{
	if (dailyCounterTriple < dailyCounterTripleMax)
	{
		if (GameMaster.coinTotal >= TripleCoinUpgradeCost)
		{
			soundScript.PlayConsMoneyDropSound();
			GameMaster.tripleCoinNum ++;
			GameMaster.coinTotal -= TripleCoinUpgradeCost;
			PlayerPrefs.SetInt ("NumTripleCoin", GameMaster.tripleCoinNum);
			PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
			InBankText.text = "x " + GameMaster.tripleCoinNum;
			dailyCounterTriple ++;
			PlayerPrefs.SetInt ("DailyTripleCoins", dailyCounterTriple);
		}
	
		else if (GameMaster.coinTotal < TripleCoinUpgradeCost)
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

	else
	{
		soundScript.PlayNoGoClickSound();
		Transperancy = 1f;
		t = 0.9f;
			ErrorMessageTrans1.color.a = 1f;
		ErrorMessageTrans2.color.a = 1f;
		ErrorMessageText.color.a = 1f;
		ErrorMessageImage.SetActive (true);
		ErrorMessageText.text = "Watch an Ad for more!";
		fadeSpeed = 20;
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
	fadeSpeed = 40;
}