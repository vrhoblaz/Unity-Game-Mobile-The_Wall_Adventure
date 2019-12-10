#pragma strict

// 2xCoin time left
static var coinTime : float = 0f;
var DoubleCoinSprite : GameObject;
var BlinkCoin : Image;
private var coinBoolean : boolean;

//Shield
static var shieldTime : float = 0f;
var ShieldSprite : GameObject;
var ShieldBall : GameObject;
static var BallShield : GameObject;
var BlinkShield : Image;
private var shieldBoolean : boolean;

//DoubleJump
static var jumpTime : float = 0f;
var JumpSprite : GameObject;
var BlinkJump : Image;
private var jumpBoolean : boolean;

//Slow
static var slowTime : float = 0f;
var SlowSprite : GameObject;
static var slowBoolean = false; //da se samo 1x zmanjša ko se konča
var BlinkSlow : Image;
private var slowBooleanBlink : boolean; //uporabljen pri blinku

//Magnet
static var magnetTime : float = 0f;
var MagnetSprite : GameObject;
var ball : Transform;
static var BallInfo : Transform;
var BlinkMagnet : Image;
private var magnetBoolean : boolean;

//for blinking icon
private var transparecy : float;
private var BlinkSpeed : int;

//	power down sound
var powerDownAudioClip : AudioClip;
static var powerDownBool : boolean;
static var checkIfAudioPlaying : boolean;
//this sound source is on Spawner gameobject now!
var powerDownSource : GameObject;
private var powerDownSoundPaused : boolean;

function Start ()
{
	//
	coinTime = 0f;
	shieldTime = 0f;
	jumpTime = 0f;
	slowTime = 0f;
	magnetTime = 0f;
	slowBoolean = false;
	//
	powerDownSoundPaused = false;
	BallShield = ShieldBall;
	BallInfo = ball;
	transparecy = 1f;
	coinBoolean = false;
	shieldBoolean = false;
	jumpBoolean = false;
	slowBooleanBlink = false;
	magnetBoolean = false;
	powerDownBool = false;
	checkIfAudioPlaying = false;
}

function Update () 
{
	//	To prekine power down sound če pobereš nov poewrup medtem ko se prejšni izteka!
	if (powerDownBool && checkIfAudioPlaying && powerDownSource.GetComponent.<AudioSource>().clip == powerDownAudioClip)
	{
		checkIfAudioPlaying = false;
		powerDownSource.GetComponent.<AudioSource>().Stop();
	}

	//bom kar tukaj notr uštulil
	//PAVZIRANJE in NADALJEVANJE PowerDown sounda ko pavziraš igro! 
	//Trenutno bom kar preko TimeScale-a rešil. Če se mi bo dalo se lahko zveže na gumb
	if (Time.timeScale == 0 && !powerDownSoundPaused)
	{
		powerDownSoundPaused = true;
		powerDownSource.GetComponent.<AudioSource>().Pause();
	}
	if (Time.timeScale != 0 && powerDownSoundPaused)
	{
		powerDownSoundPaused = false;
		powerDownSource.GetComponent.<AudioSource>().UnPause();
	}

	//coin timer
	if (coinTime > 0)
	{
		DoubleCoinSprite.SetActive (true);
		coinTime -= Time.deltaTime / GameMaster.timeSpeed;
		//Debug.Log (coinTime);

		//blinking image
		if (coinTime < 3.5 && coinTime > 0 && coinBoolean == false)
		{
			coinBoolean = true;
			CoinBlink();
		}
		//	time rouning out sound
		if (coinTime <= 3 && coinTime > 0 && powerDownBool)
		{
			powerDownBool = false;
			powerDownSource.GetComponent.<AudioSource>().clip = powerDownAudioClip;
			powerDownSource.GetComponent.<AudioSource>().Play();
		}
	}
	else if (coinTime <= 0)
	{
		DoubleCoinSprite.SetActive (false);
		CoinCollector.CoinMulti = 1;
		coinTime = 0;
	}

	//shiled timer
	if (shieldTime > 0)
	{
		ShieldSprite.SetActive (true);
		shieldTime -= Time.deltaTime / GameMaster.timeSpeed;
		//Debug.Log (shieldTime);

		//blinking image
		if (shieldTime < 3.5 && shieldTime > 0 && shieldBoolean == false)
		{
			shieldBoolean = true;
			ShieldBlink();
		}
		//	time rouning out sound
		if (shieldTime <= 3 && shieldTime > 0 && powerDownBool)
		{
			powerDownBool = false;
			powerDownSource.GetComponent.<AudioSource>().clip = powerDownAudioClip;
			powerDownSource.GetComponent.<AudioSource>().Play();
		}
	}
	else if (shieldTime <= 0 && StartShieldConsum.shieldOn == false)
	{
		ShieldSprite.SetActive (false);
		BallShield.SetActive (false);
		shieldTime = 0;
	}

	//double jump timer
	if (jumpTime > 0)
	{
		JumpSprite.SetActive (true);
		jumpTime -= Time.deltaTime / GameMaster.timeSpeed;
		//Debug.Log (jumpTime);

		//blinking image
		if (jumpTime < 3.5 && jumpTime > 0 && jumpBoolean == false)
		{
			jumpBoolean = true;
			JumpBlink();
		}
		//	time rouning out sound
		if (jumpTime <= 3 && jumpTime > 0  && powerDownBool)
		{
			powerDownBool = false;
			powerDownSource.GetComponent.<AudioSource>().clip = powerDownAudioClip;
			powerDownSource.GetComponent.<AudioSource>().Play();
		}
	}
	else if (jumpTime <= 0)
	{
		JumpSprite.SetActive (false);
		BallControl.jumpNum = 1;
		jumpTime = 0;
	}

	//Slow
	if (slowTime > 0)
	{
		SlowSprite.SetActive (true);
		slowTime -= Time.deltaTime / GameMaster.timeSpeed;
		//Debug.Log (slowTime);

		//blinking image
		if (slowTime < 3.5 && slowTime > 0 && slowBooleanBlink == false)
		{
			slowBooleanBlink = true;
			SlowBlink();
		}
		//	time rouning out sound
		if (slowTime < 3 && slowTime > 0 && powerDownBool)
		{
			powerDownBool = false;
			powerDownSource.GetComponent.<AudioSource>().clip = powerDownAudioClip;
			powerDownSource.GetComponent.<AudioSource>().Play();
		}
	}
	else if (slowTime <= 0)
	{
		SlowSprite.SetActive (false);
		if (slowBoolean)
		{
			GameMaster.timeSpeed += 0.15;
			Time.timeScale += 0.15;
			slowBoolean = false;
		}
		slowTime = 0;
	}

	//Magnet
	if (magnetTime > 0)
	{
		MagnetSprite.SetActive (true);
		magnetTime -= Time.deltaTime / GameMaster.timeSpeed;
		//Debug.Log (magnetTime);

		//blinking image
		if (magnetTime < 3.5 && magnetTime > 0 && magnetBoolean == false)
		{
			magnetBoolean = true;
			MagnetBlink();
		}
		//	time rouning out sound
		if (magnetTime < 3 && magnetTime > 0 && powerDownBool)
		{
			powerDownBool = false;
			powerDownSource.GetComponent.<AudioSource>().clip = powerDownAudioClip;
			powerDownSource.GetComponent.<AudioSource>().Play();
		}
	}
	else if (magnetTime <= 0)
	{
		MagnetSprite.SetActive (false);
		CoinMagnet.a = false;
		magnetTime = 0;
	}
}


