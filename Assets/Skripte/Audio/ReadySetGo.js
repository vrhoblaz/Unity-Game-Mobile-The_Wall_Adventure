#pragma strict

var readySound : AudioClip;
var setSound : AudioClip;
var goSound : AudioClip;

var ButtFunctScript : ButtonFunctions;

var readySetGoObject : GameObject;
var readySetGoImage : Image;
var readySprite : Sprite;
var setSprite : Sprite;
var goSprite : Sprite;
private var sizing : boolean;
private var sizingFactor : int = 400;

var tutorialScrip : Tutorial;
var numConsText : ConumNumDisplay;

var pauseTimeoutStarted : boolean;
var pauseBtnScript : PauseButton;

function Awake ()
{
	pauseBtnScript = GameObject.Find ("GameMaster").GetComponent ("PauseButton");
	sizingFactor = 400;
	pauseTimeoutStarted = false;
}

function StartTheGame ()
{
	if (tutorialScrip.showConsumableTutorial)
	{
		tutorialScrip.NextButton();
	}
	else
	{
	ButtFunctScript.HideAllButtonsOnStart();
	if (GameObject.Find ("Tutorial") != null)
	{
		tutorialScrip.StartButtonPressed();
	}
		ReadySetGooo();
		numConsText.DeleteTextOnPlay ();
	}
}

function ReadySetGooo ()
{
	sizing = true;
	readySetGoImage.rectTransform.sizeDelta = new Vector2 (0, 0);
	readySetGoImage.sprite = readySprite;
	readySetGoObject.SetActive (true);
	ImageSizeChange();
	GetComponent.<AudioSource>().clip = readySound;
	GetComponent.<AudioSource>().Play();
	while (GetComponent.<AudioSource>().isPlaying)
	{
		yield;
	}
	sizing = false;
	sizing = true;
	readySetGoImage.rectTransform.sizeDelta = new Vector2 (0, 0);
	readySetGoImage.sprite = setSprite;
	ImageSizeChange();
	GetComponent.<AudioSource>().clip = setSound;
	GetComponent.<AudioSource>().Play();
	while (GetComponent.<AudioSource>().isPlaying)
	{
		yield;
	}
	sizing = false;
	sizing = true;
	readySetGoImage.rectTransform.sizeDelta = new Vector2 (0, 0);
	readySetGoImage.sprite = goSprite;
	ImageSizeChange();
	GetComponent.<AudioSource>().clip = goSound;
	GetComponent.<AudioSource>().Play();
	Moving.startMoving = true;
	for (var g = 0; g == 0; g++)
	{
		yield WaitForSeconds (0.6);
	}
	while (GetComponent.<AudioSource>().isPlaying)
	{
		yield;
	}
	//samo skrijem ker ga rabim za pavzo in respawn
	readySetGoObject.SetActive(false);
	sizing = false;
	//Destroy (readySetGoObject);
}

function ImageSizeChange ()
{
	var size : int = 0;
	while (sizing && readySetGoImage != null)
	{
		size -= 1 * sizingFactor * Time.deltaTime;
		readySetGoImage.rectTransform.sizeDelta = new Vector2 (size, size);
		yield;
	}
}

var fadeReadyImg : boolean;

function PauseResumeTimeout ()
{
	fadeReadyImg = true;
	pauseTimeoutStarted = true;
	sizing = false;		//tale je tukaj če se prekmalu pritisne pavzo (ko prvi "Goo" še ni izginil)
	readySetGoImage.rectTransform.sizeDelta = new Vector2 (0, 0);
	readySetGoImage.sprite = setSprite;
	readySetGoObject.SetActive (true);
//	ImageSizeChange();
	GetComponent.<AudioSource>().clip = setSound;
	GetComponent.<AudioSource>().Play();
	FadeSetGo ();
	while (GetComponent.<AudioSource>().isPlaying && !pauseBtnScript.wasPaused)
	{
		yield;
	}
	readySetGoImage.sprite = goSprite;
	fadeReadyImg = false;
	GetComponent.<AudioSource>().clip = goSound;
	GetComponent.<AudioSource>().Play();
	FadeSetGo ();
	for (var g = 0; g == 0; g++)
	{
		yield WaitForSecondsRealtime (0.6f);
	}
	readySetGoObject.SetActive (false);
	fadeReadyImg = false;
	pauseTimeoutStarted = false;
	pauseBtnScript.GoAfterPause ();
}

function FadeSetGo ()
{
	readySetGoImage.color.a = 1f;
	var fadeSpeed : float = 0.03f;
	while (fadeReadyImg)
	{
		readySetGoImage.color.a -= fadeSpeed;
		yield;
	}
	fadeReadyImg = true;
	readySetGoImage.color.a = 1f;
}