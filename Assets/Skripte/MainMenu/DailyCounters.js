#pragma strict

private var day : int;
private var month : int;
private var year : int;

var sameDay : boolean;

function Awake () 
{	
	//Set a date into int
	day = System.DateTime.Now.get_Day();
	month = System.DateTime.Now.get_Month();
	year = System.DateTime.Now.get_Year();
	//Checks if its a first game -- no date set
	if (PlayerPrefs.HasKey("OldDay") == false)
	{
		PlayerPrefs.SetInt("OldDay", day);
	}
	if (PlayerPrefs.HasKey("OldMonth") == false)
	{
		PlayerPrefs.SetInt("OldMonth", month);
	}
	if (PlayerPrefs.HasKey("OldYear") == false)
	{
		PlayerPrefs.SetInt("OldYear", year);
	}
	//	Checks if Chalanges needs to be set
	if (PlayerPrefs.HasKey("ChallangeNeeded") == false)
	{
		PlayerPrefs.SetInt("ChallangeNeeded", 1);	// 0 - not needed, 1 - needed
	}

	//check if its a new day
	//tukaj true - v for zanki na false če ni
	sameDay = true;
	if (PlayerPrefs.GetInt("OldDay") != day || PlayerPrefs.GetInt("OldMonth") != month || PlayerPrefs.GetInt("OldYear") != year)
	{
		sameDay = false;
	}



	//če ni isti dan ...
	if (!sameDay)
	{
		PlayerPrefs.SetInt("OldDay", day);
		PlayerPrefs.SetInt("OldMonth", month);
		PlayerPrefs.SetInt("OldYear", year);
		PlayerPrefs.SetInt("DailyTripleCoins", 0);
		PlayerPrefs.SetInt("MaxDailyTripleCoins", 3);
		PlayerPrefs.SetInt("ChallangeNeeded", 1);
		PlayerPrefs.SetInt("RefreshChallange", 0);
	}

	PlayerPrefs.Save();
}


function Update ()
{
	if (AdJavaInterface.adIndentifier == 2)
	{
		AdJavaInterface.adIndentifier = 0;
		StoreTripleCoins.dailyCounterTripleMax += 3;
		PlayerPrefs.SetInt("MaxDailyTripleCoins", StoreTripleCoins.dailyCounterTripleMax);
		PlayerPrefs.Save();
	}
}

