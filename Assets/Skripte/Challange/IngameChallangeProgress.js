#pragma strict

private var challengeGoal1 : int;
private var challengeGoal2 : int;
private var challengeGoal3 : int;

private var currChallState1 : int;
private var currChallState2 : int;
private var currChallState3 : int;
private var startChallState1 : int;
private var startChallState2 : int;
private var startChallState3 : int;
//0 - distance; 1- coins[chall17]; 2 - everything else;
private var boolChall1 : int;
private var boolChall2 : int;
private var boolChall3 : int;

private var msgPrinted1 : boolean;
private var msgPrinted2 : boolean;
private var msgPrinted3 : boolean;

private var waitForMsg1 : boolean;
private var waitForMsg2 : boolean;
private var waitForMsg3 : boolean;

var goImgCompleted : GameObject;
var txtCompleted : Text;

var fadeSpeed : float;

function Start ()
{
	fadeSpeed = 0.5f;
	//set the goal to check if reached
	challengeGoal1 = DailyChallangeProgress.progressCheckArray[PlayerPrefs.GetInt("ChallangeOne")];
	challengeGoal2 = DailyChallangeProgress.progressCheckArray[PlayerPrefs.GetInt("ChallangeTwo")];
	challengeGoal3 = DailyChallangeProgress.progressCheckArray[PlayerPrefs.GetInt("ChallangeThree")];
	//set start value from before
	startChallState1 = PlayerPrefs.GetInt("ChallangeOneProgress");
	startChallState2 = PlayerPrefs.GetInt("ChallangeTwoProgress");
	startChallState3 = PlayerPrefs.GetInt("ChallangeThreeProgress");
	//set the bools=true if any challange include distance; else false
	if (PlayerPrefs.GetInt("ChallangeOne") == 3 || PlayerPrefs.GetInt("ChallangeOne") == 22 || PlayerPrefs.GetInt("ChallangeOne") == 23)
	{
		boolChall1 = 0;
	} else if (PlayerPrefs.GetInt("ChallangeOne") == 17) {
		boolChall1 = 1;
	} else if (PlayerPrefs.GetInt("ChallangeOne") == 4 || PlayerPrefs.GetInt("ChallangeOne") == 5 || PlayerPrefs.GetInt("ChallangeOne") == 6 || PlayerPrefs.GetInt("ChallangeOne") == 13 || PlayerPrefs.GetInt("ChallangeOne") == 16 || PlayerPrefs.GetInt("ChallangeOne") == 18) {
		boolChall1 = 2;
	} else {
		boolChall1 = 3;
	}
	if (PlayerPrefs.GetInt("ChallangeTwo") == 3 || PlayerPrefs.GetInt("ChallangeTwo") == 22 || PlayerPrefs.GetInt("ChallangeTwo") == 23)
	{
		boolChall2 = 0;
	} else if (PlayerPrefs.GetInt("ChallangeTwo") == 17) {
		boolChall2 = 1;
	} else if (PlayerPrefs.GetInt("ChallangeTwo") == 4 || PlayerPrefs.GetInt("ChallangeTwo") == 5 || PlayerPrefs.GetInt("ChallangeTwo") == 6 || PlayerPrefs.GetInt("ChallangeTwo") == 13 || PlayerPrefs.GetInt("ChallangeTwo") == 16 || PlayerPrefs.GetInt("ChallangeTwo") == 18) {
		boolChall2 = 2;
	} else {
		boolChall2 = 3;
	}
	if (PlayerPrefs.GetInt("ChallangeThree") == 3 || PlayerPrefs.GetInt("ChallangeThree") == 22 || PlayerPrefs.GetInt("ChallangeThree") == 23)
	{
		boolChall3 = 0;
	} else if (PlayerPrefs.GetInt("ChallangeThree") == 17) {
		boolChall3 = 1;
	} else if (PlayerPrefs.GetInt("ChallangeThree") == 4 || PlayerPrefs.GetInt("ChallangeThree") == 5 || PlayerPrefs.GetInt("ChallangeThree") == 6 || PlayerPrefs.GetInt("ChallangeThree") == 13 || PlayerPrefs.GetInt("ChallangeThree") == 16 || PlayerPrefs.GetInt("ChallangeThree") == 18) {
		boolChall3 = 2;
	} else {
		boolChall3 = 3;
	}
	//setting the bools; Da se message ne pojavlja vsakič ko igro začneš
	if (PlayerPrefs.GetInt ("challMsg1") == 0) {
		msgPrinted1 = false;
	} else if (PlayerPrefs.GetInt ("challMsg1") == 1) {
		msgPrinted1 = true;
	}
	if (PlayerPrefs.GetInt ("challMsg2") == 0) {
		msgPrinted2 = false;
	} else if (PlayerPrefs.GetInt ("challMsg2") == 1) {
		msgPrinted2 = true;
	}
	if (PlayerPrefs.GetInt ("challMsg3") == 0) {
		msgPrinted3 = false;
	} else if (PlayerPrefs.GetInt ("challMsg3") == 1) {
		msgPrinted3 = true;
	}
	//set to false (noben ni aktiven takoj od začetka)
	waitForMsg1 = false;
	waitForMsg2 = false;
	waitForMsg3 = false;
}

