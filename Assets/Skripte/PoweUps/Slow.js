#pragma strict

static var timeSlow : float;

function OnTriggerEnter (col : Collider) 
{
	if (col.tag == "Player")
	{
		PowerUpSound.PowerUpPlay = true;
		Particles.PowerUpTransform = gameObject.transform;
		Particles.spawnPowerUpParticles2 = true;
		transform.parent.gameObject.SetActive (false);
		//Destroy(transform.parent.gameObject);
		//cancel other PowerUps
		Timer.shieldTime = 0f;
		Timer.jumpTime = 0f;
		Timer.magnetTime = 0f;
		Timer.coinTime = 0f;
		//dejanska funkcija PowerUp-a
		if (Timer.slowBoolean == false) //da se ne upočasni vsakič ko pobereš - drugače je aditivno
		{
			GameMaster.timeSpeed -= 0.15;
			Time.timeScale -= 0.15;
		}
		Timer.slowTime = timeSlow;
		Timer.slowBoolean = true;
		Timer.powerDownBool = true;
		Timer.checkIfAudioPlaying = true;
		GameMaster.roundPowerUps ++;

		//	PowerUp challange
		if (DailyChallangeSet.challBools[11] || DailyChallangeSet.challBools[15])
		{
			if (PlayerPrefs.GetInt("ChallangeOne") == 11 || PlayerPrefs.GetInt("ChallangeOne") == 15)
			{
				PlayerPrefs.SetInt("ChallangeOneProgress", (1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
			}
			if (PlayerPrefs.GetInt("ChallangeTwo") == 11 || PlayerPrefs.GetInt("ChallangeTwo") == 15)
			{
				PlayerPrefs.SetInt("ChallangeTwoProgress", (1 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
			}
			if (PlayerPrefs.GetInt("ChallangeThree") == 11 || PlayerPrefs.GetInt("ChallangeThree") == 15)
			{
				PlayerPrefs.SetInt("ChallangeThreeProgress", (1 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
			}
		}
	}

}
