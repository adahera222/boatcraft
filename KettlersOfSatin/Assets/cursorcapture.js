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

/*
class startfunct{
	var turnorder : Array;
	function startfunct(){
		this.turnorder = Array()
		if(PhotonNetwork.isMasterClient){ // this makes sure only a single client is executing the start randomization function
		//see health.js for an example where they do the same thing with health, the masterclient switches randomly when someone leaves.
		//but if you serialize the turn order after its generated theres no problems. if someone disconnected right when starting it might mess up though?
		
			for (var zzz = 0; zzz < namearray.length-1;zzz++) {
				namearray.pop()

		Random.Range(0, namearray.length -1);
		
		
		}
		}
	*/
	var turnorder = Array();
	
	static function RandomizeArray(arr : Array)
{
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Random.Range(0,i);
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
	
}
//Dictionary.<String, String>   to : List.<String>
@RPC
function setTO(to : Dictionary.<String, String> ){
  myDictionary = to;
}

@RPC
function setTOAL(to : ArrayList ){
  myArrayList = to;
}

@RPC
function setTOL(to : List.<String> ){
  myList = to;
}
//no work error unity array
//@RPC
//function setTOA(to : Array){
    //turnorder = to;
//}
static var localte : String = 'notyetmodified';

var myArrayList = new ArrayList();  

@RPC
function tester (sng : String) {
localte = sng;

}
var myList : List.<String> = new List.<String> ();  
function startfunct(names : Array) {

		if(PhotonNetwork.isMasterClient){ // this makes sure only a single client is executing the start randomization function
		
			turnorder = names;
			RandomizeArray(turnorder);
			var cnt = 0;
			//for (var aa in turnorder) {
			
					//			var anItem : String = aa.ToString();
				//	myDictionary[anItem] = 'wtf';

			//	myHashtable[hayay] = cnt.ToString();
					
					
					//			cnt++;
				//	}
			//	}
					//	view.RPC('tester', PhotonTargets.All,'teststring');

			//
		//	view.RPC('setTO', PhotonTargets.Others,myDictionary);
		//	view.RPC('setTOL', PhotonTargets.Others,lister);

			}
	//		myHashtable = Dictionary.<String, String> 
			//for (var zzz = 0; zzz < namearray.length-1;zzz++) {

		
		
}
  function playernames() {
   
   
	     var playerGOs = GameObject.FindGameObjectsWithTag("Player"); 
		var namearray = Array(); 
		var tempb : boolean = true;
			   for ( var gon : GameObject in playerGOs)  { //GetComponent(typeof(PhotonView)).isMine
					//	var xyz = gon.transform.position;
					var crs = gon.GetComponent(typeof(cursorcapture));

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

function Start () {
playerMovementPlane = new Plane (Vector3.up, Vector3(0,0,0));
	startime = Time.time;
	view = GetComponent(typeof(PhotonView));
}
//OH HH can i pass in a built in array/ = [legnth]
var myHashtable = Dictionary.<String, String> ();
//var lister = List.<String> ();
var myDictionary : Dictionary.<String,String> = new Dictionary.<String,String> ();
 
						var tempbool : boolean = false;
	 var notready : boolean = true;	
static var started : boolean = false;	 

		var ffs = true;
		
		
	static	var baknames : Array ;
function OnGUI() {

	
	 if (view.isMine){
	 
		GUI.skin = bigfontskin;
	  GUI.Label (Rect (500, 10, 200, 100),cursorWorldPosition.ToString() + 'pos');
	  
	    		GUILayout.BeginArea (Rect (50,500,200,300));

			if (!started) {
				if (notready){
		
		if(GUILayout.Button ('Not ready.') ) {
				notready = false;
				}
			}
	// change to yield funct or screenlock ? true false thing		
	
			else{
			if(GUILayout.Button ('READY')) {
				notready = true;
				}
			}
			}
		//	var intermed =  playernames();
			//var namelist = intermed[0];

		//	baknames = intermed[1];
		//	var labelnames = namelist.ToString();
		var	labelnames = playernames();
		
			
					
			if (!started && tempbool) { 

						if(GUILayout.Button ('Start')) {
								started = true;
						}
						}
						
						
		//	if (ffs)
			//if (started) {
			
			//var templist = Array();
		//	for (var a in lister) {
		//	templist.push(a);
			
		//	}


			
						
			var arty = Array();
			GUILayout.EndArea ();	

			
					
			if (started) {

										

								//	for (var doublestr in myDictionary) {
			//		arty.push(doublestr); // need a HAsOwnKey JS instance it didnt work elsewhere or just pop the last two entries?
				//	}
				
					  GUI.Label (Rect (250, 150, 300	, 150),'bugs' );
			}
			
			
	  //    GUI.Label (Rect (100, 200, 300, 300),activeplayer.ToString() );
	      GUI.Label (Rect (150, 200, 300, 300),labelnames.ToString());
	   //   GUI.Label (Rect (600, 300, 300, 300),notready.ToString());

	  
  }

}

//making a grid of game objects is stupid, you know what's not stupid? making a hex position mask
//actually is a raycast equivalent//?? good questions.
//but it already works this way so fuck it.



var stateholder : boolean = true;
function Update () {
//if (started && ffs) {
					//			ffs = false;
									//		startfunct(baknames) ;//make class later

//	}

		var cursorScreenPosition : Vector3 = Input.mousePosition;
						
			// Find out where the mouse ray intersects with the movement plane of the player
		 cursorWorldPosition= ScreenPointToWorldPointOnPlane (cursorScreenPosition, playerMovementPlane, Camera.main);
}

public static function ScreenPointToWorldPointOnPlane (screenPoint : Vector3, plane : Plane, camera : Camera) : Vector3 {
	// Set up a ray corresponding to the screen position
	var ray : Ray = camera.ScreenPointToRay (screenPoint);
	
	// Find out where the ray intersects with the plane
	return PlaneRayIntersection (plane, ray);
}
public static function PlaneRayIntersection (plane : Plane, ray : Ray) : Vector3 {
	var dist : float;
	plane.Raycast (ray, dist);
	return ray.GetPoint (dist);
}

function OnStartFire () {
	notready = true;
}

function OnStopFire () {
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

