#pragma strict

var textCoinColected : Text;
var textDistance : Text;
var textDistanceCoin : Text;
var textMaxDistance : Text;
var textCoinMultiplier : Text;
var textCoinMultiplierCoins : Text;
var textCoinsInBank : Text;

var ColectedImage : GameObject;
var ColectedNumImage : GameObject;
var DistanceImage : GameObject;
var DistanceCoinsImage : GameObject;
var MaxDistanceImage : GameObject;
var NewRecord : GameObject;
var MultipierImage : GameObject;
var MultiplierImageNum : GameObject;
var AddButton : GameObject;
var InBankImage : GameObject;
var InBankNumImage : GameObject;
var HomeImage : GameObject;
var StoreImage : GameObject;
var ReplayImage : GameObject;
var ChallImage : GameObject;
var ChallSprite : Image;
private var spriteTransparancy : float;


private var CollCoin : int;
private var distan : int;
private var distCoins : int;
private var maxDistan : int;
private var TripleCoinYesNo : float;
private var TripleCoinsNum : int;
private var totCoin : int;

private var anotherCoinMultiText : int; //ta se prišteva

static var MaxDistCheck : int;

private var riseCoinColected : int;
private var riseDistance : int;
private var riseDistanceCoins : int;
private var riseMultiplierCoins : int;
private var riseCoinsInBank : int;
private var coinMultiNum : float;

var SoundScript : EndSceneSounds;
var SoundObject : GameObject;

private var touchSkipActive : boolean;

private var animDone : boolean;

function Start () 
{
	touchSkipActive = false;
	animDone = false;

	DailyChallangeProgress.CompletedPlayPrefSet();

	riseCoinsInBank = GameMaster.coinTotal;

	CollCoin = GameMaster.coinColected;

	distan = GameMaster.PreviousDistance;
	GameMaster.Distance = 0;

	distCoins = (distan/ 10);

	maxDistan = GameMaster.MaxDistance;

	//preveri če je bil igran TripleCoin
	coinMultiNum = 1;
	if (GameMaster.tripleCoinOn)
	{
		TripleCoinsNum = ((CollCoin + distCoins) * 3);
		GameMaster.tripleCoinOn = false;
		TripleCoinYesNo = 3;
	}
	else if (GameMaster.tripleCoinOn == false)
	{
		TripleCoinYesNo = 1;
		TripleCoinsNum = CollCoin + distCoins;
	}

	GameMaster.coinTotal += (TripleCoinsNum);
	totCoin = GameMaster.coinTotal;
	PlayerPrefs.SetInt("cionInBank", totCoin);
	//	Ta ni glih za tuki vmes ampak naj bo ker je glih save potem
	PlayerPrefs.SetInt ("TotCoins", (PlayerPrefs.GetInt ("TotCoins") + totCoin));
	PlayerPrefs.SetInt ("TotDist", (PlayerPrefs.GetInt ("TotDist") + distan));
	PlayerPrefs.Save();
	GameMaster.coinColected = 0;

	riseCoinColected = 0;
	riseDistance = 0;
	riseDistanceCoins = 0;
	riseMultiplierCoins = CollCoin + distCoins;



	ColectedImage.SetActive (false);
	ColectedNumImage.SetActive (false);
	DistanceImage.SetActive (false);
	DistanceCoinsImage.SetActive (false);
	MaxDistanceImage.SetActive (false);
	NewRecord.SetActive (false);
	MultipierImage.SetActive (false);
	MultiplierImageNum.SetActive (false);
	AddButton.SetActive(false);
	InBankImage.SetActive (false);
	InBankNumImage.SetActive (false);
	HomeImage.SetActive (false);
	StoreImage.SetActive (false);
	ReplayImage.SetActive (false);
	ChallImage.SetActive(false);

	EndSceneAnim();
}

function Update()
{
	for (var i = 0; i < Input.touchCount; ++i) 
	{
        var touch3 : Touch;
        touch3 = Input.GetTouch(i);
        if (touch3.phase == TouchPhase.Began && !touchSkipActive) 
        {
        	touchSkipActive = true;
		}
     }

	if (AdJavaInterface.adIndentifier == 4)
	{
		AdJavaInterface.adIndentifier = 0;
		AdHasBeenWached();
	}
}

