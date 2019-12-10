#pragma strict

static var loadingLevelNum : int;
var loadingImg : RectTransform;
private var asyncVariable : AsyncOperation;

var bgSourceImage : Image;
var bgImage1 : Sprite;
var bgImage2 : Sprite;
var bgImage3 : Sprite;

var slider : Slider;

function Start () {
	var randBG : int = Random.Range(1,4);
	switch(randBG)
	{
		case 1 : bgSourceImage.sprite = bgImage1; break;
		case 2 : bgSourceImage.sprite = bgImage2; break;
		case 3 : bgSourceImage.sprite = bgImage3; break;
	}
	LoadScene();
	RotateLoadingImg();
}

function RotateLoadingImg () {
	while (true)
	{
		loadingImg.Rotate (new Vector3 (0, 0, -40));
		yield WaitForSeconds (0.1);
	}
}

function LoadScene()
{
	asyncVariable = SceneManager.LoadSceneAsync(loadingLevelNum);
	asyncVariable.allowSceneActivation = false;
}

function Update ()
{
	slider.value = asyncVariable.progress;
	if (asyncVariable.progress == 0.9f)
	{
		slider.value = 1;
		asyncVariable.allowSceneActivation = true;
	}
//	Debug.Log(asyncVariable.progress);
}