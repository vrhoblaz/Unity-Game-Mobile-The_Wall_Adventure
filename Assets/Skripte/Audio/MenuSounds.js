#pragma strict

var clickNormal : AudioClip;
var clickClose : AudioClip;
var clickNoGo : AudioClip;
var moneyDrop : AudioClip;
var consumMoneyDrop : AudioClip;

private var soundPlaying : boolean = false;

var menuMusicObject : GameObject;
var instanceScript : MenuMusic;

function Awake ()
{
	soundPlaying = false;
	var scene : Scene = SceneManager.GetActiveScene ();
	if (GameObject.FindGameObjectWithTag ("MenuMusic") == null && scene.name != "GameScene" && scene.name != "EndScene")
	{
		Instantiate (menuMusicObject, transform.position, transform.rotation);
	}
	if ((scene.name == "GameScene" || scene.name == "EndScene") && GameObject.FindGameObjectWithTag ("MenuMusic") != null)
	{
		//instanceScript = GameObject.FindGameObjectWithTag ("MenuMusic");
		instanceScript = GameObject.FindGameObjectWithTag ("MenuMusic").GetComponent(MenuMusic);
		instanceScript.DestroyMainMenuMusic();
	}
}

function PlayNormalClickSound ()
{
	soundPlaying = true;
	GetComponent.<AudioSource>().clip = clickNormal;
	GetComponent.<AudioSource>().pitch = Random.Range (1, 1.1);
	GetComponent.<AudioSource>().Play();
}

function PlayCloseClickSound ()
{
	GetComponent.<AudioSource>().clip = clickClose;
	GetComponent.<AudioSource>().pitch = Random.Range (1, 1.1);
	GetComponent.<AudioSource>().Play();
}

public function PlayNoGoClickSound ()
{
	GetComponent.<AudioSource>().clip = clickNoGo;
	GetComponent.<AudioSource>().pitch = Random.Range (1, 1.1);
	GetComponent.<AudioSource>().Play();
}

//za upgrade Buy
public function PlayMoneyDropSound ()
{
	//GetComponent.<AudioSource>().clip = moneyDrop;
	//GetComponent.<AudioSource>().volume = 1 * Settings.SoundVol;
	//GetComponent.<AudioSource>().Play();
	GetComponent.<AudioSource>().PlayOneShot(moneyDrop, 1f);
}

//za consumable Buy
public function PlayConsMoneyDropSound ()
{
	//GetComponent.<AudioSource>().clip = moneyDrop;
	//GetComponent.<AudioSource>().volume = 1 * Settings.SoundVol;
	//GetComponent.<AudioSource>().Play();
	GetComponent.<AudioSource>().PlayOneShot(consumMoneyDrop, 1f);
}
