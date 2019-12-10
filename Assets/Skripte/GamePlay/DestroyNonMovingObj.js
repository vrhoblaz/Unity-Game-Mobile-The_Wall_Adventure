#pragma strict

private var bolean = true;

function Update () 
{
	if (bolean && Moving.startMoving)
	{
		DestroyAfterSec ();
		bolean = false;
	}
}

function DestroyAfterSec ()
{
	for (var f = 0; f == 0 && Moving.startMoving; f++)
	{
		yield WaitForSeconds (18 * GameMaster.timeSpeed);
		Destroy (transform.root.gameObject);
	}
}