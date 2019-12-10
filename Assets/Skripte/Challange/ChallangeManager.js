#pragma strict


function EndGameChalangeSave()
{
	if (DailyChallangeSet.challBools[13] || DailyChallangeSet.challBools[17] || DailyChallangeSet.challBools[18])
	{
		CoinChallange();
	}
	if (DailyChallangeSet.challBools[3] || DailyChallangeSet.challBools[22] || DailyChallangeSet.challBools[23])
	{
		DistanceChallange();
	}
	if (DailyChallangeSet.challBools[5] || DailyChallangeSet.challBools[4])
	{
		JumpChallange();
	}
	if (DailyChallangeSet.challBools[6])
	{
		FanceChallange();
	}
	if (DailyChallangeSet.challBools[16])
	{
		LifeChallange();
	}
}

function CoinChallange ()
{
	//	Coin Challange!
	switch (PlayerPrefs.GetInt("ChallangeOne"))		// if Challange 1
	{
		case 13 : PlayerPrefs.SetInt("ChallangeOneProgress", (DailyChallangeProgress.challProg1 + PlayerPrefs.GetInt("ChallangeOneProgress"))); break;	//magnet
		case 17 : 	//one run
			if (CoinCollector.challangeOneRunCoins >= 150) 
			{
				DailyChallangeProgress.challProg1 = 150;
			}
			else
			{
				DailyChallangeProgress.challProg1 = 0;
			}
			PlayerPrefs.SetInt("ChallangeOneProgress", DailyChallangeProgress.challProg1);
			break;	
		case 18 : PlayerPrefs.SetInt("ChallangeOneProgress", (DailyChallangeProgress.challProg1 + PlayerPrefs.GetInt("ChallangeOneProgress"))); break;	//just collect
	}
	switch (PlayerPrefs.GetInt("ChallangeTwo"))		// if Challange 2
	{
		case 13 : PlayerPrefs.SetInt("ChallangeTwoProgress", (DailyChallangeProgress.challProg2 + PlayerPrefs.GetInt("ChallangeTwoProgress"))); break;	//magnet
		case 17 : 	//one run
			if (CoinCollector.challangeOneRunCoins >= 150) 
			{
				DailyChallangeProgress.challProg2 = 150;
			}
			else
			{
				DailyChallangeProgress.challProg2 = 0;
			}
			PlayerPrefs.SetInt("ChallangeTwoProgress", DailyChallangeProgress.challProg2);
			break;	
		case 18 : PlayerPrefs.SetInt("ChallangeTwoProgress", (DailyChallangeProgress.challProg2 + PlayerPrefs.GetInt("ChallangeTwoProgress"))); break;	//just collect
	}
	switch (PlayerPrefs.GetInt("ChallangeThree"))		// if Challange 3
	{
		case 13 : PlayerPrefs.SetInt("ChallangeThreeProgress", (DailyChallangeProgress.challProg3 + PlayerPrefs.GetInt("ChallangeThreeProgress"))); break;	//magnet
		case 17 : 	//one run
			if (CoinCollector.challangeOneRunCoins >= 150) 
			{
				DailyChallangeProgress.challProg3 = 150;
			}
			else
			{
				DailyChallangeProgress.challProg3 = 0;
			}
			PlayerPrefs.SetInt("ChallangeThreeProgress", DailyChallangeProgress.challProg3);
			break;	
		case 18 : PlayerPrefs.SetInt("ChallangeThreeProgress", (DailyChallangeProgress.challProg3 + PlayerPrefs.GetInt("ChallangeThreeProgress"))); break;	//just collect
	}
	CoinCollector.challangeOneRunCoins = 0;	//Set back to 0 so its ready for next game
}

