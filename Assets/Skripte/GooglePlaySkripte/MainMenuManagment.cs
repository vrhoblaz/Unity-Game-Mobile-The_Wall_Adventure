using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using GooglePlayGames;
using UnityEngine.SocialPlatforms;

public class MainMenuManagment : MonoBehaviour {

	public GameObject ErrorGoogleService;
	public Text txtErrorGoogleService;
	static int oncePerGame;
//	public bool retryToOpenLeaderboard;


	// Use this for initialization
	void Start () {
//		retryToOpenLeaderboard = false;
		if (!PlayerPrefs.HasKey ("GoogleLogin")) {
			PlayerPrefs.SetInt ("GoogleLogin", 0);
		}

		if (oncePerGame != 7) {
			oncePerGame = 7;
//			PlayGamesPlatform.DebugLogEnabled = true;
			PlayGamesPlatform.Activate ();
			if (!Social.localUser.authenticated && PlayerPrefs.GetInt("GoogleLogin") == 0) 
			{
				SignInGoogle ();
			}
		}

		//	LeaderBoard Managment
		int distMaximal = (int)PlayerPrefs.GetFloat("MaxDist");
		Social.ReportScore (distMaximal, "CgkIkJmRooATEAIQAQ", (bool success) => {
		});
		int distTot = PlayerPrefs.GetInt ("TotDist");
		Social.ReportScore (distTot, "CgkIkJmRooATEAIQBw", (bool success) => {
		});
		int coinTot = PlayerPrefs.GetInt ("TotCoins");
		Social.ReportScore (coinTot, "CgkIkJmRooATEAIQCA", (bool success) => {
		});
		// nove
		int maxCoinOneRun = PlayerPrefs.GetInt ("MaxCoinsOneRun");
		Social.ReportScore (maxCoinOneRun, "CgkIkJmRooATEAIQCQ", (bool success) => {
		});
		int steviloIger = PlayerPrefs.GetInt ("NoOfGames");
		Social.ReportScore (steviloIger, "CgkIkJmRooATEAIQCg", (bool success) => {
		});
		int steviloUpgradov = PlayerPrefs.GetInt ("NoOfUpgrades");
		Social.ReportScore (steviloUpgradov, "CgkIkJmRooATEAIQCw", (bool success) => {
		});
		int maxOvirEnaIgra = PlayerPrefs.GetInt ("MaxObsicles");
		Social.ReportScore (maxOvirEnaIgra, "CgkIkJmRooATEAIQDQ", (bool success) => {
		});
		int vseOvire = PlayerPrefs.GetInt ("TotalObsticles");
		Social.ReportScore (vseOvire, "CgkIkJmRooATEAIQDA", (bool success) => {
		});
		//	še novejše	
		int najvecPowers = PlayerPrefs.GetInt ("MaxPowerUps");
		Social.ReportScore (najvecPowers, "CgkIkJmRooATEAIQEg", (bool success) => {
		});
		int vsiPowers = PlayerPrefs.GetInt ("TotalPowerUps");
		Social.ReportScore (vsiPowers, "CgkIkJmRooATEAIQDw", (bool success) => {
		});
		int vsiPotratni = PlayerPrefs.GetInt ("TotalConsumables");
		Social.ReportScore (vsiPotratni, "CgkIkJmRooATEAIQEA", (bool success) => {
		});
		int izgubljenaZivljenja = PlayerPrefs.GetInt ("TotalLifeLost");
		Social.ReportScore (izgubljenaZivljenja, "CgkIkJmRooATEAIQEw", (bool success) => {
		});
	}

	// counts SignIn atempts
	int counterSignin = 0;
	public void SignInGoogle ()
	{
		PlayerPrefs.SetInt ("GoogleLogin", 0);
		Social.localUser.Authenticate ((bool success) => {
			if (success)
			{
//				if(retryToOpenLeaderboard)
//				{
//					OpenLeaderBoard ();
//				}
			}
			else{
				if (counterSignin < 2)
				{
					counterSignin ++;
					if (counterSignin == 2)
					{
						txtErrorGoogleService.text = "Still unable to connect to Google Play Services.\nYou can also Sign In later in Settings Menu."; //\nTry once again?";
					}
					ErrorGoogleService.SetActive (true);
				}
			}
		});
//		retryToOpenLeaderboard = false;
	}

	public void OpenLeaderBoard()
	{
		if (Social.localUser.authenticated) {
			Social.ShowLeaderboardUI ();
		} else {
			Social.localUser.Authenticate ((bool success) => {
				if (success)
				{
					OpenLeaderBoard();
				}
				else{
					txtErrorGoogleService.text = "Unable to connect to Google Play Services.\nCheck your internet connection & try to open Leader-Boards again.";
					ErrorGoogleService.SetActive (true);
					if (GameObject.Find ("LoadingImage") != null)
					{
						GameObject.Find ("LoadingImage").SetActive (false);
					}
				}
			});
		}	
	}

	public void CloseErrorGoogleService()
	{
		if (GameObject.Find ("LoadingImage") != null)
		{
			GameObject.Find ("LoadingImage").SetActive (false);
		}
		ErrorGoogleService.SetActive (false);
	}
}
