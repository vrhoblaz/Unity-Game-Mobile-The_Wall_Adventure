#pragma strict

var psCloseR : ParticleSystem;
var psCloseL : ParticleSystem;

function ChangeCloudSpeed ()
{
	var vel = psCloseR.velocityOverLifetime;
	vel.enabled = true;
	vel = psCloseL.velocityOverLifetime;
	vel.enabled = true;
}