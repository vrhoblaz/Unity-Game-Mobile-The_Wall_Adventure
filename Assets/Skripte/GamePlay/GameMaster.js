#pragma strict

import UnityEngine.UI;
 //import UnityEngine.SceneManagement;

//Triple Coin
var TripleCoinButton : GameObject; //button enable/disable 
static var tripleCoinNum : int; //število kupljenih
static var tripleCoinOn : boolean; //active/inactive this game
private var tripledCoin : int;

//coins from distance
private var distanceCoin : int;

var ballVisina: Transform;

//distance
var distanceText : Text;
static var Distance : float = 0;
static var PreviousDistance : float = 0;
static var MaxDistance : float; //zbrisov sm =0 - mislim da nebi smel bit problem

var coinColectedText : Text;
static var coinColected : int = 0;
static var coinTotal : int;
static var timeSpeed :float = 1;
//static var distCoins : int = 0;

//uporabljeno pri timescale - da pospeši zgolj 1x
static var i = true;
static var k = true;

static var waitGameOverSound : boolean = false;

//Da se igra ne pavzira dokler se pospešuje
static var pospesevanje : boolean = false;
var pauseButt : GameObject; //da ba disable-am ko se igra konča - ne moriš pritisnit medtem ko se predvaja gameOver sound

var BGMusicScript : BGMusic;

var tutScript : Tutorial;
var ChallangeManagerScript : ChallangeManager;

var ballControlScript : BallControl;

private var endGameOnce : boolean;	//v update function da se samo 1x izvede EndGame funkcija

//	counts deaths - if its more than x enable respawn with an ad
private var respawnCounter : int;
private var respawnRandNumber : int;
var respawnPopUp : GameObject;

//	Counter in respawn popup
var timerImage : Image;
private var waitTime : float = 5f;
private var respawnWaitBool : boolean = false;
private var timerDeactivate : boolean = false;

var errorImg : Image;

var gameOverAudioClip : AudioClip;

//	If ad failes
private var adFailedBool3 : boolean;

//	Pospešek
private var ballSpeedCounter : int;

// Obsticles destroyed Leaderboard
static var SingleRunObsticlesDestroyed : int = 0;
static var roundPowerUps : int = 0;
static var roundLifeLost : int = 0; 

//stop PowerDown sound
var timerScript : Timer;

//za respawn ker sm spremenu neki bla bla bla
var timeBeforeKill : int;

function Awake ()
{
	timeBeforeKill = 0;
	PlayLevel ();
}

function Start ()
{
	Application.targetFrameRate = 30;
	//

	//prevent screen sleep
	Screen.sleepTimeout = SleepTimeout.NeverSleep;

	respawnWaitBool = false;
	timerDeactivate = false;
	//	
//	Distance = 1540;
 	roundPowerUps = 0;
 	roundLifeLost = 0;
	timerScript = GetComponent ("Timer");

	respawnCounter = PlayerPrefs.GetInt ("CounterRespawn");
	endGameOnce = true;
	pauseButt.SetActive (true);

	//Distance text
	MaxDistance = PlayerPrefs.GetFloat("MaxDist");

	distanceCoin = 0;

	//just to be sure
	timeSpeed = 1f;
	Time.timeScale = 1f;

	//reads from player prefs to be sure
	coinTotal = PlayerPrefs.GetInt("cionInBank");

	//Triple Coin
	tripledCoin = 0;
	tripleCoinOn = false;
	tripleCoinNum = PlayerPrefs.GetInt ("NumTripleCoin");
	if (tripleCoinNum > 0)
	{
		TripleCoinButton.SetActive (true);
	}
	else if (tripleCoinNum <= 0)
	{
		TripleCoinButton.SetActive (false);
	}

	//	Display Tutorial of first play
	if (PlayerPrefs.GetInt ("SwipeFirstPlay") == 0 && BallControl.SwipeAndTouch == 1)
	{
		tutScript.TutorialStart();
		PlayerPrefs.SetInt ("SwipeFirstPlay", 1);
	}
	else if (PlayerPrefs.GetInt ("TouchFirstPlay") == 0 && BallControl.SwipeAndTouch == 0)
	{
		tutScript.TutorialStart();
		PlayerPrefs.SetInt ("TouchFirstPlay", 1);
	}
	else if (Tutorial.showConsumableTutorial)
	{
		tutScript.ConsumTutorial();
	}
	else
	{
		Destroy (GameObject.Find ("Tutorial"));
	}

	adFailedBool3 = false;

	ballSpeedCounter = 10;
}

