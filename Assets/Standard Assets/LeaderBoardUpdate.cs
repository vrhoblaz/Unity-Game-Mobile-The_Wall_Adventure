using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LeaderBoardUpdate : MonoBehaviour {

	static public void UpdateLeaderBoard()
	{
		int distMaximalUpdate = (int)PlayerPrefs.GetFloat("MaxDist");
		Social.ReportScore (distMaximalUpdate, "CgkIkJmRooATEAIQAQ", (bool success) => {
		});
		int distTotUpdate = PlayerPrefs.GetInt ("TotDist");
		Social.ReportScore (distTotUpdate, "CgkIkJmRooATEAIQBw", (bool success) => {
		});
	}

}
