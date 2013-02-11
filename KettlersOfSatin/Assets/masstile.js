#pragma strict
//this was the old tiling function it's not used anymore, but it still has a raycast selector at the bottom
//tiles, abbreviated because it's clear
var b : GameObject;
var w : GameObject;
var s : GameObject;
var sh : GameObject;
var f : GameObject;
//var oncollidescript : oncoll ;
function rgo() { //randomgameobject
	var rr : int = Random.Range(0, 4);
	//print(rr);
	if (rr == 0)
		return b;
	if (rr == 1)
		return w;
	if (rr == 2)
		return s;
	if (rr == 3)
		return sh;
	if (rr == 4)
		return f;
			}
	
var sphereprimitive : GameObject;
var workingtile : GameObject;
var vertx : GameObject;
var road : GameObject;
var tilelist : Array = Array();
var currentposition : Vector3 = Vector3(0,0,0);
		//	workingtile.AddComponent ("oncollid");
	//
//	fbs = workingtile.AddComponent(FoobarScript);
		var startpos2 : Vector3= Vector3(0,0,0);
function Start () {


	//I wasn't sure what the best way to tile was so I used the worst way first:
			/*
		for (var i = 0; i < 5; i++) {
			workingtile = rgo();
			Instantiate(workingtile,currentposition,Quaternion.identity);
			currentposition = currentposition + Vector3(0,0,22);
		}

		currentposition = Vector3(-8,0,-39);
			for (var j = 0; j < 4; j++) {
				workingtile = rgo();
				Instantiate(workingtile,currentposition,Quaternion.identity);
				currentposition = currentposition + Vector3(0,0,22);
		}
		
				currentposition = Vector3(32,0,-39);
			for (var k = 0; k < 4; k++) {
				workingtile = rgo();
				Instantiate(workingtile,currentposition,Quaternion.identity);
				currentposition = currentposition + Vector3(0,0,22);
		}
						currentposition = Vector3(52,0,-28);
			for (var qq = 0; qq < 3; qq++) {
				workingtile =rgo();
				Instantiate(workingtile,currentposition,Quaternion.identity);
				currentposition = currentposition + Vector3(0,0,22);
		}
						currentposition = Vector3(-28,0,-28);
			for (var zzz = 0; zzz <3;zzz++) {
				workingtile = rgo();
				Instantiate(workingtile,currentposition,Quaternion.identity);
				currentposition = currentposition + Vector3(0,0,22);
		}
		
		
		// declaration
var myHashtable = new Hashtable();                 

// insert or change the value for the given key
myHashtable[anyKey] = newValue;                    

// retrieve a value for the given key
var thisValue : ValueType = myHashtable[theKey];   (note the required type casting)

// get the number of items in the Hashtable
var howBig = myHashtable.Count;                    

// remove the key & value pair from the Hashtable, for the given key.
myHashtable.Remove(theKey);
		

		//currentposition = currentposition + Vector3(10,0,-50);
			currentposition = currentposition + Vector3(66,0,0);
		//for (var ett = 0; ett < 3;ett++) {
		//currentposition = currentposition + Vector3(ett*20,0,-22*ett);
		var gridsize = 8;
		
				for (var end = 3; end < gridsize;end++) {
		//var end = 3;
				var temppos : Vector3 = currentposition;
				
				
				for (var zzz = 0; zzz < end;zzz++) {
				
				
								//vertices --can be wrapped in a function
				var flag : boolean = true;
				var metatemp : Vector3 = temppos;
				var ang : float ; 
					for (var vertices = 0; vertices < 6;vertices++) {
							flag = true;
							ang = ( vertices*60*Mathf.Deg2Rad);
							metatemp = temppos + 11*Vector3(Mathf.Cos(ang),1,Mathf.Sin(ang) );
							var tempvector : Vector3 = Vector3(0,0,0);
							
							for (var hi = 0; hi < arryn.length; hi++) {
							
								 tempvector = arryn[hi];
								if ( ( tempvector- metatemp).magnitude < 5) {
									flag = false;
								}
							}
							
							if (flag){
							arryn.push(Instantiate(sphereprimitive,metatemp,Quaternion.identity).transform.position);
							}
							
							}
				
				
				fillroads(temppos,roadarrzz);
				
				
				
				workingtile = rgo();
				tilelist.push(Instantiate(workingtile,temppos,Quaternion.identity));
				
				temppos = temppos + Vector3(0,0,22);
		}
				currentposition = currentposition + Vector3((-20),0,-10.5);
		
		}
			currentposition = currentposition + Vector3(0,0,22*6);
			
		//	print (tilelist);
			
	
				for (var nend = (gridsize-2); nend > 2;nend--) {
		//var end = 3;

				var temppos2 : Vector3 = currentposition;
				
				for (var tzzz = 0; tzzz < nend;tzzz++) {
				
				//vertices2
				fillvertices2(temppos2,nend);
				fillroads(temppos2,roadarrzz);
				
				
				
				
				
				workingtile = rgo();
				tilelist.push(Instantiate(workingtile,temppos2,Quaternion.identity));
				temppos2 = temppos2 + Vector3(0,0,-22);

		}
				
						currentposition = currentposition + Vector3((-20),0,-10.5);
		}	

	//	}
		//when user clicks down, lock selection location and change the color to red. or something
		
		
	*/
		
	
	
}
var roadprim : GameObject;
var roadarrzz : Array = Array();
function 	fillroads(temppos2,roadarr : Array) { // OH woops declare the type!
			//	var roadart : Array = roadarrloc;
				var temppos2local : Vector3  = temppos2;
				var flag : boolean = true;
				var metatemp : Vector3 = temppos2local;
				var ang : float ; 
				var roadangles = Array(150,90,30,-30,-90,-150);
				var roadangle : float = 90;
					for (var vertices = 0; vertices < 6;vertices++) {
							flag = true;
							ang = ( (vertices*60*Mathf.Deg2Rad) +35);
						/*	if (vertices == 0) {
								ang += -5;
								}
							if (vertices == 3){
					
								ang += 5;
								}
								*/
							metatemp = temppos2local + 11*Vector3(Mathf.Cos(ang),1,Mathf.Sin(ang) );
							var tempvector : Vector3 = Vector3(0,0,0);
							
							for (var hi = 0; hi < roadarr.length; hi++) {
							
								 tempvector = roadarr[hi];
								if ( ( tempvector- metatemp).magnitude < 5) {
									flag = false;
								}
							}
							
							if (flag){
							//roadangle += -60;
							roadarr.push(Instantiate(roadprim,metatemp,Quaternion.Euler(0,roadangles[vertices],0) ).transform.position);
							}
							
							}
							
						
						}
						
						
						
