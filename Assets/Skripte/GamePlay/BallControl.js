#pragma strict

var jumpHight = 12f; //12 with gravity -30
private var distToGround : float;
static var BallGrounded : boolean;
var speed = 8;
private var isMoving = false; //premika levo in desno
static var startBallPosX : float;
static var endBallPosX : float;
static var odbojR : boolean = false; //se odbija od ograje
static var odbojL : boolean = false;
static var oviraHit : boolean;	//kadar se zaletiš v oviro iz strani in se odbiješ na true
static var oviraHit2 : boolean;	//preprečuje da bi šel skozi oviro z dvema zelo hitrima klikoma
//spremenljivka za double jump
static var jumpNum : int = 1; //definira število dovoljenih skokov
private var jumpPressed : int = 0; //šteje kolikokrat je bil skok aktiviran

//swipe variables
private var minSwipeDistY : float = 10;
private var minSwipeDistX : float = 10;
private var startPos :Vector2; 

//Change between Swipe & Touch Control
static var SwipeAndTouch : int; // 0 - Touch; 1 - Swipe

var jumpSound : AudioClip;
var snowHit : AudioClip;
private var landing : boolean = false;
private var ds : boolean = true; //proti double sound pri landing

//spawn razbite krogle
var razbitaKrogla : GameObject;

//za zaznavo premika med premikanjem
private var rightPlus : int;
private var leftPlus : int;

//skripta za pauseButton - for swipe/touch disable in pause game
var pauseScript : PauseButton;

//da ni premika ko odpavzirađ
var dontMove : boolean;

function Start ()
{
	//
	isMoving = false;
	odbojR = false;
	odbojL = false;
	jumpPressed = 0;
	landing = false;
	ds = true;
	//
	dontMove = false;

	rightPlus = 0;
	leftPlus = 0;

	odbojR = false;
	odbojL = false;

	startBallPosX = 0;

	// getting distance from center to ground
	distToGround = GetComponent.<Collider>().bounds.extents.y;
	
	SwipeAndTouch = PlayerPrefs.GetInt ("SwipeTouch");

	oviraHit = false;
	oviraHit2 = false;
}

function Update () 
{
	//touch 
	if (SwipeAndTouch == 0  && Moving.startMoving && pauseScript.notPaused)
	{
		for (var i = 0; i < Input.touchCount; ++i) 
		{
			
	        var touch2 : Touch;
	        touch2 = Input.GetTouch(i);
	        if (touch2.phase == TouchPhase.Began) 
	        {
	           if (touch2.position.x > (Screen.width/3*2) && touch2.position.y < (Screen.height /4*3)) //&& touch2.position.y < (Screen.height /3*2)) 
	           {
	                moveRight ();
	           }
	           else if (touch2.position.x < (Screen.width/3) && touch2.position.y < (Screen.height /4*3)) // && touch2.position.y < (Screen.height /3*2)) 
	           {
	                moveLeft ();
	           }

	           if (touch2.position.x < (Screen.width/3*2) && touch2.position.x > (Screen.width/3)) // && touch2.position.y < (Screen.height /3*2))
	           {
	           		jump();
	           }
			}
	     }
	}

    //Swipe Coiontrol
	if (Input.touchCount > 0 && SwipeAndTouch == 1 && pauseScript.notPaused) 
	{
		var touch : Touch = Input.touches[0];
		switch (touch.phase) 
		{
			case TouchPhase.Began:
			startPos = touch.position;
			break;

			case TouchPhase.Ended:
			var swipeDistVertical : float;
			swipeDistVertical = (new Vector3(0, touch.position.y, 0) - new Vector3(0, startPos.y, 0)).magnitude;

			var swipeDistHorizontal : float;
			swipeDistHorizontal = (new Vector3(touch.position.x,0, 0) - new Vector3(startPos.x, 0, 0)).magnitude;


			var swipeValue : float;
			if (swipeDistVertical > swipeDistHorizontal && swipeDistVertical > minSwipeDistY && Moving.startMoving) 
			{
				swipeValue = Mathf.Sign(touch.position.y - startPos.y);

				if (swipeValue > 0 && !dontMove)//up
				{   
					jump();
				}
			}
			 
			if (swipeDistVertical < swipeDistHorizontal && swipeDistHorizontal > minSwipeDistX && Moving.startMoving) 
			{
				swipeValue = Mathf.Sign(touch.position.x - startPos.x);
 
				if (swipeValue > 0 && !dontMove)//right
				{
					moveRight ();
				}
				else if (swipeValue < 0 && !dontMove)//left
				{   
					moveLeft ();
				}
			}
			break;
		}
		dontMove = false;
	}

	//forced rotation if moving
	if (Moving.startMoving == true)
	{
		transform.Rotate (0, -650 * Time.deltaTime, 0);
	}

	//

	//začni premikat s tipko Down
	if (Input.GetKeyDown ("down"))
	{
		Moving.startMoving = true;
	}

	//Skok navzgor s pritiskom na tipko UpArrow
	if (Input.GetKeyDown ("up") && pauseScript.notPaused)
	{
		jump();
	}

	//Klic funkcije za premik DESNO s pritiskom na tipko RightArrow
	if (Input.GetKeyDown("right") && pauseScript.notPaused)
	{
		moveRight();
	}

	//Klic funkcije za premik LEVO s pritiskom na tipko LeftArrow
	if (Input.GetKeyDown("left") && pauseScript.notPaused)
	{
		moveLeft();
	}

	//za sound ko pristaneš

	if (IsGrounded() == false && landing == false && ds)
	{
		ds = false;
		LandingBool();
	}

	if (IsGrounded() && landing)
	{
		WaitLandSound();
	}
}

