#pragma strict

static var respawning : boolean;

function Start ()
{
	respawning = false;
}

function OnTriggerEnter (infor : Collider)
{
	if (infor.tag == "Player" && !respawning)
	{
		BallControl.oviraHit = true;
		BallControl.oviraHit2 = true;
		//	Life decrese
		Health.currLife -= 1;
		GameMaster.roundLifeLost ++;
		DamageTaken.damageTake = true;
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
	}

	else if (infor.tag == "Shield" && !respawning)
	{
		if (StartShieldConsum.shieldOn)
		{
			StartShieldConsum.shieldHitCounter ++;
			StartShieldConsum.protectorColor --;
			DamageTaken.damageTakeBlueRed = true;
		}
		else if (StartShieldConsum.shieldOn == false)
		{
			DamageTaken.damageTakeBlue = true;
		}
		BallControl.oviraHit = true;
		BallControl.oviraHit2 = true;
	}
}