function DistanceChallange()
{
	switch (PlayerPrefs.GetInt("ChallangeOne"))
		{
			case 3 : 
			if (GameMaster.Distance >= 1500)
			{
				DailyChallangeProgress.challProg1 = 1500;
				PlayerPrefs.SetInt("ChallangeOneProgress", DailyChallangeProgress.challProg1);
			}
			break;
			case 22 : PlayerPrefs.SetInt("ChallangeOneProgress", (GameMaster.Distance + PlayerPrefs.GetInt("ChallangeOneProgress"))); break;
			case 23 : PlayerPrefs.SetInt("ChallangeOneProgress", (GameMaster.Distance + PlayerPrefs.GetInt("ChallangeOneProgress"))); break;
		}
	switch (PlayerPrefs.GetInt("ChallangeTwo"))
		{
			case 3 : 
			if (GameMaster.Distance >= 1500)
			{
				DailyChallangeProgress.challProg2 = 1500;
				PlayerPrefs.SetInt("ChallangeTwoProgress", DailyChallangeProgress.challProg2);
			}
			break;
			case 22 : PlayerPrefs.SetInt("ChallangeTwoProgress", (GameMaster.Distance + PlayerPrefs.GetInt("ChallangeTwoProgress"))); break;
			case 23 : PlayerPrefs.SetInt("ChallangeTwoProgress", (GameMaster.Distance + PlayerPrefs.GetInt("ChallangeTwoProgress"))); break;
		}
	switch (PlayerPrefs.GetInt("ChallangeThree"))
		{
			case 3 : 
			if (GameMaster.Distance >= 1500)
			{
				DailyChallangeProgress.challProg3 = 1500;
				PlayerPrefs.SetInt("ChallangeThreeProgress", DailyChallangeProgress.challProg3);
			}
			break;
			case 22 : PlayerPrefs.SetInt("ChallangeThreeProgress", (GameMaster.Distance + PlayerPrefs.GetInt("ChallangeThreeProgress"))); break;
			case 23 : PlayerPrefs.SetInt("ChallangeThreeProgress", (GameMaster.Distance + PlayerPrefs.GetInt("ChallangeThreeProgress"))); break;
		}
}

function JumpChallange()
{
	//	jump chall
	if (PlayerPrefs.GetInt("ChallangeOne") == 4)
	{
		PlayerPrefs.SetInt("ChallangeOneProgress", (DailyChallangeProgress.challProg1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
	}
	else if (PlayerPrefs.GetInt("ChallangeTwo") == 4)
	{
		PlayerPrefs.SetInt("ChallangeTwoProgress", (DailyChallangeProgress.challProg2 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
	}
	else if (PlayerPrefs.GetInt("ChallangeThree") == 4)
	{
		PlayerPrefs.SetInt("ChallangeThreeProgress", (DailyChallangeProgress.challProg3 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
	}

	//double jump chall
	if (PlayerPrefs.GetInt("ChallangeOne") == 5)
	{
		PlayerPrefs.SetInt("ChallangeOneProgress", (DailyChallangeProgress.challProg1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
	}
	else if (PlayerPrefs.GetInt("ChallangeTwo") == 5)
	{
		PlayerPrefs.SetInt("ChallangeTwoProgress", (DailyChallangeProgress.challProg2 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
	}
	else if (PlayerPrefs.GetInt("ChallangeThree") == 5)
	{
		PlayerPrefs.SetInt("ChallangeThreeProgress", (DailyChallangeProgress.challProg3 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
	}
}

function FanceChallange()
{
	if (PlayerPrefs.GetInt("ChallangeOne") == 6)
	{
		PlayerPrefs.SetInt("ChallangeOneProgress", (DailyChallangeProgress.challProg1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
	}
	else if (PlayerPrefs.GetInt("ChallangeTwo") == 6)
	{
		PlayerPrefs.SetInt("ChallangeTwoProgress", (DailyChallangeProgress.challProg2 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
	}
	else if (PlayerPrefs.GetInt("ChallangeThree") == 6)
	{
		PlayerPrefs.SetInt("ChallangeThreeProgress", (DailyChallangeProgress.challProg3 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
	}
}

function LifeChallange()
{
	if (PlayerPrefs.GetInt("ChallangeOne") == 16)
	{
		PlayerPrefs.SetInt("ChallangeOneProgress", (DailyChallangeProgress.challProg1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
	}
	else if (PlayerPrefs.GetInt("ChallangeTwo") == 16)
	{
		PlayerPrefs.SetInt("ChallangeTwoProgress", (DailyChallangeProgress.challProg2 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
	}
	else if (PlayerPrefs.GetInt("ChallangeThree") == 16)
	{
		PlayerPrefs.SetInt("ChallangeThreeProgress", (DailyChallangeProgress.challProg3 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
	}
}