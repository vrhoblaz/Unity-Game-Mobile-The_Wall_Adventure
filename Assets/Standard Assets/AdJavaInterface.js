#pragma strict

public class AdJavaInterface
{
	static var adIndentifier : int = 0;
	//	if ad fails
	static var adFailed : int = 0;
	//	1 - get 500 coins
	//	2 - unlock tiple
	//	3 - respawn
	//	4 - + 0.5 multiplier
	//	5 - Challange refresh

	function Start () 
	{
		adFailed = 0;
		adIndentifier = 0;
	}
}
