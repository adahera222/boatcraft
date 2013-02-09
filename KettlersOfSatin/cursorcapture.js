#pragma strict
//Path of HexTiles haha
import System.Collections.Generic;
var view : PhotonView;

private var playerMovementPlane : Plane;
static var cursorWorldPosition : Vector3; 
var startime : float ;
function Start () {
playerMovementPlane = new Plane (Vector3.up, Vector3(0,0,0));
	startime = Time.time;
	view = GetComponent(typeof(PhotonView));
	//if (view.isMine) {
	
	//	view.RPC("requestlist" ,PhotonTargets.Others);
	//}
}
		
/*
@RPC
function requestlist () {
	print ('received request');
	
	view.RPC("acceptlist" ,PhotonTargets.Others, myHashtable );
}

@RPC
function acceptlist (lss : Dictionary.<String, String>) {
//	if (rpclist.length < lss.length){
	print(lss);
	
	if (Time.time - startime < .5) {
	myHashtable = lss;
	print ('acceptlist');
	//rpclist = lss;
	//}
	}
	}


// declaration:
var myDictionary = new Dictionary.<KeyType,ValueType>();

// and a real-world declaration example (where 'Person' is a custom class):
var myContacts = new Dictionary.<string,Person>();

// insert or change the value for the given key
myDictionary[anyKey] = newValue;                 

// retrieve a value for the given key
var thisValue = myDictionary[theKey];      

// get the number of items in the Hashtable
var howBig = myDictionary.Count;                 

// remove the key & value pair from the Hashtable, for the given key.
myDictionary.Remove(theKey);
*/
	var joined = false;
var rpclist = Array();
//var startar = Array();

//var myHashtable = new Hashtable();               
 // var myHashtable = new Dictionary.<String,String>();
//var myHashtable = System.Collections.Generic.Dictionary.<String,String>;
//var myHashtable = Dictionary(String, String);

//EITHER USE THIS DICTIONARY OR A LIST.<string whatever the fuck MSDN Generic.Dictionary namespace uses
//make sure there is a fucking space after that >>> thing.
var myHashtable = Dictionary.<String, String> ();
/*
@RPC
function startlist(inpua : Array ) {
	if (Time.time - startime < 5) {
		rpclist = inpua;
		}
}


@RPC
function readyrpc(rdy : String, name: String, ntr: boolean ) {
	//rpclist = Array()
	//var spl = strng.Split('X');
	//var name = spl[1];
	myHashtable[name] = rdy;     
	
*/
	
	
	//rpclist.push(name + ' ' + ntr.ToString()); // holy shit this finally fucking works.
	// if (view.isMine){
	//notready = ntr;
	//}
	//if (bool){
	//	}
var coun : int = 0;
  var keys = Array(); // can't pass this thru rpc. need Generic.List fucking WHY
  			var 		sheys = Array();
static var notready : boolean = true;

function OnGUI() {

	
	 if (view.isMine){
	 
	 
  		GUILayout.BeginArea (Rect (200,500,200,300));
		
		/*
		
				if (notready){
		
		if(GUILayout.Button ('Not ready.') ) {
		
		//	if(PhotonNetwork.isMasterClient){
				//print(rpclist);
				notready = false;
		
				}
		//		}
			}
			
	
			else{
			if(GUILayout.Button ('READY')) {
			
			//	if(PhotonNetwork.isMasterClient){
	
				notready = true;
				}
			//	}
			}
			
			*/
		
		GUILayout.EndArea ();	


	  GUI.Label (Rect (10, 10, 100, 20),cursorWorldPosition.ToString() + 'pos');
/*
	 
  
  */
  
  /*

	

//for (var key  in myHashtable) {
  //if (myHashtable.hasOwnProperty(key)) {
  //  keys.push(key);
//  }
			for (var j =  rpclist.length-1; j > -1; j--) {
				var sp : Array = rpclist.pop().ToString().Split();
					if (!( sp[0] in keys) && sp[0] in namearray ) {
						    keys.push(sp);
					}
					}

						for (var k =  keys.length-1; k > -1; k--) {
							var ps = keys.pop();
							if (ps in namearray ) {
							sheys.push(keys[k]);
							}
							}
		*/
	//for (var entry  in rpclist) {
	//	
	//	if ( sp[0] in keys ) {
	   var playerGOs = GameObject.FindGameObjectsWithTag("Player"); 
		var namearray = Array(); 
			   for ( var gon : GameObject in playerGOs)  { //GetComponent(typeof(PhotonView)).isMine
					//	var xyz = gon.transform.position;
					var crs = gon.GetComponent(typeof(cursorcapture));
					var sht = crs.notready;
						var view = gon.GetComponent(typeof(PhotonView));
						var name = gon.GetComponent(typeof(PhotonView)).owner;
						namearray.push(name);
											//	namearray.push(sht);
//sendnext bool or dict, rpc, photon.instantiate
  }
/*
//	if (  (coun != 0) && namearray.length - coun > 0) {
//	if (sheys.length != 0){		
//	for (var entry : Array in sheys) {
	
	//view.RPC("startlist", PhotonTargets.Others,rpclist);
	//}
	//}
	//joined = true;
	
	//}
	var kkkeys = Array();
	for (var key  in myHashtable) {
  //if (myHashtable.hasOwnProperty(key)) {
    kkkeys.push(key);
  }
 // }
	
	
	coun = namearray.length;
		GUI.Label (Rect (400, 500, 100, 30),coun.ToString() + 'cnt');

	if (joined)
		GUI.Label (Rect (400, 400, 100, 30),notready.ToString() + 'LOCAL');
		
		
    GUI.Label (Rect (200, 300, 300, 300),kkkeys.ToString());
	*/
	//GUI.Label (Rect (500, 100, 100, 20),ToString() + 'pos');

}
}




var stateholder : boolean = true;
function Update () {
/*
	 if (view.isMine){
	if (notready) {
	
if (stateholder){
	stateholder = false;
	//view.RPC("requestlist" ,PhotonTargets.Others);

	
								var hown = view.owner.ToString();
						view.RPC("readyrpc", PhotonTargets.All,'ready',hown,notready);
	//	if(PhotonNetwork.isMasterClient){
	
//}

}
}
else{


	if (!stateholder) {
stateholder = true;

	//if(PhotonNetwork.isMasterClient){
		var own = view.owner.ToString();
			view.RPC("readyrpc", PhotonTargets.All,'notreadyX' , own,notready);
			//			}

}						
}
}

*/

//put a  castle in the sheep image
//if (stateholder) {

	//if (masstile.notready) {
	//	stateholder = false; // fire once
	//	view.RPC("readyrpc", PhotonTargets.All,false);
	
//	}
	//}
	
	//else{
	
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