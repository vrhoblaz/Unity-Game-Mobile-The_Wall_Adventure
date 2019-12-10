
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Advertisements;

public class AdManager : MonoBehaviour {

	private int rewardIdentifier = 0;
	//	1 - get 500 coins
	//	2 - unlock tiple
	//	3 - respawn
	//	4 - + 0.5 multiplier
	//	5 - Challange Refresh

	bool errorDisplayed = false;	// bool ki preprečuje da bi lahko 2x pritisnil na ad medtem ko je izpisan error
	//	2x bool če bi hotel drugačen text glede na to kdaj fail-a (lahko se uporabi samo en)
//	bool failedToShow = false;
//	bool failedOnResould = false;

	//	zažene video
	private void ShowRewardedVid ()
	{
		if (Advertisement.IsReady ()) {
			Advertisement.Show ("rewardedVideo", new ShowOptions (){ resultCallback = HandleAdResould });
		} else {
			if (!errorDisplayed && (rewardIdentifier == 1 || rewardIdentifier == 2 || rewardIdentifier == 3 || rewardIdentifier == 4|| rewardIdentifier == 5)) {
				errorDisplayed = true;
//				failedToShow = true;
				StartCoroutine (ShowErrorOnRespwanFailure ());
			}
			rewardIdentifier = 0;
		}
	}

	private void HandleAdResould(ShowResult result)
	{
		switch (result) {
		case ShowResult.Skipped:
			Debug.Log ("skip");
			break;
		case ShowResult.Failed:
			if (rewardIdentifier == 1 || rewardIdentifier == 2 || rewardIdentifier == 3 || rewardIdentifier == 4|| rewardIdentifier == 5) {
//				failedOnResould = true;
				StartCoroutine (ShowErrorOnRespwanFailure ());
			}
			rewardIdentifier = 0;
			break;
		case ShowResult.Finished:
				if (rewardIdentifier == 1) {
					rewardIdentifier = 0;
					AdJavaInterface.adIndentifier = 1;
				}
				else if (rewardIdentifier == 2) {
					rewardIdentifier = 0;
					AdJavaInterface.adIndentifier = 2;
				}
			else if (rewardIdentifier == 3) {
				rewardIdentifier = 0;
				AdJavaInterface.adIndentifier = 3;
			}
				else if (rewardIdentifier == 4) {
					rewardIdentifier = 0;
					AdJavaInterface.adIndentifier = 4;
				}
				else if (rewardIdentifier == 5) {
					rewardIdentifier = 0;
					AdJavaInterface.adIndentifier = 5;
				}
			break;
		}
	}

	//coins in store
	public void GetCoins()
	{
		if (!errorDisplayed) {
			rewardIdentifier = 1;
			ShowRewardedVid ();
		}
	}
	
	//unlock triple coin purchase
	public void GetTipleBuy()
	{
		if (!errorDisplayed) {
			rewardIdentifier = 2;
			ShowRewardedVid ();
		}
	}

	//Respawn after death
	public void RespawnWithAd()
	{
		rewardIdentifier = 3;
		ShowRewardedVid ();
	}

	//End Multiplier +0.5
	public void IncreseMultiplier()
	{
		if (!errorDisplayed) {
			rewardIdentifier = 4;
			ShowRewardedVid ();
		}
	}

	//Challange Refresh
	public void ChallRefresh()
	{
		if (!errorDisplayed) {
			rewardIdentifier = 5;
			ShowRewardedVid ();
		}
	}

	//	Respawn Error images & txts
	public GameObject mainErrorGameObject;
	private float alphaFloat;
	public Image mainErrorImg;
	public Image secondErrorImg;
	public Text titleErrorTxt;
	public Text descrErrorTxt;

	// Error on Respawn ad failure
	IEnumerator ShowErrorOnRespwanFailure()
	{
		Color mainImgColor = mainErrorImg.color ;
		Color secondImgColor = secondErrorImg.color;
		Color txtColorTitle = titleErrorTxt.color;
		Color txtColorDesc = descrErrorTxt.color;

		mainImgColor.a = 1f;
		secondImgColor.a = 1f;
		txtColorTitle.a = 1f;
		txtColorDesc.a = 1f;

		mainErrorImg.color = mainImgColor;
		secondErrorImg.color = secondImgColor;
		titleErrorTxt.color = txtColorTitle;
		descrErrorTxt.color = txtColorDesc;
		mainErrorGameObject.SetActive (true);
		yield return new WaitForSeconds (2f);

		alphaFloat = 1f;
		while (alphaFloat > 0) {
//			Debug.Log ("agdi-");
			alphaFloat -= 1f * Time.deltaTime;
			mainImgColor.a = alphaFloat;
			secondImgColor.a = alphaFloat;
			txtColorTitle.a = alphaFloat;
			txtColorDesc.a = alphaFloat;
			mainErrorImg.color = mainImgColor;
			secondErrorImg.color = secondImgColor;
			titleErrorTxt.color = txtColorTitle;
			descrErrorTxt.color = txtColorDesc;
			yield return new WaitForSeconds (0.0f);
		}
		mainErrorGameObject.SetActive (false);
		if (rewardIdentifier == 3)
		{
			AdJavaInterface.adFailed = 3;
		}
		errorDisplayed = false;
	}
}