#pragma strict

private var rend : Renderer;
var oviraAnim : Animator;
private var startAnim : int; //za randomizacijo

function Start ()
{
	rend = gameObject.GetComponentInChildren.<Renderer>();
	rend.enabled = false;
	startAnim = Random.Range (50, 60);
}
function Update () 
{	
	if (transform.position.z <= startAnim && oviraAnim != null)
	{
		oviraAnim.SetTrigger ("x3");
		rend.enabled = true;
	}
}


