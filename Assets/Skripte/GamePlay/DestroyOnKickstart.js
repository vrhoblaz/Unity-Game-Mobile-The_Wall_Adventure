#pragma strict
//skripta mora biti na teh ovirah
//če se začne kickstart se prve tri ovire ki so že spawnane uničijo 

var kickStartScript : KickStart;

function Start ()
{
	kickStartScript = GameObject.Find("GameMaster").GetComponent("KickStart");
}

function Update () {
	if (KickStart.kickStart && !kickStartScript.spawnAfter)
	{
//		DestroyObstacles ();
		DestroyOnKickStart ();
	}
}

function DestroyOnKickStart ()
{
	var ps = kickStartScript.partSysObstDestroyed;
	var pos : Vector3 = transform.position;
	pos.y += 1.7;
	Instantiate (ps, pos, transform.rotation);
	Destroy (gameObject);
}

//function DestroyObstacles ()
//{
//	for (var j : int = 0; j<1; j++)
//	{
//		yield WaitForSeconds (0.05f);
//	}
//	vseKillSkripte = GetComponentsInChildren.<KillOnHit>();
//	for (var i : int = 0; i< vseKillSkripte.Length; i++)
//	{
//		vseKillSkripte[i].DestroyOnKickStart();
//	}
//}
