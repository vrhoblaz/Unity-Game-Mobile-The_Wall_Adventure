#pragma strict

private var coinSpeed : float = 25; //hitrost premikanja kovanca
static var a = false;


function Update ()
{
	
	if (a && transform.position.z < 10 && transform.position.z > -10)
	{
		transform.position = Vector3.MoveTowards(transform.position, new Vector3 (Timer.BallInfo.transform.position.x, Timer.BallInfo.transform.position.y, Timer.BallInfo.transform.position.z), (Time.deltaTime * coinSpeed));
	}
}
