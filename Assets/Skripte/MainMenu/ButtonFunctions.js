#pragma strict

var buttonStart : GameObject;
var buttonKickStart : GameObject;
var buttonStartShield : GameObject;
var buttonTripleCoins : GameObject;

private var funct : String;
private var waitBool : boolean;
private var waitAtLeastOnce : boolean;

var loadingImg : GameObject;

var quitPopUpImg : GameObject;


function Start ()
{
	waitAtLeastOnce = true;
	waitBool = true;
}

public function OpenMainMenu ()
{
	loadingImg.SetActive(true);
	if (waitBool)
	{
		PlayerPrefs.Save();
		if (SceneManagement.SceneManager.GetActiveScene ().name == "GameScene")
		{
			var ChallangeManagerScr : ChallangeManager = GameObject.Find("GameMaster").GetComponent("ChallangeManager");
			ChallangeManagerScr.EndGameChalangeSave();
		}
		funct = "MainMenu";
		WaitForSound();
	}
	else
	{
		waitBool = true;
//		LoadingScene.loadingLevelNum = 0;
//		SceneManagement.SceneManager.LoadScene ("LoadingScene");
		SceneManagement.SceneManager.LoadScene ("MainMenu");
	}
}

function OpenGameScene ()
{
	loadingImg.SetActive(true);
	if (waitBool)
	{
		funct = "GameScene";
		WaitForSound();
	}
	else
	{
		waitBool = true;
		LoadingScene.loadingLevelNum = 2;
		SceneManagement.SceneManager.LoadScene ("LoadingScene");
//		GameMaster.PlayLevel();
	}
}

function OpenStore ()
{
	loadingImg.SetActive(true);
	if (waitBool)
	{
		funct = "Store";
		WaitForSound();
	}
	else
	{
		waitBool = true;
//		LoadingScene.loadingLevelNum = 3;
//		SceneManagement.SceneManager.LoadScene ("LoadingScene");
		SceneManagement.SceneManager.LoadScene ("Store");
	}
}

function OpenSettings ()
{
	loadingImg.SetActive(true);
	if (waitBool)
	{
		funct = "Settings";
		WaitForSound();
	}
	else
	{
		waitBool = true;
//		LoadingScene.loadingLevelNum = 4;
//		SceneManagement.SceneManager.LoadScene ("LoadingScene");
		SceneManagement.SceneManager.LoadScene ("Settings");
	}
}

function OpenInstructions ()
{
	loadingImg.SetActive(true);
	if (waitBool)
	{
		funct = "Instructions";
		WaitForSound();
	}
	else
	{
		waitBool = true;
		SceneManagement.SceneManager.LoadScene ("Instructions");
	}
}

function OpenDailyChall ()
{
	loadingImg.SetActive(true);
	if (waitBool)
	{
		funct = "DailyChall";
		WaitForSound();
	}
	else
	{
		waitBool = true;
//		LoadingScene.loadingLevelNum = 6;
//		SceneManagement.SceneManager.LoadScene ("LoadingScene");
		SceneManagement.SceneManager.LoadScene ("DailyChallange");
	}
}

function OpenCredits ()
{
	loadingImg.SetActive(true);
	if (waitBool)
	{
		funct = "CreditsScene";
		WaitForSound();
	}
	else
	{
		waitBool = true;
//		LoadingScene.loadingLevelNum = 7;
//		SceneManagement.SceneManager.LoadScene ("LoadingScene");
		SceneManagement.SceneManager.LoadScene ("Credits");
	}
}

function QuitApp ()
{
	loadingImg.SetActive(true);
	LoadingImage.quiting = true;
	if (waitBool)
	{
		funct = "Quit";
		WaitForSound();
	}
	else
	{
		waitBool = true;
		Application.Quit();
	}
}

public function HideAllButtonsOnStart ()
{
	buttonStart.SetActive(false);
	buttonKickStart.SetActive(false);
	buttonStartShield.SetActive(false);
	buttonTripleCoins.SetActive(false);
}

function WaitForSound ()
{
	waitBool = false;
	if (Time.timeScale != 0)
	{
		while (GetComponent.<AudioSource>().isPlaying || waitAtLeastOnce)
		{
		yield WaitForSeconds (0.7);
		waitAtLeastOnce = false;
		}
	}
	switch (funct)
	{
		case "MainMenu" : OpenMainMenu(); break;
		case "GameScene" : OpenGameScene(); break;
		case "Store" : OpenStore(); break;
		case "Settings" : OpenSettings(); break;
		case "Instructions" : OpenInstructions(); break;
		case "Quit" : QuitApp(); break;
		case "DailyChall" : OpenDailyChall(); break;
		case "CreditsScene" : OpenCredits(); break;
	}
	waitAtLeastOnce = true;
}

//	Opens Are you sure PopUp
function OpenQuitPopUp ()
{
	quitPopUpImg.SetActive(true);
}

//	Closes Are you sure PopUp
function CloseQuitPopUp ()
{
	quitPopUpImg.SetActive(false);
}