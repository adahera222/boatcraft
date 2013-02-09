#pragma strict
/*
private var stateholder : boolean = true;
private var myHashtable = new Hashtable();                 

@RPC
function readyrpc(rdy : String, name : String) {
	//rpclist = Array()
	//var spl = strng.Split('X');
	//var name = spl[1];
	myHashtable[name] = rdy;     
	//rpclist.push([bool,name]);
	//if (bool){
		}

var view : PhotonView;
function Start () {

	view = GetComponent(typeof(PhotonView));
}

function Update () {

}


var notready : boolean = true;

function OnGUI() {
  		GUILayout.BeginArea (Rect (200,500,200,300));
		
		
		
				if (notready){
		
		if(GUILayout.Button ('Not ready.') ) {
		
			if(PhotonNetwork.isMasterClient){
			var own = view.owner.ToString();
			view.RPC("readyrpc", PhotonTargets.All,'notreadyX' , own);
				notready = false;
				}
				}
			}
			
	
			else{
			if(GUILayout.Button ('READY')) {
				if(PhotonNetwork.isMasterClient){
						var hown = view.owner.ToString();

						view.RPC("readyrpc", PhotonTargets.All,'ready',hown);
			
				notready = true;
				}
				}
			}
			
		
		GUILayout.EndArea ();	


	  //GUI.Label (Rect (10, 10, 100, 20),cursorWorldPosition.ToString() + 'pos');
	  /*
	    var playerGOs = GameObject.FindGameObjectsWithTag("Player"); 
		var namearray = Array(); 
			   for ( var gon : GameObject in playerGOs)  { //GetComponent(typeof(PhotonView)).isMine
					//	var xyz = gon.transform.position;
					
						var view = gon.GetComponent(typeof(PhotonView));
						var name = gon.GetComponent(typeof(PhotonView)).owner;
						namearray.push(name);
  }

    GUI.Label (Rect (200, 300, 100, 20),myHashtable.ToString());
	//GUI.Label (Rect (500, 100, 100, 20),ToString() + 'pos');

}

*/