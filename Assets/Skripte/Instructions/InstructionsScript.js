#pragma strict

//	Ball control Menu
var touchImgGO : GameObject;
var swipeImgGO : GameObject;

//	Health
public var healthSlideCounter : int = 0;
var img0GO : GameObject;
var img1GO : GameObject;
var img2GO : GameObject;
var img3GO : GameObject;
var img4GO : GameObject;
var img5GO : GameObject;
var img6GO : GameObject;
var img7GO : GameObject;
var img8GO : GameObject;
var img9GO : GameObject;
var img10GO : GameObject;
var canvasScript : InstructionCanvas;

//	PowerUps
var powerUpsAndConsImgGO : GameObject [];
public var PowAndConsSlideCounter : int = 0;
var blinkingMagnetSctipt : Instr_MagBlink;

//	Other
var otherImgGO : GameObject [];
public var otherSlideCounter : int = 0;

function Awake ()
{
	//
	healthSlideCounter = 0;
	PowAndConsSlideCounter = 0;
	otherSlideCounter = 0;
	//
}

//	BALL CONTROL
function ShowTouchInstructions ()
{
	touchImgGO.SetActive (true);
}

function ShowSwipeInstructions ()
{
	swipeImgGO.SetActive (true);
}

function CloseTouchSwipeInstructions()
{
	swipeImgGO.SetActive (false);
	touchImgGO.SetActive (false);
}
//	END BALL CONTROL


//	HEALTH MENU
function HealthSlideControl ()
{
	if (healthSlideCounter < 0)
	{
		healthSlideCounter = 0;
		SetAllImgToInactive ();
		canvasScript.GoFromLife ();
	}

	switch (healthSlideCounter)
	{
		case 0:
			SetAllImgToInactive ();
			img0GO.SetActive (true);
			break;
		case 1:
			SetAllImgToInactive ();
			img1GO.SetActive (true);
			break;
		case 2:
			SetAllImgToInactive ();
			img2GO.SetActive (true);
			break;
		case 3:
			SetAllImgToInactive ();
			img3GO.SetActive (true);
			break;
		case 4:
			SetAllImgToInactive ();
			img4GO.SetActive (true);
			break;
		case 5:
			SetAllImgToInactive ();
			img5GO.SetActive (true);
			break;
		case 6:
			SetAllImgToInactive ();
			img6GO.SetActive (true);
			break;
		case 7:
			SetAllImgToInactive ();
			img7GO.SetActive (true);
			break;
		case 8:
			SetAllImgToInactive ();
			img8GO.SetActive (true);
			break;
		case 9:
			SetAllImgToInactive ();
			img9GO.SetActive (true);
			break;
		case 10:
			SetAllImgToInactive ();
			img10GO.SetActive (true);
			break;
		case 11:
			canvasScript.GoFromLife ();
			break;
	}
}

function SetAllImgToInactive ()
{
	img0GO.SetActive (false);
	img1GO.SetActive (false);
	img2GO.SetActive (false);
	img3GO.SetActive (false);
	img4GO.SetActive (false);
	img5GO.SetActive (false);
	img6GO.SetActive (false);
	img7GO.SetActive (false);
	img8GO.SetActive (false);
	img9GO.SetActive (false);
	img10GO.SetActive (false);
}

function HealthNextSlide ()
{
	healthSlideCounter++;
	HealthSlideControl ();
	HealthImgRotate.startRotate = true;
}

function HealthPrevSlide ()
{
	healthSlideCounter--;
	HealthSlideControl ();
	HealthImgRotate.startRotate = true;
}

//	END HEALTH MENU

//	POWER UPS & CONSUM
function hideAllPowerImgs ()
{
	for (var slikaGO : GameObject in powerUpsAndConsImgGO)
	{
		slikaGO.SetActive(false);
	}
}

function PowAndConsSlideControl ()
{
	var justBool : boolean;
	justBool = false;
	if (PowAndConsSlideCounter < 0)
	{
		PowAndConsSlideCounter = 0;
		hideAllPowerImgs ();
		canvasScript.GoFromPowerUps ();
	}
	else if (PowAndConsSlideCounter > powerUpsAndConsImgGO.length-1)
	{
		canvasScript. GoFromPowerUps ();
		justBool = true;
	}
	if (!justBool)
	{
		hideAllPowerImgs ();
		powerUpsAndConsImgGO[PowAndConsSlideCounter].SetActive (true);
	}

}

function PowAndConsNextSlide ()
{
	PowAndConsSlideCounter++;
	PowAndConsSlideControl ();
	if (PowAndConsSlideCounter == 8)
	{
		blinkingMagnetSctipt.StartTheBlink ();
	}
}

function PowAndConsPrevSlide ()
{
	PowAndConsSlideCounter--;
	PowAndConsSlideControl ();
	if (PowAndConsSlideCounter == 8)
	{
		blinkingMagnetSctipt.StartTheBlink ();
	}
}
//	END POWER UPS & CONSUM


//	OTHER
function hideAllOtherImgs ()
{
	for (var slikaGO : GameObject in otherImgGO)
	{
		slikaGO.SetActive(false);
	}
}

function OtherSlideControl ()
{
	var justBool : boolean;
	justBool = false;
	if (otherSlideCounter < 0)
	{
		otherSlideCounter = 0;
		hideAllOtherImgs ();
		canvasScript.GoFromOther ();
	}
	else if (otherSlideCounter > otherImgGO.length-1)
	{
		canvasScript. GoFromOther ();
		justBool = true;
	}
	if (!justBool)
	{
		hideAllOtherImgs ();
		otherImgGO[otherSlideCounter].SetActive (true);
	}

}

function OtherNextSlide ()
{
	otherSlideCounter++;
	OtherSlideControl ();
}

function OtherPrevSlide ()
{
	otherSlideCounter--;
	OtherSlideControl ();
}

//	END OTHER