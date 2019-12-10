#pragma strict

private var a = false;		//I think this has no function (it was changed or deleted)

var gameMasterScript : GameMaster;
private var fractScript : Fractions;

function Start()
{
	//
	a = false;
	//
	gameMasterScript = GameObject.Find("GameMaster").GetComponent("GameMaster");
	fractScript = GameObject.Find("GameMaster").GetComponent("Fractions");
}

function OnTriggerEnter (colInfo : Collider)
{
	//KillOnHitSound.KillOnHitSoundPlay = true; //za zvok ki je v svoji skripti in pripet na sonce
	if (colInfo.tag == "Player" && Timer.shieldTime <= 0 && StartShieldConsum.shieldOn == false)
	{
		//Moving.startMoving = false;
		gameMasterScript.EndLevel ();
		KillOnHitSound.KillOnHitSoundPlay = true; //za zvok ki je v svoji skripti in pripet na sonce
//		Debug.Log("Kill");
		if (DailyChallangeSet.challBools[14])
		{
			ObsticleChallange();
		}
	}


	else if (colInfo.tag == "Shield" && StartShieldConsum.shieldOn == false)
	{	
//		Particles.ObjectTransform = gameObject.transform;
//		Particles.spawnObjectParticles = true;
		SpawnFractions();
		gameObject.SetActive (false);
		//Destroy (gameObject);
		//Destroy(transform.root.gameObject);
		DamageTaken.damageTakeBlueRed = true;
		Health.currLife -= 1;
		GameMaster.roundLifeLost ++;
		KillOnHitSound.KillOnHitSoundPlay = true; //za zvok ki je v svoji skripti in pripet na sonce
		//za leaderboard
		GameMaster.SingleRunObsticlesDestroyed ++;
		//
		if (DailyChallangeSet.challBools[14])
		{
			ObsticleChallange();
		}
		if (DailyChallangeSet.challBools[16])
		{
			HealthDecreseChallange();
		}
	}

	if (colInfo.tag == "Shield" && StartShieldConsum.shieldOn)
	{
//		Particles.ObjectTransform = gameObject.transform;
//		Particles.spawnObjectParticles = true;
		SpawnFractions();
		gameObject.SetActive (false);
		StartShieldConsum.shieldHitCounter ++;
		StartShieldConsum.protectorColor --;
		DamageTaken.damageTakeBlueRed = true;
		KillOnHitSound.KillOnHitSoundPlay = true; //za zvok ki je v svoji skripti in pripet na sonce
		//za leaderboard
		GameMaster.SingleRunObsticlesDestroyed ++;
		//
		if (DailyChallangeSet.challBools[14])
		{
			ObsticleChallange();
		}
	}

}

function SpawnFractions ()
{
	switch (gameObject.tag)
		{
			case "01Box" : Instantiate (fractScript.ovira01Fract, transform.position, transform.rotation); break;
			case "02Steber" : Instantiate (fractScript.ovira02SteberFract, transform.position, transform.rotation); break;
			case "02Cilinder" : Instantiate (fractScript.ovira02CylinderFract, transform.position, Quaternion.identity); break;
			case "03Box" : Instantiate (fractScript.ovira03Fract, transform.position, transform.rotation); break;
			case "04Zunanji" : Instantiate (fractScript.ovira04ZunanjiFract, transform.position, Quaternion.identity); break;
			case "04Cone" : Instantiate (fractScript.ovira04ConeFract, transform.position, Quaternion.identity); break;
			case "05Steber" : Instantiate (fractScript.ovira05SteberFract, transform.position, Quaternion.identity); break;
			case "06Steber" : Instantiate (fractScript.ovira06SteberFract, transform.position, transform.rotation); break;
			case "06Up" : Instantiate (fractScript.ovira06UpFract, transform.position, transform.rotation); break;
			case "06Gate" : Instantiate (fractScript.ovira06GateFract, transform.position, transform.rotation); break;
			case "07Tree" : Instantiate (fractScript.ovira07TreeFract, transform.position, transform.rotation); break;
			case "08MaliSteb" : Instantiate (fractScript.ovira08StebricekFract, transform.position, transform.rotation); break;
		}
}
private function ObsticleChallange()
{
	//	Obsticle Challange
	if (PlayerPrefs.GetInt("ChallangeOne") == 14)
	{
		PlayerPrefs.SetInt("ChallangeOneProgress", (1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
	}
	if (PlayerPrefs.GetInt("ChallangeTwo") == 14)
	{
		PlayerPrefs.SetInt("ChallangeTwoProgress", (1 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
	}
	if (PlayerPrefs.GetInt("ChallangeThree") == 14)
	{
		PlayerPrefs.SetInt("ChallangeThreeProgress", (1 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
	}
}

private function HealthDecreseChallange()
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