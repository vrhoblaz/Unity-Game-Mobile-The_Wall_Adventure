#pragma strict

static var PowerUpPlay : boolean = false;
static var PowerUpDenied : boolean = false;

var powerUpSound : AudioClip;
var powerUpDeniedSound : AudioClip;

function Awake ()
{
	PowerUpPlay = false;
	PowerUpDenied = false;
}

function Update () 
{
	if (PowerUpPlay)
	{
		GetComponent.<AudioSource>().clip = powerUpSound;
		GetComponent.<AudioSource>().pitch = 1.15;
		GetComponent.<AudioSource>().Play();
		PowerUpPlay = false;
	}
	if (PowerUpDenied)
	{
		GetComponent.<AudioSource>().clip = powerUpDeniedSound;
		GetComponent.<AudioSource>().pitch = 1.15;
		GetComponent.<AudioSource>().Play();
		PowerUpDenied = false;
	}
}
