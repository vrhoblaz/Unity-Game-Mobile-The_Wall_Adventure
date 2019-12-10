#pragma strict

static var startMoving = false;
static var MovingSpeed = 15;

function Update () {

	//premikaj nazaj če si prej pritisnil tipko Down
	if (startMoving == true)
	{
		transform.position = Vector3.MoveTowards(transform.position, new Vector3 (transform.position.x, transform.position.y, -50), Time.deltaTime * MovingSpeed);
		//transform.position.z -= MovingSpeed * Time.deltaTime;
	}

	//uniči če je z manjši od -20
	if (transform.position.z <= -20 && gameObject.tag != "Ground1" && gameObject.tag != "Ground2")
	{
		Destroy (gameObject);
	}

	if (transform.position.z <= -40)
	{
		Destroy (gameObject);
	}
}

//random number iz množice
/*
var a = [-4, -2, 0, 2, 4];
var b = Random.Range (0, 5);
		Debug.Log (a[b]);
*/