//funkcije za blink
function CoinBlink ()
{
	while (coinBoolean)
		{
			//da spreminja predznak
			if (transparecy >= 1)
			{
				BlinkSpeed = -40;
			}
			else if (transparecy <= 0)
			{
				BlinkSpeed = 40;
			}

			transparecy += 0.05f * Time.deltaTime * BlinkSpeed;
			BlinkCoin.color.a = transparecy;
			if (coinTime <= 0 || coinTime > 3.5)
			{
				coinBoolean = false;
				transparecy = 1f;
				BlinkCoin.color.a = transparecy;
			}
			yield;
		}
}

function ShieldBlink ()
{
	while (shieldBoolean)
		{
			//da spreminja predznak
			if (transparecy >= 1)
			{
				BlinkSpeed = -40;
			}
			else if (transparecy <= 0)
			{
				BlinkSpeed = 40;
			}

			transparecy += 0.05f * Time.deltaTime * BlinkSpeed;
			BlinkShield.color.a = transparecy;
			if (shieldTime <= 0 || shieldTime > 3.5)
			{
				shieldBoolean = false;
				transparecy = 1f;
				BlinkShield.color.a = transparecy;
			}
			yield;
		}
}

function JumpBlink ()
{
	while (jumpBoolean)
		{
			//da spreminja predznak
			if (transparecy >= 1)
			{
				BlinkSpeed = -40;
			}
			else if (transparecy <= 0)
			{
				BlinkSpeed = 40;
			}

			transparecy += 0.05f * Time.deltaTime * BlinkSpeed;
			BlinkJump.color.a = transparecy;
			if (jumpTime <= 0 || jumpTime > 3.5)
			{
				jumpBoolean = false;
				transparecy = 1f;
				BlinkJump.color.a = transparecy;
			}
			yield;
		}
}

function SlowBlink ()
{
	while (slowBooleanBlink)
		{
			//da spreminja predznak
			if (transparecy >= 1)
			{
				BlinkSpeed = -40;
			}
			else if (transparecy <= 0)
			{
				BlinkSpeed = 40;
			}

			transparecy += 0.05f * Time.deltaTime * BlinkSpeed;
			BlinkSlow.color.a = transparecy;
			if (slowTime <= 0 || slowTime > 3.5)
			{
				slowBooleanBlink = false;
				transparecy = 1f;
				BlinkSlow.color.a = transparecy;
			}
			yield;
		}
}

function MagnetBlink ()
{
	while (magnetBoolean)
		{
			//da spreminja predznak
			if (transparecy >= 1)
			{
				BlinkSpeed = -40;
			}
			else if (transparecy <= 0)
			{
				BlinkSpeed = 40;
			}

			transparecy += 0.05f * Time.deltaTime * BlinkSpeed;
			BlinkMagnet.color.a = transparecy;
			if (magnetTime <= 0 || magnetTime > 3.5)
			{
				magnetBoolean = false;
				transparecy = 1f;
				BlinkMagnet.color.a = transparecy;
			}
			yield;
		}
}

function PowerDownSoundStop ()
{
	coinTime = 0;
	shieldTime = 0;
	jumpTime = 0;
	magnetTime = 0;
	slowTime = 0;
	powerDownSource.GetComponent.<AudioSource>().Stop();
}