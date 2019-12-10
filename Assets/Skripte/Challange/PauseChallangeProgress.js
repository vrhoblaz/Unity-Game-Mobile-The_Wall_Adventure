#pragma strict

//	array with descritions - again - could make them all just in one script but for now it'll do
private var challangeDescription : String[];
//	challange description texts
var descritionText1 : Text;
var descritionText2 : Text;
var descritionText3 : Text;
//	challange progress texts
var progressText1 : Text;
var progressText2 : Text;
var progressText3 : Text;
//	actual current proggres
private var currentProgress1 : int;
private var currentProgress2 : int;
private var currentProgress3 : int;

function Start () 
{
	//	setting up the challange descrition array
	challangeDescription = new String[24];
	challangeDescription[0] = "Use Kick Start 5 times!";		//200c
	challangeDescription[1] = "Use Protector 5 times!";		//200c
	challangeDescription[2] = "Use Triple coins 3 times!";	//200c
	challangeDescription[3] = "Travel the distance of 1.500 m in one run!";	//250c
	challangeDescription[4] = "Jump 100 times - double jump count only as one!";	//250c
	challangeDescription[5] = "Double jump 25 times!";	//250c
	challangeDescription[6] = "Hit the fence 30 times!";		//250c
	challangeDescription[7] = "Pick up 5 Shield Power Up-s!";	//250c
	challangeDescription[8] = "Heal yourself 5 times!";	//250c
	challangeDescription[9] = "Pick up 5 Double Jumps Power Up-s!";	//250c
	challangeDescription[10] = "Pick up 5 Magnet Power Up-s!";	//250c
	challangeDescription[11] = "Pick up 5 Slow Power Up-s!";	//250c
	challangeDescription[12] = "Pick up 5 Double coin Power Up-s!";	//250c
	challangeDescription[13] = "Collect 100 coins using Magent!";	//250c
	challangeDescription[14] = "Hit 25 obsticle (with shield or not)!";	//300c
	challangeDescription[15] = "Pick up 25  Power Up-s!";	//300c
	challangeDescription[16] = "Lose 50 Life Points!";		//300c
	challangeDescription[17] = "Collect 150 coins in one run!";	//300
	challangeDescription[18] = "Collect 1.000 coins!";	//300c
	challangeDescription[19] = "Use Kick Start 10 times!";	//400c
	challangeDescription[20] = "Use Protector 10 times!";	//400c
	challangeDescription[21] = "Use Triple coins 10 times!";		//400c
	challangeDescription[22] = "Travel the distance of 7.000 m!";		//500c
	challangeDescription[23] = "Travel the distance of 15.000 m!";	//1000c
}

public function DisplayChallangeDescrition()
{
	//	izpiše descrition
//	print (PlayerPrefs.GetInt("ChallangeOne"));
	descritionText1.text = challangeDescription[PlayerPrefs.GetInt("ChallangeOne")];
	descritionText2.text = challangeDescription[PlayerPrefs.GetInt("ChallangeTwo")];
	descritionText3.text = challangeDescription[PlayerPrefs.GetInt("ChallangeThree")];

	//	Something Something da se currentProgress1 postavi na pravo vrednost ker niso povsod enako 
	if (PlayerPrefs.GetInt("ChallangeOne") == 3 || PlayerPrefs.GetInt("ChallangeOne") == 22 || PlayerPrefs.GetInt("ChallangeOne") == 23)
	{
		currentProgress1 = PlayerPrefs.GetInt("ChallangeOneProgress") + GameMaster.Distance;
	}
	else
	{
		currentProgress1 = PlayerPrefs.GetInt("ChallangeOneProgress") + DailyChallangeProgress.challProg1;
	}
	//	Something Something da se currentProgress2 postavi na pravo vrednost ker niso povsod enako
	if (PlayerPrefs.GetInt("ChallangeTwo") == 3 || PlayerPrefs.GetInt("ChallangeTwo") == 22 || PlayerPrefs.GetInt("ChallangeTwo") == 23)
	{
		currentProgress2 = PlayerPrefs.GetInt("ChallangeTwoProgress") + GameMaster.Distance;
	}
	else
	{
		currentProgress2 = PlayerPrefs.GetInt("ChallangeTwoProgress") + DailyChallangeProgress.challProg2;
	}
	//	Something Something da se currentProgress3 postavi na pravo vrednost ker niso povsod enako
	if (PlayerPrefs.GetInt("ChallangeThree") == 3 || PlayerPrefs.GetInt("ChallangeThree") == 22 || PlayerPrefs.GetInt("ChallangeThree") == 23)
	{
		currentProgress3 = PlayerPrefs.GetInt("ChallangeThreeProgress") + GameMaster.Distance;
	}
	else
	{
		currentProgress3 = PlayerPrefs.GetInt("ChallangeThreeProgress") + DailyChallangeProgress.challProg3;
	}

	//	Pogleda če je slučajno že kakšen challange narejen
	//	Check if done
	if (currentProgress1 >= DailyChallangeProgress.progressCheckArray[PlayerPrefs.GetInt("ChallangeOne")])
	{
		PlayerPrefs.SetInt("ChallangeOneDone", 1);
	}
	if (currentProgress2 >= DailyChallangeProgress.progressCheckArray[PlayerPrefs.GetInt("ChallangeTwo")])
	{
		PlayerPrefs.SetInt("ChallangeTwoDone", 1);
	}
	if (currentProgress3 >= DailyChallangeProgress.progressCheckArray[PlayerPrefs.GetInt("ChallangeThree")])
	{
		PlayerPrefs.SetInt("ChallangeThreeDone", 1);
	}

	//	izpiše primeren progress
	if (PlayerPrefs.GetInt("ChallangeOneDone") == 1 && PlayerPrefs.GetInt("ChallangeOneCollected") == 0)
	{
		progressText1.text = "<color=#AC2020FF>Completed!!</color>";
	}
	else if (PlayerPrefs.GetInt("ChallangeOneDone") == 1 && PlayerPrefs.GetInt("ChallangeOneCollected") == 1)
	{
		progressText1.text = "<color=#06763EFF>Collected!</color>";
	}
	else
	{
		progressText1.text = currentProgress1.ToString();
	}
	if (PlayerPrefs.GetInt("ChallangeTwoDone") == 1 && PlayerPrefs.GetInt("ChallangeTwoCollected") == 0)
	{
		progressText2.text = "<color=#AC2020FF>Completed!!</color>";
	}
	else if (PlayerPrefs.GetInt("ChallangeTwoDone") == 1 && PlayerPrefs.GetInt("ChallangeTwoCollected") == 1)
	{
		progressText2.text = "<color=#06763EFF>Collected!</color>";
	}
	else
	{
		progressText2.text = currentProgress2.ToString();
	}
	if (PlayerPrefs.GetInt("ChallangeThreeDone") == 1 && PlayerPrefs.GetInt("ChallangeThreeCollected") == 0)
	{
		progressText3.text = "<color=#AC2020FF>Completed!!</color>";
	}
	else if (PlayerPrefs.GetInt("ChallangeThreeDone") == 1 && PlayerPrefs.GetInt("ChallangeThreeCollected") == 1)
	{
		progressText3.text = "<color=#06763EFF>Collected!</color>";
	}
	else
	{
		progressText3.text = currentProgress3.ToString();
	}
}