//checking if on the ground. Return true if we are, else return null
public function IsGrounded () : boolean 
{
	return Physics.Raycast (transform.position, - Vector3.up, distToGround + 0.1);
}

//funkcija za premik v desno in odboj od desne ograje
function moveR ()
{
//	if (!oviraHit)
//	{
		MoveSound.PlayMoveSound = true;
//	}
	while (transform.position.x < endBallPosX && !odbojR && !oviraHit)
	{
		transform.position = Vector3.MoveTowards(transform.position, new Vector3 (endBallPosX, transform.position.y, transform.position.z), Time.deltaTime * speed);
		//transform.position.x += speed * Time.deltaTime;
		yield;
	}

	if (odbojR)
	{
		transform.position.x = 4;
		startBallPosX = 4;
		endBallPosX = 4;
		odbojR = false;
		OgrajaHit.triggerOnce = false;
	}
	if (!oviraHit)
	{
		transform.position.x = endBallPosX;
	}
	isMoving = false;

	//	if you hit an obsticle from the side
	if (oviraHit)
	{
		oviraHit = false;
		moveLeft();
	}

	//še en premik če je bl zabeležen klik med premikom
	if (rightPlus == 1 && !oviraHit2)
	{
		while (isMoving)
		{
			yield;
		}
		rightPlus = 0;
		moveRight();
	}

	else if (leftPlus == 1 && !oviraHit2)
	{
		while (isMoving)
		{
			yield;
		}
		leftPlus = 0;
		moveLeft();
	}

	if (oviraHit2)
	{
		oviraHit2 = false;
	}
}

//funkcija za premik v levo in odboj od desne ograje
function moveL ()
{
//	if (!oviraHit)
//	{
		MoveSound.PlayMoveSound = true;
//	}
	while (transform.position.x > endBallPosX && !odbojL && !oviraHit)
	{
		transform.position = Vector3.MoveTowards(transform.position, new Vector3 (endBallPosX, transform.position.y, transform.position.z), Time.deltaTime * speed);
		//transform.position.x -= speed * Time.deltaTime;
		yield;
	}

	if (odbojL == true)
	{
		transform.position.x = -4;
		startBallPosX = -4;
		endBallPosX = -4;
		odbojL = false;
		OgrajaHit.triggerOnce = false;
	}
	if(!oviraHit)
	{
		transform.position.x = endBallPosX;
	}
	isMoving = false;

	//	if you hit an obsticle from the side
	if (oviraHit)
	{
		oviraHit = false;
		moveRight();
	}

	//še en premik če je bl zabeležen klik med premikom
	if (rightPlus == 1 && !oviraHit2)
	{
		while (isMoving)
		{
			yield;
		}
		rightPlus = 0;
		moveRight();
	}

	else if (leftPlus == 1 && !oviraHit2)
	{
		while (isMoving)
		{
			yield;
		}
		leftPlus = 0;
		moveLeft();
	}

	if (oviraHit2)
	{
		oviraHit2 = false;
	}
}


