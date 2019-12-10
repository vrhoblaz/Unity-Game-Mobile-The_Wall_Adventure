#pragma strict

var CamFocusHight : float;
CamFocusHight = 3;
var ball : Transform;
var targetFocus : Vector3;
var speed : float = 1;

function LateUpdate ()
{
	//sledenje žogi po X osi 
	transform.position.x = Mathf.Lerp(transform.position.x, (ball.position.x * 0.5), speed);

	//sledenje Y pri skoku
	targetFocus = Vector3 (ball.position.x, ball.position.y / 2 + CamFocusHight, ball.position.z); //+ Vector3 (0, CamFocusHight, 0);
	transform.LookAt (targetFocus);
}