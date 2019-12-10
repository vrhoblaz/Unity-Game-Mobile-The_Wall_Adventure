#pragma strict

import UnityEngine.UI;


//Indicator lajfa
static var maxLife = 3; //MAX LIFE
static var currLife = maxLife;

var LastLife : Image;
var Shield1 : Image;
var Shield2 : Image;
var Shield3 : Image;
var Shield4 : Image;
var Shield5 : Image;

var LastLifeGObj : GameObject;
var Shield1GObj : GameObject;
var Shield2GObj : GameObject;
var Shield3GObj : GameObject;
var Shield4GObj : GameObject;
var Shield5GObj : GameObject;

private var changeBoolOnce : boolean = true;

function Start () 
{
	//
	changeBoolOnce = true;
	//
	currLife = maxLife;

	//enable only maxLife gumbov
	if (maxLife == 6)
	{
		LastLifeGObj.SetActive (true);
		Shield1GObj.SetActive (true);
		Shield2GObj.SetActive (true);
		Shield3GObj.SetActive (true);
		Shield4GObj.SetActive (true);
		Shield5GObj.SetActive (true);
	}
	else if (maxLife == 5)
	{
		LastLifeGObj.SetActive (true);
		Shield1GObj.SetActive (true);
		Shield2GObj.SetActive (true);
		Shield3GObj.SetActive (true);
		Shield4GObj.SetActive (true);
		Shield5GObj.SetActive (false);
	}
	else if (maxLife == 4)
	{
		LastLifeGObj.SetActive (true);
		Shield1GObj.SetActive (true);
		Shield2GObj.SetActive (true);
		Shield3GObj.SetActive (true);
		Shield4GObj.SetActive (false);
		Shield5GObj.SetActive (false);
	}
	else if (maxLife == 3)
	{
		LastLifeGObj.SetActive (true);
		Shield1GObj.SetActive (true);
		Shield2GObj.SetActive (true);
		Shield3GObj.SetActive (false);
		Shield4GObj.SetActive (false);
		Shield5GObj.SetActive (false);
	}

	//just to prevent bugs - all green when spawn
	LastLife.color = Color.green;
	Shield1.color = Color.green;
	Shield2.color = Color.green;
	Shield3.color = Color.green;
	Shield4.color = Color.green;
	Shield5.color = Color.green;
}

function Update () 
{

	//color change on life point lost
	if (currLife == 6)
	{
		LastLife.color = Color.green;
		Shield1.color = Color.green;
		Shield2.color = Color.green;
		Shield3.color = Color.green;
		Shield4.color = Color.green;
		Shield5.color = Color.green;
	}

	if (currLife == 5)
	{
		LastLife.color = Color.green;
		Shield1.color = Color.green;
		Shield2.color = Color.green;
		Shield3.color = Color.green;
		Shield4.color = Color.green;
		Shield5.color = Color.grey;
	}

	if (currLife == 4)
	{
		LastLife.color = Color.green;
		Shield1.color = Color.green;
		Shield2.color = Color.green;
		Shield3.color = Color.green;
		Shield4.color = Color.grey;
		Shield5.color = Color.grey;
	}

	if (currLife == 3)
	{
		LastLife.color = Color.green;
		Shield1.color = Color.green;
		Shield2.color = Color.green;
		Shield3.color = Color.grey;
		Shield4.color = Color.grey;
		Shield5.color = Color.grey;
	}

	else if (currLife == 2)
	{
		LastLife.color = Color.green;
		Shield1.color = Color.green;
		Shield2.color = Color.grey;
		Shield3.color = Color.grey;
		Shield4.color = Color.grey;
		Shield5.color = Color.grey;
	}

	else if (currLife == 1)
	{
		LastLife.color = Color.red;
		Shield1.color = Color.grey;
		Shield2.color = Color.grey;
		Shield3.color = Color.grey;
		Shield4.color = Color.grey;
		Shield5.color = Color.grey;
	}

	else if (currLife == 0)
	{
		LastLife.color = Color.grey;
		Shield1.color = Color.grey;
		Shield2.color = Color.grey;
		Shield3.color = Color.grey;
		Shield4.color = Color.grey;
		Shield5.color = Color.grey;
	}
}
