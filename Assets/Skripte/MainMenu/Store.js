#pragma strict

var PopUpImage : GameObject;
var PopUpImage2 : GameObject;
//Buy gumbi- ko zapreš popUp se vsi inaktivirajo - če se mi bo dal bom naredu static in jih ne bo treba tuki kot nove spremenljivke definirat
var HealthBuyButton : GameObject;
var CoinBuyButton : GameObject;
var MagnetBuyButton : GameObject;
var SlowBuyButton : GameObject;
var ShieldBuyButton : GameObject;
var DoubleJumpBuyButton : GameObject;
var KickStartUpgradeButton : GameObject;
var KickStartBuyButton : GameObject;
var ShieldConsumableUpgradeButton : GameObject;
var ShieldConsumableBuyButton : GameObject;
var TripleCoinsBuyButton : GameObject;
var TripleCoinNumImage : GameObject;


function Start ()
{
}

function Update ()
{
}

function ClosePopUp ()
{
	PopUpImage.SetActive (false);
	PopUpImage2.SetActive (false);
	HealthBuyButton.SetActive (false);
	CoinBuyButton.SetActive (false);
	MagnetBuyButton.SetActive (false);
	SlowBuyButton.SetActive (false);
	ShieldBuyButton.SetActive (false);
	DoubleJumpBuyButton.SetActive (false);
	KickStartBuyButton.SetActive (false);
	ShieldConsumableBuyButton.SetActive (false);
	ShieldConsumableUpgradeButton.SetActive (false);
	KickStartUpgradeButton.SetActive (false);
	TripleCoinNumImage.SetActive (false);
	TripleCoinsBuyButton.SetActive (false);
}


//hax
function AddCoins10 ()
{
	GameMaster.coinTotal += 10000;
}
function AddCoins1000 ()
{
	GameMaster.coinTotal += 1000000;
}
