#pragma strict

var grayImgGO : GameObject;

function Start () {
	grayImgGO.SetActive (false);
}

function GreyShow () {
	grayImgGO.SetActive (true);
}

function GreyHide () {
	grayImgGO.SetActive (false);
}