function EndSceneAnim ()
{
	//zdj so vse nove spremenljivke nastavljene in lahko to izpišemo
	//nekaj spremenljivk je preveč - OZ večina jih je za brezveze BUT STILL ;)

	textCoinColected.text = "0";
	textDistance.text = "Distance: <color=blue>0 m</color>";
	textDistanceCoin.text = "0";
	textMaxDistance.text = "Max: " + maxDistan.ToString("F0") + " m";
	if (TripleCoinYesNo == 1)
	{
		textCoinMultiplier.text = "Coin Multiplier: <color=purple>" + TripleCoinYesNo.ToString("F0") + "x</color>";
	}
	/*else if (TripleCoinYesNo != 1)
	{
		textCoinMultiplier.text = "Coin Multiplier: <color=red>" + TripleCoinYesNo.ToString("F0") + "x</color>";
	}*/
	textCoinMultiplierCoins.text = riseMultiplierCoins.ToString("F0");
	textCoinsInBank.text = riseCoinsInBank.ToString("F0");

	//	while zanka for skipping on touch
	if (!touchSkipActive)
	{
		var a = true;
		while (a)
		{
			yield WaitForSeconds (0.2);
			a = false;
		}

		//coins Collected
		SoundScript.SoundHit();
		ColectedImage.SetActive (true);
		ColectedNumImage.SetActive (true);

		while (riseCoinColected < CollCoin && !touchSkipActive)
		{
			if ((CollCoin - riseCoinColected) >= 100)
			{
				riseCoinColected += 50;
				SoundScript.CoinPileUpSound();
				textCoinColected.text = riseCoinColected.ToString("F0");
			}
			else if ((CollCoin - riseCoinColected) < 100 && (CollCoin - riseCoinColected) >= 10)
			{
				riseCoinColected += 10;
				SoundScript.CoinPileUpSound();
				textCoinColected.text = riseCoinColected.ToString("F0");
			}
			else if ((CollCoin - riseCoinColected) < 10)
			{
				riseCoinColected ++;
				SoundScript.CoinPileUpSound();
				textCoinColected.text = riseCoinColected.ToString("F0");
			}
			yield WaitForSeconds (0.05);
		}
		if (riseCoinColected >= CollCoin)
		{
			textCoinColected.text = CollCoin.ToString("F0");
		}
	}
	textCoinColected.text = CollCoin.ToString("F0");
	ColectedImage.SetActive (true);
	ColectedNumImage.SetActive (true);

	//	while zanka for skipping on touch
	if (!touchSkipActive)
	{
		//distance
		a = true;
		while (a)
		{
			yield WaitForSeconds (0.5);
			a = false;
		}
		SoundScript.SoundHit();

		DistanceImage.SetActive (true);
		DistanceCoinsImage.SetActive (true);

		while (riseDistance < distan && !touchSkipActive)
		{
			if ((distan - riseDistance) >= 100)
			{
				riseDistance += 100;
				riseDistanceCoins += 10;
				SoundScript.CoinPileUpSound();
				textDistance.text = "Distance: <color=blue>" + riseDistance.ToString("F0") + " m</color>";
				textDistanceCoin.text = riseDistanceCoins.ToString("F0");
			}
			else if ((distan - riseDistance) >= 10 && (distan - riseDistance) < 100)
			{
				riseDistance += 10;
				riseDistanceCoins ++;
				SoundScript.CoinPileUpSound();
				textDistance.text = "Distance: <color=blue>" + riseDistance.ToString("F0") + " m</color>";
				textDistanceCoin.text = riseDistanceCoins.ToString("F0");
			}
			if ((distan - riseDistance) < 10)
			{
				riseDistance ++;
				textDistance.text = "Distance: <color=blue>" + riseDistance.ToString("F0") + " m</color>";
			}
			yield WaitForSeconds (0.05);
		}
		if (riseDistance >= distan)
		{
			textDistance.text = "Distance: <color=blue>" + distan.ToString("F0") + " m</color>";
			textDistanceCoin.text = distCoins.ToString("F0");
		}
	}
	textDistance.text = "Distance: <color=blue>" + distan.ToString("F0") + " m</color>";
	textDistanceCoin.text = distCoins.ToString("F0");
	DistanceImage.SetActive (true);
	DistanceCoinsImage.SetActive (true);

	//	while zanka for skipping on touch
	if (!touchSkipActive)
	{
		//MaxDistance
		a = true;
		while (a)
		{
			yield WaitForSeconds (0.5);
			a = false;
		}
		SoundScript.SoundHit();
		MaxDistanceImage.SetActive (true);

		if (MaxDistCheck < maxDistan)
		{
			SoundScript.NewRecordSound();
			NewRecord.SetActive (true);
			while (SoundObject.GetComponent.<AudioSource>().isPlaying)
			{
				yield;
			}

		}
	}
	//	tuki še 1x če se skipa (touchSkipActive)
	if (MaxDistCheck < maxDistan)
	{
		NewRecord.SetActive (true);
	}

	textMaxDistance.text = "Max: " + maxDistan.ToString("F0") + " m";
	MaxDistanceImage.SetActive (true);

	anotherCoinMultiText = riseMultiplierCoins;	//mora biti zunaj tega if-a ker je uporabljen še v funkciji AdHasBeenWatched
	//	while zanka for skipping on touch
	if (!touchSkipActive)
	{
		//CoinMultiplier
		a = true;
		while (a)
		{
			yield WaitForSeconds (0.5);
			a = false;
		}
		SoundScript.SoundHit();

		MultipierImage.SetActive (true);
		MultiplierImageNum.SetActive (true);

		if (TripleCoinYesNo != 1)
		{
			while (riseMultiplierCoins <= TripleCoinsNum && !touchSkipActive)
			{
				textCoinMultiplier.text = "Coin Multiplier: <color=red>" + coinMultiNum.ToString() + "x</color>";
				if (coinMultiNum < 3)
				{
					coinMultiNum ++;
				}
				SoundScript.CoinMultiplierSound();
				
				textCoinMultiplierCoins.text = riseMultiplierCoins.ToString("F0");
				riseMultiplierCoins += anotherCoinMultiText;
		
				yield WaitForSeconds (0.8);
			}
			textCoinMultiplierCoins.text = TripleCoinsNum.ToString("F0");
		}
		else if (TripleCoinYesNo == 1)
		{
			textCoinMultiplierCoins.text = TripleCoinsNum.ToString("F0");
		}
	}
	textCoinMultiplier.text = "Coin Multiplier: <color=red>" + TripleCoinYesNo.ToString() + "x</color>";
	textCoinMultiplierCoins.text = TripleCoinsNum.ToString("F0");
	MultipierImage.SetActive (true);
	MultiplierImageNum.SetActive (true);

	//	while zanka for skipping on touch
	if (!touchSkipActive)
	{
		//Coins in bank
		a = true;
		while (a)
		{
			yield WaitForSeconds (0.5);
			a = false;
		}
		SoundScript.SoundHit();

		InBankImage.SetActive (true);
		InBankNumImage.SetActive (true);

		while (riseCoinsInBank < totCoin && !touchSkipActive)
		{
			if ((totCoin - riseCoinsInBank) >= 100)
			{
				riseCoinsInBank += 100;
				SoundScript.CoinPileUpSound();
				textCoinsInBank.text = riseCoinsInBank.ToString("F0");
			}
			else if ((totCoin - riseCoinsInBank) >= 10 && (totCoin - riseCoinsInBank) < 100)
			{
				riseCoinsInBank += 10;
				SoundScript.CoinPileUpSound();
				textCoinsInBank.text = riseCoinsInBank.ToString("F0");
			}
			else if ((totCoin - riseCoinsInBank) < 10)
			{
				riseCoinsInBank ++;
				SoundScript.CoinPileUpSound();
				textCoinsInBank.text = riseCoinsInBank.ToString("F0");
			}
			yield WaitForSeconds (0.05);
		}
		if (riseCoinsInBank >= totCoin)
		{
			textCoinsInBank.text = totCoin.ToString("F0");
		}
	}
	textCoinsInBank.text = totCoin.ToString("F0");
	InBankImage.SetActive (true);
	InBankNumImage.SetActive (true);

	//	while zanka for skipping on touch
	if (!touchSkipActive)
	{
		//ad button
		a = true;
		while (a)
		{
			yield WaitForSeconds (0.2);
			a = false;
		}
		SoundScript.SoundHit();
		AddButton.SetActive(true);
	}
	AddButton.SetActive(true);
	//	other buttons
	a = true;
	while (a)
	{
		yield WaitForSeconds (0.1);
		a = false;
	}
	SoundScript.SoundButtonHit();
	StoreImage.SetActive (true);
	a = true;
	while (a)
	{
		yield WaitForSeconds (0.1);
		a = false;
	}
	SoundScript.SoundButtonHit();
	ReplayImage.SetActive (true);
	a = true;
	while (a)
	{
		yield WaitForSeconds (0.1);
		a = false;
	}
	SoundScript.SoundButtonHit();
	HomeImage.SetActive (true);
	if (PlayerPrefs.GetInt("ChallangeOneCollected") == 0 || PlayerPrefs.GetInt("ChallangeTwoCollected") == 0 || PlayerPrefs.GetInt("ChallangeThreeCollected") == 0)
	{
		a = true;
		while (a)
		{
			yield WaitForSeconds (0.1);
			a = false;
		}
		ChallSprite.color.a = 1f;
		SoundScript.SoundButtonHit();
		ChallImage.SetActive (true);
		if((PlayerPrefs.GetInt("ChallangeOneDone") == 1 && PlayerPrefs.GetInt("ChallangeOneCollected") == 0) || (PlayerPrefs.GetInt("ChallangeTwoDone") == 1 && PlayerPrefs.GetInt("ChallangeTwoCollected") == 0) || (PlayerPrefs.GetInt("ChallangeThreeDone") == 1 && PlayerPrefs.GetInt("ChallangeThreeCollected") == 0))
		{
			BlinkingChallangeButton();
		}
	}

	//	update leaderboard
	LeaderBoardUpdate.UpdateLeaderBoard();

	animDone = true;
}