function Update ()
{
//	Debug.Log (roundPowerUps);
	if (ballSpeedCounter < (Distance / 100) && Distance <= 5000 && Time.timeScale < 2)
	{
		timeSpeed += 0.03;
		Time.timeScale += 0.03;
		ballSpeedCounter ++;
	}

	//	Distance text
	distanceText.text = "Distance: " + Distance.ToString("F0") + " m";
	coinColectedText.text = coinColected.ToString("F0");

	if (Moving.startMoving == true)
	{
		Distance += Moving.MovingSpeed * Time.deltaTime / 2;
	}

	//čekiranje višine žoge & kill on fall + kill if health = 0
	if ((ballVisina.transform.position.y <= -3 || Health.currLife <= 0) && endGameOnce)
	{
		endGameOnce = false;
		EndLevel ();
	}

	//	čekira če je bil poglean oglas
	if (AdJavaInterface.adIndentifier == 3)
	{
		AdJavaInterface.adIndentifier = 0;
		Respawn();
	}

	if(AdJavaInterface.adFailed == 3)
	{
		AdJavaInterface.adFailed = 0;
		adFailedBool3 = true;
	}
}

static function PlayLevel ()
{
	Moving.startMoving = false;

//	SceneManagement.SceneManager.LoadScene ("GameScene");

	Distance = 0;

	coinColected = 0;

	OgrajaHit.fenceShieldHitCounter = 0;
	OgrajaHit.triggerOnce = false;

	DailyChallangeProgress.challProg1 = 0;
	DailyChallangeProgress.challProg2 = 0;
	DailyChallangeProgress.challProg3 = 0;

	Timer.coinTime = 0;
	Timer.shieldTime = 0;
	Timer.jumpTime = 0;
	Timer.magnetTime = 0;
	Timer.slowTime = 0;
	Time.timeScale = 1;
	timeSpeed = 1;

	SingleRunObsticlesDestroyed = 0;

	tripleCoinOn = false;

	i= true;
	k= true;

	OgrajaHit.triggerOnce = false;

	EndGameScript.MaxDistCheck = MaxDistance;

	Health.currLife = Health.maxLife;
}

public function EndLevel ()
{
	timeBeforeKill = Time.timeScale;
	ballControlScript.SpawnBallPieces();	//Spawna koščke & Ball.SetActive = false 
	Moving.startMoving = false;
	pauseButt.SetActive (false);
	timerScript.PowerDownSoundStop();
	BGMusicScript.FadeOut();
	for (var q = 0; q == 0; q++)
	{
		yield WaitForSeconds (0.6 * timeSpeed);
	}
	GetComponent.<AudioSource>().clip = gameOverAudioClip;
	GetComponent.<AudioSource>().Play();
	waitGameOverSound = true;
	while (waitGameOverSound)
	{
		yield WaitForSeconds (2.3 * timeSpeed);
		waitGameOverSound = false;
	}
	KickStart.kickStart = false;
	Timer.coinTime = 0;
	Timer.shieldTime = 0;
	Timer.jumpTime = 0;
	Timer.magnetTime = 0;
	Timer.slowTime = 0;

//	respawnRandNumber = 0;	// for testng
	//	Generiranje in shranjevenje št. rund potrebnih za pojav respawn okna
	if (respawnCounter <= 1)
	{
		respawnRandNumber = Random.Range (3, 7);
		PlayerPrefs.SetInt("RandRespCount", respawnRandNumber);
	}
	//	če že generirana nova vrednost jo samo prebere in NE GENERIRA na novo
	else
	{
		respawnRandNumber = PlayerPrefs.GetInt("RandRespCount");
	}

	//	Pojav respawn okna ko je doseženo določeno število določeno zgoraj
	if (respawnCounter >= respawnRandNumber)
	{
		respawnCounter = 0;
		ShowRespawnPopUp();
	}
	else
	{
		FinishEndLevel();
	}	
}

