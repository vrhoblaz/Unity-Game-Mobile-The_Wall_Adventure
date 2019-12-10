#pragma strict

static var muteSound : float;
static var muteMusic : float;

var muteSoundSprite : Sprite;
var unmuteSoundSprite : Sprite;
var muteMusicSprite : Sprite;
var unmugeMusicSprite : Sprite;

var muteSoundImg : Image;
var muteMusicImg : Image;

var BGMusicScript : BGMusic;

function Start () 
{
	if (AudioListener.volume == 0)
	{
		muteSoundImg.sprite = unmuteSoundSprite;
		muteSoundImg.color = new Color (0.6667, 0.6667, 0.392, 1);
	}
	else
	{
		muteSoundImg.sprite = muteSoundSprite;
		muteSoundImg.color = new Color (1, 1, 0.353, 1);
	}

	if (Settings.MusicVol == 0)
	{
		muteMusicImg.sprite = unmugeMusicSprite;
		muteMusicImg.color = new Color (0.6667, 0.6667, 0.392, 1);
	}
	else
	{
		muteMusicImg.sprite = muteMusicSprite;
		muteMusicImg.color = new Color (1, 1, 0.353, 1);
	}
}

function SoundMute ()
{
	if (AudioListener.volume == 0)
	{
		muteSoundImg.sprite = muteSoundSprite;
		muteSoundImg.color = new Color (1, 1, 0.353, 1);
		if (muteSound < 0.035)
		{
			muteSound = 0.175;
		}
		Settings.SoundVol = muteSound;
		Settings.soundVolume = Settings.SoundVol * 100 / 0.35;
		AudioListener.volume = Settings.SoundVol;
		PlayerPrefs.SetInt ("VolumeSound", Settings.soundVolume);
		PlayerPrefs.Save();
	}
	else
	{
		muteSoundImg.sprite = unmuteSoundSprite;
		muteSoundImg.color = new Color (0.6667, 0.6667, 0.392, 1);
		muteSound = Settings.SoundVol;
		Settings.SoundVol = 0;
		Settings.soundVolume = 0;
		AudioListener.volume = Settings.SoundVol;
		PlayerPrefs.SetInt ("VolumeSound", 0);
		PlayerPrefs.SetFloat ("MuteSoundVol", muteSound);
		PlayerPrefs.Save();
	}
}

function MusicMute ()
{
	if (Settings.MusicVol == 0)
	{
		muteMusic = PlayerPrefs.GetFloat ("MuteMusicVol");
		muteMusicImg.sprite = muteMusicSprite;
		muteMusicImg.color = new Color (1, 1, 0.353, 1);
		if (muteMusic < 0.075)
		{
			muteMusic = 0.375;
		}
		Settings.MusicVol = muteMusic;
		Settings.musicVolume = (Settings.MusicVol / 0.75 * 100);
		BGMusicScript.MusicVolumeChange();
		PlayerPrefs.SetInt ("VolumeMusic", Settings.musicVolume);
		PlayerPrefs.Save();
	}
	else
	{
		muteMusicImg.sprite = unmugeMusicSprite;
		muteMusicImg.color = new Color (0.6667, 0.6667, 0.392, 1);
		muteMusic = Settings.MusicVol;
		Settings.MusicVol = 0;
		Settings.musicVolume = 0;
		BGMusicScript.MusicVolumeChange();
		PlayerPrefs.SetInt ("VolumeMusic", 0);
		PlayerPrefs.SetFloat ("MuteMusicVol", muteMusic);
		PlayerPrefs.Save();
	}
}