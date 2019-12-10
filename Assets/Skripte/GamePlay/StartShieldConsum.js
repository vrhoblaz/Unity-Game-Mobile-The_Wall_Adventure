#pragma strict

//var ShieldOnBall : GameObject;
static var shieldOn : boolean;
static var shieldHitCounter : int;
static var maxShieldHit : int;
//za števlo uporab
static var shieldNum : int;
var shieldButton : GameObject;

//za počasen fade ko se konča
var shieldAlpha : Renderer;
private var alphaCol : float = 0.215f;

static var shieldOnColor : boolean = false;
static var protectorColor : int = 1;

static var respawnProtector : boolean;

function Start () 
{
	//
	alphaCol = 0.215f;
	//
	shieldOnColor = false;
	respawnProtector = false;
	shieldAlpha.material.color.a = alphaCol;
	shieldOn = false;
	shieldHitCounter = 0;
	maxShieldHit = PlayerPrefs.GetInt ("ShieldCollNum");
	protectorColor = PlayerPrefs.GetInt ("ShieldCollNum");
	shieldNum = PlayerPrefs.GetInt ("NumStartShield");

	if (shieldNum > 0)
	{
		shieldButton.SetActive (true);
	}
	else if (shieldNum <= 0)
	{
		shieldButton.SetActive (false);
	}
}

function Update () 
{
	if (shieldOn && shieldHitCounter >= maxShieldHit)
	{
		ProtectorOff();
	}

	if (shieldOnColor)
	{
		shieldAlpha.material.color = new Color (0f, 0f, 1f, 0.215f);
		shieldOnColor = false;
	}
	if (protectorColor == 3 && shieldOn)
	{
		shieldAlpha.material.color = new Color (0f, 1f, 0f, 0.215f);
	}
	else if (protectorColor == 2 && shieldOn)
	{
		shieldAlpha.material.color = new Color (1f, 1f, 0f, 0.215f);
	}
	else if (protectorColor == 1 && shieldOn)
	{
		shieldAlpha.material.color = new Color (1f, 0f, 0f, 0.215f);
	}

	if (respawnProtector && (shieldHitCounter != 0 || !shieldOn || !Timer.BallShield.activeSelf))
	{
		shieldHitCounter = 0;
		shieldOn = true;
		Timer.BallShield.SetActive (true);
	}
}

function StartShieldConsumable ()
{
	// Protector function
	if (DailyChallangeSet.challBools[1] || DailyChallangeSet.challBools[20])
	{
		if (PlayerPrefs.GetInt("ChallangeOne") == 1 || PlayerPrefs.GetInt("ChallangeOne") == 20)
		{
			PlayerPrefs.SetInt("ChallangeOneProgress", (1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
		}
		if (PlayerPrefs.GetInt("ChallangeTwo") == 1 || PlayerPrefs.GetInt("ChallangeTwo") == 20)
		{
			PlayerPrefs.SetInt("ChallangeTwoProgress", (1 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
		}
		if (PlayerPrefs.GetInt("ChallangeThree") == 1 || PlayerPrefs.GetInt("ChallangeThree") == 20)
		{
			PlayerPrefs.SetInt("ChallangeThreeProgress", (1 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
		}
	}

	//	rest of protector function
	shieldOn = true;
	Timer.BallShield.SetActive (true);
	shieldNum --;
	PlayerPrefs.SetInt ("TotalConsumables", (PlayerPrefs.GetInt ("TotalConsumables") + 1));
	PlayerPrefs.SetInt ("NumStartShield", shieldNum);
	PlayerPrefs.Save();
}

function ProtectorOff ()
{
	//while zanka za to da počaka malo da se ne ubije v točno sosednjo oviro

	while (alphaCol > 0)
	{
		alphaCol -= 0.001f * Time.deltaTime * 300;
		shieldAlpha.material.color.a = alphaCol;
		yield;

	}
	shieldOn = false;
	shieldHitCounter = 0; //vrstico lahko postaviš v restartLevel
	alphaCol = 0.215f;
	shieldAlpha.material.color.a = alphaCol;
}
