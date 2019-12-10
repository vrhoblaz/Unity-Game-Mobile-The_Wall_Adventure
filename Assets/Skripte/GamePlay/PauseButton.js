#pragma strict

//za pavzo med igro
private var previousTimeScale : float;
var pojavnoOkno : GameObject;
var notPaused : boolean = true;
var wasPaused : boolean;	//za ready,goo po pavzi
var ButtonFunctionScript : ButtonFunctions;
private var ReadySetGoScript : ReadySetGo;
//za spremembo slike ob začetku igre
var PauseButton : Image;
var PauseSprite : Sprite;
var HomeSprite : Sprite;
private var changeToPauseSprite : boolean = true;

var pauseDistanceText : Text;

var pauseChallProgresScript : PauseChallangeProgress;

//public var dontMoveInPause : boolean;

function Start ()
{
	wasPaused = false;
	notPaused = true;
//	dontMoveInPause = false;
	changeToPauseSprite = true;
//	justUnpaused = false;
	pojavnoOkno.SetActive (false);
	PauseButton.sprite = HomeSprite;
	ReadySetGoScript = GameObject.Find("ReadySetGoo").GetComponent("ReadySetGo");
}

function Update ()
{
	if (Moving.startMoving && changeToPauseSprite)
	{
		changeToPauseSprite = false;
		PauseButton.sprite = PauseSprite;
	}
}

// 2 funkciji ker očitno ne morš korutin pripet na gumb
function PauseGame ()
{
	if (GameMaster.Distance != 0 && notPaused)
	{
		if (ReadySetGoScript.pauseTimeoutStarted)
		{
			wasPaused = true;
//			StopCoroutine(ReadySetGoScript.PauseResumeTimeout ());
		}
//		print ("stoped");
		StopGame();
		notPaused = false;
	}
	else if (GameMaster.Distance == 0)
	{
		ButtonFunctionScript.OpenMainMenu ();
	}
}

function StopGame ()
{
	//	Distance challange progress update
	if (DailyChallangeSet.challBools[3] || DailyChallangeSet.challBools[22] || DailyChallangeSet.challBools[23])
	{
		switch (PlayerPrefs.GetInt("ChallangeOne"))
		{
			case 3 : DailyChallangeProgress.challProg1 = GameMaster.Distance; break;
			case 22 : DailyChallangeProgress.challProg1 = GameMaster.Distance + PlayerPrefs.GetInt("ChallangeOneProgress"); break;
			case 23 : DailyChallangeProgress.challProg1 = GameMaster.Distance + PlayerPrefs.GetInt("ChallangeOneProgress"); break;
		}
		switch (PlayerPrefs.GetInt("ChallangeTwo"))
		{
			case 3 : DailyChallangeProgress.challProg2 = GameMaster.Distance; break;
			case 22 : DailyChallangeProgress.challProg2 = GameMaster.Distance + PlayerPrefs.GetInt("ChallangeTwoProgress"); break;
			case 23 : DailyChallangeProgress.challProg2 = GameMaster.Distance + PlayerPrefs.GetInt("ChallangeTwoProgress"); break;
		}
		switch (PlayerPrefs.GetInt("ChallangeThree"))
		{
			case 3 : DailyChallangeProgress.challProg3 = GameMaster.Distance; break;
			case 22 : DailyChallangeProgress.challProg3 = GameMaster.Distance + PlayerPrefs.GetInt("ChallangeThreeProgress"); break;
			case 23 : DailyChallangeProgress.challProg3 = GameMaster.Distance + PlayerPrefs.GetInt("ChallangeThreeProgress"); break;
		}
	}
	if (DailyChallangeSet.challBools[17])
	{
		if (PlayerPrefs.GetInt("ChallangeOne") == 17)
		{
			DailyChallangeProgress.challProg1 = GameMaster.coinColected;
		}
		if (PlayerPrefs.GetInt("ChallangeTwo") == 17)
		{
			DailyChallangeProgress.challProg2 = GameMaster.coinColected;
		}
		if (PlayerPrefs.GetInt("ChallangeThree") == 17)
		{
			DailyChallangeProgress.challProg3 = GameMaster.coinColected;
		}
	}

	//	preostala funkcija za pavzo
	if (!wasPaused)
	{
		previousTimeScale = Time.timeScale;
	}
	//GameMaster.timeSpeed = 0.0; //ta ne sme bit ker zjebe timerje od powerUp-ov
	Time.timeScale = 0;
//	justUnpaused = true;
	pojavnoOkno.SetActive (true);
	//	Izpiše distance
	pauseDistanceText.text = "Distance: " + GameMaster.Distance.ToString("F0") + " m";
	//	call the DisplayChallangeDescrition() function from PauseChallangeProgress
	pauseChallProgresScript.DisplayChallangeDescrition();
	//da ni premika žoge ko se pavzira/odpavzira
	var ballScript : BallControl = GameObject.Find ("Ball").GetComponent ("BallControl");
	ballScript.dontMove = true;
}

function ResumeGame ()
{
	pojavnoOkno.SetActive (false);
//	Moving.startMoving = false;
	//tukaj želim počakat sekundo ali 2 ....
	ReadySetGoScript.PauseResumeTimeout ();
}

function GoAfterPause ()
{
	notPaused = true;
	var gmSkripta : GameMaster;
	gmSkripta = GameObject.Find ("GameMaster").GetComponent("GameMaster");
	if (gmSkripta.timeBeforeKill != 0)
	{
		Time.timeScale = gmSkripta.timeBeforeKill;
		gmSkripta.timeBeforeKill = 0;
	} else {
		Time.timeScale = previousTimeScale;
	}
	Moving.startMoving = true;
}