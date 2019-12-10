#pragma strict

var scrollBar : Scrollbar;
private var scroll : boolean;

function Start () {
	scroll = false;
	AvtoScroll ();
}

function Update ()
{
	if (scroll && scrollBar.value > 0f)
	{
		scrollBar.value -= 0.01 * Time.deltaTime;
		Canvas.ForceUpdateCanvases ();
	}

	//cancel avtoscroll on the end || if touch detected
	if (scrollBar.value <= 0f || Input.touchCount > 0)
	{
		scroll = false;
	}
}

function AvtoScroll () {
	//	funkcija za avtoscroll po credit menu
	for (var i : int = 0; i < 1; i++)
	{
		yield WaitForSeconds (2f);
		scroll = true;
	}
}
