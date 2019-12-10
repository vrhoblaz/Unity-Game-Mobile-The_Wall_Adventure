#pragma strict

static var time2xCoin : float;

function Start ()
{
	time2xCoin = PlayerPrefs.GetFloat ("2xCoinTime");
}

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
		Timer.magnetTime = 0f;
		CoinCollector.CoinMulti = 2;
		Timer.coinTime = time2xCoin;
		Timer.powerDownBool = true;
		Timer.checkIfAudioPlaying = true;
		GameMaster.roundPowerUps ++;

		//	PowerUp challange
		if (DailyChallangeSet.challBools[12] || DailyChallangeSet.challBools[15])
		{
			if (PlayerPrefs.GetInt("ChallangeOne") == 12 || PlayerPrefs.GetInt("ChallangeOne") == 15)
			{
				PlayerPrefs.SetInt("ChallangeOneProgress", (1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
			}
			if (PlayerPrefs.GetInt("ChallangeTwo") == 12 || PlayerPrefs.GetInt("ChallangeTwo") == 15)
			{
				PlayerPrefs.SetInt("ChallangeTwoProgress", (1 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
			}
			if (PlayerPrefs.GetInt("ChallangeThree") == 12 || PlayerPrefs.GetInt("ChallangeThree") == 15)
			{
				PlayerPrefs.SetInt("ChallangeThreeProgress", (1 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
			}
		}
	}
}
