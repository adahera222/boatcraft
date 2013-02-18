#pragma strict
//Path of HexTiles haha
import System.Collections.Generic;
private var view : PhotonView;
//This is all class monobehaviour but it said it's redundant to put that in even tho it's in other scripts.
private var playerMovementPlane : Plane;
static var cursorWorldPosition : Vector3; 
var startime : float ;


class ClassName{
  var name:String;
  var score:int;
  function ClassName(n:String){
    this.name = n;
    this.score = 0; // Note it is 0 by default
  }
}

	
	function playernames() {
   
   
	     var playerGOs = GameObject.FindGameObjectsWithTag("Player"); 
		var namearray = Array(); 
		var tempb : boolean = true;
			   for ( var gon : GameObject in playerGOs)  { //GetComponent(typeof(PhotonView)).isMine
					//	var xyz = gon.transform.position;
					var crs = gon.GetComponent(typeof(startsynchro));

						var view = gon.GetComponent(typeof(PhotonView));
						var name = gon.GetComponent(typeof(PhotonView)).owner;
						
																						var strt = crs.started;
																					if (strt) {
																					started = true;
																					}
										//var sht = crs.myHashtable;
										if (!started){
																var sht = crs.notready;
																if (sht ) {
																	tempb = false;
																	}
												
		namearray.push(sht);
	}
						namearray.push(name);
				//		baknames.push(name);
										

					}
					tempbool = tempb;
					return namearray;
					}
					
var bigfontskin : GUISkin;
var	labelnames;
function Start () {
		labelnames = playernames();

	playerMovementPlane = new Plane (Vector3.up, Vector3(0,0,0));
	startime = Time.time;
	view = GetComponent(typeof(PhotonView));
}

var tempbool : boolean = false;
var notready : boolean = true;	
static var started : boolean = false;	 
var ffs = true;
static	var baknames : Array ;
var lastt = 0f;

function OnGUI() {

	if (view.isMine) {

	if (Time.time > lastt + .3){
	lastt = Time.time;
		labelnames = playernames();

	}
	
		GUI.skin = bigfontskin;
	  GUI.Label (Rect (500, 10, 200, 100),cursorWorldPosition.ToString() + 'pos');
	  
	    		GUILayout.BeginArea (Rect (50,500,200,300));

			if (!started) {
				if (notready){
		
		if(GUILayout.Button ('Not ready.') ) {
				notready = false;
				}
			}

			else{
			if(GUILayout.Button ('READY')) {
				notready = true;
				}
			}
			}

			
					
			if (!started && tempbool) { 

						if(GUILayout.Button ('Start')) {
								started = true;
						}
						}
						

			
						
			var arty = Array();
			GUILayout.EndArea ();	

			
					
			if (started) {

				
					  GUI.Label (Rect (250, 150, 300	, 150),'bugs' );
			}
			
			
	  //    GUI.Label (Rect (100, 200, 300, 300),activeplayer.ToString() );
	      GUI.Label (Rect (150, 200, 300, 300),labelnames.ToString());
	   //   GUI.Label (Rect (600, 300, 300, 300),notready.ToString());

	  
  }

}


var stateholder : boolean = true;

function OnStartFire () {
	notready = true;
}

function OnStopFire () { //deprecated 
	notready = false;
	
} 
function OnPhotonSerializeView ( stream : PhotonStream,  info : PhotonMessageInfo)    
   {
    if(stream.isWriting){
    	stream.SendNext(notready);
		stream.SendNext(started);
    }else{
    
    	var val : boolean = stream.ReceiveNext();
		started = stream.ReceiveNext();
    	if(val)
    	OnStartFire();
    	else
    	OnStopFire();
		

    }
   }

