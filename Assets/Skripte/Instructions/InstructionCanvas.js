#pragma strict

var canvasAnimator : Animator;
var instrScript : InstructionsScript;
private var canvasId : int;

function Start()
{
	canvasId = 0;
}

function GoToControls()
{
	if (canvasId == 0)
	{
		canvasId = 1;
		canvasAnimator.SetTrigger ("ToControls");
	}
}

function GoFromControls()
{
	if (canvasId == 1)
	{
		instrScript.CloseTouchSwipeInstructions ();
		canvasId = 0;
		canvasAnimator.SetTrigger ("FromControls");
	}
}

function GoToLife()
{
if (canvasId == 0)
	{
		canvasId = 2;
		instrScript.healthSlideCounter = 0;
		instrScript.HealthSlideControl ();
		canvasAnimator.SetTrigger ("ToLife");
		HealthImgRotate.stopRotate = false;
	}
}

function GoFromLife()
{
	if (canvasId == 2)
	{
		canvasId = 0;
		canvasAnimator.SetTrigger ("FromLife");
		HealthImgRotate.stopRotate = true;
	}
}

function GoToPowerUps()
{
	if (canvasId == 0)
	{
		canvasId = 3;
		canvasAnimator.SetTrigger ("ToPowerUps");
		instrScript.PowAndConsSlideCounter = 0;
		instrScript.PowAndConsSlideControl ();
	}
}

function GoFromPowerUps()
{
	if (canvasId == 3)
	{
		canvasId = 0;
		canvasAnimator.SetTrigger ("FromPowerUps");
	}
}

function GoToOther ()
{
	if (canvasId == 0)
	{
		canvasId = 4;
		canvasAnimator.SetTrigger ("ToOther");
		instrScript.otherSlideCounter = 0;
		instrScript.OtherSlideControl ();
	}
}

function GoFromOther ()
{
	if (canvasId == 4)
	{
		canvasId = 0;
		canvasAnimator.SetTrigger ("FromOther");
	}
}

function BackButtonInInstructions ()
{
	switch (canvasId)
	{
		case 0:
			var buttScript : ButtonFunctions = gameObject.GetComponent ("ButtonFunctions");
			buttScript.OpenMainMenu ();
			break;
		case 1:
			if (GameObject.Find ("Img_TouchBG") == null && GameObject.Find ("Img_SwipeBG") == null)
			{
				GoFromControls ();
			}
			else
			{
				instrScript.CloseTouchSwipeInstructions ();
			}
			break;
		case 2:
			GoFromLife ();
			break;
		case 3:
			GoFromPowerUps ();
			break;
		case 4:
			GoFromOther ();
			break;
	}
}