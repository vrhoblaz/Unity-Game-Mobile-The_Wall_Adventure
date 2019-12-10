#pragma strict

var touchImage : Image;
var swipeImage : Image;

static var musicVolume : float;
static var soundVolume : float;

static var SoundVol : float;
static var MusicVol : float;

var sliderMusicVolume : Slider;
var sliderSoundVolume : Slider;

var textMusicVolume : Text;
var textSoundVolume : Text;

var fogOnImg : Image;
var fogOffImg: Image;

var snowOnImg : Image;
var snowOffImg: Image;

var PopUpWarrning : GameObject;

private var waitBool : boolean;
private var waitAtLeastOnce : boolean;

private var menuMusicScript : MenuMusic;

//	For autoLogin
var loginOnImg : Image;
var loginOffImg : Image;

//	Quality Settings
private var qNames : String[];
var textLow : Text;
var textMed : Text;
var textHigh : Text;
var textVHigh : Text;
var imgLow : Image;
var imgMed : Image;
var imgHigh : Image;
var imgVHigh : Image;
var popUpQualityWarning : GameObject;

function Start () 
{
	waitBool = true;
	waitAtLeastOnce = true;

	PopUpWarrning.SetActive (false);
	//touch/swipe
	if (PlayerPrefs.GetInt ("SwipeTouch") == 0)
	{
		touchImage.color.a = 1f;
		swipeImage.color.a = 0f;
	}

	else if (PlayerPrefs.GetInt ("SwipeTouch") == 1)
	{
		touchImage.color.a = 0f;
		swipeImage.color.a = 1f;
	}
	//seting sliders & texts to correct value
	musicVolume = PlayerPrefs.GetInt ("VolumeMusic");
	soundVolume = PlayerPrefs.GetInt ("VolumeSound");

	sliderMusicVolume.value = musicVolume;
	sliderSoundVolume.value = soundVolume;

	textMusicVolume.text = musicVolume + "%";
	textSoundVolume.text = soundVolume + "%";

	SoundVol = 0.35 * soundVolume / 100;
	AudioListener.volume = SoundVol;
	MusicVol = 0.75 * musicVolume / 100;
	//Fog
	if (PlayerPrefs.GetInt ("FogOffOn") == 0)
	{
		fogOnImg.color.a = 0f;
		fogOffImg.color.a = 1f;
	}

	else if (PlayerPrefs.GetInt ("FogOffOn") == 1)
	{
		fogOnImg.color.a = 1f;
		fogOffImg.color.a = 0f;
	}
	//Snow
	if (PlayerPrefs.GetInt ("SnowOffOn") == 0)
	{
		snowOnImg.color.a = 0f;
		snowOffImg.color.a = 1f;
	}

	else if (PlayerPrefs.GetInt ("SnowOffOn") == 1)
	{
		snowOnImg.color.a = 1f;
		snowOffImg.color.a = 0f;
	}
	//avto login
	if (PlayerPrefs.GetInt("GoogleLogin") == 0)
	{
		loginOnImg.color.a = 1f;
		loginOffImg.color.a = 0f;
	}
	else if (PlayerPrefs.GetInt("GoogleLogin") == 1)
	{
		loginOnImg.color.a = 0f;
		loginOffImg.color.a = 1f;
	}

	//	Quality Names
	//set proper names to buttons
	qNames = QualitySettings.names;
	textLow.text = qNames[0];
	textMed.text = qNames[1];
	textHigh.text = qNames[2];
	textVHigh.text = qNames [3];
	//mark wich is selected
	QualitySettings.SetQualityLevel (PlayerPrefs.GetInt ("qualitySett"), true);
	imgLow.color.a = 0f;
	imgMed.color.a = 0f;
	imgHigh.color.a = 0f;
	imgVHigh.color.a = 0f;

	switch (PlayerPrefs.GetInt ("qualitySett"))
	{
		case 0 :
			imgLow.color.a = 1f;
			break;
		case 1 :
			imgMed.color.a = 1f;
			break;
		case 2 :
			imgHigh.color.a = 1f;
			break;
		case 3 :
			imgVHigh.color.a = 1f;
	}

}

