#pragma strict

static var kickStartNum : int;
static var kickStart : boolean = false;	// se postavi na false v GameMaster.EndLelvel ()
static var kickStartDist : int;
private var koncaj = true; // ker je v function update in se mora zgoditi samo 1x
private var spawnOnce = true;	//ista funkcija kot "koncaj" 
var spawnAfter = false;
var partSysObstDestroyed : GameObject;	//do tega dostopa destroyOnKickStart skripta; tukaj ker je skripta vedno prisotna in sem lahko nastavil PS GO brez kode;

var kickStartButton : GameObject;

private var spawnScript : Spawn;
private var spawnDist : int;

function Start ()
{
	//
	koncaj = true;
	spawnOnce = true;
	spawnAfter = false;
	//
	spawnScript = GameObject.Find ("Spawner").GetComponent ("Spawn");
	kickStartDist = PlayerPrefs.GetInt ("DistKickStart");
	kickStartNum = PlayerPrefs.GetInt ("NumKickStart");
	spawnDist = kickStartDist - 100;
	if (kickStartNum > 0)
	{
		kickStartButton.SetActive (true);
	}
	else if (kickStartNum <= 0)
	{
		kickStartButton.SetActive (false);
	}
}

function Update () 
{
	if (GameMaster.Distance >= kickStartDist && koncaj && kickStart)
	{
		GameMaster.timeSpeed -= 0.8f;
		Time.timeScale -= 0.8f;
		kickStart = false;
		koncaj = false;
	}

	if (GameMaster.Distance >= (kickStartDist - 40) && spawnOnce && kickStart)
	{
		spawnOnce = false;
		spawnScript.SpawnObstAfterKickStart ();
	}
}

function KickStartButton ()
{
	//	kick Start challange
	if (DailyChallangeSet.challBools[0] || DailyChallangeSet.challBools[19])
	{
		if (PlayerPrefs.GetInt("ChallangeOne") == 0 || PlayerPrefs.GetInt("ChallangeOne") == 19)
		{
			PlayerPrefs.SetInt("ChallangeOneProgress", (1 + PlayerPrefs.GetInt("ChallangeOneProgress")));
		}
		if (PlayerPrefs.GetInt("ChallangeTwo") == 0 || PlayerPrefs.GetInt("ChallangeTwo") == 19)
		{
			PlayerPrefs.SetInt("ChallangeTwoProgress", (1 + PlayerPrefs.GetInt("ChallangeTwoProgress")));
		}
		if (PlayerPrefs.GetInt("ChallangeThree") == 0 || PlayerPrefs.GetInt("ChallangeThree") == 19)
		{
			PlayerPrefs.SetInt("ChallangeThreeProgress", (1 + PlayerPrefs.GetInt("ChallangeThreeProgress")));
		}
	}

	//	rest of kick start function
	kickStartNum --;
	PlayerPrefs.SetInt ("NumKickStart", KickStart.kickStartNum);
	PlayerPrefs.SetInt ("TotalConsumables", (PlayerPrefs.GetInt ("TotalConsumables") + 1));
	PlayerPrefs.Save();
	GameMaster.timeSpeed += 0.9f;
	Time.timeScale += 0.9f;
	kickStart = true;
	omgKokSemZakomplicireu ();
}

function omgKokSemZakomplicireu ()
{
	for (var e : int = 0; e < 1; e++)
	{
		yield WaitForSeconds (1f);
		spawnAfter = true;
	}
}