#pragma strict

var Darken1 : Image;
var Darken2 : Image;
var Darken3 : Image;


var canvas : RectTransform;
private var canvasX : float;
private var canvasY : float;

private var width : float;
private var height : float;
private var posX : float;

function Start () 
{

	canvasX = canvas.sizeDelta.x;
	canvasY = canvas.sizeDelta.y;
	width = (canvasX);
	height = (canvasY/3*2);

	//posY = (canvasY/2);
	posX = (canvasX/3);




	Darken1.rectTransform.sizeDelta = new Vector2(width, height);
	Darken1.rectTransform.anchoredPosition = new Vector2 (0, 0);

	if (Darken2 != null)
	{
		Darken2.rectTransform.sizeDelta = new Vector2(width, height);
		Darken2.rectTransform.anchoredPosition = new Vector2 (posX, 0);

		Darken3.rectTransform.sizeDelta = new Vector2(width, height);
		Darken3.rectTransform.anchoredPosition = new Vector2 (2*posX, 0);
	}
}