function 	fillvertices2(temppos2,nend:int) {
				var temppos2local : Vector3  = temppos2;
				var flag : boolean = true;
				var metatemp : Vector3 = temppos2local;
				var ang : float ; 
					for (var vertices = 0; vertices < 6;vertices++) {
							flag = true;
							ang = ( vertices*60*Mathf.Deg2Rad);
							metatemp = temppos2local + 11*Vector3(Mathf.Cos(ang),5,Mathf.Sin(ang) );
							var tempvector : Vector3 = Vector3(0,0,0);
							
							for (var hi = 0; hi < arryn.length; hi++) {
							
								 tempvector = arryn[hi];
								if ( ( tempvector- metatemp).magnitude < 6 ||  (  ((vertices == 0) || (vertices == 1) || (vertices == 5) ) && (nend == 6) )     ){
									flag = false;
								}
							}
							
							if (flag){
							arryn.push(Instantiate(sphereprimitive,metatemp,Quaternion.identity).transform.position);
							}
							
							}
							
						
						}
var arryn : Array = Array();
var currentnameselected = 'nothing selected';
var lastFireTime : float = 0; 
var placemarker : GameObject;
var bigfontskin : GUISkin;

function OnGUI(){
		GUI.skin = bigfontskin;

  GUI.Label (Rect (800, 110, 110, 100),currentnameselected.ToString());
  	//	GUILayout.BeginArea (Rect (Screen.width/4,Screen.height/9,200,300));

		/*
				if (!notready){
		if (waitingtostart){

		
		if(GUILayout.Button ('Start Game') ) {
				waitingtostart = false;
				}
			}
			
		
			else{
			if(GUILayout.Button ('Destroy game.')) {
				waitingtostart = true;
				}
			}
			}
				if (waitingtostart) {		
				
				*/

}
//static var notready : boolean = true;
var waitingtostart : boolean = true;
var started : boolean = false;

function Update () {



if (!waitingtostart) {


}

/*
			var	tileGOs = GameObject.FindGameObjectsWithTag("tiletag"); 
		
		if (Time.time > lastFireTime + .1) {
		
		lastFireTime =Time.time ;
			  for ( var tiley : GameObject in tileGOs)  { 
			   
			  print((tiley.transform.position - cursorcapture.cursorWorldPosition).ToString());
			   }
			   
			   }
//cursorcapture.cursorWorldPosition
*/
    var hit: RaycastHit;
    var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	    
        if (Physics.Raycast (ray, hit, 500)) 
        {//(hit.collider.gameObject.transform.position.ToString());
		
		currentnameselected = hit.collider.gameObject.name;
		placemarker.transform.position = (hit.collider.gameObject.transform.position);
          //  if(hit.collider.gameObject.tag == "tagOfYourObect")
		
		}
}

