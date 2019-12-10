#pragma strict

var healthObject : GameObject;
var touchObject : GameObject;
var swipeObject : GameObject;
var playButtObject : GameObject;
var consumableObject : GameObject;
var loadImg : GameObject;

var arrowKickStart : GameObject;
var arrowProtector : GameObject;
var arrowTripleCoin : GameObject;
var darkenKickStart : GameObject;
var darkenProtector : GameObject;
var darkenTripleCoin : GameObject;


private var scene : int;
static var showConsumableTutorial : boolean = false;

function Awake ()
{
	showConsumableTutorial = false;
	showConsumableTutorial = false;
	if (PlayerPrefs.GetInt ("FirsConsumable") == 0 && (PlayerPrefs.GetInt ("NumTripleCoin") > 0 || PlayerPrefs.GetInt ("NumStartShield") > 0 || PlayerPrefs.GetInt ("NumKickStart") > 0))
	{
		showConsumableTutorial = true;
	}
}

function Start ()
{
	scene = 1;
}

public function TutorialStart ()
{
	if (PlayerPrefs.GetInt ("TutorialWatched") == 1)
	{
		scene = 2;
		if (BallControl.SwipeAndTouch == 0)
		{
			healthObject.SetActive (false);
			swipeObject.SetActive (false);
			playButtObject.SetActive (false);
			touchObject.SetActive (true);
		}
		else
		{
			healthObject.SetActive (false);
			touchObject.SetActive (false);
			playButtObject.SetActive (false);
			swipeObject.SetActive (true);
		}
	}
	else
	{
		healthObject.SetActive (true);
	}
}

public function ConsumTutorial ()
{
	scene = 4;
	PlayerPrefs.SetInt ("FirsConsumable", 1);
	showConsumableTutorial = false;

	//Tele if osvetlijo primeren del canvasa da se vidijo "consumables" če jih imaš;
	if (PlayerPrefs.GetInt ("NumKickStart") > 0)
	{
	darkenKickStart.SetActive (false);
	}
	if (PlayerPrefs.GetInt ("NumStartShield") > 0)
	{
	darkenProtector.SetActive (false);
	}
	if (PlayerPrefs.GetInt ("NumTripleCoin") > 0)
	{
	darkenTripleCoin.SetActive (false);
	}

	//postavitev puščice na pravo mesto;
	if (PlayerPrefs.GetInt ("NumKickStart") > 0)
	{
	arrowKickStart.SetActive (true);
	}
	else if (PlayerPrefs.GetInt ("NumStartShield") > 0)
	{
	arrowProtector.SetActive (true);
	}
	else if (PlayerPrefs.GetInt ("NumTripleCoin") > 0)
	{
	arrowTripleCoin.SetActive (true);
	}
	// 
	consumableObject.SetActive (true);
}

function NextButton ()
{
	switch (scene)
	{
	case 1 : 
		healthObject.SetActive (false);
		if (BallControl.SwipeAndTouch == 0)
		{
			touchObject.SetActive (true);
		}
		else
		{
			swipeObject.SetActive (true);
		}
		scene = 2;
		break;
	case 2 :
		if (PlayerPrefs.GetInt ("TutorialWatched") == 1)
		{
			if (showConsumableTutorial)
			{
				healthObject.SetActive (false);
				touchObject.SetActive (false);
				swipeObject.SetActive (false);
				playButtObject.SetActive (false);
				ConsumTutorial ();
			}
			else 
			{
				Destroy (gameObject);
			}
		}
		else 
		{
			touchObject.SetActive (false);
			swipeObject.SetActive (false);
			playButtObject.SetActive (true);
			PlayerPrefs.SetInt ("TutorialWatched", 1);
			scene = 3;
		}
		break;
	case 3 :
		if (showConsumableTutorial)
		{
			playButtObject.SetActive (false);
			ConsumTutorial ();
		}
		else 
		{
			Destroy (gameObject);
		}
		break;
	case 4:
		Destroy (gameObject);
		break;
	}
}

public function StartButtonPressed ()
{
		Destroy (gameObject);
}

public function ButtonGoToInstruction ()
{
	loadImg.SetActive(true);
	SceneManagement.SceneManager.LoadScene ("Instructions");
}