//	when there is uncollected challange
function BlinkingChallangeButton()
{
	spriteTransparancy = 1f;
	while (true)
	{
		while (spriteTransparancy > 0.3f)
		{
			spriteTransparancy -= 0.01 * Time.timeScale;
			ChallSprite.color.a = spriteTransparancy;
			yield;
		}
		while (spriteTransparancy < 1f)
		{
			spriteTransparancy += 0.01 * Time.timeScale;
			ChallSprite.color.a = spriteTransparancy;
			yield;
		}
		yield WaitForSeconds(0.5);
	}
}

//ad wached function
function AdHasBeenWached()
{
	AddButton.SetActive(false);
	SoundScript.CoinMultiplierSound();
	TripleCoinYesNo += 0.5;
	textCoinMultiplier.text = "Coin Multiplier: <color=red>" + TripleCoinYesNo.ToString() + "x</color>";
	TripleCoinsNum += anotherCoinMultiText * 0.5;
	textCoinMultiplierCoins.text = TripleCoinsNum.ToString("F0");

	PlayerPrefs.SetInt ("TotCoins", (PlayerPrefs.GetInt ("TotCoins") + (anotherCoinMultiText * 0.5)));
	PlayerPrefs.Save();

	var b = true;
	while (b)
	{
		yield WaitForSeconds (0.9);
		b = false;
	}
	SoundScript.CoinMultiplierSound();
	totCoin += 	anotherCoinMultiText * 0.5;
	PlayerPrefs.SetInt("cionInBank", totCoin);
	PlayerPrefs.Save();
	textCoinsInBank.text = totCoin.ToString("F0");
}

function BackButtonInEndScene ()
{
	var backScript : BackComand = gameObject.GetComponent ("BackComand");
	if (!touchSkipActive)
	{
		backScript.PlayCloseSound ();
		touchSkipActive = true;
	}

	if (animDone)
	{
		backScript.PlayCloseSound ();
		backScript.GoHome ();
	}
}