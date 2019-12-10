#pragma strict

var hitSound : AudioClip;
var buttonHitSound : AudioClip;
var coinSound : AudioClip;
var awesomeSound : AudioClip;
var coinMultiplier : AudioClip;
var hitSoundSource : GameObject;
var endMusicObject : GameObject;

function Start () 
{
	endMusicObject.GetComponent.<AudioSource>().ignoreListenerVolume = true;
	endMusicObject.GetComponent.<AudioSource>().volume = 1* Settings.MusicVol;	
}

function Update () {
	
}

public function SoundHit ()
{
	//hitSoundSource.GetComponent.<AudioSource>().clip = hitSound;
	//hitSoundSource.GetComponent.<AudioSource>().volume = 1 * Settings.SoundVol;
	hitSoundSource.GetComponent.<AudioSource>().pitch = Random.Range (0.9, 1.1);
	hitSoundSource.GetComponent.<AudioSource>().PlayOneShot (hitSound, 1);
}

public function SoundButtonHit ()
{
	hitSoundSource.GetComponent.<AudioSource>().pitch = Random.Range (0.9, 1.1);
	hitSoundSource.GetComponent.<AudioSource>().PlayOneShot (buttonHitSound, 1);
}

public function CoinPileUpSound ()
{
	GetComponent.<AudioSource>().pitch = 1.2;
	GetComponent.<AudioSource>().clip = coinSound;
	GetComponent.<AudioSource>().Play();
}

public function NewRecordSound ()
{
	GetComponent.<AudioSource>().clip = awesomeSound;
	GetComponent.<AudioSource>().Play();
}

public function CoinMultiplierSound ()
{
	GetComponent.<AudioSource>().clip = coinMultiplier;
	GetComponent.<AudioSource>().Play();
}

//SoundScript.funkcija
