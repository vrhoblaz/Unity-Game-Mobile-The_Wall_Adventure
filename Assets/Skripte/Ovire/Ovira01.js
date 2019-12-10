#pragma strict

var oviraAnim : Animator;
private var randPosZ : int;

function Start ()
{
	randPosZ = Random.Range (50, 80);
}
function Update () 
{	
	if (transform.position.z <= randPosZ && oviraAnim != null)
	{
		oviraAnim.SetTrigger ("x1");
	}
}

