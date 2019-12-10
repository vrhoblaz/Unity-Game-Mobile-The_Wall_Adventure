#pragma strict
//skripta uporabljena v Store za izpis Coin in bank (trenutno levo zgoraj)

var TotalCoinsNumText : Text;

//za lep izpis števila coinsov (like: 21 003 548)
private var ostanek : int;
private var tisoc : int;
private var miljon : int;


function Start ()
{
	GameMaster.coinTotal = PlayerPrefs.GetInt("cionInBank");
}

function Update ()
{
	if (AdJavaInterface.adIndentifier == 1)
	{
		AdJavaInterface.adIndentifier = 0;
		GameMaster.coinTotal += 500;
		PlayerPrefs.SetInt("cionInBank", GameMaster.coinTotal);
		PlayerPrefs.SetInt ("TotCoins", (PlayerPrefs.GetInt ("TotCoins") + 500));
		PlayerPrefs.Save();
	}

	//IZPIS ŠTEVILA KOVANCEV V "STORE"
	//izpis števila kovancov če je le to pod 1 000
	if (GameMaster.coinTotal < 1000)
	{
		TotalCoinsNumText.text =  GameMaster.coinTotal.ToString("F0");	
	}

	//izpis števila kovancov če je le to med 1 000 in 1 000 000
	if (GameMaster.coinTotal >= 1000 && GameMaster.coinTotal < 1000000)
	{
		tisoc = GameMaster.coinTotal / 1000;
		ostanek = GameMaster.coinTotal - tisoc * 1000;

		if (ostanek < 10)
		{
			TotalCoinsNumText.text = tisoc.ToString("F0") + " 00" + ostanek.ToString("F0");
		}
		else if (ostanek >= 10 && ostanek < 100)
		{
			TotalCoinsNumText.text = tisoc.ToString("F0") + " 0" + ostanek.ToString("F0");
		}
		else if (ostanek >= 100)
		{
			TotalCoinsNumText.text = tisoc.ToString("F0") + " " + ostanek.ToString("F0");
		}
	}

	//izpis števila kovancov če je le to nad 1 000 000
	//za izpis nad 1 000 000 000 nimam ker ne pričakujem takih vrednosti
	if (GameMaster.coinTotal >= 1000000)
	{
		miljon = GameMaster.coinTotal / 1000000;
		tisoc = (GameMaster.coinTotal - (miljon * 1000000)) / 1000;
		ostanek = GameMaster.coinTotal - ((miljon * 1000000) + (tisoc * 1000));
		if (tisoc < 10)
		{
			if (ostanek < 10)
			{
				TotalCoinsNumText.text = miljon.ToString("F0") + " 00" + tisoc.ToString("F0") + " 00" + ostanek.ToString("F0");
			}
			else if (ostanek >= 10 && ostanek < 100)
			{
				TotalCoinsNumText.text = miljon.ToString("F0") + " 00" + tisoc.ToString("F0") + " 0" + ostanek.ToString("F0");
			}
			else if (ostanek >= 100)
			{
				TotalCoinsNumText.text = miljon.ToString("F0") + " 00" + tisoc.ToString("F0") + " " + ostanek.ToString("F0");
			}			
		}
		if (tisoc >= 10 && tisoc < 100)
		{
			if (ostanek < 10)
			{
				TotalCoinsNumText.text = miljon.ToString("F0") + " 0" + tisoc.ToString("F0") + " 00" + ostanek.ToString("F0");
			}
			else if (ostanek >= 10 && ostanek < 100)
			{
				TotalCoinsNumText.text = miljon.ToString("F0") + " 0" + tisoc.ToString("F0") + " 0" + ostanek.ToString("F0");
			}
			else if (ostanek >= 100)
			{
				TotalCoinsNumText.text = miljon.ToString("F0") + " 0" + tisoc.ToString("F0") + " " + ostanek.ToString("F0");
			}			
		}
		if (tisoc >= 100)
		{
			if (ostanek < 10)
			{
				TotalCoinsNumText.text = miljon.ToString("F0") + " " + tisoc.ToString("F0") + " 00" + ostanek.ToString("F0");
			}
			else if (ostanek > 10 && ostanek < 100)
			{
				TotalCoinsNumText.text = miljon.ToString("F0") + " " + tisoc.ToString("F0") + " 0" + ostanek.ToString("F0");
			}
			else if (ostanek > 100)
			{
				TotalCoinsNumText.text = miljon.ToString("F0") + " " + tisoc.ToString("F0") + " " + ostanek.ToString("F0");
			}			
		}
	}
	//KONEC!! IZPISA ŠTEVILA KOVANCEV V "STORE" - jup, this much code for that crap if you want spacings -.-
}