#pragma strict

private var txtKickStart : Text;
private var txtProtector : Text;
private var txtTripleCoins : Text;

private var goKickStartText : GameObject;
private var goProtectorText : GameObject;
private var goTipleCoinsText : GameObject;

private var goImgKickStart : GameObject;
private var goImgProtector : GameObject;
private var goImgTriple : GameObject;

private var numOfKickStart : int;
private var numOfProtector : int;
private var numOfTripleCoins : int;

function Start () {
	numOfKickStart = PlayerPrefs.GetInt ("NumKickStart");
	numOfProtector = PlayerPrefs.GetInt ("NumStartShield");
	numOfTripleCoins = PlayerPrefs.GetInt ("NumTripleCoin");

	goKickStartText = GameObject.Find ("Txt_KickStart");
	goProtectorText = GameObject.Find ("Txt_Protector");
	goTipleCoinsText = GameObject.Find ("Txt_TripleCoins");

	goImgKickStart = GameObject.Find ("Img_KickStartNum");
	goImgProtector = GameObject.Find ("Img_ProtectorNum");
	goImgTriple = GameObject.Find ("Img_TripleCoinsNum");

	//prikaži samo če je večje od 1 drugače uniči
	if (numOfKickStart > 1)
	{
		txtKickStart = goKickStartText.GetComponent.<Text>();
		txtKickStart.text = numOfKickStart.ToString () + "x";
	}
	else
	{
		Destroy (goImgKickStart);
	}
	if (numOfProtector > 1)
	{
		txtKickStart = goProtectorText.GetComponent.<Text>();
		txtKickStart.text = numOfProtector.ToString () + "x";
	}
	else
	{
		Destroy (goImgProtector);
	}
	if (numOfTripleCoins > 1)
	{
		txtKickStart = goTipleCoinsText.GetComponent.<Text>();
		txtKickStart.text = numOfTripleCoins.ToString () + "x";
	}
	else
	{
		Destroy (goImgTriple);
	}
}

function DeleteTextOnPlay ()
{
	if (goImgKickStart != null)
	{
		Destroy (goImgKickStart);
	}
	if (goImgProtector != null)
	{
		Destroy (goImgProtector);
	}
	if (goImgTriple != null)
	{
		Destroy (goImgTriple);
	}
}