function FinishEndLevel()
{
	respawnCounter ++;
	PlayerPrefs.SetInt ("CounterRespawn", respawnCounter);
	PlayerPrefs.Save();
	//vrzi ven ko se ti bo dalo
	PreviousDistance = Distance;
	if (Distance > MaxDistance)
	{
		MaxDistance = Distance;
		PlayerPrefs.SetFloat("MaxDist", MaxDistance);
		PlayerPrefs.Save();
	}
	//rabim za variabilnost prvih treh ovir
	PlayerPrefs.SetInt ("endedGames", PlayerPrefs.GetInt ("endedGames") + 1);
//	Leaderboards
	if (coinColected > PlayerPrefs.GetInt ("MaxCoinsOneRun"))
	{
		PlayerPrefs.SetInt ("MaxCoinsOneRun", coinColected);
	}
	PlayerPrefs.SetInt ("NoOfGames", PlayerPrefs.GetInt ("NoOfGames") + 1);
	PlayerPrefs.SetInt ("TotalObsticles", PlayerPrefs.GetInt ("TotalObsticles") + SingleRunObsticlesDestroyed);
	if (SingleRunObsticlesDestroyed > PlayerPrefs.GetInt ("MaxObsicles"))
	{
		PlayerPrefs.SetInt ("MaxObsicles", SingleRunObsticlesDestroyed);
	}
	SingleRunObsticlesDestroyed = 0;
	if (PlayerPrefs.GetInt ("MaxPowerUps") < roundPowerUps)
	{
		PlayerPrefs.SetInt ("MaxPowerUps", roundPowerUps);
	}
	PlayerPrefs.SetInt ("TotalPowerUps", (PlayerPrefs.GetInt ("TotalPowerUps") + roundPowerUps));
	PlayerPrefs.SetInt ("TotalLifeLost", (PlayerPrefs.GetInt ("TotalLifeLost") + roundLifeLost));
	PlayerPrefs.Save();
//
	Time.timeScale = 1;
	timeSpeed = 1;
	i= true;
	k= true;
	ChallangeManagerScript.EndGameChalangeSave();
	SceneManagement.SceneManager.LoadScene ("EndScene");
}

function TripleCoin ()
{
	//	Triple coin function
	if (DailyChallangeSet.challBools[2] || DailyChallangeSet.challBools[21])
	{
		if (PlayerPrefs.GetInt("ChallangeOne") == 2 || PlayerPrefs.GetInt("ChallangeOne") == 21)
		{
			PlayerPrefs.SetInt("ChallangeOneProgress", (1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
		}
		if (PlayerPrefs.GetInt("ChallangeTwo") == 2 || PlayerPrefs.GetInt("ChallangeTwo") == 21)
		{
			PlayerPrefs.SetInt("ChallangeTwoProgress", (1 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
		}
		if (PlayerPrefs.GetInt("ChallangeThree") == 2 || PlayerPrefs.GetInt("ChallangeThree") == 21)
		{
			PlayerPrefs.SetInt("ChallangeThreeProgress", (1 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
		}
	}

	//	rest of the function
	tripleCoinOn = true;
	tripleCoinNum --;
	PlayerPrefs.SetInt ("TotalConsumables", (PlayerPrefs.GetInt ("TotalConsumables") + 1));
	PlayerPrefs.SetInt ("NumTripleCoin", tripleCoinNum);
	PlayerPrefs.Save();

}

function ShowRespawnPopUp ()
{
	respawnPopUp.SetActive(true);
	respawnWaitBool = true;
	while (respawnWaitBool && !timerDeactivate)
	{
		timerImage.fillAmount -= 1f / waitTime * Time.deltaTime;
		if (timerImage.fillAmount <= 0)
		{
			respawnWaitBool = false;
		}
		yield;
	}
	if (!timerDeactivate || adFailedBool3)
	{
		CloseRespawnPopUp();
	}
}

function CloseRespawnPopUp ()
{
	respawnPopUp.SetActive(false);
	FinishEndLevel();
}

function Respawn()
{
	for (var q : int = 0; q == 0; q++)
	{
		yield WaitForSeconds (0.2);
	}
	SideHit.respawning = true;
	respawnPopUp.SetActive(false);
	Health.currLife = Health.maxLife/2;
	BGMusicScript.FadeIn();
	StartShieldConsum.respawnProtector = true;
	StartShieldConsum.protectorColor = 1;
	StartShieldConsum.shieldHitCounter = 0;
	StartShieldConsum.maxShieldHit = 1;
	StartShieldConsum.shieldOn = true;
	Timer.BallShield.SetActive (true);
	OgrajaHit.triggerOnce = false;
	endGameOnce = true;
	pauseButt.SetActive (true);
	ballControlScript.BallRespawn();
	var readyGoScript : ReadySetGo;
	readyGoScript = GameObject.Find("ReadySetGoo").GetComponent ("ReadySetGo");
	readyGoScript.PauseResumeTimeout ();
	while (!Moving.startMoving)
	{
		yield WaitForSeconds (0.5);
	}	
	SideHit.respawning = false;
	StartShieldConsum.respawnProtector = false;
	RespawnProtectorOff();
}

function RespawnProtectorOff()
{
	for (var t : int = 0; t < 1; t++)
	{
		yield WaitForSeconds (3);
	}
	StartShieldConsum.shieldHitCounter = 5;
}

function SetTimerDeactivate()
{
	timerDeactivate = true;
	WaitForError();
}

function WaitForError ()
{
	for(var m : int = 0; m < 1; m++)
	{
		yield WaitForSeconds (0.8);
	}
	while (errorImg.color.a > 0)
	{
		yield;
	}
	CloseRespawnPopUp();
}