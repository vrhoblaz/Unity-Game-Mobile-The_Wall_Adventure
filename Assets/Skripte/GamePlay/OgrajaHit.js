#pragma strict

//ne dajej tega v Awake/Start ker se potem proži vedno ko se spawna nov object
static var triggerOnce = false;
static var fenceShieldHitCounter : int = 0;

function OnTriggerEnter (col : Collider)
{
	if (col.tag == "Player" && transform.position.x >= 0 && triggerOnce == false)
	{
		triggerOnce = true;
		BallControl.odbojR = true;
		lifeDecrese ();
		PlayOgrajaHitSound();
		if (DailyChallangeSet.challBools[6])
		{
			FanceChallangeCounter();
		}
	}
	else if (col.tag == "Player" && transform.position.x <= 0 && triggerOnce == false)
	{
		triggerOnce = true;
		BallControl.odbojL = true;
		lifeDecrese ();
		PlayOgrajaHitSound();
		if (DailyChallangeSet.challBools[6])
		{
			FanceChallangeCounter();
		}
	}

	if (col.tag == "Shield" && transform.position.x >= 0 && triggerOnce == false)
	{
		PlayOgrajaHitSound();
		fenceShieldHitCounter ++;
		if (StartShieldConsum.shieldOn)
		{
			StartShieldConsum.shieldHitCounter ++;
			StartShieldConsum.protectorColor --;
			DamageTaken.damageTakeBlueRed = true;
		}
		if (StartShieldConsum.shieldOn == false && fenceShieldHitCounter < 2)
		{
			DamageTaken.damageTakeBlue = true;
		}
		else if (StartShieldConsum.shieldOn == false && fenceShieldHitCounter >= 2)
		{
			fenceShieldHitCounter = 0;
			DamageTaken.damageTakeBlueRed = true;
			lifeDecrese ();
		}
		triggerOnce = true;
		BallControl.odbojR = true;
		//lifeDecrese ();
		if (DailyChallangeSet.challBools[6])
		{
			FanceChallangeCounter();
		}
	}
	else if (col.tag == "Shield" && transform.position.x <= 0 && triggerOnce == false)
	{	
		PlayOgrajaHitSound();
		fenceShieldHitCounter ++;
		if (StartShieldConsum.shieldOn)
		{
			StartShieldConsum.shieldHitCounter ++;
			StartShieldConsum.protectorColor --;
			DamageTaken.damageTakeBlueRed = true;
		}
		if (StartShieldConsum.shieldOn == false && fenceShieldHitCounter < 2)
		{
			DamageTaken.damageTakeBlue = true;
		}
		//zdj se raniš za vsak drug hit! Prestavi v sam shield če hočeš tudi za ostale stvari ...
		else if (StartShieldConsum.shieldOn == false && fenceShieldHitCounter >= 2)
		{
			fenceShieldHitCounter = 0;
			DamageTaken.damageTakeBlueRed = true;
			lifeDecrese ();
		}
		triggerOnce = true;
		BallControl.odbojL = true;
		//lifeDecrese ();
		if (DailyChallangeSet.challBools[6])
		{
			FanceChallangeCounter();
		}
	}
}

function lifeDecrese () //potrebna posebna funkcija da se izognem dvojnemu odštevanu - ne vem več kaj je pomen
{
	Health.currLife -= 1;
	GameMaster.roundLifeLost ++;
	DamageTaken.damageTake = true;
//	Debug.Log ("hit");

	//	Health Challange
	if (DailyChallangeSet.challBools[16])
	{
		if (PlayerPrefs.GetInt("ChallangeOne") == 16)
		{
			DailyChallangeProgress.challProg1 ++;
		}
		else if (PlayerPrefs.GetInt("ChallangeTwo") == 16)
		{
			DailyChallangeProgress.challProg2 ++;
		}
		else if (PlayerPrefs.GetInt("ChallangeThree") == 16)
		{
			DailyChallangeProgress.challProg3 ++;
		}
	}

	yield WaitForSeconds (3 * GameMaster.timeSpeed);	//why is this here?????? delete it and test for possible change
}

function PlayOgrajaHitSound ()
{
	//Debug.Log("OgrajaSound");
	GetComponent.<AudioSource>().pitch = Random.Range (0.85, 1.1);
	GetComponent.<AudioSource>().volume = 0.8;
	GetComponent.<AudioSource>().Play();
}

//	Fance Hit Challange
function FanceChallangeCounter ()
{
	if (PlayerPrefs.GetInt("ChallangeOne") == 6)
	{
		DailyChallangeProgress.challProg1 ++;
	}
	else if (PlayerPrefs.GetInt("ChallangeTwo") == 6)
	{
		DailyChallangeProgress.challProg2 ++;
	}
	else if (PlayerPrefs.GetInt("ChallangeThree") == 6)
	{
		DailyChallangeProgress.challProg3 ++;
	}
}
