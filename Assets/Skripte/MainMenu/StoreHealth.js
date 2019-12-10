#pragma strict

var HealthIndicator1 : Image;
var HealthIndicator2 : Image;
var HealthIndicator3 : Image;
var HealthIndicator4 : Image;
var HealthIndicator5 : Image;

var HealthIndObject3 : GameObject;
var HealthIndObject4 : GameObject;

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
var HealthBuyButton : GameObject;

//cost texts
var HealthCostText : Text;

private var HealthUpgradeCost : int;

//for sound
private var soundScript : MenuSounds;

function Awake ()
{
	soundScript = GetComponent (MenuSounds);
}

function Start ()
{
	//maxHealth
	if (PlayerPrefs.HasKey ("MaxHealth") == false)
	{
		PlayerPrefs.SetInt ("MaxHealth", 3);
	}
	Health.maxLife = PlayerPrefs.GetInt("MaxHealth");
	HealthBuyButton.SetActive (false);
}

function Update ()
{/*
	if (Health.maxLife >= 6)
	{
		HealthCostText.text = "MAX";
	}*/
}

function HealthPopUp ()
{
	CoinImage1.SetActive (true);
	HealthBuyButton.SetActive (true);
	titleText.text = "Health Upgrade:";
	descriptionText.text = "By buying this upgrade you will start the game with MORE HEALTH POINTS";
	PopUpImage.SetActive (true);
	//only 3 indicator needed for health
	HealthIndObject3.SetActive (true);
	HealthIndObject4.SetActive (false);

	//all red - naprej v if-ih v zelene tisti ki morajo biti
	HealthIndicator1.color = Color.red;
	HealthIndicator2.color = Color.red;
	HealthIndicator3.color = Color.red;

	//Setting Health price according to current maxLife
	if (Health.maxLife == 3)
	{
		PlayerPrefs.SetInt ("HealthCost", 1000);
	}
	if (Health.maxLife == 4)
	{
		PlayerPrefs.SetInt ("HealthCost", 5000);
		HealthIndicator1.color = Color.green;
	}
	if (Health.maxLife == 5)
	{
		PlayerPrefs.SetInt ("HealthCost", 20000);
		HealthIndicator1.color = Color.green;
		HealthIndicator2.color = Color.green;
	}
	if (Health.maxLife >= 6)
	{
		HealthCostText.text = "MAX";
		CoinImage1.SetActive (false);
		HealthBuyButton.SetActive (false);
		HealthIndicator1.color = Color.green;
		HealthIndicator2.color = Color.green;
		HealthIndicator3.color = Color.green;
	}
	if (Health.maxLife < 6)
	{
		HealthUpgradeCost = PlayerPrefs.GetInt ("HealthCost");
		HealthCostText.text = ((HealthUpgradeCost/1000).ToString("F0") + " 000");
	}
	PlayerPrefs.Save ();
}

function HealthUpgrade ()
{
	if (GameMaster.coinTotal >= HealthUpgradeCost && Health.maxLife <= 5)
	{
		soundScript.PlayMoneyDropSound();
		Health.maxLife ++;
		GameMaster.coinTotal -= HealthUpgradeCost;
		PlayerPrefs.SetInt("MaxHealth", Health.maxLife);
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		if (Health.maxLife == 4)
		{
			HealthUpgradeCost = 5000;
			HealthIndicator1.color = Color.green;
		}
		else if (Health.maxLife == 5)
		{
			HealthUpgradeCost = 20000;
			HealthIndicator2.color = Color.green;
		}
		PlayerPrefs.SetInt ("HealthCost", HealthUpgradeCost);
		HealthCostText.text = ((HealthUpgradeCost/1000).ToString("F0") + " 000");
		//mora biti tukaj in ne višje zaradi HealthCostText.text ki je v tem if-u. enaka funkcija je v vrstici višje in se koljeta
		if (Health.maxLife >= 6)
		{
			CoinImage1.SetActive (false);
			HealthBuyButton.SetActive (false);
			HealthCostText.text = "MAX";
			HealthIndicator3.color = Color.green;
		}
	}

	else if (GameMaster.coinTotal < HealthUpgradeCost)
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
