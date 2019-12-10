#pragma strict

var mainImgObject : GameObject;
//lahko bi dal pod en Img ampak sem bil len :P
var okButton : GameObject;
var okButtonShadow : GameObject;

var imgLow : Image;
var imgMed : Image;
var imgHigh : Image;
var imgVeryHigh : Image;

private var qSetting : int;

function Start () {
	if (!PlayerPrefs.HasKey ("SetFirstQuality"))
	{
		PlayerPrefs.SetInt ("SetFirstQuality", 0);
	}
	if (PlayerPrefs.GetInt ("SetFirstQuality") != 0)
	{
		Destroy (mainImgObject);
	}
	else
	{
		okButton.SetActive (false);
		okButtonShadow.SetActive (false);
		SetAllToZero ();
		mainImgObject.SetActive (true);
	}
}

function SetAllToZero () {
	imgLow.color.a = 0f;
	imgMed.color.a = 0f;
	imgHigh.color.a = 0f;
	imgVeryHigh.color.a = 0f;
}

function SetToLow ()
{
	SetAllToZero ();
	imgLow.color.a = 1f;
	qSetting = 0;
	okButton.SetActive (true);
	okButtonShadow.SetActive (true);
}

function SetToMed ()
{
	SetAllToZero ();
	imgMed.color.a = 1f;
	qSetting = 1;
	okButton.SetActive (true);
	okButtonShadow.SetActive (true);
}

function SetToHigh ()
{
	SetAllToZero ();
	imgHigh.color.a = 1f;
	qSetting = 2;
	okButton.SetActive (true);
	okButtonShadow.SetActive (true);
}

function SetToVeryHigh ()
{
	SetAllToZero ();
	imgVeryHigh.color.a = 1f;
	qSetting = 3;
	okButton.SetActive (true);
	okButtonShadow.SetActive (true);
}

function SaveAndQuit ()
{
	PlayerPrefs.SetInt ("qualitySett", qSetting);
	QualitySettings.SetQualityLevel (qSetting, true);
	switch (qSetting)
	{
		case 0:
			PlayerPrefs.SetInt ("FogOffOn", 0);
			PlayerPrefs.SetInt ("SnowOffOn", 0);
			break;
		case 1:
			PlayerPrefs.SetInt ("FogOffOn", 0);
			PlayerPrefs.SetInt ("SnowOffOn", 0);
			break;
		case 2:
			PlayerPrefs.SetInt ("FogOffOn", 1);
			PlayerPrefs.SetInt ("SnowOffOn", 0);
			break;
		case 3:
			PlayerPrefs.SetInt ("FogOffOn", 1);
			PlayerPrefs.SetInt ("SnowOffOn", 1);
			break;
	}
	PlayerPrefs.SetInt ("SetFirstQuality", 1);
	PlayerPrefs.Save ();
	Destroy (mainImgObject);
}