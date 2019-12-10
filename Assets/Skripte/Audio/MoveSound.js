#pragma strict

var moveSound1 : AudioClip;
var moveSound2 : AudioClip;
var moveSound3 : AudioClip;
var moveSound4 : AudioClip;
private var randSound : int;

static var PlayMoveSound : boolean = false;

var BallControlScript : BallControl;

function Awake ()
{
	PlayMoveSound = false;
}

function Update ()
{
	if (PlayMoveSound)
	{
		MoveSoundPlay();
		PlayMoveSound = false;
	}
}
function MoveSoundPlay ()
{
	if (BallControlScript.IsGrounded())
	{
		GetComponent.<AudioSource>().Stop();
		randSound = Random.Range (0,2);
		if (randSound == 0)
		{
			GetComponent.<AudioSource>().clip = moveSound1;
		}
		else
		{
			GetComponent.<AudioSource>().clip = moveSound2;
		}
		GetComponent.<AudioSource>().pitch = Random.Range (0.9, 1.05);
		GetComponent.<AudioSource>().Play();
	}
	if (BallControlScript.IsGrounded()==false)
	{
		GetComponent.<AudioSource>().Stop();
		randSound = Random.Range (0,2);
		if (randSound == 0)
		{
			GetComponent.<AudioSource>().clip = moveSound3;
		}
		else
		{
			GetComponent.<AudioSource>().clip = moveSound4;
		}
		GetComponent.<AudioSource>().pitch = Random.Range (0.9, 1.05);
		GetComponent.<AudioSource>().Play();
	}
}