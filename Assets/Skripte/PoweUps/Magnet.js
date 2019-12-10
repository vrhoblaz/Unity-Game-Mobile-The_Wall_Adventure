#pragma strict

static var timeMagnet : float;

function OnTriggerEnter (col : Collider) 
{
	if (col.tag == "Player")
	{
		PowerUpSound.PowerUpPlay = true;
		Particles.PowerUpTransform = gameObject.transform;
		Particles.spawnPowerUpParticles2 = true;
		transform.parent.gameObject.SetActive (false);
		//Destroy(transform.parent.gameObject);
		Timer.shieldTime = 0f;
		Timer.jumpTime = 0f;
		Timer.slowTime = 0f;
		Timer.coinTime = 0f;
		CoinMagnet.a = true;
		Timer.magnetTime = timeMagnet;
		Timer.powerDownBool = true;
		Timer.checkIfAudioPlaying = true;
		GameMaster.roundPowerUps ++;

		//	PowerUp challange
		if (DailyChallangeSet.challBools[10] || DailyChallangeSet.challBools[15])
		{
			if (PlayerPrefs.GetInt("ChallangeOne") == 10 || PlayerPrefs.GetInt("ChallangeOne") == 15)
			{
				PlayerPrefs.SetInt("ChallangeOneProgress", (1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
			}
			if (PlayerPrefs.GetInt("ChallangeTwo") == 10 || PlayerPrefs.GetInt("ChallangeTwo") == 15)
			{
				PlayerPrefs.SetInt("ChallangeTwoProgress", (1 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
			}
			if (PlayerPrefs.GetInt("ChallangeThree") == 10 || PlayerPrefs.GetInt("ChallangeThree") == 15)
			{
				PlayerPrefs.SetInt("ChallangeThreeProgress", (1 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
			}
		}
	}
}
