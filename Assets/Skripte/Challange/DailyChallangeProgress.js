#pragma strict

//	challange Description text array
private var ChallangeStringArray : String[];
//	challange reward int array
private var ChallangeIntArray : int[];
//	challange target progress array
static var progressCheckArray : int[] = [5,5,3,1500,100,25,30,5,5,5,5,5,5,100,25,25,50,150,1000,10,10,10,7000,15000];

//	possible rewards
private var coinReward200 : int = 200;
private var coinReward250 : int = 250;
private var coinReward300 : int = 300;
private var coinReward400 : int = 400;
private var coinReward500 : int = 500;
private var coinReward1000 : int = 1000;

//	Text for description of the challange
var challText1 : Text;
var challText2 : Text;
var challText3 : Text;
//	challange reward texts
var challRewText1 : Text;
var challRewText2 : Text;
var challRewText3 : Text;
//	Challange progres text
var challProgresText1 : Text;
var challProgresText2 : Text;
var challProgresText3 : Text;

var refreshButton : GameObject;
var refreshButtonShade : GameObject;
var refreshCameraImg : GameObject;

//	intigers for each challange progress
static var challProg1 : int;
static var challProg2 : int;
static var challProg3 : int;
//	intigers for each challange reward
static var challRew1 : int;
static var challRew2 : int;
static var challRew3 : int;


//	za smisel utripanja
var rewardImage1 : Image;
var rewardImage2 : Image;
var rewardImage3 : Image;
private var colorGreen1 : float;
private var colorGreen2 : float;
private var colorGreen3 : float;
static var blink1 : boolean = false;
static var blink2 : boolean = false;
static var blink3 : boolean = false;

var menuSoundScript : MenuSounds;

function Awake()
{
	blink1 = false;
	blink2 = false;
	blink3 = false;
	//	setting int to their PlayPref
	challProg1 = PlayerPrefs.GetInt("ChallangeOneProgress");
	challProg2 = PlayerPrefs.GetInt("ChallangeTwoProgress");
	challProg3 = PlayerPrefs.GetInt("ChallangeThreeProgress");

	//	Check if done
	if (challProg1 >= progressCheckArray[PlayerPrefs.GetInt("ChallangeOne")])
	{
		PlayerPrefs.SetInt("ChallangeOneDone", 1);
	}
	if (challProg2 >= progressCheckArray[PlayerPrefs.GetInt("ChallangeTwo")])
	{
		PlayerPrefs.SetInt("ChallangeTwoDone", 1);
	}
	if (challProg3 >= progressCheckArray[PlayerPrefs.GetInt("ChallangeThree")])
	{
		PlayerPrefs.SetInt("ChallangeThreeDone", 1);
	}

}

function Start () 
{
	//	setting up the string array
	ChallangeStringArray = new String[24];
	ChallangeStringArray[0] = "Use Kick Start 5 times!";		//200c
	ChallangeStringArray[1] = "Use Protector 5 times!";		//200c
	ChallangeStringArray[2] = "Use Triple coins 3 times!";	//200c
	ChallangeStringArray[3] = "Travel the distance of 1.500 m in one run!";	//250c
	ChallangeStringArray[4] = "Jump 100 times - double jump count only as one!";	//250c
	ChallangeStringArray[5] = "Double jump 25 times!";	//250c
	ChallangeStringArray[6] = "Hit the fence 30 times!";		//250c
	ChallangeStringArray[7] = "Pick up 5 Shield Power Up-s!";	//250c
	ChallangeStringArray[8] = "Heal yourself 5 times!";	//250c
	ChallangeStringArray[9] = "Pick up 5 Double Jumps Power Up-s!";	//250c
	ChallangeStringArray[10] = "Pick up 5 Magnet Power Up-s!";	//250c
	ChallangeStringArray[11] = "Pick up 5 Slow Power Up-s!";	//250c
	ChallangeStringArray[12] = "Pick up 5 Double coin Power Up-s!";	//250c
	ChallangeStringArray[13] = "Collect 100 coins using Magent!";	//250c
	ChallangeStringArray[14] = "Hit 25 obsticle (with shield or not)!";	//300c
	ChallangeStringArray[15] = "Pick up 25  Power Up-s!";	//300c
	ChallangeStringArray[16] = "Lose 50 Life Points!";		//300c
	ChallangeStringArray[17] = "Collect 150 coins in one run!";	//300
	ChallangeStringArray[18] = "Collect 1.000 coins!";	//300c
	ChallangeStringArray[19] = "Use Kick Start 10 times!";	//400c
	ChallangeStringArray[20] = "Use Protector 10 times!";	//400c
	ChallangeStringArray[21] = "Use Triple coins 10 times!";		//400c
	ChallangeStringArray[22] = "Travel the distance of 7.000 m!";		//500c
	ChallangeStringArray[23] = "Travel the distance of 15.000 m!";	//1000c
	//	setting up the int array
	ChallangeIntArray = new int[24];
	//	for zanka postavi vse vrednosti array-a na reward int
	for (var i=0; i<24; i++)
	{
		if (i <= 2)
		{
			ChallangeIntArray[i] = 200;
		}
		else if (i > 2 && i <= 13)
		{
			ChallangeIntArray[i] = 250;
		}
		else if (i > 13 && i <= 18)
		{
			ChallangeIntArray[i] = 300;
		}
		else if (i > 18 && i <= 21)
		{
			ChallangeIntArray[i] = 400;
		}
		else if (i == 22)
		{
			ChallangeIntArray[i] = 500;
		}
		else if (i == 23)
		{
			ChallangeIntArray[i] = 1000;
		}
	}

	if(PlayerPrefs.GetInt("RefreshChallange") == 0)
	{
		refreshButton.SetActive(true);
		refreshButtonShade.SetActive (true);
		refreshCameraImg.SetActive(true);
	}
	else
	{
		refreshButton.SetActive(false);
		refreshButtonShade.SetActive (false);
		refreshCameraImg.SetActive(false);
	}
	DisplayText();
}