function Update ()
{
	//Setting current value of the challenge (every frame, could reduce to once every few seconds!)
	switch (boolChall1) {
		case 0:	currChallState1 = startChallState1 + GameMaster.Distance;	break;
		case 1:	currChallState1 = GameMaster.coinColected;	break;
		case 2:	currChallState1 = startChallState1 + DailyChallangeProgress.challProg1;	break;
		case 3: currChallState1 = PlayerPrefs.GetInt("ChallangeOneProgress");	break;
	}
	switch (boolChall2) {
		case 0:	currChallState2 = startChallState2 + GameMaster.Distance;	break;
		case 1:	currChallState2 = GameMaster.coinColected;	break;
		case 2:	currChallState2 = startChallState2 + DailyChallangeProgress.challProg2;	break;
		case 3: currChallState2 = PlayerPrefs.GetInt("ChallangeTwoProgress");	break;
	}
	switch (boolChall3) {
		case 0:	currChallState3 = startChallState3 + GameMaster.Distance;	break;
		case 1:	currChallState3 = GameMaster.coinColected;	break;
		case 2:	currChallState3 = startChallState3 + DailyChallangeProgress.challProg3;	break;
		case 3: currChallState3 = PlayerPrefs.GetInt("ChallangeThreeProgress");	break;
	}
	//se zgodi nekaj če presežemo "goal"; Ampak samo enkrat!
	if (currChallState1 >= challengeGoal1 && !msgPrinted1) {
		msgPrinted1 = true;
		PlayerPrefs.SetInt ("challMsg1", 1);
		PrintMsg1 ();
	}
	if (currChallState2 >= challengeGoal2 && !msgPrinted2) {
		msgPrinted2 = true;
		PlayerPrefs.SetInt ("challMsg2", 1);
		PrintMsg2 ();
	}
	if (currChallState3 >= challengeGoal3 && !msgPrinted3) {
		msgPrinted3 = true;
		PlayerPrefs.SetInt ("challMsg3", 1);
		PrintMsg3 ();
	}
}


function PrintMsg1 ()
{
	while (waitForMsg2 || waitForMsg3)
	{
		yield;
	}
	waitForMsg1 = true;
	
	var imgComp = goImgCompleted.GetComponent.<Image> ();
	imgComp.color.a = 0.5f;
	txtCompleted.color.a = 1f;
	txtCompleted.text = "You completed Challenge 1!";
	goImgCompleted.SetActive (true);

	for (var o : int = 0; o < 1; o++)
	{
		yield WaitForSecondsRealtime (3f);
	}

	var transp : float = 0.5f;
	while (transp > 0) {
		imgComp.color.a = transp;
		txtCompleted.color.a = transp * 2;
		transp -= fadeSpeed * Time.deltaTime;
		yield;
	}
	goImgCompleted.SetActive (false);

	waitForMsg1 = false;
}

function PrintMsg2 ()
{
	while (waitForMsg1 || waitForMsg3)
	{
		yield;
	}
	waitForMsg2 = true;

	var imgComp = goImgCompleted.GetComponent.<Image> ();
	imgComp.color.a = 0.5f;
	txtCompleted.color.a = 1f;
	txtCompleted.text = "You completed Challenge 2!";
	goImgCompleted.SetActive (true);

	for (var o : int = 0; o < 1; o++)
	{
		yield WaitForSecondsRealtime (3f);
	}

	var transp : float = 0.5f;
	while (transp > 0) {
		imgComp.color.a = transp;
		txtCompleted.color.a = transp * 2;
		transp -= fadeSpeed * Time.deltaTime;
		yield;
	}
	goImgCompleted.SetActive (false);

	waitForMsg2 = false;
}

function PrintMsg3 ()
{
	while (waitForMsg1 || waitForMsg2)
	{
		yield;
	}
	waitForMsg3 = true;

	var imgComp = goImgCompleted.GetComponent.<Image> ();
	imgComp.color.a = 0.5f;
	txtCompleted.color.a = 1f;
	txtCompleted.text = "You completed Challenge 3!";
	goImgCompleted.SetActive (true);

	for (var o : int = 0; o < 1; o++)
	{
		yield WaitForSecondsRealtime (3f);
	}

	var transp : float = 0.5f;
	while (transp > 0) {
		imgComp.color.a = transp;
		txtCompleted.color.a = transp * 2;
		transp -= fadeSpeed * Time.deltaTime;
		yield;
	}
	goImgCompleted.SetActive (false);

	waitForMsg3 = false;
}
