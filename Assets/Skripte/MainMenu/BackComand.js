#pragma strict

private var buttonFuncScript : ButtonFunctions;
private var buttonSoundScript : MenuSounds;
private var currScene : String;

private var deadButon : boolean;

function Start () {
	buttonFuncScript = gameObject.GetComponent ("ButtonFunctions");
	buttonSoundScript = gameObject.GetComponent ("MenuSounds");
	deadButon = false;
	currScene = SceneManagement.SceneManager.GetActiveScene ().name;
}

function Update () {
	if (Input.GetKeyDown (KeyCode.Escape) && !deadButon)
	{
		//da ne moriš takoj večkrat zapored pritisnit back
		deadButon = true;
		ReviveButon ();
		//
		switch (currScene)
		{
			case "Credits" :
				InCredits ();
				break;
			case "DailyChallange" :
				InChallenge ();
				break;
			case "EndScene" :
				InEndScne ();
				break;
			case "GameScene" :
				InGameScene ();
				break;
			case "Instructions" :
				InInstructions ();
				break;
			case "MainMenu" :
				InMainMenu ();
				break;
			case "Settings" :
				InSettings ();
				break;
			case "Store" :
				InStore ();
				break;
		}
	}
}

function ReviveButon ()
{
	for (var i : int = 0; i < 1; i++)
	{
		yield WaitForSeconds (0.2f);
		deadButon = false;
	}
}

function GoHome ()
{
	PlayCloseSound ();
	buttonFuncScript.OpenMainMenu ();
}

function InCredits ()
{
	PlayCloseSound ();
	GoHome ();
}

function InChallenge ()
{
	PlayCloseSound ();
	var warning : GameObject = GameObject.Find ("WarrningRefresh");
	if (warning == null)
	{
		GoHome ();
	}
	else if (warning.activeInHierarchy)
	{
		warning.SetActive (false);
	}
}

function InEndScne ()
{
	var endScript : EndGameScript = gameObject.GetComponent ("EndGameScript");
	endScript.BackButtonInEndScene();
}

function InGameScene ()
{
	var pauseScripta : PauseButton = gameObject.GetComponent ("PauseButton");
	if (GameMaster.Distance == 0 && pauseScripta.notPaused && GameObject.Find ("Tutorial") == null && GameObject.Find ("Ball") != null)
	{
		PlayCloseSound ();
		GoHome ();
	}
	if (Moving.startMoving && pauseScripta.notPaused)
	{
		PlayCloseSound ();
		pauseScripta.PauseGame ();
	}
	var respawnPopup = GameObject.Find ("GameOverRespawnPopUp");
	if (respawnPopup != null && respawnPopup.activeInHierarchy)
	{
		PlayCloseSound ();
		var gmScript : GameMaster = gameObject.GetComponent ("GameMaster");
		gmScript.CloseRespawnPopUp ();
	}
}

function InInstructions ()
{
	PlayCloseSound ();
	var instCanvasScript : InstructionCanvas = gameObject.GetComponent ("InstructionCanvas");
	instCanvasScript.BackButtonInInstructions ();
}

function InMainMenu ()
{
	if (GameObject.Find ("Img_SetQuality") == null && GameObject.Find ("LoadingImage") == null)
	{
		if (GameObject.Find ("Img_UnableToConnect") == null)
		{
			if (GameObject.Find ("Img_SureToQuit") == null)
			{
				PlayCloseSound ();
				buttonFuncScript.OpenQuitPopUp ();
			}
			else
			{
				PlayCloseSound ();
				GameObject.Find ("Img_SureToQuit").SetActive (false);
			}
		}
		else
		{
			PlayCloseSound ();
			GameObject.Find ("Img_UnableToConnect").SetActive (false);
		}
	}
}

function InSettings ()
{
	PlayCloseSound ();
	if (GameObject.Find ("Img_Warrning") == null && GameObject.Find ("Img_LowQualityWarr") == null)
	{
		GoHome ();
	}
	else if (GameObject.Find ("Img_Warrning") != null)
	{
		GameObject.Find ("Img_Warrning").SetActive (false);
	}
	else if (GameObject.Find ("Img_LowQualityWarr") != null)
	{
		GameObject.Find ("Img_LowQualityWarr").SetActive (false);
	}
}

function InStore ()
{
	PlayCloseSound ();
	if (GameObject.Find ("PopUpUpgrade") == null && GameObject.Find ("PopUp2") == null)
	{
		GoHome ();
	}
	else
	{
		var storeScript : Store = gameObject.GetComponent ("Store");
		var greyScript : StoreGreyBG = gameObject.GetComponent ("StoreGreyBG");
		storeScript.ClosePopUp ();
		greyScript.GreyHide ();
	}
}

function PlayCloseSound ()
{
	buttonSoundScript.PlayCloseClickSound ();
}