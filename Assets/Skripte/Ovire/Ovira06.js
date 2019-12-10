#pragma strict

var DoorRigBody : Rigidbody;
var randNumT : int;
var boolTF : boolean = false;

function Start ()
{
	boolTF = false;
	//v 20% se vrata ne sprožijo
//	randNumT = Random.Range (0, 5);
//	if (randNumT == 2)
//	{
//		boolTF = true;
//	}
}

function Update () 
{
//	if (transform.position.z <= 30 && !boolTF)
	if (transform.position.z <= 30)
	{
		DoorRigBody = GetComponent.<Rigidbody>();
		DoorRigBody.isKinematic = false;
	}
}