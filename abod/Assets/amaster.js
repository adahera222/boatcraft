#pragma strict
static var mastr = Array() ;
//some RPC demos but Photonnetwork.instantiate seemed more appropriate. Another example in gamemanager.cs
/*
var view : PhotonView;

//save mouse motions somewhere.
@RPC
function RequestList(){
    //health = newVal;
	if( mastr.length != 0 ){
		view.RPC("SendGOL", PhotonTargets.Others,mastr);
}

}

@RPC
function SendGOL(GOL : Array){

	if( mastr.length != 0 ){
		view.RPC("ReceiveGOL", PhotonTargets.Others,GOL);
}

@RPC
function ReceiveGOL(GOL : Array){

	if( mastr.length == 0 ){
		mastr = GOL;
}
}
function Start () {

view = GetComponent(typeof(PhotonView));
if(PhotonNetwork.isMasterClient){
view.RPC("RequestList", PhotonTargets.Others);

}

}
private var state : boolean = true;
function Update () {





if (FreeMovementMotor.tte) {
	if (state) { 
		state = false;
		mastr.push(5);
	}
}
else{
state = true;
}

}

function OnPhotonSerializeView ( stream : PhotonStream,  info : PhotonMessageInfo)    
   {
    if(stream.isWriting){
    	stream.SendNext(mastr); // Why doesn't this serialize arrays? 

  	//stream.SendNext(arty);
	//	health = currentHealth;
        //stream.Serialize(health);
    
    }else{
		//stream.Serialize(health);
     //   currentHealth = health;
		mastr = stream.ReceiveNext();
		
    }
   }
   
   */