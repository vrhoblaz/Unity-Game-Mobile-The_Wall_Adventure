#pragma strict

public var gamePauseNeeded : boolean = false;
public var pauseBtnScript : PauseButton;

function Awake ()
{
	//
	gamePauseNeeded = false;
	//
}

function OnApplicationFocus (hasFocus : boolean)
{
	if (!hasFocus && pauseBtnScript.notPaused && Moving.startMoving)
	{
		pauseBtnScript.StopGame();
		pauseBtnScript.notPaused = false;
	}
}

function OnApplicationPause (pauseStatus : boolean)
{
	if (pauseStatus && pauseBtnScript.notPaused && Moving.startMoving)
	{
		pauseBtnScript.StopGame();
		pauseBtnScript.notPaused = false;
	}
}








