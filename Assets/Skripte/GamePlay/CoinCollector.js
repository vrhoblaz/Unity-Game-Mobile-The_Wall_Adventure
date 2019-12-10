#pragma strict

//za doubleCoin I think
static var CoinMulti : int = 1;
static var challangeOneRunCoins : int = 0;

function OnTriggerEnter (Collinf : Collider)
{
	if (Collinf.tag == "Player")
	{
		transform.root.GetComponent.<AudioSource>().pitch = 0.95;
		transform.root.GetComponent.<AudioSource>().volume = 0.8;
		transform.root.GetComponent.<AudioSource>().Play();
		Particles.CoinTransform = gameObject.transform;
		Particles.spawnCoinparticles = true;
		transform.parent.gameObject.SetActive (false);
		//Destroy (transform.parent.gameObject);	
		GameMaster.coinColected += (1 * CoinMulti);
		if (DailyChallangeSet.challBools[13] || DailyChallangeSet.challBools[17] || DailyChallangeSet.challBools[18])
		{
			BasicCoinChallange();
		}
	}
}

function BasicCoinChallange()
{
	switch (PlayerPrefs.GetInt("ChallangeOne"))
	{
		case 13 : if (Timer.magnetTime > 0) {DailyChallangeProgress.challProg1++;} break;	//magnet
		case 17 : challangeOneRunCoins += (1 * CoinMulti); break;	//one run
		case 18 : DailyChallangeProgress.challProg1 += (1 * CoinMulti); break;				//just collect
	}
	switch (PlayerPrefs.GetInt("ChallangeTwo"))
	{
		case 13 : if (Timer.magnetTime > 0) {DailyChallangeProgress.challProg2++;} break;	//magnet
		case 17 : challangeOneRunCoins += (1 * CoinMulti); break; 	//one run
		case 18 : DailyChallangeProgress.challProg2 += (1 * CoinMulti); break;				//just collect
	}
	switch (PlayerPrefs.GetInt("ChallangeThree"))
	{
		case 13 : if (Timer.magnetTime > 0) {DailyChallangeProgress.challProg3++;} break;	//magnet
		case 17 : challangeOneRunCoins += (1 * CoinMulti); break;	//one run
		case 18 : DailyChallangeProgress.challProg3 += (1 * CoinMulti); break;				//just collect
	}
}