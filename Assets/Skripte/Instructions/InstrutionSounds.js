#pragma strict

//PowerUps
var SoundPowerDown : AudioClip;

function PlaySoundPowerUpEnding ()
{
	GetComponent.<AudioSource>().Stop();
	GetComponent.<AudioSource>().clip = SoundPowerDown;
	GetComponent.<AudioSource>().Play();
}