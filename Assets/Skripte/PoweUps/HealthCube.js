#pragma strict

function OnTriggerEnter (colinfo : Collider) 
{
	if (colinfo.tag == "Player")
	{
		if (Health.currLife >= Health.maxLife)
		{
			PowerUpSound.PowerUpDenied = true;
			GameMaster.roundPowerUps ++;
		}

		if (Health.currLife < Health.maxLife)
		{
			PowerUpSound.PowerUpPlay = true;
			Health.currLife += 1;
			GameMaster.roundPowerUps ++;

			//	PowerUp challange
			if (DailyChallangeSet.challBools[8] || DailyChallangeSet.challBools[15])
			{
				if (PlayerPrefs.GetInt("ChallangeOne") == 8 || PlayerPrefs.GetInt("ChallangeOne") == 15)
				{
					PlayerPrefs.SetInt("ChallangeOneProgress", (1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
				}
				if (PlayerPrefs.GetInt("ChallangeTwo") == 8 || PlayerPrefs.GetInt("ChallangeTwo") == 15)
				{
					PlayerPrefs.SetInt("ChallangeTwoProgress", (1 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
				}
				if (PlayerPrefs.GetInt("ChallangeThree") == 8 || PlayerPrefs.GetInt("ChallangeThree") == 15)
				{
					PlayerPrefs.SetInt("ChallangeThreeProgress", (1 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
				}
			}
		}

		Particles.PowerUpTransform = gameObject.transform;
		Particles.spawnPowerUpParticles1 = true;
		transform.parent.gameObject.SetActive (false);
		//Destroy(transform.parent.gameObject);
	}
}
