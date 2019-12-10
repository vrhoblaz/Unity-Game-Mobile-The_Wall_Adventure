#pragma strict

var sprite1 : Sprite;
var sprite2 : Sprite;
var sprite3 : Sprite;
var img : Image;

//  trenutno se ne spomenm boljše rešitve
static var startRotate : boolean = true;
static var stopRotate : boolean = false;	//to stop rotation when exiting HealthCanvas

var krogec1 : Image;
var krogec2 : Image;
var krogec3 : Image;
private var brightCol : Color;
private var darkCol : Color;

function Start ()
{
	brightCol = Color (1, 1, 1, 1);
	darkCol = Color (0.6, 0.6, 0.6, 0.6);
}

function Update () {
	if (startRotate)
	{
		startRotate = false;
		stopRotate = false;
		Rotate ();
	}
}

function Rotate () {
	var spriteNum : int = 0;
	while (!stopRotate)
	{
		if (spriteNum == 0)
		{
			krogec1.color = brightCol;
			krogec2.color = darkCol;
			krogec3.color = darkCol;
			img.sprite = sprite1;
		}
		else if (spriteNum == 1)
		{
			krogec1.color = darkCol;
			krogec2.color = brightCol;
			krogec3.color = darkCol;
			img.sprite = sprite2;
		}
		else 
		{
			krogec1.color = darkCol;
			krogec2.color = darkCol;
			krogec3.color = brightCol;
			img.sprite = sprite3;
		}
		yield WaitForSeconds (1.5f);
		if (spriteNum < 2)
		{
			spriteNum++;
		}
		else
		{
			spriteNum = 0;
		}
	}
}