function SwipeControl ()
{
	BallControl.SwipeAndTouch = 1;
	PlayerPrefs.SetInt ("SwipeTouch", 1);
	PlayerPrefs.Save ();
	touchImage.color.a = 0f;
	swipeImage.color.a = 1f;
}

function TouchControl ()
{
	BallControl.SwipeAndTouch = 0;
	PlayerPrefs.SetInt ("SwipeTouch", 0);
	PlayerPrefs.Save ();
	touchImage.color.a = 1f;
	swipeImage.color.a = 0f;
}

function DeletePlayPref ()
{
	if (waitBool)
	{
		SoundWait();
	}
	else
	{
		waitBool = true;

		//I dont want to delete all player prefs!
		var prefA : int = PlayerPrefs.GetInt ("TotDist");
		var prefB : int = PlayerPrefs.GetInt ("TotCoins");
		var prefC : int = PlayerPrefs.GetInt ("NoOfGames");
		var prefD : int = PlayerPrefs.GetInt ("TotalObsticles");
		var prefE : int = PlayerPrefs.GetInt ("TotalPowerUps");
		var prefF : int = PlayerPrefs.GetInt ("TotalConsumables");
		var prefG : int = PlayerPrefs.GetInt ("TotalLifeLost");
		var prefH : int = PlayerPrefs.GetInt ("SetFirstQuality");

		PlayerPrefs.DeleteAll ();
		PlayerPrefs.Save();
		PopUpWarrning.SetActive (false);
		//Setting back the prefs 
		PlayerPrefs.SetInt ("TotDist", prefA);
		PlayerPrefs.SetInt ("TotCoins", prefB);
		PlayerPrefs.SetInt ("NoOfGames", prefC);
		PlayerPrefs.SetInt ("TotalObsticles", prefD);
		PlayerPrefs.SetInt ("TotalPowerUps", prefE);
		PlayerPrefs.SetInt ("TotalConsumables", prefF);
		PlayerPrefs.SetInt ("TotalLifeLost", prefG);
		PlayerPrefs.SetInt ("SetFirstQuality", prefH);

		SceneManagement.SceneManager.LoadScene ("Settings");
	}
}

function AdjustMusicVolume ()
{
	musicVolume = sliderMusicVolume.value;
	textMusicVolume.text = musicVolume + "%";
	PlayerPrefs.SetInt ("VolumeMusic", musicVolume);
	PlayerPrefs.Save();
	MusicVol = 0.75 * musicVolume / 100;
	menuMusicScript = GameObject.FindGameObjectWithTag ("MenuMusic").GetComponent(MenuMusic);
	menuMusicScript.AdjustMainMenuVolume();
}

function AdjustSoundVolume ()
{
	soundVolume = sliderSoundVolume.value;
	textSoundVolume.text = soundVolume + "%";
	PlayerPrefs.SetInt ("VolumeSound", soundVolume);
	PlayerPrefs.Save();
	SoundVol = 0.35 * soundVolume / 100;
	AudioListener.volume = SoundVol;
}

function OpenWarrning ()
{
	PopUpWarrning.SetActive (true);
}

function CloseWarrning ()
{
	PopUpWarrning.SetActive (false);
	popUpQualityWarning.SetActive (false);
}

function SoundWait ()
{
	waitBool = false;
	while (GetComponent.<AudioSource>().isPlaying || waitAtLeastOnce)
	{
		yield WaitForSeconds (0.5);
		waitAtLeastOnce = false;
	}
	DeletePlayPref();
	waitAtLeastOnce = true;
}

function SetAutoLoginOn ()
{
	PlayerPrefs.SetInt("GoogleLogin", 0);
	loginOnImg.color.a = 1f;
	loginOffImg.color.a = 0f;
}

function SetAutoLoginOff ()
{
	PlayerPrefs.SetInt("GoogleLogin", 1);
	loginOnImg.color.a = 0f;
	loginOffImg.color.a = 1f;
}

	//Snow and Fog Effect - Should I leave this chiose???
