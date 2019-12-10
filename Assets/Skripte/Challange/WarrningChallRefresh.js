#pragma strict
//nism vedu kam dt pa je kr svoja skripta nastala

var warningGO : GameObject;

function Start ()
{
	warningGO.SetActive (false);
}

function OpenWarning () {
	warningGO.SetActive (true);
}

function HideWarrning () {
	warningGO.SetActive (false);
}
