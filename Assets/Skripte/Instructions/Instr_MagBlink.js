#pragma strict

private var SpriteImg : Image;

function StartTheBlink () {
	SpriteImg = gameObject.GetComponent.<Image>();
	Blink ();
}

function Blink () {
	var transparecy : float = 1f;
	var BlinkSpeed : int;

	while (true)
		{
			//da spreminja predznak
			if (transparecy >= 1)
			{
				BlinkSpeed = -40;
			}
			else if (transparecy <= 0)
			{
				BlinkSpeed = 40;
			}

			transparecy += 0.05f * Time.deltaTime * BlinkSpeed;
			SpriteImg.color.a = transparecy;
//			if (coinTime <= 0 || coinTime > 3.5)
//			{
//				coinBoolean = false;
//				transparecy = 1f;
//				BlinkCoin.color.a = transparecy;
//			}
			yield;
		}
}
