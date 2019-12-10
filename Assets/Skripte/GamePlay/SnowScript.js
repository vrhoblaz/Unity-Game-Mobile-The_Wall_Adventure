#pragma strict

// Tukaj se zbriše tudi megla - testiral sem pa sem dal sem in je pa ostalo tukaj za zdaj
var fogGO : GameObject;
//snow
var snowLaterPS : GameObject;
//clouds
var Clouds : GameObject;
private var partSys : ParticleSystem;
var justAnotherBool : boolean = true;

function Awake ()
{
	//
	justAnotherBool = true;
	//
	partSys = snowLaterPS.GetComponent.<ParticleSystem> ();
	if (PlayerPrefs.GetInt ("qualitySett") != 3)
	{
		Destroy (Clouds);
	}
	if (PlayerPrefs.GetInt ("FogOffOn") == 0)
	{
		Destroy (fogGO);
	}
	if (PlayerPrefs.GetInt ("SnowOffOn") == 0)
	{
		Destroy (gameObject);
	}
}

function Start ()
{
	snowLaterPS.transform.position.z = 10;
	// zVel je uveden zaradi nekega error-a (BCW0006: WARNING: Assignment to temporary.)
	var zVel = partSys.velocityOverLifetime;
	zVel.zMultiplier = 0;
}

function Update () {
	if (Moving.startMoving && justAnotherBool)
	{
		snowLaterPS.transform.position.z = 40;
		// zVel je uveden zaradi nekega error-a (BCW0006: WARNING: Assignment to temporary.)
		var zVel = partSys.velocityOverLifetime;
		zVel.zMultiplier = -10;
		justAnotherBool = false;
		var cloudCntrScript : CloudControl;
		cloudCntrScript = GameObject.Find ("Clouds").GetComponent ("CloudControl");
		cloudCntrScript.ChangeCloudSpeed ();
	}
}