function DisplayText()
{
	rewardImage1.color.a = 0f;
	rewardImage2.color.a = 0f;
	rewardImage3.color.a = 0f;
	//	Set text for Challanges
	challText1.text = ChallangeStringArray[PlayerPrefs.GetInt("ChallangeOne")];
	challText2.text = ChallangeStringArray[PlayerPrefs.GetInt("ChallangeTwo")];
	challText3.text = ChallangeStringArray[PlayerPrefs.GetInt("ChallangeThree")];

	//	Set int for reward
	challRew1 = ChallangeIntArray[PlayerPrefs.GetInt("ChallangeOne")];
	challRew2 = ChallangeIntArray[PlayerPrefs.GetInt("ChallangeTwo")];
	challRew3 = ChallangeIntArray[PlayerPrefs.GetInt("ChallangeThree")];

	//	izpiše nagrado za challange
	challRewText1.text = challRew1.ToString();
	challRewText2.text = challRew2.ToString();
	challRewText3.text = challRew3.ToString();
	//	izpiše progress
		//	if chall done - trenutno izpiše DONE
	challProg1 = PlayerPrefs.GetInt("ChallangeOneProgress");	//tole drugače uredi
	challProg2 = PlayerPrefs.GetInt("ChallangeTwoProgress");	//tole drugače uredi	imaš že zgoraj - tukaj za smisel RESET CHALLANGE gumba
	challProg3 = PlayerPrefs.GetInt("ChallangeThreeProgress");	//tole drugače uredi
	
	if (PlayerPrefs.GetInt("ChallangeOneDone") == 1 && PlayerPrefs.GetInt("ChallangeOneCollected") == 0)
	{
		challProgresText1.text = "Collect!!";
		rewardImage1.color.a = 1f;
		blink1 = true;
		BlinkingRewardIconOne();
	}
	else if (PlayerPrefs.GetInt("ChallangeOneDone") == 1 && PlayerPrefs.GetInt("ChallangeOneCollected") == 1)
	{challProgresText1.text = "Collected!";}
	else
	{challProgresText1.text = challProg1.ToString();}
	if (PlayerPrefs.GetInt("ChallangeTwoDone") == 1 && PlayerPrefs.GetInt("ChallangeTwoCollected") == 0)
	{
		challProgresText2.text = "Collect!!";
		rewardImage2.color.a = 1f;
		blink2 = true;
		BlinkingRewardIconTwo();
	}
	else if (PlayerPrefs.GetInt("ChallangeTwoDone") == 1 && PlayerPrefs.GetInt("ChallangeTwoCollected") == 1)
	{challProgresText2.text = "Collected!";}
	else
	{challProgresText2.text = challProg2.ToString();}
	if (PlayerPrefs.GetInt("ChallangeThreeDone") == 1 && PlayerPrefs.GetInt("ChallangeThreeCollected") == 0)
	{
		challProgresText3.text = "Collect!!";
		rewardImage3.color.a = 1f;
		blink3 = true;
		BlinkingRewardIconThree();
	}
	else if (PlayerPrefs.GetInt("ChallangeThreeDone") == 1 && PlayerPrefs.GetInt("ChallangeThreeCollected") == 1)
	{challProgresText3.text = "Collected!";}
	else
	{challProgresText3.text = challProg3.ToString();}
}

