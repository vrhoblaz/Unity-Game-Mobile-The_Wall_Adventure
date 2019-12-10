#pragma strict

static var KillOnHitSoundPlay : boolean = false;

function Awake ()
{
	KillOnHitSoundPlay = false;
}

function Update () 
{
	if (KillOnHitSoundPlay)
	{
		GetComponent.<AudioSource>().Stop();
		GetComponent.<AudioSource>().pitch = Random.Range (0.85, 1.15);
		GetComponent.<AudioSource>().Play();
		KillOnHitSoundPlay = false;
	}
}
