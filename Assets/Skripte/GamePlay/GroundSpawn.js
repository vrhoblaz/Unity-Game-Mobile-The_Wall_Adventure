#pragma strict

private var vsaTla : GameObject [];
var newGround : GameObject;

private var vsaObzidja : GameObject [];
var novoObzidje : GameObject;

function Start () {
	StartSpawnGround ();
	StartSpawnZid ();
//	CheckAndSpawnGround ();
//	CheckAndSpawnWall ();
}

function StartSpawnGround ()
{
	//zakaj int če je float???
	var posZ : int = -20;
	var intOfLastGround : int = 0;
	while (posZ < 180)
	{
		vsaTla = GameObject.FindGameObjectsWithTag ("Ground1");
		posZ = -20;
		intOfLastGround = 0;
		if (vsaTla.Length != 0)
		{
			for (var i : int = 0; i < vsaTla.Length; i++)
			{
				if (vsaTla[i].transform.position.z > posZ)
				{
					posZ = vsaTla[i].transform.position.z;
					intOfLastGround = i;
				}
			}
		} else {
		posZ = -10;
		}
		if (posZ < 200)
		{
			Instantiate (newGround, new Vector3 (0, 0, vsaTla[intOfLastGround].transform.position.z + 50), transform.rotation);
		}
	}
	CheckAndSpawnGround ();
}

function StartSpawnZid ()
{
	var posZ : int = -40;
	var intOfLastWall : int = 0;
	while (posZ < 180)
	{
		vsaObzidja = GameObject.FindGameObjectsWithTag ("Ground2");
		posZ = -40;
		intOfLastWall = 0;
		for (var i : int = 0; i < vsaObzidja.Length; i++)
		{
			if (vsaObzidja[i].transform.position.z > posZ)
			{
				posZ = vsaObzidja[i].transform.position.z;
				intOfLastWall = i;
			}
		}
		if (posZ < 200)
		{
			Instantiate (novoObzidje, new Vector3 (0, 0, vsaObzidja[intOfLastWall].transform.position.z + 50), transform.rotation);
		}
	}
	CheckAndSpawnWall ();
}

function CheckAndSpawnGround ()
{
	var posZ : int = 0;
	var intOfLastGround : int = 0;
	while (true)
	{
		vsaTla = GameObject.FindGameObjectsWithTag ("Ground1");
		posZ = 0;
		intOfLastGround = 0;
		for (var i : int = 0; i < vsaTla.Length; i++)
		{
			if (vsaTla[i].transform.position.z > posZ)
			{
				posZ = vsaTla[i].transform.position.z;
				intOfLastGround = i;
			}
		}
		if (posZ < 200)
		{
			Instantiate (newGround, new Vector3 (0, 0, vsaTla[intOfLastGround].transform.position.z + 50), transform.rotation);
		}
		yield WaitForSeconds (0.3f);
	}
}

function CheckAndSpawnWall  ()
{
	var posZ : int = 0;
	var intOfLastWall : int = 0;
	while (true)
	{
		vsaObzidja = GameObject.FindGameObjectsWithTag ("Ground2");
		posZ = 0;
		intOfLastWall = 0;
		for (var i : int = 0; i < vsaObzidja.Length; i++)
		{
			if (vsaObzidja[i].transform.position.z > posZ)
			{
				posZ = vsaObzidja[i].transform.position.z;
				intOfLastWall = i;
			}
		}
		if (posZ < 200)
		{
			Instantiate (novoObzidje, new Vector3 (0, 0, vsaObzidja[intOfLastWall].transform.position.z + 50), transform.rotation);
		}
		yield WaitForSeconds (0.3f);
	}
}