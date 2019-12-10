#pragma strict

private var a : int = 0;
private var b : int = 0;
private var c : int = 0;
private var d : int = 0;
private var e : int = 0;
private var f : int = 0;
private var g : int = 0;
private var h : int = 0;

function Start () {
	switch (Coin2x.time2xCoin)
	{
		case 10f : a = 0;
			break;
		case 15f : a = 1;
			break;
		case 20f : a = 2;
			break;
		case 25f : a = 3;
			break;
		case 30f : a = 4;
			break;
		case 45f : a = 5;
			break;
	}
	switch (DoubleJump.timeDoubleJump)
	{
		case 10f : b = 0;
			break;
		case 15f : b = 1;
			break;
		case 20f : b = 2;
			break;
		case 25f : b = 3;
			break;
		case 30f : b = 4;
			break;
		case 45f : b = 5;
			break;
	}
	switch (Magnet.timeMagnet)
	{
		case 10f : c = 0;
			break;
		case 15f : c = 1;
			break;
		case 20f : c = 2;
			break;
		case 25f : c = 3;
			break;
		case 30f : c = 4;
			break;
		case 45f : c = 5;
			break;
	}
	switch (Shield.timeShield)
	{
		case 10f : d = 0;
			break;
		case 15f : d = 1;
			break;
		case 20f : d = 2;
			break;
		case 25f : d = 3;
			break;
		case 30f : d = 4;
			break;
		case 45f : d = 5;
			break;
	}
	switch (Slow.timeSlow)
	{
		case 10f : e = 0;
			break;
		case 15f : e = 1;
			break;
		case 20f : e = 2;
			break;
		case 25f : e = 3;
			break;
		case 30f : e = 4;
			break;
		case 45f : e = 5;
			break;
	}
	switch (Health.maxLife)
	{
		case 3 : f = 0;
			break;
		case 4 : f = 1;
			break;
		case 5 : f = 2;
			break;
		case 6 : f = 3;
			break;
	}
	switch (KickStart.kickStartDist)
	{
		case 250 : g = 0;
			break;
		case 500 : g = 1;
			break;
		case 750 : g = 2;
			break;
	}
	switch (KickStart.kickStartDist)
	{
		case 1 : h = 0;
			break;
		case 2 : h = 1;
			break;
		case 3 : h = 2;
			break;
	}
	PlayerPrefs.SetInt ("NoOfUpgrades", (a + b + c + d + e + f + g + h));
	PlayerPrefs.Save();
}


/*
	10f
	15f
	20f
	25f
	30f
	45f
	Coin2x.time2xCoin == 30f
	DoubleJump.timeDoubleJump == 15f
	Magnet.timeMagnet == 20f
	Shield.timeShield == 30f
	Slow.timeSlow == 15f

	3
	4
	5
	6
	Health.maxLife == 3

	250
	500
	750
	KickStart.kickStartDist == 250

	1
	2
	3
	StartShieldConsum.maxShieldHit == 1
	*/
