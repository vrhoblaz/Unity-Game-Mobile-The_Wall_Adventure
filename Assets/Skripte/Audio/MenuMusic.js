#pragma strict
import UnityEngine.UI;
import UnityEngine.SceneManagement;

function Awake ()
{
	DontDestroyOnLoad (transform.gameObject);
}

function Start ()
{
	GetComponent.<AudioSource>().ignoreListenerVolume = true;
	GetComponent.<AudioSource>().volume = 1 * Settings.MusicVol;
	GetComponent.<AudioSource>().time = 24.8;
	//GetComponent.<AudioSource>().Play(); //predvaja onAwake
}

public function DestroyMainMenuMusic ()
{
	Destroy (gameObject);
}

public function AdjustMainMenuVolume ()
{
	GetComponent.<AudioSource>().volume = 1 * Settings.MusicVol;
}