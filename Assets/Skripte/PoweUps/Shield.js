#pragma strict

//power up
static var timeShield : float;


function OnTriggerEnter (col : Collider) 
{
	if (col.tag == "Player" && StartShieldConsum.shieldOn == false)
	{
		PowerUpSound.PowerUpPlay = true;
		Particles.PowerUpTransform = gameObject.transform;
		Particles.spawnPowerUpParticles2 = true;
		transform.parent.gameObject.SetActive (false);
		//Destroy(transform.parent.gameObject);
		Timer.jumpTime = 0f;
		Timer.magnetTime = 0f;
		Timer.slowTime = 0f;
		Timer.coinTime = 0f;
		StartShieldConsum.shieldOnColor = true;
		Timer.BallShield.SetActive (true);
		Timer.shieldTime = timeShield;
		Timer.powerDownBool = true;
		Timer.checkIfAudioPlaying = true;
		GameMaster.roundPowerUps ++;

		//	PowerUp challange
		if (DailyChallangeSet.challBools[7] || DailyChallangeSet.challBools[15])
		{
			if (PlayerPrefs.GetInt("ChallangeOne") == 7 || PlayerPrefs.GetInt("ChallangeOne") == 15)
			{
				PlayerPrefs.SetInt("ChallangeOneProgress", (1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
			}
			if (PlayerPrefs.GetInt("ChallangeTwo") == 7 || PlayerPrefs.GetInt("ChallangeTwo") == 15)
			{
				PlayerPrefs.SetInt("ChallangeTwoProgress", (1 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
			}
			if (PlayerPrefs.GetInt("ChallangeThree") == 7 || PlayerPrefs.GetInt("ChallangeThree") == 15)
			{
				PlayerPrefs.SetInt("ChallangeThreeProgress", (1 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
			}
		}
	}
	if (col.tag == "Player" && StartShieldConsum.shieldOn)
	{
		PowerUpSound.PowerUpDenied = true;
		Destroy(transform.parent.gameObject);
	}
}
