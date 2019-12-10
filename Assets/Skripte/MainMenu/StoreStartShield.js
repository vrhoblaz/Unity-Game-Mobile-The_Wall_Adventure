#pragma strict

var StartShieldIndicator1 : Image;
var StartShieldIndicator2 : Image;

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
var StartShieldBuyButton : GameObject;

//cost texts
var StartShieldCostText : Text;

private var StartShieldUpgradeCost : int;

//za StartShield kupovat - in ne upgradat
var StartShieldInBankText : Text;
var StartShieldBuyOneCostText : Text;
private var StartShieldBuyCost : int = 250;
var BuyOneStartShield : GameObject;

//for sound
private var soundScript : MenuSounds;

function Awake ()
{
	soundScript = GetComponent (MenuSounds);
}

function Start ()
{
	//StartShield - Število kupljenih
	if (PlayerPrefs.HasKey ("NumStartShield") == false)
	{
		PlayerPrefs.SetInt ("NumStartShield", 0);
	}
	StartShieldConsum.shieldNum = PlayerPrefs.GetInt ("NumStartShield");
	StartShieldInBankText.text = "x " + StartShieldConsum.shieldNum;

	//StartShield - Število dovoljenih hitov - odvisno od upgrade-a
	if (PlayerPrefs.HasKey ("ShieldCollNum") == false)
	{
		PlayerPrefs.SetInt ("ShieldCollNum", 1);
	}
	StartShieldConsum.maxShieldHit = PlayerPrefs.GetInt ("ShieldCollNum");

	StartShieldBuyButton.SetActive (false);
	BuyOneStartShield.SetActive(false);
}

function StartShieldPopUp ()
{	
	StartShieldConsum.shieldNum = PlayerPrefs.GetInt ("NumStartShield");
	StartShieldInBankText.text = "x " + StartShieldConsum.shieldNum;

	BuyOneStartShield.SetActive(true);
	CoinImage1.SetActive (true);
	StartShieldBuyButton.SetActive (true);
	titleText.text = "Protector:";
	descriptionText.text = "Get a shield in the beginning. Lasts until you take damage.\n<i>Upgrade:</i> Allows you to take ONE MORE damage.";
//	StartShieldBuyOneCostText.text = "250";
	PopUpImage.SetActive (true);

	//all red - naprej v if-ih v zelene tisti ki morajo biti
	StartShieldIndicator1.color = Color.red;
	StartShieldIndicator2.color = Color.red;

	//Setting Coin price according to current state
	if (StartShieldConsum.maxShieldHit == 1)
	{
		PlayerPrefs.SetInt ("StartShieldCost", 5000);
		PlayerPrefs.SetInt ("BuyOneCostProtector", 250);
	}
	if (StartShieldConsum.maxShieldHit == 2)
	{
		PlayerPrefs.SetInt ("StartShieldCost", 30000);
		PlayerPrefs.SetInt ("BuyOneCostProtector", 350);
		StartShieldIndicator1.color = Color.green;
	}

	//če je že vse kupljeno
	if (StartShieldConsum.maxShieldHit >= 3)
	{
		StartShieldCostText.text = "MAX";
		CoinImage1.SetActive (false);
		StartShieldBuyButton.SetActive (false);
		StartShieldIndicator1.color = Color.green;
		StartShieldIndicator2.color = Color.green;
		PlayerPrefs.SetInt ("BuyOneCostProtector", 500);
	}
	if (StartShieldConsum.maxShieldHit < 3)
	{
		StartShieldUpgradeCost = PlayerPrefs.GetInt ("StartShieldCost");
		StartShieldCostText.text = ((StartShieldUpgradeCost/1000).ToString("F0") + " 000");
	}
	StartShieldBuyCost = PlayerPrefs.GetInt("BuyOneCostProtector");
	StartShieldBuyOneCostText.text = StartShieldBuyCost.ToString();
	PlayerPrefs.Save ();
}

function StartShieldUpgrade ()
{
	if (GameMaster.coinTotal >= StartShieldUpgradeCost && StartShieldConsum.maxShieldHit <= 2)
	{
		soundScript.PlayMoneyDropSound();
		StartShieldConsum.maxShieldHit ++;
		GameMaster.coinTotal -= StartShieldUpgradeCost;
		PlayerPrefs.SetInt ("ShieldCollNum", StartShieldConsum.maxShieldHit);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		if (StartShieldConsum.maxShieldHit == 2)
		{
			StartShieldUpgradeCost = 30000;
			StartShieldBuyCost = 350;
			StartShieldIndicator1.color = Color.green;
		}

		PlayerPrefs.SetInt ("StartShieldCost", StartShieldUpgradeCost);
		StartShieldCostText.text = ((StartShieldUpgradeCost/1000).ToString("F0") + " 000");

		if (StartShieldConsum.maxShieldHit >= 3)
		{
			StartShieldCostText.text = "MAX";
			CoinImage1.SetActive (false);
			StartShieldBuyButton.SetActive (false);
			StartShieldIndicator2.color = Color.green;
			StartShieldBuyCost = 500;
		}
		PlayerPrefs.SetInt ("BuyOneCostProtector", StartShieldBuyCost);
		StartShieldBuyOneCostText.text = StartShieldBuyCost.ToString();
	}
	else if (GameMaster.coinTotal < StartShieldUpgradeCost)
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

function StartShieldBuyOne ()
{
	if (GameMaster.coinTotal >= StartShieldBuyCost)
	{
		soundScript.PlayConsMoneyDropSound();
		StartShieldConsum.shieldNum ++;
		GameMaster.coinTotal -= StartShieldBuyCost;
		PlayerPrefs.SetInt ("NumStartShield", StartShieldConsum.shieldNum);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		StartShieldInBankText.text = "x " + StartShieldConsum.shieldNum;
	}
	else if (GameMaster.coinTotal < StartShieldBuyCost)
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
