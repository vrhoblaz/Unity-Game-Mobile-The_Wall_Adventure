#pragma strict

var oviraAnim : Animator;
private var bool = true;	//deleted I think
private var StartZPos : int;
private var HitOrPass : int;
private var MovingSpeed = 7;

function Start ()
{
	HitOrPass = Random.Range (0, 4);
	if (HitOrPass == 0)
	{
		StartZPos = Random.Range (0, 10);
	}
	else 
	{
		StartZPos = Random.Range (30, 60);
	}
}
function Update () 
{
	if (transform.position.z <= StartZPos && oviraAnim != null)
	{
		oviraAnim.SetTrigger ("start07");
	}
//	if (Moving.startMoving == true && transform.position.z <= (StartZPos - 10))
	if (transform.position.z <= (StartZPos - 10))
	{
		transform.parent.position = Vector3.MoveTowards(transform.parent.position, new Vector3 (transform.parent.position.x, transform.parent.position.y, -40), Time.deltaTime * MovingSpeed);
	}
}
