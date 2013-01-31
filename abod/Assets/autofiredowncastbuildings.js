#pragma strict
#pragma downcast

var spawnPoint : Transform;

var frequency : float = 10;

private var lastFireTime : float = -1;
 var state : boolean = true;
var counter : float = 0 ;
 var ff : boolean = true;
 static var faf : boolean = false;

var bulletPrefab : GameObject;
//90cf1c16-0e23-49bc-a65c-f484db4b52d9 PHOTON UNITY NETWORK APP IP WORKING CODE

	var go  : GameObject;
function Start () {

}

function Update () {

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
if (faf) {
		if (Time.time > lastFireTime + 1 ) {
		
			counter +=5;

	//if (state){
		//		state = false;
	//	var randomnumber=Random.Range(-10.0, 50.0);

			lastFireTime = Time.time;
//	 if (PhotonView.isMine){
//	var go : GameObject =  Spawner.Spawn (bulletPrefab, Vector3(0,0,randomnumber), Quaternion.identity)  as GameObject;
		//	go = Spawner.Spawn (bulletPrefab, Vector3(0,0,counter), Quaternion.identity)  as GameObject;  //THISUN
	//		go = Instantiate(bulletPrefab, Vector3 (0, 0, 0), Quaternion.identity);
//	faf = false;
			}

}
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
}



function Startb () {
	faf = true;
	go = Spawner.Spawn (bulletPrefab, Vector3(0,0,counter), Quaternion.identity)  as GameObject;

}

function Stopb () {
	faf = false;
}

function OnPhotonSerializeView ( stream : PhotonStream,  info : PhotonMessageInfo)    
   {
    if(stream.isWriting){
    	stream.SendNext(faf);
    
    }else{
    
    	var val : boolean = stream.ReceiveNext();
    	if(val)
    	Startb();
    	else
    	Stopb();
    }
   }