function SetSnowOn ()
{
	PlayerPrefs.SetInt ("SnowOffOn", 1);
	PlayerPrefs.Save ();
//	snowOnImg.color.a = 1f;
//	snowOffImg.color.a = 0f;
}

function SetSnowOff ()
{
	PlayerPrefs.SetInt ("SnowOffOn", 0);
	PlayerPrefs.Save ();
//	snowOnImg.color.a = 0f;
//	snowOffImg.color.a = 1f;
}

function SetFogOn ()
{
	PlayerPrefs.SetInt ("FogOffOn", 1);
	PlayerPrefs.Save ();
//	fogOnImg.color.a = 1f;
//	fogOffImg.color.a = 0f;
}
//END Snow & fog


function SetFogOff ()
{
	PlayerPrefs.SetInt ("FogOffOn", 0);
	PlayerPrefs.Save ();
//	fogOnImg.color.a = 0f;
//	fogOffImg.color.a = 1f;
}

//	quality Buttons
function QualityLow ()
{
	imgLow.color.a = 1f;
	imgMed.color.a = 0f;
	imgHigh.color.a = 0f;
	imgVHigh.color.a = 0f;
	//open quality warrning
	if (PlayerPrefs.GetInt ("qualitySett") != 0)
	{
		popUpQualityWarning.SetActive (true);
	}
	PlayerPrefs.SetInt ("qualitySett", 0);
	PlayerPrefs.Save();
	QualitySettings.SetQualityLevel (0, true);
	SetSnowOff ();
	SetFogOff ();

}

function QualityMed ()
{
	imgLow.color.a = 0f;
	imgMed.color.a = 1f;
	imgHigh.color.a = 0f;
	imgVHigh.color.a = 0f;
	PlayerPrefs.SetInt ("qualitySett", 1);
	PlayerPrefs.Save();
	QualitySettings.SetQualityLevel (1, true);
	SetSnowOff ();
	SetFogOff ();
}

function QualityHigh ()
{
	imgLow.color.a = 0f;
	imgMed.color.a = 0f;
	imgHigh.color.a = 1f;
	imgVHigh.color.a = 0f;
	PlayerPrefs.SetInt ("qualitySett", 2);
	PlayerPrefs.Save();
	QualitySettings.SetQualityLevel (2, true);
	SetSnowOff ();
	SetFogOn ();
}

function QualityVeryHigh ()
{
	imgLow.color.a = 0f;
	imgMed.color.a = 0f;
	imgHigh.color.a = 0f;
	imgVHigh.color.a = 1f;
	PlayerPrefs.SetInt ("qualitySett", 3);
	PlayerPrefs.Save();
	QualitySettings.SetQualityLevel (3, true);
	SetSnowOn ();
	SetFogOn ();
}

function MuteMusic ()
{
	if (sliderMusicVolume.value == 0)
	{
		sliderMusicVolume.value = 70;
	}
	else
	{
		sliderMusicVolume.value = 0;
	}
	musicVolume = sliderMusicVolume.value;
	textMusicVolume.text = musicVolume + "%";
	PlayerPrefs.SetInt ("VolumeMusic", musicVolume);
	PlayerPrefs.Save();
	MusicVol = 0.75 * musicVolume / 100;
	menuMusicScript = GameObject.FindGameObjectWithTag ("MenuMusic").GetComponent(MenuMusic);
	menuMusicScript.AdjustMainMenuVolume();
}

function MuteSound ()
{
	if (sliderSoundVolume.value == 0)
	{
		sliderSoundVolume.value = 70;
	}
	else
	{
		sliderSoundVolume.value = 0;
	}
	soundVolume = sliderSoundVolume.value;
	textSoundVolume.text = soundVolume + "%";
	PlayerPrefs.SetInt ("VolumeSound", soundVolume);
	PlayerPrefs.Save();
	SoundVol = 0.35 * soundVolume / 100;
	AudioListener.volume = SoundVol;
}