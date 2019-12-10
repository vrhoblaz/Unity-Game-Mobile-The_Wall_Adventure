#pragma strict

var loadinScreenGO : GameObject;

function OpenLoadinScreenForLeaderboard ()
{
	loadinScreenGO.SetActive (true);
}

function OnApplicationPause(pauseStatus: boolean) 
{
	loadinScreenGO.SetActive (false);
}