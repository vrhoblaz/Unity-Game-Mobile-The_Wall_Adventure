using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using GooglePlayGames;
using UnityEngine.SocialPlatforms;

public class LoginAndLogout : MonoBehaviour {

	public Text SigninAndOut;

	// Naj bo v updatu. Če ni se lahko prijaviš ravno po tem ko se naloži in kaže napačno
	void Update () {
		if (Social.localUser.authenticated) {
			SigninAndOut.text = "Sign Out";
		} else {
			SigninAndOut.text = "Sign In";
		}
	}
	
	public void SigninBtn ()
	{
		if (Social.localUser.authenticated) {
			PlayGamesPlatform.Instance.SignOut ();
			SigninAndOut.text = "Sign In";
		} else {
			Social.localUser.Authenticate ((bool success) => {	
				if (success)
				{
					SigninAndOut.text = "Sign Out";
				}
			});
		}
	}
}
