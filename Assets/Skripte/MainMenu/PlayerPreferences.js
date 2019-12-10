#pragma strict

//čekiranje vseh playerPrefs-ov ko se porgram zažene (trenutno MainMenu scene)

function Awake () 
{
	//Setting all PlayerPrefs on fist start + setting all variables equal to their PlayerPrefs setting
	//Coins
	if (PlayerPrefs.HasKey ("cionInBank") == false)
	{
		PlayerPrefs.SetInt ("cionInBank", 0);
	}
	GameMaster.coinTotal = PlayerPrefs.GetInt("cionInBank");

	//Total coins collected
	if (PlayerPrefs.HasKey ("TotCoins") == false)
	{
		PlayerPrefs.SetInt("TotCoins", 0);
	}

	//MaxDist
	if (PlayerPrefs.HasKey("MaxDist") == false)
	{
		PlayerPrefs.SetFloat("MaxDist", 0);
	}
	GameMaster.MaxDistance = PlayerPrefs.GetFloat("MaxDist");

	//TotalDistance
	if (PlayerPrefs.HasKey("TotDist") == false)
	{
		PlayerPrefs.SetInt("TotDist", 0);
	}

	//Store
	//maxHealth
	if (PlayerPrefs.HasKey ("MaxHealth") == false)
	{
		PlayerPrefs.SetInt ("MaxHealth", 3);
	}
	Health.maxLife = PlayerPrefs.GetInt("MaxHealth");

	//2xCoin Time
	if (PlayerPrefs.HasKey ("2xCoinTime") == false)
	{
		PlayerPrefs.SetFloat ("2xCoinTime", 10f);
	}
	Coin2x.time2xCoin = PlayerPrefs.GetFloat ("2xCoinTime");

	//Magnet Time
	if (PlayerPrefs.HasKey ("MagnetTime") == false)
	{
		PlayerPrefs.SetFloat ("MagnetTime", 10f);
	}
	Magnet.timeMagnet = PlayerPrefs.GetFloat("MagnetTime");

	//Slow Time
	if (PlayerPrefs.HasKey ("SlowTime") == false)
	{
		PlayerPrefs.SetFloat ("SlowTime", 10f);
	}
	Slow.timeSlow = PlayerPrefs.GetFloat ("SlowTime");

	//Shield Time
	if (PlayerPrefs.HasKey ("ShieldTime") == false)
	{
		PlayerPrefs.SetFloat ("ShieldTime", 10f);
	}
	Shield.timeShield = PlayerPrefs.GetFloat ("ShieldTime");

	//DoubleJump Time
	if (PlayerPrefs.HasKey ("DoubleJumpTime") == false)
	{
		PlayerPrefs.SetFloat ("DoubleJumpTime", 10f);
	}
	DoubleJump.timeDoubleJump = PlayerPrefs.GetFloat ("DoubleJumpTime");

	//KickStart - Število kupljenih
	if (PlayerPrefs.HasKey ("NumKickStart") == false)
	{
		PlayerPrefs.SetInt ("NumKickStart", 0);
	}
	KickStart.kickStartNum = PlayerPrefs.GetInt ("NumKickStart");

	//KickStart - Distance - odvisno od upgrade-a
	if (PlayerPrefs.HasKey ("DistKickStart") == false)
	{
		PlayerPrefs.SetInt ("DistKickStart", 250);
	}
	KickStart.kickStartDist = PlayerPrefs.GetInt ("DistKickStart");

	//StartShield - consumable on the beginning of the game
	//število kupljenih
	if (PlayerPrefs.HasKey ("NumStartShield") == false)
	{
		PlayerPrefs.SetInt ("NumStartShield", 0);
	}
	StartShieldConsum.shieldNum = PlayerPrefs.GetInt ("NumStartShield");
	//Število dovoljenih trkov
	if (PlayerPrefs.HasKey ("ShieldCollNum") == false)
	{
		PlayerPrefs.SetInt ("ShieldCollNum", 1);
	}
	StartShieldConsum.maxShieldHit = PlayerPrefs.GetInt ("ShieldCollNum");

	//Triple Coin - consumable on the beginning of the game
	//število kupljenih
	if (PlayerPrefs.HasKey ("NumTripleCoin") == false)
	{
		PlayerPrefs.SetInt ("NumTripleCoin", 0);
	}
	GameMaster.tripleCoinNum = PlayerPrefs.GetInt ("NumTripleCoin");

	if (PlayerPrefs.HasKey ("SwipeTouch") == false)
	{
		PlayerPrefs.SetInt ("SwipeTouch", 0);
	}
	BallControl.SwipeAndTouch = PlayerPrefs.GetInt ("SwipeTouch");
	//0-tutorial not wached yet; 1-tutorial watched
	if (PlayerPrefs.HasKey ("TutorialWatched") == false)
	{
		PlayerPrefs.SetInt ("TutorialWatched", 0);
	}

	//Sound Prefs
	//Music volume
	if (PlayerPrefs.HasKey ("VolumeMusic") == false)
	{
		PlayerPrefs.SetInt ("VolumeMusic", 70);
	}
	Settings.musicVolume = PlayerPrefs.GetInt ("VolumeMusic");
	//sound volume
	if (PlayerPrefs.HasKey ("VolumeSound") == false)
	{
		PlayerPrefs.SetInt ("VolumeSound", 70);
	}
	Settings.soundVolume = PlayerPrefs.GetInt ("VolumeSound");

	Settings.SoundVol = 0.35 * Settings.soundVolume / 100;
	AudioListener.volume = Settings.SoundVol;
	Settings.MusicVol = 0.75 * Settings.musicVolume / 100;

	//Save sound volume on mute
	if (PlayerPrefs.HasKey ("MuteSoundVol") == false)
	{
		PlayerPrefs.SetFloat ("MuteSoundVol", AudioListener.volume);
	}
	MuteUnmute.muteSound = PlayerPrefs.GetFloat ("MuteSoundVol");
	//Save music volume on mute
	if (PlayerPrefs.HasKey ("MuteMusicVol") == false)
	{
		PlayerPrefs.SetFloat ("MuteMusicVol", Settings.musicVolume);
	}
	MuteUnmute.muteMusic = PlayerPrefs.GetFloat ("MuteMusicVol");

	//Snow Settings
	if (!PlayerPrefs.HasKey ("SnowOffOn"))
	{
		PlayerPrefs.SetInt ("SnowOffOn", 1);	//0-off; 1-on
	}
	//fog Settings
	if (!PlayerPrefs.HasKey ("FogOffOn"))
	{
		PlayerPrefs.SetInt ("FogOffOn", 1);	//0-off; 1-on
	}

	//Quality Settings
	if (!PlayerPrefs.HasKey ("qualitySett"))
	{
		PlayerPrefs.SetInt ("qualitySett", 2);	//0-low; 1-med; 2-high;
	}

	//nastavi nastavitve ko se igra prvič prižge
	if (!PlayerPrefs.HasKey ("settingsOnFirstPlay"))
	{
		PlayerPrefs.SetInt ("settingsOnFirstPlay", 0); 	//0-first play; 1-not the first play;
	}

	//check if first play with TOUCH for tutorial
	if (PlayerPrefs.HasKey ("TouchFirstPlay") == false)
	{
		PlayerPrefs.SetInt ("TouchFirstPlay", 0);
	}

	//check if first play with SWIPE for tutorial
	if (PlayerPrefs.HasKey ("SwipeFirstPlay") == false)
	{
		PlayerPrefs.SetInt ("SwipeFirstPlay", 0);
	}

	//daily counter Triple Coins - nepotreben, AMPAK naj bo just in case
	if (PlayerPrefs.HasKey ("DailyTripleCoins") == false)
	{
		PlayerPrefs.SetInt ("DailyTripleCoins", 0);
	}
	if (PlayerPrefs.HasKey ("MaxDailyTripleCoins") == false)
	{
		PlayerPrefs.SetInt ("MaxDailyTripleCoins", 3);
	}

	//	Challange refresh
	if (PlayerPrefs.HasKey ("RefreshChallange") == false)
	{
		PlayerPrefs.SetInt ("RefreshChallange", 0);
	}

	//	Respwan after death with an Ad
	if (PlayerPrefs.HasKey ("CounterRespawn") == false)
	{
		PlayerPrefs.SetInt ("CounterRespawn", 1);
	}

	// za leaderboard - trenuntno so nekateri pomešani višje
		//max coins in one run
	if (PlayerPrefs.HasKey ("MaxCoinsOneRun") == false)
	{
		PlayerPrefs.SetInt ("MaxCoinsOneRun", 0);
	}
		//gamesPlayed
	if (PlayerPrefs.HasKey ("NoOfGames") == false)
	{
		PlayerPrefs.SetInt ("NoOfGames", 0);
	}
		//Number of upgrades
	if (PlayerPrefs.HasKey ("NoOfUpgrades") == false)
	{
		PlayerPrefs.SetInt ("NoOfUpgrades", 0);
	}
		//Max obsicles in one run
	if (PlayerPrefs.HasKey ("MaxObsicles") == false)
	{
		PlayerPrefs.SetInt ("MaxObsicles", 0);
	}
		//Total obsticles
	if (PlayerPrefs.HasKey ("TotalObsticles") == false)
	{
		PlayerPrefs.SetInt ("TotalObsticles", 0);
	}

	//Max PowerUps picked up
	if (PlayerPrefs.HasKey ("MaxPowerUps") == false)
	{
		PlayerPrefs.SetInt ("MaxPowerUps", 0);
	}

	//Total power Ups picked up
	if (PlayerPrefs.HasKey ("TotalPowerUps") == false)
	{
		PlayerPrefs.SetInt ("TotalPowerUps", 0);
	}

	//Total consumable used
	if (PlayerPrefs.HasKey ("TotalConsumables") == false)
	{
		PlayerPrefs.SetInt ("TotalConsumables", 0);
	}

	//total life lost
	if (PlayerPrefs.HasKey ("TotalLifeLost") == false)
	{
		PlayerPrefs.SetInt ("TotalLifeLost", 0);
	}

	// checks if first consumable was already bought - for the tutorial
	if (!PlayerPrefs.HasKey ("FirsConsumable"))
	{
		PlayerPrefs.SetInt ("FirsConsumable", 0);
	}

	if (!PlayerPrefs.HasKey ("endedGames"))
	{
		PlayerPrefs.SetInt ("endedGames", 0);
	}

	//for printing challange completed Message
	if (!PlayerPrefs.HasKey ("challMsg1"))
	{
		PlayerPrefs.SetInt ("challMsg1", 0);
	}
	if (!PlayerPrefs.HasKey ("challMsg2"))
	{
		PlayerPrefs.SetInt ("challMsg2", 0);
	}
	if (!PlayerPrefs.HasKey ("challMsg3"))
	{
		PlayerPrefs.SetInt ("challMsg3", 0);
	}

	PlayerPrefs.Save();

}
