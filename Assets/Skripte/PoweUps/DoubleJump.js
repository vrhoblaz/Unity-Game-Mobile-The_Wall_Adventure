#pragma strict

static var timeDoubleJump : float;

function OnTriggerEnter (col : Collider) 
{
	if (col.tag == "Player")
	{
		PowerUpSound.PowerUpPlay = true;
		Particles.PowerUpTransform = gameObject.transform;
		Particles.spawnPowerUpParticles3 = true;
		transform.parent.gameObject.SetActive (false);
		//Destroy(transform.parent.gameObject);
		Timer.shieldTime = 0f;
		Timer.magnetTime = 0f;
		Timer.slowTime = 0f;
		Timer.coinTime = 0f;
		BallControl.jumpNum = 2;
		Timer.jumpTime = timeDoubleJump;
		Timer.powerDownBool = true;
		Timer.checkIfAudioPlaying = true;
		GameMaster.roundPowerUps ++;

		//	PowerUp challange
		if (DailyChallangeSet.challBools[9] || DailyChallangeSet.challBools[15])
		{
			if (PlayerPrefs.GetInt("ChallangeOne") == 9 || PlayerPrefs.GetInt("ChallangeOne") == 15)
			{
				PlayerPrefs.SetInt("ChallangeOneProgress", (1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
			}
			if (PlayerPrefs.GetInt("ChallangeTwo") == 9 || PlayerPrefs.GetInt("ChallangeTwo") == 15)
			{
				PlayerPrefs.SetInt("ChallangeTwoProgress", (1 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
			}
			if (PlayerPrefs.GetInt("ChallangeThree") == 9 || PlayerPrefs.GetInt("ChallangeThree") == 15)
			{
				PlayerPrefs.SetInt("ChallangeThreeProgress", (1 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
			}
		}
	}
}