//svoje funkcije za touch
function startMoving ()
{
	Moving.startMoving = true;
}

function jump ()
{
	GetComponent.<AudioSource>().clip = jumpSound;
	GetComponent.<AudioSource>().pitch = Random.Range (0.85, 1);
	GetComponent.<AudioSource>().volume = 0.6;

	++ jumpPressed;
	if (IsGrounded())
	{
		jumpPressed = 1;
		GetComponent.<AudioSource>().Play();
		GetComponent.<Rigidbody>().velocity.y = jumpHight;

		//	jump challange
		if (DailyChallangeSet.challBools[4])
		{
			if (PlayerPrefs.GetInt("ChallangeOne") == 4)
			{
				DailyChallangeProgress.challProg1 ++;
			}
			else if (PlayerPrefs.GetInt("ChallangeTwo") == 4)
			{
				DailyChallangeProgress.challProg2 ++;
			}
			else if (PlayerPrefs.GetInt("ChallangeThree") == 4)
			{
				DailyChallangeProgress.challProg3 ++;
			}
		}
	}
	else if (IsGrounded != true && jumpPressed <= jumpNum)
	{
		GetComponent.<AudioSource>().Play();
		GetComponent.<Rigidbody>().velocity.y = jumpHight;

		//	double jump challange
		if (DailyChallangeSet.challBools[5])
		{
			if (PlayerPrefs.GetInt("ChallangeOne") == 5)
			{
				DailyChallangeProgress.challProg1 ++;
			}
			else if (PlayerPrefs.GetInt("ChallangeTwo") == 5)
			{
				DailyChallangeProgress.challProg2 ++;
			}
			else if (PlayerPrefs.GetInt("ChallangeThree") == 5)
			{
				DailyChallangeProgress.challProg3 ++;
			}
		}
	}
	/* //koda za jump pred implementacijo dvojnega skoka
	if (IsGrounded ())
	{
		GetComponent.<Rigidbody>().velocity.y = jumpHight;
	}
	*/
}

function moveRight ()
{
	if (isMoving == false)
	{
		isMoving = true;
		endBallPosX = startBallPosX + 2;
		moveR ();
		startBallPosX += 2;
	}
	else if (isMoving && leftPlus == 0)
	{
		rightPlus = 1;
	}
}

function moveLeft ()
{
	if (isMoving == false)
	{
		isMoving = true;
		endBallPosX = startBallPosX - 2;
		moveL ();
		startBallPosX -= 2;
	}
	else if (isMoving && rightPlus == 0)
	{
		leftPlus = 1;
	}
}

//za landing sound
function LandingBool ()
{
	while (landing == false)
	{
		yield WaitForSeconds (0.1 * GameMaster.timeSpeed);
		landing = true;
	}
}
function WaitLandSound ()
{
	while (landing)
	{
		landing = false;
		GetComponent.<AudioSource>().clip = snowHit;
		GetComponent.<AudioSource>().pitch = Random.Range (0.85, 1);
		GetComponent.<AudioSource>().Play();
		yield WaitForSeconds (0.1 * GameMaster.timeSpeed);
		ds = true;
	}
}

function SpawnBallPieces ()
{
	Instantiate (razbitaKrogla, transform.position, transform.rotation);
	gameObject.SetActive (false);
}

function BallRespawn ()
{
	gameObject.SetActive (true);
	transform.position = new Vector3 (0, 0.3, 0);
	startBallPosX = 0;
	endBallPosX = 0;
	isMoving = false;
	odbojL = false;
}