function CollectRewardOne()
{
	if (PlayerPrefs.GetInt("ChallangeOneDone") == 1 && PlayerPrefs.GetInt("ChallangeOneCollected") == 0)
	{
		menuSoundScript.PlayNormalClickSound();
		PlayerPrefs.SetInt("cionInBank", (PlayerPrefs.GetInt("cionInBank") + challRew1));
		PlayerPrefs.SetInt ("TotCoins", (PlayerPrefs.GetInt ("TotCoins") + challRew1));
		PlayerPrefs.SetInt("ChallangeOneCollected", 1);
		PlayerPrefs.Save();
		DisplayText();
		rewardImage1.color.a = 0f;
		blink1 = false;
		menuSoundScript.PlayMoneyDropSound();
	}
	else
	{
		menuSoundScript.PlayNoGoClickSound();
	}
}
function CollectRewardTwo()
{
	if (PlayerPrefs.GetInt("ChallangeTwoDone") == 1 && PlayerPrefs.GetInt("ChallangeTwoCollected") == 0)
	{
		menuSoundScript.PlayNormalClickSound();
		PlayerPrefs.SetInt("cionInBank", (PlayerPrefs.GetInt("cionInBank") + challRew2));
		PlayerPrefs.SetInt ("TotCoins", (PlayerPrefs.GetInt ("TotCoins") + challRew2));
		PlayerPrefs.SetInt("ChallangeTwoCollected", 1);
		PlayerPrefs.Save();
		DisplayText();
		rewardImage2.color.a = 0f;
		blink2 = false;
		menuSoundScript.PlayMoneyDropSound();
	}
	else
	{
		menuSoundScript.PlayNoGoClickSound();
	}
}
function CollectRewardThree()
{
	if (PlayerPrefs.GetInt("ChallangeThreeDone") == 1 && PlayerPrefs.GetInt("ChallangeThreeCollected") == 0)
	{
		menuSoundScript.PlayNormalClickSound();
		PlayerPrefs.SetInt("cionInBank", (PlayerPrefs.GetInt("cionInBank") + challRew3));
		PlayerPrefs.SetInt ("TotCoins", (PlayerPrefs.GetInt ("TotCoins") + challRew3));
		PlayerPrefs.SetInt("ChallangeThreeCollected", 1);
		PlayerPrefs.Save();
		DisplayText();
		rewardImage3.color.a = 0f;
		blink3 = false;
		menuSoundScript.PlayMoneyDropSound();
	}
	else
	{
		menuSoundScript.PlayNoGoClickSound();
	}
}

function BlinkingRewardIconOne()
{
	while (blink1)
	{
		colorGreen1 = 0f;
		while (colorGreen1<0.5f)
		{
			rewardImage1.color.g = colorGreen1;
			colorGreen1 += 0.01 * Time.timeScale;
			yield;
		}
		while (colorGreen1>0f)
		{
			rewardImage1.color.g = colorGreen1;
			colorGreen1 -= 0.01 * Time.timeScale;
			yield;
		}
	}
}

function BlinkingRewardIconTwo()
{
	while (blink2)
	{
		colorGreen2 = 0f;
		while (colorGreen2<0.5f)
		{
			rewardImage2.color.g = colorGreen2;
			colorGreen2 += 0.01 * Time.timeScale;
			yield;
		}
		while (colorGreen2>=0f)
		{
			rewardImage2.color.g = colorGreen2;
			colorGreen2 -= 0.01 * Time.timeScale;
			yield;
		}
	}
}

function BlinkingRewardIconThree()
{
	while (blink3)
	{
		colorGreen3 = 0f;
		while (colorGreen3<0.5f)
		{
			rewardImage3.color.g = colorGreen3;
			colorGreen3 += 0.01 * Time.timeScale;
			yield;
		}
		while (colorGreen3>0f)
		{
			rewardImage3.color.g = colorGreen3;
			colorGreen3 -= 0.01 * Time.timeScale;
			yield;
		}
	}
}

static function CompletedPlayPrefSet()
{
	//	setting int to their PlayPref
	challProg1 = PlayerPrefs.GetInt("ChallangeOneProgress");
	challProg2 = PlayerPrefs.GetInt("ChallangeTwoProgress");
	challProg3 = PlayerPrefs.GetInt("ChallangeThreeProgress");

	//	Check if done
	if (challProg1 >= progressCheckArray[PlayerPrefs.GetInt("ChallangeOne")])
	{
		PlayerPrefs.SetInt("ChallangeOneDone", 1);
	}
	if (challProg2 >= progressCheckArray[PlayerPrefs.GetInt("ChallangeTwo")])
	{
		PlayerPrefs.SetInt("ChallangeTwoDone", 1);
	}
	if (challProg3 >= progressCheckArray[PlayerPrefs.GetInt("ChallangeThree")])
	{
		PlayerPrefs.SetInt("ChallangeThreeDone", 1);
	}
}

function HideRefreshButton()
{
	refreshButton.SetActive(false);
	refreshButtonShade.SetActive (false);
	refreshCameraImg.SetActive(false);
}