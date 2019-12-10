#pragma strict

var wholeGlass : GameObject;
//var brokenGlass : GameObject;
private var fractScript : Fractions;

function Start ()
{
	fractScript = GameObject.Find ("GameMaster").GetComponent("Fractions");
}

function OnTriggerEnter (colinfo : Collider)
{
	if (colinfo.tag == "Player" || colinfo.tag == "Shield")
	{
		transform.parent.GetComponent.<AudioSource>().pitch = Random.Range (0.85, 1);
		transform.parent.GetComponent.<AudioSource>().Play();

		if (Timer.shieldTime <= 0 && StartShieldConsum.shieldOn == false)
		{
//			brokenGlass.SetActive (true);
			if (gameObject.tag != "GlassSmall")
			{
				Instantiate (fractScript.oviraGlassFract, transform.position, transform.rotation);
			} else {
				Instantiate (fractScript.oviraGlassSmallFract, transform.position, transform.rotation);
			}
			wholeGlass.SetActive (false);
			Health.currLife -= 1;
			GameMaster.roundLifeLost ++;
			GameMaster.SingleRunObsticlesDestroyed ++;
			DamageTaken.damageTake = true;
			//Debug.Log ("hit");
			Destroy (gameObject);
			if (DailyChallangeSet.challBools[16])
			{
				HealthDecreseChallange();
			}
		}
		if (Timer.shieldTime > 0 && StartShieldConsum.shieldOn == false)
		{
//			brokenGlass.SetActive (true);
			if (gameObject.tag != "GlassSmall")
			{
				Instantiate (fractScript.oviraGlassFract, transform.position, transform.rotation);
			} else {
				Instantiate (fractScript.oviraGlassSmallFract, transform.position, transform.rotation);
			}
			wholeGlass.SetActive (false);
			DamageTaken.damageTakeBlue = true;
			//Debug.Log ("hit");
			Destroy (gameObject);
		}
	}
	if (colinfo.tag == "Shield")
	{
		if (StartShieldConsum.shieldOn)
		{
//			brokenGlass.SetActive (true);
			if (gameObject.tag != "GlassSmall")
			{
				Instantiate (fractScript.oviraGlassFract, transform.position, transform.rotation);
			} else {
				Instantiate (fractScript.oviraGlassSmallFract, transform.position, transform.rotation);
			}
			wholeGlass.SetActive (false);
			StartShieldConsum.shieldHitCounter ++;
			StartShieldConsum.protectorColor --;
			DamageTaken.damageTake = true;
//			Debug.Log ("hit");
			Destroy (gameObject);
		}
	}
}

private function HealthDecreseChallange()
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