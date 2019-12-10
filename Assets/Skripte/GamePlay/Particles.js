#pragma strict

//coin Particle
var CoinParticles : GameObject;
static var spawnCoinparticles : boolean = false;
static var CoinTransform : Transform; //za lokacijo kovanca pri spavnanju particlov - v spavnerju

//Object particle when destroyed
//var ObjectParticles : GameObject;
//static var spawnObjectParticles : boolean = false;
//static var ObjectTransform : Transform; //za lokacijo kovanca pri spavnanju particlov - v spavnerju

//PowerUp particle when destroyed
var PowerUpParticles1 : GameObject;
var PowerUpParticles2 : GameObject;
var PowerUpParticles3 : GameObject;
static var spawnPowerUpParticles1 : boolean = false;
static var spawnPowerUpParticles2 : boolean = false;
static var spawnPowerUpParticles3 : boolean = false;
static var PowerUpTransform : Transform; //za lokacijo kovanca pri spavnanju particlov - v spavnerju

function Awake ()
{
	//
	spawnCoinparticles = false;
	spawnPowerUpParticles1 = false;
	spawnPowerUpParticles2 = false;
	spawnPowerUpParticles3 = false;
	//
}

function Update () 
{
	if (spawnCoinparticles)
	{
		CoinParticleStart();
	}

//	if (spawnObjectParticles)
//	{
//		ObjectParticleStart();
//	}

	if (spawnPowerUpParticles1) //health & shield
	{
		PowerUpParticleStart1();
	}
	if (spawnPowerUpParticles2) //Coin & magnet & slow
	{
		PowerUpParticleStart2();
	}
	if (spawnPowerUpParticles3) //jump
	{
		PowerUpParticleStart3();
	}
}

function CoinParticleStart ()
{
	
	Instantiate (CoinParticles, CoinTransform.transform.position, CoinTransform.transform.rotation);
	spawnCoinparticles = false;
}

//function ObjectParticleStart ()
//{
//	
//	Instantiate (ObjectParticles, ObjectTransform.transform.position, ObjectTransform.transform.rotation);
//	spawnObjectParticles = false;
//}

function PowerUpParticleStart1 ()
{
	Instantiate (PowerUpParticles1, PowerUpTransform.transform.position, PowerUpTransform.transform.rotation);
	spawnPowerUpParticles1 = false;
}
function PowerUpParticleStart2 ()
{
	Instantiate (PowerUpParticles2, PowerUpTransform.transform.position, PowerUpTransform.transform.rotation);
	spawnPowerUpParticles2 = false;
}
function PowerUpParticleStart3 ()
{
	Instantiate (PowerUpParticles3, PowerUpTransform.transform.position, PowerUpTransform.transform.rotation);
	spawnPowerUpParticles3 = false;
}