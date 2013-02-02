#pragma strict
#pragma downcast

var spawnPoint : Transform;

var currentHealth : int;

var frequency : float = 10;
static var exph : float = 0 ;
private var lastFireTime : float = -1;
 var state : boolean = true;
var counter : float = 0 ;
 var ff : boolean = true;
 static var faf : boolean = false;
static var fexport : boolean = false;
var bulletPrefab : GameObject;
//90cf1c16-0e23-49bc-a65c-f484db4b52d9 PHOTON UNITY NETWORK APP IP WORKING CODE

	var go  : GameObject;
	
private var spawned : boolean = false;
function Start () {

}

function Update () {
fexport = faf; /*
	if (faf) {

		if (spawned) {
			
			spawned = false;
	//	go = Spawner.Spawn (bulletPrefab, Vector3(0,0,counter), Quaternion.identity)  as GameObject;

		//	counter +=5;
		//	currentHealth +=5;
		//	exph = currentHealth;

		}
		
	}
	else{
	spawned = true;
	}
*/
}




function Startb () {
faf = true;
/*
	if (arty.length == 0) {
	go = Spawner.Spawn (bulletPrefab, Vector3(0,0,counter), Quaternion.identity)  as GameObject;
	arty.push(go);
	counter += 5;
	}
	*/
}

function Stopb () {

//if (arty.length == 1) {
//var gg = arty.pop() ;
//Spawner.Destroy(gg);

//}
	faf = false;
}


// SendNext(arty) interfers with faf why////?? strings don't seem to interfere. fallafels test serialize. 
static var fall =  'fallafels';
static var arty = Array() ;

function OnPhotonSerializeView ( stream : PhotonStream,  info : PhotonMessageInfo)    
   {
    if(stream.isWriting){
    	stream.SendNext(faf);
    	stream.SendNext(fall);
  	//stream.SendNext(arty);
	//	health = currentHealth;
        //stream.Serialize(health);
    
    }else{
		//stream.Serialize(health);
     //   currentHealth = health;
    	var val : boolean = stream.ReceiveNext();
		fall = stream.ReceiveNext();

    	if(val)
    	Startb();
    	else
    	Stopb();
		
		
    }
   }

/*
if (FreeMovementMotor.tte) {
			signalguy.SendSignals (this);

	if (state){
	var randomnumber=Random.Range(-10.0, 50.0);

				go = Spawner.Spawn (bulletPrefab, Vector3(0,0,randomnumber), Quaternion.identity)  as GameObject;

				state = false;

	//		state = true;
	}
	}
else{
	Spawner.Destroy(go);
	state = true;
			

}
if (!FreeMovementMotor.tte) {
		stopsignalguy.SendSignals (this);

}
*/

		//if (Time.time > lastFireTime + 1 ) {
		
			//counter +=5;

	//if (state){
		//		state = false;
	//	var randomnumber=Random.Range(-10.0, 50.0);

			//lastFireTime = Time.time;
//	 if (PhotonView.isMine){
//	var go : GameObject =  Spawner.Spawn (bulletPrefab, Vector3(0,0,randomnumber), Quaternion.identity)  as GameObject;
		//	go = Spawner.Spawn (bulletPrefab, Vector3(0,0,counter), Quaternion.identity)  as GameObject;  //THISUN
	//		go = Instantiate(bulletPrefab, Vector3 (0, 0, 0), Quaternion.identity);
//	faf = false;
			//}

//}

//else{
	//Spawner.Destroy(go);
//	state = true;
//}

/*	

go.transform.position.x = 30.0f;

go.SetActive (false);
Spawner.Destroy(go);
							if (Input.GetKeyDown ("z")){
			if (faf == true) {
				faf = false;
				}
			else {
				faf = true;
				}
			}
		if (ff){
			
			if (FreeMovementMotor.tte) {
			
			var go : GameObject = Spawner.Spawn (bulletPrefab, Vector3(0,0,0), Quaternion.identity) as GameObject;
			ff = false;
	}
	}
	*/


