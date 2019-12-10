#pragma strict

var vrteceKolo : RectTransform;	//Spinning loading image

//	for text
var mainLoadingText : Text;
var aditionalText : Text;
private var aditionalTextArray : String[];

//	Set to true when quiting
static var quiting : boolean = false;

function Start () 
{
	if(!quiting)
	{
		Rolling();
		mainLoadingText.text = "Loading...";
		aditionalTextArray = new String[4];
		aditionalTextArray[0] = "Please Wait.";
		aditionalTextArray[1] = "This will take just a second.";
		aditionalTextArray[2] = "Almost there.";
		aditionalTextArray[3] = "Switching Scenes.";
	//	aditionalTextArray[4] = "Don't trust a men in a big van!";
	//	aditionalTextArray[5] = "You are reading this right now.";
	//	aditionalTextArray[6] = "";
		var randTextNum = Random.Range(0, 4);
		aditionalText.text = aditionalTextArray[randTextNum];
	}
	else if (quiting)
	{
		Rolling();
		mainLoadingText.text = "Good Bye!";
		aditionalText.text = "Cya next time :)";
	}
}

function Rolling () 
{
	while (true)
	{
		vrteceKolo.Rotate (new Vector3 (0, 0, -40));
		yield WaitForSeconds (0.1);
	}
}
