using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class DrawFPS : MonoBehaviour {

	private int FramesPerSec;
	private float frequency = 1.0f;
	private string fps;
	private Text fpsText;

//	void Awake ()
//	{
//		Application.targetFrameRate = 60;
//	}

	void Start(){
		StartCoroutine(FPS());
		fpsText = GetComponent<Text> ();
	}

	private IEnumerator FPS() {
		for(;;){
			// Capture frame-per-second
			int lastFrameCount = Time.frameCount;
			float lastTime = Time.realtimeSinceStartup;
			yield return new WaitForSeconds(frequency);
			float timeSpan = Time.realtimeSinceStartup - lastTime;
			int frameCount = Time.frameCount - lastFrameCount;

			// Display it

			fps = string.Format("FPS: {0}" , Mathf.RoundToInt(frameCount / timeSpan));
		}
	}

	void Update ()
	{
		fpsText.text = fps;
	}
}