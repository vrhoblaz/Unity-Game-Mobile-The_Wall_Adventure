#pragma strict

function OnTriggerEnter (colinfo : Collider)
{
	if (colinfo.tag == "Player" && Timer.shieldTime <= 0)
	{
		Health.currLife -= 1;
		GameMaster.roundLifeLost ++;

		if (DailyChallangeSet.challBools[16])
		{
			if (PlayerPrefs.GetInt("ChallangeOne") == 16)
			{
				DailyChallangeProgress.challProg1 ++;
			}
			else if (PlayerPrefs.GetInt("ChallangeTwo") == 16)
			{
				DailyChallangeProgress.challProg2 ++;
			}
			else if (PlayerPrefs.GetInt("ChallangeThree") == 16)
			{
				DailyChallangeProgress.challProg3 ++;
			}
		}
	}
}
		//Destroy (transform.parent.gameObject);
