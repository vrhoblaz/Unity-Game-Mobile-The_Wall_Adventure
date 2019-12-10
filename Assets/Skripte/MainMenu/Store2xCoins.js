#pragma strict

var CoinIndicator1 : Image;
var CoinIndicator2 : Image;
var CoinIndicator3 : Image;
var CoinIndicator4 : Image;
var CoinIndicator5 : Image;

var CoinIndObject3 : GameObject;
var CoinIndObject4 : GameObject;


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
var CoinBuyButton : GameObject;

//cost texts
var CoinCostText : Text;

private var CoinUpgradeCost : int;

//for sound
private var soundScript : MenuSounds;

function Awake ()
{
	soundScript = GetComponent (MenuSounds);
}

function Start ()
{
	//2xCoin Time
	if (PlayerPrefs.HasKey ("2xCoinTime") == false)
	{
		PlayerPrefs.SetFloat ("2xCoinTime", 10f);
	}
	Coin2x.time2xCoin = PlayerPrefs.GetFloat ("2xCoinTime");
	CoinBuyButton.SetActive (false);
}

function CoinPopUp ()
{	
	CoinImage1.SetActive (true);
	CoinBuyButton.SetActive (true);
	titleText.text = "Double Coin Upgrade:";
	descriptionText.text = "With each purchase the 2x Coin PowerUp time EXTENDS FOR 5 seconds.";
	PopUpImage.SetActive (true);

	//To show all indicators
	CoinIndObject3.SetActive (true);
	CoinIndObject4.SetActive (true);

	//all red - naprej v if-ih v zelene tisti ki morajo biti
	CoinIndicator1.color = Color.red;
	CoinIndicator2.color = Color.red;
	CoinIndicator3.color = Color.red;
	CoinIndicator4.color = Color.red;
	CoinIndicator5.color = Color.red;

	//Setting Coin price according to current state
	if (Coin2x.time2xCoin == 10f)
	{
		PlayerPrefs.SetInt ("2xCoinCost", 1000);
	}
	if (Coin2x.time2xCoin == 15f)
	{
		PlayerPrefs.SetInt ("2xCoinCost", 5000);
		CoinIndicator1.color = Color.green;
	}
	if (Coin2x.time2xCoin == 20f)
	{
		PlayerPrefs.SetInt ("2xCoinCost", 10000);
		CoinIndicator1.color = Color.green;
		CoinIndicator2.color = Color.green;
	}
	if (Coin2x.time2xCoin == 25f)
	{
		PlayerPrefs.SetInt ("2xCoinCost", 30000);
		CoinIndicator1.color = Color.green;
		CoinIndicator2.color = Color.green;
		CoinIndicator3.color = Color.green;
	}
	if (Coin2x.time2xCoin == 30f)
	{
		PlayerPrefs.SetInt ("2xCoinCost", 100000);
		CoinIndicator1.color = Color.green;
		CoinIndicator2.color = Color.green;
		CoinIndicator3.color = Color.green;
		CoinIndicator4.color = Color.green;
		descriptionText.text = "With the last purchase the 2x Coin PowerUp time EXTENDS FOR 15 seconds.";
	}
	//če je že vse kupljeno
	if (Coin2x.time2xCoin >= 45f)
	{
		CoinCostText.text = "MAX";
		CoinImage1.SetActive (false);
		CoinBuyButton.SetActive (false);
		CoinIndicator1.color = Color.green;
		CoinIndicator2.color = Color.green;
		CoinIndicator3.color = Color.green;
		CoinIndicator4.color = Color.green;
		CoinIndicator5.color = Color.green;
	}
	if (Coin2x.time2xCoin < 45f)
	{
		CoinUpgradeCost = PlayerPrefs.GetInt ("2xCoinCost");
		CoinCostText.text = ((CoinUpgradeCost/1000).ToString("F0") + " 000");
	}
	PlayerPrefs.Save ();
}

function CoinUpgrade ()
{
	if (GameMaster.coinTotal >= CoinUpgradeCost && Coin2x.time2xCoin <= 25f)
	{
		soundScript.PlayMoneyDropSound();
		Coin2x.time2xCoin += 5f;
		GameMaster.coinTotal -= CoinUpgradeCost;
		PlayerPrefs.SetFloat ("2xCoinTime", Coin2x.time2xCoin);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		if (Coin2x.time2xCoin == 15f)
		{
			CoinUpgradeCost = 5000;
			CoinIndicator1.color = Color.green;
		}
		if (Coin2x.time2xCoin == 20f)
		{
			CoinUpgradeCost = 10000;
			CoinIndicator2.color = Color.green;
		}
		if (Coin2x.time2xCoin == 25f)
		{
			CoinUpgradeCost = 30000;
			CoinIndicator3.color = Color.green;
		}
		if (Coin2x.time2xCoin == 30f)
		{
			CoinUpgradeCost = 100000;
			CoinIndicator4.color = Color.green;
			descriptionText.text = "With the last purchase the 2x Coin PowerUp time EXTENDS FOR 15 seconds.";
		}
		PlayerPrefs.SetInt ("2xCoinCost", CoinUpgradeCost);
		CoinCostText.text = ((CoinUpgradeCost/1000).ToString("F0") + " 000");

	}
	else if (GameMaster.coinTotal >= CoinUpgradeCost && Coin2x.time2xCoin == 30f)
	{
		soundScript.PlayMoneyDropSound();
		Coin2x.time2xCoin += 15f;
		GameMaster.coinTotal -= CoinUpgradeCost;
		PlayerPrefs.SetFloat ("2xCoinTime", Coin2x.time2xCoin);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		//ker je potem max sledi
		if (Coin2x.time2xCoin >= 45f)
		{
			CoinImage1.SetActive (false);
			CoinBuyButton.SetActive (false);
			CoinCostText.text = "MAX";
			CoinIndicator5.color = Color.green;
		}
	}
	else if (GameMaster.coinTotal < CoinUpgradeCost)
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

