#pragma strict
private var state : boolean = false;
 public var signalguy : SignalSender;
 public var stopsignalguy : SignalSender;
 
function Start () {
	if(!(GetComponent("PhotonView") as PhotonView).isMine) {
		enabled=false;
		}
}

function Update () {
					//These signals need to be assigned in the game inspector!!! They currently trigger functions Startb and stopb
					// in autofiredowncastbuildings
					if (state == false && FreeMovementMotor.tte == true ) {
				signalguy.SendSignals (this);
		//	print('test');
		//		autofiredowncastbuildings.arty.push(5);
			state = true;
		}
		
		 if (state == true && FreeMovementMotor.tte == false ){
			stopsignalguy.SendSignals (this);
		//	print('test');
			state = false;
		}
}
