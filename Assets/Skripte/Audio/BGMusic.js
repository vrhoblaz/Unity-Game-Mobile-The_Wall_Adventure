#pragma strict

var relaxedMusic : AudioClip;
var tanseMusic : AudioClip;

private var volumeSet : float;
private var volChangeFactor : int = 50;
private var changeOnce = true;


function Start () 
{
	volChangeFactor = 50;
	volumeSet = 1 * Settings.MusicVol;
	GetComponent.<AudioSource>().ignoreListenerVolume = true;
	GetComponent.<AudioSource>().clip = relaxedMusic;
	GetComponent.<AudioSource>().loop = true;
	GetComponent.<AudioSource>().volume = volumeSet;
	GetComponent.<AudioSource>().Play();
}

function Update () 
{
	if (GameMaster.Distance > GameMaster.MaxDistance - 50 && GameMaster.MaxDistance > 500 && changeOnce) //1930 && changeOnce)
	{
		ChangeBGMusic();
		changeOnce = false;
	}
	else if (GameMaster.MaxDistance  == 0 && GameMaster.Distance > 1930 && changeOnce)
	{
		ChangeBGMusic();
		changeOnce = false;
	}
}

function ChangeBGMusic ()
{
	while (volumeSet > 0 && Settings.musicVolume != 0)
	{
		volumeSet -= 0.1 * volChangeFactor * Time.deltaTime;
		GetComponent.<AudioSource>().volume = volumeSet;
		yield WaitForSeconds (0.5);
	}
	GetComponent.<AudioSource>().clip = tanseMusic;
	GetComponent.<AudioSource>().loop = true;
	GetComponent.<AudioSource>().Play();
	volumeSet = 0;
	while (volumeSet < (0.35 * Settings.MusicVol) && Settings.musicVolume != 0)
	{
		volumeSet += 0.02 * volChangeFactor * Time.deltaTime;
		GetComponent.<AudioSource>().volume = volumeSet;
		yield WaitForSeconds (0.5);
	}
	GetComponent.<AudioSource>().volume = 0.35 * Settings.MusicVol;;
}

public function FadeOut ()
{
	volumeSet = GetComponent.<AudioSource>().volume;
	while (volumeSet > 0 && Settings.musicVolume != 0)
	{
		volumeSet -= 0.5 * volChangeFactor * Time.deltaTime;
		GetComponent.<AudioSource>().volume = volumeSet;
		yield WaitForSeconds (0.5);
	}
}

public function FadeIn()
{
	volumeSet = 0;
	while (volumeSet <= Settings.MusicVol && Settings.musicVolume != 0)
	{
		volumeSet += 0.25 * volChangeFactor * Time.deltaTime;
		GetComponent.<AudioSource>().volume = volumeSet;
		yield WaitForSeconds (0.5);
	}
	GetComponent.<AudioSource>().volume = Settings.MusicVol;
}

public function MusicVolumeChange ()
{
	GetComponent.<AudioSource>().volume = Settings.MusicVol;
}