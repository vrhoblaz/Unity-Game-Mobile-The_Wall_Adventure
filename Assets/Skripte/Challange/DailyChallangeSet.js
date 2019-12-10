#pragma strict

static var ChallOne : int;
static var ChallTwo : int;
static var ChallThree : int;

private var boolOne : boolean = false;	//pregleda za PowerUps
private var boolTwo : boolean = false;;	//pregleda za Consumables
//private var boolThree : boolean = false;;	//	Empty for now
//private var boolFour : boolean = false;;	//	Empty for now
private var boolFive : boolean = false;;	//pregleda za distance (chall 22 in 23)

private var boolCheck : boolean = false;
private var challCheck : boolean = false;	//preverja ali je Challange sprejemljiv

private var j : int;	//služi kot indikator pri primerjavi starih chall z novimi - for zanka

private var previousChall : int[];

//	Bools for each Challange
static var challBools : boolean[];

//	za klic funkcij iz challangeProgress skripte
var challangeProgressScript : DailyChallangeProgress;

function Start ()
{
	boolOne = false;
	boolTwo = false;
	boolFive = false;
	boolCheck = false;
	challCheck = false;
	// just to be sure
	GameMaster.timeSpeed = 1f;
	Time.timeScale = 1f;

//	PlayerPrefs.SetInt("ChallangeNeeded", 1);	//for testing
	if (PlayerPrefs.GetInt("ChallangeNeeded") == 1)	//checks if new challanges are needed: 0 - not needed, 1 - needed
	{
		SetDailyChallanges();
	}
	SetBools();	//mora vedno ker ni pod playerPrefs

	//IZBRIŠI KO KONČAŠ TESTIRANJE
//	Testiranje();
}

function Update()
{
	if (AdJavaInterface.adIndentifier == 5)
	{
		AdJavaInterface.adIndentifier = 0;
		ChallangeRefresh();
	}
}

