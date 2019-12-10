#pragma strict

//var newGround : GameObject;
//var newZid : GameObject;

var singleCoin : GameObject;
var CoinArray : GameObject [];
var PowerUpArray : GameObject [];

private var gostotaSpawnanja : int = 5;
private var randOvira : int;
private var powerUpCounter : int = 5;

//ovire arrays
var OviraIArray : GameObject[];
var OviraIIArray : GameObject[];
//var OviraIIIArray : GameObject [];
//var OviraIVArray : GameObject [];

var novaOviraArray : GameObject[];

//array for rand pos
private var xPos : int = 0;
private var Pos5 : int[] = [-4, -2, 0, 2, 4];
private var Pos9 : int[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
private var Pos3 : int[] = [-2, 0 , 2];
private var xPosRand = 2;

private var a = 0; //šteje podlage
//private var b = 0; //šteje do 1 za spavnanje spodnjega zidu

//	Spawn coinsov pri KickStartu
private var coinPosKS : int;						 // pri kick startu
private var firstCoin : boolean = true;
private var moveRightOrLeft : int = 0;			// 0-left;	1-right;
private var waitForMove : int = 0;				//da počaka da se zgodi celoten premik
private var movingToNextPos : boolean = false;
private var counterKS : int = 0;
private var presledek : int = 0;

//spawna ovire pred spawn-arjem da ni tokiko časa nič
function Start ()
{
	//
	gostotaSpawnanja = 5;
	powerUpCounter = 5;
	xPos = 0;
	xPosRand = 2;
	a = 0;
	firstCoin = true;
	moveRightOrLeft = 0;
	waitForMove = 0;
	movingToNextPos = false;
	counterKS = 0;
	presledek = 0;
	//
	StartSpawn ();
	if (PlayerPrefs.GetInt ("endedGames") < 35)
	{
		gostotaSpawnanja ++;
	}
}

function OnTriggerEnter (colinfo : Collider)
{
	if (colinfo.tag == "Spawn")
	{	
		a += 1;

		//spawn ovir
		if (a >= gostotaSpawnanja && KickStart.kickStart == false)
		{
			if (GameMaster.Distance < 250)
			{
				randOvira = Random.Range (0, OviraIArray.length);
				if (randOvira == 4)
				{
					xPosRand = Random.Range (1, 5);
					xPos = Pos5[xPosRand];
				}
				if (randOvira == 5)
				{
					xPosRand = Random.Range (0, 4);
					xPos = Pos5[xPosRand];
				}
				if (randOvira == 6 || randOvira == 9)
				{
					xPosRand = Random.Range (0, 5);
					xPos = Pos5[xPosRand];
				}
				if (randOvira == 10)
				{
					xPosRand = Random.Range (1, 4);
					xPos = Pos5[xPosRand];
				}
				Instantiate (OviraIArray[randOvira], colinfo.transform.position + Vector3 (xPos, 0, 6), transform.rotation);
			}
			else if (GameMaster.Distance > 250 /*&& GameMaster.Distance < 1000*/)
			{
				randOvira = Random.Range (0, OviraIIArray.length);
				Instantiate (OviraIIArray[randOvira], colinfo.transform.position + Vector3 (0, 0, 6), transform.rotation);
			}
			/*
			else if (GameMaster.Distance > 1000 && GameMaster.Distance < 2000)
			{
				randOvira = Random.Range (0, OviraIIIArray.length);
				Instantiate (OviraIIIArray[randOvira], colinfo.transform.position + Vector3 (0, 0, 6), transform.rotation);
			}
			else if (GameMaster.Distance > 2000)
			{
				randOvira = Random.Range (0, OviraIVArray.length);
				Instantiate (OviraIVArray[randOvira], colinfo.transform.position + Vector3 (0, 0, 6), transform.rotation);
			}
			*/
			xPos = 0;
		}

		//PowerUp & Coins
		if (a == 2 && !KickStart.kickStart)
		{
			//gostota spavnanja ovir
			//prvi if postavi na 5 v primeru prvih nekaj iger ko se začne na 6. Naprej je že tako ali tako na 5
			if (GameMaster.Distance > 500)
			{
				gostotaSpawnanja = 5;
			}
			if (GameMaster.Distance > 1000)
			{
				gostotaSpawnanja = 4;
			}
			if (GameMaster.Distance > 2000)
			{
				gostotaSpawnanja = 3;
			}
			if (GameMaster.Distance > 2430)
			{
				gostotaSpawnanja = 4;
			}
			if (GameMaster.Distance > 3000)
			{
				gostotaSpawnanja = 3;
			}

			var powerUp = Random.Range (0, 10);
			//5 je kr ena random številka - lahko spremeniš - važno samo razmerje (1/15); powerUpCounter da niso power-ups prepogosto
			if (powerUp == 5 && powerUpCounter >= 5) 
			{
				var randPowUp = Random.Range (0, PowerUpArray.length);
				if (randPowUp == 6)
				{
					xPosRand = 2;
				}
				else 
				{
					xPosRand = Random.Range (0, 5);
				}
				Instantiate (PowerUpArray[randPowUp], colinfo.transform.position + Vector3 (Pos5[xPosRand], 0, 6), transform.rotation);
				powerUpCounter = 0;
			}
			else
			{
				//odloči ali bo PRESET coin ali bo NA NOVO generiran
				var presetOrNew = Random.Range (0,3);
				//preset coin
				if (presetOrNew == 0)
				{
					var randCoin = Random.Range (0, CoinArray.length);
					var coinRandPresetPosition : int = 0;
					if (randCoin == 5 || randCoin == 6)
					{
						coinRandPresetPosition = Random.Range (-1,3);
						coinRandPresetPosition = coinRandPresetPosition * 2;
					}
					if (randCoin == 7 || randCoin == 8)
					{
						coinRandPresetPosition = Random.Range (-1,2);
						coinRandPresetPosition = coinRandPresetPosition * 2;
					}
					Instantiate (CoinArray[randCoin], colinfo.transform.position + Vector3 (coinRandPresetPosition, 0, 6), transform.rotation);
				}
				//na novo generirani coinsi
				else
				{
					var c = 1; //preverja ali je bil random pogoj izpolnjen
					var d = 5; //številka za vrjetnost spavnanja naslednjega coina
					var e = 0; //število coinsov ki se jih bo spavnalo
					while (c != 0)
					{
						c = Random.Range (0,d);
						d -= 1;
						e += 1;
					}

					var randPos1 = Random.Range (0,5);
					var randPos2 : int; // za premik
					var PositionX = Pos5[randPos1]; //pozicija prvega coina
					randPos1 = randPos1 * 2;
					var f = -4; // za Z pozicijo
					var g = 0; //če se premik začne se naslednji coin tudi premakne - ker gre po 1 namesto 2
					//spawn coinsov
					while (e != 0)
					{
						Instantiate (singleCoin, colinfo.transform.position + Vector3 (PositionX, 0, f), transform.rotation);
						if (g == 0)
						{
							//3x if da preprečim out of range pri Pos9
							if (randPos1 == 0)
							{
								randPos2 = Random.Range (0,2);
							}
							if (randPos1 == 8)
							{
								randPos2 = Random.Range (-1,1);
							}
							if (randPos1 != 0 && randPos1 != 8)
							{
								randPos2 = Random.Range (-1,2);
							}
						}
						randPos1 += randPos2;
						if (randPos1 == 1 || randPos1 == 3 || randPos1 == 5 || randPos1 == 7)
						{
							g = 1;
						}
						else if (randPos1 == 0 || randPos1 == 2 || randPos1 == 4 || randPos1 == 6 || randPos1 == 8)
						{
							g = 0;
						}
						PositionX = Pos9[randPos1];

						e -= 1;
						f += 2;
					}																				
				}
			}
		powerUpCounter ++;
		}

		//	Spawnanje coinsov ob KickStartu
		if (KickStart.kickStart && GameMaster.Distance < (KickStart.kickStartDist - 70))
		{
			//	if samo izvede pri prvem coin-u ko se igra začne - določi pozicijo kovanca
			if (firstCoin)
			{
				firstCoin = false;						//	simple bool
				var tempInt : int = Random.Range(0, 5);	// rand num za pozicjo iz arraya Pos5
				coinPosKS = Pos5[tempInt];				//	Actual position form array Pos5
			}
			var zPosKS : int = -4;			//Določi z pozicijo kovanca. Ta se poveča za 2 ob vsakem spavnu zaradi premika
			if (counterKS < Random.Range(3,7))
			{
				for (var st : int = 5; st != 0; st--)
				{
					Instantiate (singleCoin, colinfo.transform.position + Vector3 (coinPosKS, 0, zPosKS), transform.rotation);
					zPosKS += 2;					// +2 pri z poziciji za naslednji kovanec
				
					//celoten spodnji if/else določa če se bo zgodil premik kovanca levo/desno ali ne
					if (Random.Range(0,5) == 1 && !movingToNextPos)
					{
						movingToNextPos = true;
						waitForMove = 0;
						//	Zgolj določa smer premika
						if (Random.Range(0,2) == 1)
						{
							if (coinPosKS < 4)
							{
								moveRightOrLeft = 1;
							}
							else
							{
								moveRightOrLeft = 0;
							}
						}
						else
						{
							if(coinPosKS > -4)
							{
								moveRightOrLeft = 0;
							}
							else
							{
								moveRightOrLeft = 1;
							}
						}
					}

					// Dejanski premik
					if (moveRightOrLeft == 0 && movingToNextPos)	// go left
					{
						coinPosKS --;
						if (waitForMove == 1)
						{
							movingToNextPos = false;
						}
						waitForMove ++;
					}
					else if (moveRightOrLeft == 1 && movingToNextPos)	//go right
					{
						coinPosKS ++;
						if (waitForMove == 1)
						{
							movingToNextPos = false;
						}
						waitForMove ++;
					}
				}
			}
			else 
			{
				presledek ++;
				if (presledek > Random.Range(1,5))
				{
					presledek = 0;
					counterKS = 0;
				}
			}
		counterKS ++;
		}

		//Postavi "a" na 0 če je potrebno
		if (a >= gostotaSpawnanja)
		{
			a = 0;
		}
	}
}

var startCoinPos : int;

function StartSpawn ()
{
	startCoinPos = 15;
	SpawnStartCoins ();
	//nastavitev težavnosti
	var tezavnost : int; //0-super easy; 1-easy; 2-medium; 3-normal;
	if (PlayerPrefs.GetInt ("endedGames") < 5)
	{
		tezavnost = 0;
	}
	else if (PlayerPrefs.GetInt ("endedGames") >= 5 && PlayerPrefs.GetInt ("endedGames") < 15)
	{
		tezavnost = 1;
	}
	else if (PlayerPrefs.GetInt ("endedGames") >= 15 && PlayerPrefs.GetInt ("endedGames") < 30)
	{
		tezavnost = 2;
	}
	else if (PlayerPrefs.GetInt ("endedGames") >= 30)
	{
		tezavnost = 3;
	}

	for (var ii : int = 0; ii < 1; ii++)
	{
		yield WaitForSeconds (0.5f);
	}
	// 130 90 50
	var ik : int = 50;
	xPos = 0;
	for (var ij : int = 0; ij < 3; ij++)
	{
		randOvira = Random.Range (0, OviraIArray.length);
		if (randOvira == 4)
		{
			xPosRand = Random.Range (1, 5);
			xPos = Pos5[xPosRand];
		}
		if (randOvira == 5)
		{
			xPosRand = Random.Range (0, 4);
			xPos = Pos5[xPosRand];
		}
		if (randOvira == 6 || randOvira == 9)
		{
			xPosRand = Random.Range (0, 5);
			xPos = Pos5[xPosRand];
		}
		if (randOvira == 10)
		{
			xPosRand = Random.Range (1, 4);
			xPos = Pos5[xPosRand];
		}

		//spawn različen pri različnih težavnostih
		switch (tezavnost)
		{
			case 0:
				startCoinPos = ik;
				SpawnStartCoins ();
				break;
			case 1:
				if (ij == 1)
				{
					Instantiate (OviraIArray[randOvira], new Vector3 (xPos, 0, ik), transform.rotation);
				}
				else
				{
					startCoinPos = ik;
					SpawnStartCoins ();
				}
				break;
			case 2 :
				if (ij == 0 || ij == 2)
				{
					Instantiate (OviraIArray[randOvira], new Vector3 (xPos, 0, ik), transform.rotation);
				}
				else
				{
					startCoinPos = ik;
					SpawnStartCoins ();
				}
				break;
			case 3:
				Instantiate (OviraIArray[randOvira], new Vector3 (xPos, 0, ik), transform.rotation);
				break;
				
		}

		ik += 40;
		xPos = 0;
	}
}

function SpawnObstAfterKickStart ()
{
	for (var ii : int = 0; ii < 1; ii++)
	{
		yield WaitForSeconds (0.5f);
	}
	// 130 90 50
	var ik : int = 130;
	xPos = 0;
	for (var ij : int = 0; ij < 2; ij++)
	{
		randOvira = Random.Range (0, OviraIArray.length);
		if (randOvira == 4)
		{
			xPosRand = Random.Range (1, 5);
			xPos = Pos5[xPosRand];
		}
		if (randOvira == 5)
		{
			xPosRand = Random.Range (0, 4);
			xPos = Pos5[xPosRand];
		}
		if (randOvira == 6 || randOvira == 9)
		{
			xPosRand = Random.Range (0, 5);
			xPos = Pos5[xPosRand];
		}
		if (randOvira == 10)
		{
			xPosRand = Random.Range (1, 4);
			xPos = Pos5[xPosRand];
		}
		Instantiate (OviraIArray[randOvira], new Vector3 (xPos, 0, ik), transform.rotation);
		ik += 60;
		xPos = 0;
	}
}

function SpawnStartCoins ()
{
	var c = 1; //preverja ali je bil random pogoj izpolnjen
	var d = 5; //številka za vrjetnost spavnanja naslednjega coina
	var e = 0; //število coinsov ki se jih bo spavnalo
	while (c != 0)
	{
		c = Random.Range (0,d);
		d -= 1;
		e += 1;
	}

	var randPos1 = Random.Range (0,5);
	var randPos2 : int; // za premik
	var PositionX = Pos5[randPos1]; //pozicija prvega coina
	randPos1 = randPos1 * 2;
	var f = -4; // za Z pozicijo
	var g = 0; //če se premik začne se naslednji coin tudi premakne - ker gre po 1 namesto 2
	//spawn coinsov
	while (e != 0)
	{
		Instantiate (singleCoin, new Vector3 (0, 0, startCoinPos) + Vector3 (PositionX, 0, f), transform.rotation);
		if (g == 0)
		{
			//3x if da preprečim out of range pri Pos9
			if (randPos1 == 0)
			{
				randPos2 = Random.Range (0,2);
			}
			if (randPos1 == 8)
			{
				randPos2 = Random.Range (-1,1);
			}
			if (randPos1 != 0 && randPos1 != 8)
			{
				randPos2 = Random.Range (-1,2);
			}
		}
		randPos1 += randPos2;
		if (randPos1 == 1 || randPos1 == 3 || randPos1 == 5 || randPos1 == 7)
		{
			g = 1;
		}
		else if (randPos1 == 0 || randPos1 == 2 || randPos1 == 4 || randPos1 == 6 || randPos1 == 8)
		{
			g = 0;
		}
		PositionX = Pos9[randPos1];

		e -= 1;
		f += 2;
	}																				
}