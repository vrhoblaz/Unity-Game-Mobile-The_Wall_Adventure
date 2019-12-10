#pragma strict

var LineL : Image;
var LineR : Image;


var canvas : RectTransform;
private var width : float;
private var height : float;
private var canvasX : float;
private var canvasY : float;
private var posX : float;
private var posY : float;

function Start () 
{

	canvasX = canvas.sizeDelta.x;
	canvasY = canvas.sizeDelta.y;
	//width = (canvasX/5);
	height = (canvasY/10);
	//posY = (canvasY/2);
	posX = (canvasX/3);

	LineL.rectTransform.sizeDelta = new Vector2(3, height);
	LineL.rectTransform.anchoredPosition = new Vector2 (posX, 0);

	LineR.rectTransform.sizeDelta = new Vector2(3, height);
	LineR.rectTransform.anchoredPosition = new Vector2 ((2*posX), 0);

	if (PlayerPrefs.GetInt ("SwipeTouch") == 1){
		var linijaL : GameObject = GameObject.Find ("BotomLineL");
		var linijaR : GameObject = GameObject.Find ("BotomLineR");
		Destroy (linijaR);
		Destroy (linijaL);
	}
}