function SetDailyChallanges()
{
	//	Si zapomni prejšne challange
	previousChall = new int[3];
	previousChall[0] = PlayerPrefs.GetInt("ChallangeOne");
	previousChall[1] = PlayerPrefs.GetInt("ChallangeTwo");
	previousChall[2] = PlayerPrefs.GetInt("ChallangeThree");

	boolOne = false;
	boolTwo = false;
//	boolThree = false;
//	boolFour = false;
	boolFive = false;

//	set challange ONE
	challCheck = false;
	while (!challCheck)
	{
		ChallOne = Random.Range(0, 24);

		//	check if it is the same as before
		challCheck = true;
		for (j=0; j<3; j++)
		{
			if (previousChall[j] == ChallOne)
			{
				challCheck = false;
			}
		}
	}

	//	set bool if needed - some Challanges don't go together
	if (ChallOne >= 7 && ChallOne <= 12)
	{boolOne = true;}
	else if (ChallOne == 0 || ChallOne == 1 || ChallOne == 2 || ChallOne == 19 || ChallOne == 20 || ChallOne == 21)
	{boolTwo = true;}
//	else if (ChallOne == 2 || ChallOne == 21)
//	{boolThree = true;}
//	else if (ChallOne == 1 || ChallOne == 20)
//	{boolFour = true;}
	else if (ChallOne == 22 || ChallOne == 23)
	{boolFive = true;}


//	set challange TWO
	challCheck = false;
	while (!challCheck)
	{
		ChallTwo = Random.Range(0, 24);

		//	check if it is the same as before
		boolCheck = false;
		for (j=0; j<3; j++)
		{
			if (previousChall[j] == ChallTwo)
			{boolCheck = true;}
		}

		//preveri če je kakšen bool TRUE
		if (boolOne && ChallTwo >=7 && ChallTwo <= 12)
		{boolCheck = true;}
		else if (boolTwo && (ChallTwo == 0 || ChallTwo == 1 || ChallTwo == 2 || ChallTwo == 19 || ChallTwo == 20 || ChallTwo == 21))
		{boolCheck = true;}
//		else if (boolThree && (ChallTwo == 2 || ChallTwo == 21))
//		{boolCheck = true;}
//		else if (boolFour && (ChallTwo == 1 || ChallTwo == 20))
//		{boolCheck = true;}
		else if (boolFive && (ChallTwo == 22 || ChallTwo == 23))
		{boolCheck = true;}
		//če je vse vredu pojdi naprej
		if (ChallTwo != ChallOne && !boolCheck)
		{
			challCheck = true;
		}
	}

	//set bool if needed - some Challanges don't go together
	if (ChallTwo >= 7 && ChallTwo <= 12)
	{boolOne = true;}
	else if (ChallTwo == 0 || ChallTwo == 1 || ChallTwo == 2 || ChallTwo == 19 || ChallTwo == 20 || ChallTwo == 21)
	{boolTwo = true;}
//	else if (ChallTwo == 2 || ChallTwo == 21)
//	{boolThree = true;}
//	else if (ChallTwo == 1 || ChallTwo == 20)
//	{boolFour = true;}
	else if (ChallTwo == 22 || ChallTwo == 23)
	{boolFive = true;}

	challCheck = false;
//	set chall THREE
	while (!challCheck)
	{
		ChallThree = Random.Range(0, 24);

		//	check if it is the same as before
		boolCheck = false;
		for (j=0; j<3; j++)
		{
			if (previousChall[j] == ChallThree)
			{boolCheck = true;}
		}

		//preveri če je kakšen bool TRUE
		if (boolOne && ChallThree >=7 && ChallThree <= 12)
		{boolCheck = true;}
		if (boolTwo && (ChallThree == 0 || ChallThree == 1 || ChallThree == 2 || ChallThree == 19 || ChallThree == 20 || ChallThree == 21))
		{boolCheck = true;}
//		if (boolThree && (ChallThree == 2 || ChallThree == 21))
//		{boolCheck = true;}
//		if (boolFour && (ChallThree == 1 || ChallThree == 20))
//		{boolCheck = true;}
		if (boolFive && (ChallThree == 22 || ChallThree == 23))
		{boolCheck = true;}

		//če je vse vredu pojdi naprej
		if (ChallThree != ChallOne && ChallThree != ChallTwo && !boolCheck)
		{
			challCheck = true;
		}
	}

	//določajo challange
	PlayerPrefs.SetInt("ChallangeOne", ChallOne);
	PlayerPrefs.SetInt("ChallangeTwo", ChallTwo);
	PlayerPrefs.SetInt("ChallangeThree", ChallThree);
	//ne rabim več spreminjat cahllange ta dan
	PlayerPrefs.SetInt("ChallangeNeeded", 0);
	//postavi counterje challangov na 0
	PlayerPrefs.SetInt("ChallangeOneProgress", 0);
	PlayerPrefs.SetInt("ChallangeTwoProgress", 0);
	PlayerPrefs.SetInt("ChallangeThreeProgress", 0);
	//da si zapolni da je/ni narejen
	PlayerPrefs.SetInt("ChallangeOneDone", 0);
	PlayerPrefs.SetInt("ChallangeTwoDone", 0);
	PlayerPrefs.SetInt("ChallangeThreeDone", 0);
	//Ker se je ravno začel tudi ni collectan
	PlayerPrefs.SetInt("ChallangeOneCollected", 0);
	PlayerPrefs.SetInt("ChallangeTwoCollected", 0);
	PlayerPrefs.SetInt("ChallangeThreeCollected", 0);
	PlayerPrefs.SetInt ("challMsg1", 0);
	PlayerPrefs.SetInt ("challMsg2", 0);
	PlayerPrefs.SetInt ("challMsg3", 0);
	PlayerPrefs.Save();
	SetBools();
	DailyChallangeProgress.blink1 = false;
	DailyChallangeProgress.blink2 = false;
	DailyChallangeProgress.blink3 = false;
	if(challangeProgressScript != null)
	{
		challangeProgressScript.DisplayText();
	}
}

function SetBools()
{
	//	all to false
	challBools = new boolean[24];
	for (var e:int=0; e<24; e++)
	{
		challBools[e] = false;
	}
	// now needed bools to true
	challBools[PlayerPrefs.GetInt("ChallangeOne")] = true;
	challBools[PlayerPrefs.GetInt("ChallangeTwo")] = true;
	challBools[PlayerPrefs.GetInt("ChallangeThree")] = true;
}

function ChallangeRefresh()
{
	SetDailyChallanges();
	challangeProgressScript.HideRefreshButton();
	PlayerPrefs.SetInt("RefreshChallange", 1);
	PlayerPrefs.Save();
}

function Testiranje ()
{
	PlayerPrefs.SetInt("ChallangeOne", 6);
//	PlayerPrefs.SetInt("ChallangeTwo", 6);
//	PlayerPrefs.SetInt("ChallangeThree", 6);
	PlayerPrefs.SetInt("ChallangeOneProgress", 0);
	PlayerPrefs.SetInt("ChallangeOneDone", 0);
	PlayerPrefs.SetInt("ChallangeOneCollected", 0);

	DailyChallangeProgress.blink1 = false;
	SetBools ();
}