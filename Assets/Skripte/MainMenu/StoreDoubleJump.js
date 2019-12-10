#pragma strict

var DoubleJumpIndicator1 : Image;
var DoubleJumpIndicator2 : Image;
var DoubleJumpIndicator3 : Image;
var DoubleJumpIndicator4 : Image;
var DoubleJumpIndicator5 : Image;

var DoubleJumpIndObject3 : GameObject;
var DoubleJumpIndObject4 : GameObject;

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
var DoubleJumpBuyButton : GameObject;

//cost texts
var DoubleJumpCostText : Text;

private var DoubleJumpUpgradeCost : int;

//for sound
private var soundScript : MenuSounds;

function Awake ()
{
	soundScript = GetComponent (MenuSounds);
}

function Start ()
{
	//DoubleJump Time
	if (PlayerPrefs.HasKey ("DoubleJumpTime") == false)
	{
		PlayerPrefs.SetFloat ("DoubleJumpTime", 10f);
	}
	DoubleJump.timeDoubleJump = PlayerPrefs.GetFloat ("DoubleJumpTime");
	DoubleJumpBuyButton.SetActive (false);
}

function DoubleJumpPopUp ()
{	
	CoinImage1.SetActive (true);
	DoubleJumpBuyButton.SetActive (true);
	titleText.text = "Double Jump Upgrade:";
	descriptionText.text = "With each purchase the Double Jump PowerUp time EXTENDS FOR 5 seconds.";
	PopUpImage.SetActive (true);

	//To show all indicators
	DoubleJumpIndObject3.SetActive (true);
	DoubleJumpIndObject4.SetActive (true);

	//all red - naprej v if-ih v zelene tisti ki morajo biti
	DoubleJumpIndicator1.color = Color.red;
	DoubleJumpIndicator2.color = Color.red;
	DoubleJumpIndicator3.color = Color.red;
	DoubleJumpIndicator4.color = Color.red;
	DoubleJumpIndicator5.color = Color.red;

	//Setting Coin price according to current state
	if (DoubleJump.timeDoubleJump == 10f)
	{
		PlayerPrefs.SetInt ("DoubleJumpCost", 1000);
	}
	if (DoubleJump.timeDoubleJump == 15f)
	{
		PlayerPrefs.SetInt ("DoubleJumpCost", 5000);
		DoubleJumpIndicator1.color = Color.green;
	}
	if (DoubleJump.timeDoubleJump == 20f)
	{
		PlayerPrefs.SetInt ("DoubleJumpCost", 10000);
		DoubleJumpIndicator1.color = Color.green;
		DoubleJumpIndicator2.color = Color.green;
	}
	if (DoubleJump.timeDoubleJump == 25f)
	{
		PlayerPrefs.SetInt ("DoubleJumpCost", 30000);
		DoubleJumpIndicator1.color = Color.green;
		DoubleJumpIndicator2.color = Color.green;
		DoubleJumpIndicator3.color = Color.green;
	}
	if (DoubleJump.timeDoubleJump == 30f)
	{
		PlayerPrefs.SetInt ("DoubleJumpCost", 100000);
		DoubleJumpIndicator1.color = Color.green;
		DoubleJumpIndicator2.color = Color.green;
		DoubleJumpIndicator3.color = Color.green;
		DoubleJumpIndicator4.color = Color.green;
		descriptionText.text = "With the last purchase the Double Jump PowerUp time EXTENDS FOR 15 seconds.";
	}
	//če je že vse kupljeno
	if (DoubleJump.timeDoubleJump >= 45f)
	{
		DoubleJumpCostText.text = "MAX";
		CoinImage1.SetActive (false);
		DoubleJumpBuyButton.SetActive (false);
		DoubleJumpIndicator1.color = Color.green;
		DoubleJumpIndicator2.color = Color.green;
		DoubleJumpIndicator3.color = Color.green;
		DoubleJumpIndicator4.color = Color.green;
		DoubleJumpIndicator5.color = Color.green;
	}
	if (DoubleJump.timeDoubleJump < 45f)
	{
		DoubleJumpUpgradeCost = PlayerPrefs.GetInt ("DoubleJumpCost");
		DoubleJumpCostText.text = ((DoubleJumpUpgradeCost/1000).ToString("F0") + " 000");
	}
	PlayerPrefs.Save ();
}

function DoubleJumpUpgrade ()
{
	if (GameMaster.coinTotal >= DoubleJumpUpgradeCost && DoubleJump.timeDoubleJump <= 25f)
	{
		soundScript.PlayMoneyDropSound();
		DoubleJump.timeDoubleJump += 5f;
		GameMaster.coinTotal -= DoubleJumpUpgradeCost;
		PlayerPrefs.SetFloat ("DoubleJumpTime", DoubleJump.timeDoubleJump);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		if (DoubleJump.timeDoubleJump == 15f)
		{
			DoubleJumpUpgradeCost = 5000;
			DoubleJumpIndicator1.color = Color.green;
		}
		if (DoubleJump.timeDoubleJump == 20f)
		{
			DoubleJumpUpgradeCost = 10000;
			DoubleJumpIndicator2.color = Color.green;
		}
		if (DoubleJump.timeDoubleJump == 25f)
		{
			DoubleJumpUpgradeCost = 30000;
			DoubleJumpIndicator3.color = Color.green;
		}
		if (DoubleJump.timeDoubleJump == 30f)
		{
			DoubleJumpUpgradeCost = 100000;
			DoubleJumpIndicator4.color = Color.green;
			descriptionText.text = "With the last purchase the Double Jump PowerUp time EXTENDS FOR 15 seconds.";
		}
		PlayerPrefs.SetInt ("DoubleJumpCost", DoubleJumpUpgradeCost);
		DoubleJumpCostText.text = ((DoubleJumpUpgradeCost/1000).ToString("F0") + " 000");

	}
	else if (GameMaster.coinTotal >= DoubleJumpUpgradeCost && DoubleJump.timeDoubleJump == 30f)
	{
		soundScript.PlayMoneyDropSound();
		DoubleJump.timeDoubleJump += 15f;
		GameMaster.coinTotal -= DoubleJumpUpgradeCost;
		PlayerPrefs.SetFloat ("DoubleJumpTime", DoubleJump.timeDoubleJump);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		//ker je potem max sledi
		if (DoubleJump.timeDoubleJump >= 45f)
		{
			CoinImage1.SetActive (false);
			DoubleJumpBuyButton.SetActive (false);
			DoubleJumpCostText.text = "MAX";
			DoubleJumpIndicator5.color = Color.green;
		}
	}
	else if (GameMaster.coinTotal < DoubleJumpUpgradeCost)
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

