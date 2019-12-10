#pragma strict

private var Transperancy : float;
private var t : float;
private var fadeSpeed = 40;
var damageImage : Image;
var damageGameObject : GameObject;
static var damageTake : boolean;

var damageBlueImage : Image;
var damageBlueGameObject : GameObject;
static var damageTakeBlue : boolean;

var damageBlueRedImage : Image;
var damageBlueRedGameObject : GameObject;
static var damageTakeBlueRed : boolean;

function Start ()
{
	//da nebi bilo slučajno prižgano ko se igra začne
	damageGameObject.SetActive (false);
	damageTake = false;
	damageBlueGameObject.SetActive (false);
	damageTakeBlue = false;
	damageBlueRedGameObject.SetActive (false);
	damageTakeBlueRed = false;

}

function Update ()
{
	if (damageTake)
	{
		Apear();
		damageTake = false;
	}
	if (damageTakeBlue)
	{
		ApearBlue();
		damageTakeBlue = false;
	}
	if (damageTakeBlueRed)
	{
		ApearBlueRed();
		damageTakeBlueRed = false;
	}
}

function Apear ()
{
	//Damage red image
	Transperancy = 1f;
	t = 0.3f;
	damageImage.color.a = 1f;
	damageBlueRedGameObject.SetActive (false);
	damageBlueGameObject.SetActive (false);
	damageGameObject.SetActive (true);
	ImageFade ();
}

function ApearBlue ()
{
	//Damage blue image
	Transperancy = 1f;
	t = 0.3f;
	damageBlueImage.color.a = 1f;
	damageGameObject.SetActive (false);
	damageBlueRedGameObject.SetActive (false);
	damageBlueGameObject.SetActive (true);
	ImageFade ();
}

function ApearBlueRed ()
{
	//Damage blue image
	Transperancy = 1f;
	t = 0.3f;
	damageBlueRedImage.color.a = 1f;
	damageGameObject.SetActive (false);
	damageBlueGameObject.SetActive (false);
	damageBlueRedGameObject.SetActive (true);
	ImageFade ();
}

function ImageFade ()
{
	//čas ko je Transperancy na 1
	while (t > 0f)
	{
		t -= Time.deltaTime;
		yield;
	}

	//fading
	while (Transperancy >= 0.6 && t <= 0f)
	{
		Transperancy -= 0.05f * Time.deltaTime * fadeSpeed;
		damageImage.color.a = Transperancy;
		damageBlueImage.color.a = Transperancy;
		damageBlueRedImage.color.a = Transperancy;
		yield;
	}
	while (Transperancy > 0 && Transperancy < 0.6 && t <= 0f)
	{
		Transperancy -= 0.02f * Time.deltaTime * fadeSpeed;
		damageImage.color.a = Transperancy;
		damageBlueImage.color.a = Transperancy;
		damageBlueRedImage.color.a = Transperancy;
		yield;
	}
	//close error when finished
	if (Transperancy <= 0)
	{
		t = 0;
		damageGameObject.SetActive (false);
		damageBlueGameObject.SetActive (false);
		damageBlueRedGameObject.SetActive (false);
	}
}

