#pragma strict

var ovira : Transform;
var oviraAnim : Animator;
var collSetToTrue : CapsuleCollider;

private var doOnce : boolean;

//var randAnimOrNot : int;
private var randAnimPos : int;

function Start ()
{
	collSetToTrue = gameObject.GetComponentInChildren.<CapsuleCollider>();
	doOnce = true;
	/*
	randAnimOrNot = Random.Range (0,5);
	if (randAnimOrNot == 0)
	{
		randAnimPos = Random.Range (-15, -5);
	}
	else
	{
	}*/
		randAnimPos = Random.Range (20, 30);

}

function Update () 
{
	if (ovira.position.z <= randAnimPos && oviraAnim != null && doOnce)
	{
		doOnce = false;
		oviraAnim.SetTrigger ("x4");
		collSetToTrue.enabled = true;
	}
}

