

import System.Collections.Generic;
#pragma strict

private var viewloc : PhotonView;
private var view : PhotonView;



function Start () {
	viewloc= grab_view();

	view  = GetComponent(typeof(PhotonView));
}

	

var textures : Texture[];
var hexmeshgo : GameObject;
var roadgo : GameObject;
var whex : GameObject;
private var flag : boolean = true;
var spheretester : GameObject;
private var phi : float = 1.61803398875;


var colors = new  Color[6];
colors[0] = Color.red;
colors[1] = Color.green;
colors[2] = Color.blue;
colors[3] = Color.yellow;
colors[4] = Color.gray;
colors[5] = Color.magenta;
	
	
var tilenumray = Array();
var randtiles = Array();


@RPC
function spawninfo( tiletextures : int[], tilefreq : int[] ) {

	for (var tex :int in tiletextures) {
		randtiles.push(tex);
	}

	for (var freq :int  in tilefreq) {
		tilenumray.push(freq);
	}
	
	spawnboard() ;

} 

function spawnboard() {
	var testhex : GameObject = new GameObject.FindWithTag("bound")  ;
	var gridsize : int = 19;
	var sca = Mathf.Pow(phi,5.8); //golden scales look pretty
	//only rv is being used but the others should help with spacing later when you resize the tile grids.
	testhex.transform.localScale = Vector3(sca,3,sca);
	var coll = testhex.GetComponent(typeof(MeshCollider));
	var c : Vector3= coll.bounds.center;
	var r = coll.bounds.extents.x; 
	var rv : Vector3 = Vector3(r,0,0);
	var rnd = testhex.GetComponent(typeof(MeshRenderer));
	var topvertex2 : Vector3 = coll.bounds.center + Vector3(0,0,coll.bounds.extents.z); //same thing
	var topvertex : Vector3 = rnd.bounds.center + Vector3(0,0,rnd.bounds.extents.z);
	var s = r / (Mathf.Cos(30*Mathf.Deg2Rad) );
	var h = s*(Mathf.Sin(30*Mathf.Deg2Rad) );
	var u = coll.bounds.extents.z;
	var uv : Vector3 = Vector3(0,0,u);
	var hu : Vector3 =  Vector3(0,0,h) ;
	var x = topvertex.x;
	var y = topvertex.z;
	var scale2 =Mathf.Pow(phi,.5);
	var scale =Mathf.Pow(phi,.9);
	var cnt = 0;
	var scaa = Mathf.Pow(phi,4.5);
	var tilemax = 3;
	var scalez =Mathf.Pow(phi,.9);
	var tilescale = Mathf.Pow(phi,5.8);
	var onceflip : boolean = false;
	var totalcount : int = 0;
	var zoffset = Vector3(0,0,0);
	var roadray = Array();
	var vertray = Array();
	var nameidcount : int = 0;
	
	//MAIN TILE SPAWN LOOP
   for (var tiledex2 = 0; tiledex2 < 5; tiledex2++) {
   
   
		for (var tiledex = 0; tiledex < tilemax; tiledex++) {
			totalcount+=1;
			var xoffset =  tiledex*(rv*scale);
			var tempgog : GameObject = Instantiate(whex  ,Vector3(-70,10,-70) +zoffset+xoffset,Quaternion.Euler(0,330,0) );
			
			//Calcuiate offsets from tile for road/vert
			var statarrayaa =  getvertpos(tempgog,scale,scale2);
			var verticesaa :   Vector3[] = statarrayaa[0];
			var roadsaa :   Vector3[] = statarrayaa[1];
			var roadrotsaa : Quaternion[] = statarrayaa[2];
				//vertex loop
				for (var vertd = 0; vertd < 6; vertd++) {
					flag = true;
					var tempvector : Vector3 = Vector3(0,0,0);
					for (var hi = 0; hi < vertray.length; hi++) {
						tempvector = vertray[hi];
						if ( ( tempvector- verticesaa[vertd]).magnitude < 5) {
							flag = false;
						}
					}
					if (flag){
						var tempvert : GameObject = Instantiate(spheretester,verticesaa[vertd] + Vector3(0,1,0),Quaternion.identity);
						tempvert.name = nameidcount.ToString();
						nameidcount += 1;
					   vertray.push(tempvert.transform.position);
					   tempvert.transform.localScale = Vector3(scaa,scaa,scaa);
					   tempvert.renderer.material.color = Color.gray;// colors[vertd];
					}
				} 
				//edge loop
				for (var hid = 0; hid < 6; hid++) {
					flag = true;
					var tempvector2 : Vector3 = Vector3(0,0,0);
					for (var hip = 0; hip < roadray.length; hip++) {
						 tempvector2 = roadray[hip];
						if ( ( tempvector2- roadsaa[hid]).magnitude < 5) {
							flag = false; //this is a horrible way of solving this problem but fuck it.
						}
					}
					if (flag){
					   var roadd : GameObject = Instantiate(roadgo,roadsaa[hid] + Vector3(0,1,0),roadrotsaa[hid]);
						roadd.name = nameidcount.ToString();
						roadray.push(roadd.transform.position);
						nameidcount += 1;
						roadd.transform.localScale = Vector3(scaa/2,scaa/3,scaa*2);
						roadd.renderer.material.color = Color.black;// colors[hid];
					}
				}
				
				//Grab a number for the tile
				if (tilenumray.length != 0 ) {
					var tileint : int = randtiles.pop();
				}

				if (!(tileint==5)) { //not desert
					if (tilenumray.length != 0 ) {
						var num = tilenumray.pop();
					}

				tempgog.name = num.ToString();

				}
				else{
					tempgog.name = '0';
				}
				
				tempgog.name += ',' + tiledex2.ToString() + ',' + tiledex.ToString() + ',' + tileint.ToString();

				tempgog.renderer.material.mainTexture = textures[tileint]; //tileint

				tempgog.transform.localScale = Vector3(tilescale,3,tilescale); // oh snap probably should be 
				tempgog.transform.localScale =     tempgog.transform.localScale  + Vector3(4,0,4); // oh snap probably should be 

			  //do this step BEFORE i pass it's position to the roads and vertices.. oh well FIX IT LATERR!! and by
			  //that i mean put this step before and fix offsets proportional to the scales.

				var collera = testhex.GetComponent(typeof(MeshCollider));
				var ccc : Vector3= collera.bounds.center;

			} //END OF INTERIOR TILE LOOP 
	//EXTERIOR TILE LOOP
     zoffset +=  Vector3(0,0,29.5);
	if (tilemax<5 && !onceflip) {

	    zoffset +=  Vector3(-15.5,0,0);

		tilemax +=1;
	}
	else{
		onceflip = true;
	  }

	  if (onceflip){ //this signals the tiles where the middle 5 are and to start decreasing and switch dir.
		 tilemax -=1;
		zoffset +=  Vector3(15,0,0);
			}

	  }
  
  }
private var flipswitchonce : boolean = true;

function Update () {


		if(PhotonNetwork.isMasterClient){
		
			if(startsynchro.started ){

				if(flipswitchonce){
				//serialize flipswitchonce in another script to make sure you don't double instantiantiate on someone leaving who is host.
					create_tiles();
					flipswitchonce = false;
					var playerGOs = GameObject.FindGameObjectsWithTag("Player"); 
					var myArray = new String[playerGOs.length];    //WORKS
					var count : int = 0;
					//Convert names to static array.
					for ( var gon : GameObject in playerGOs)  {
						var name = gon.GetComponent(typeof(PhotonView)).owner;
						myArray[count] = name.ToString();
						count +=1 ;
					}
					
					//Generate and synchronize turn order.
					RandomizeStaticArray(myArray);
					view.RPC("set_turn_order", PhotonTargets.All,myArray);
				}
			}
		}
	}


static var arraystr : String[];
static	var tempray = Array();
var bigfontskin : GUISkin;
var superbigfontskin : GUISkin;
private var origlen : int = 0;
var originalturnorder = Array();

function grab_name(){
	var playerGOs = GameObject.FindGameObjectsWithTag("Player"); 
	for ( var gon : GameObject in playerGOs)  {
		var locview : PhotonView = gon.GetComponent(PhotonView);
		if (locview.isMine) {
			return locview.owner.ToString(); 
		}
		
	}
	
}


function grab_view(){
	var playerGOs = GameObject.FindGameObjectsWithTag("Player"); 
	for ( var gon : GameObject in playerGOs)  {
		var locview : PhotonView = gon.GetComponent(PhotonView);
		if (locview.isMine) {
			return locview; 
		}
		
	}
	
}

@RPC
function set_turn_order(newVal : String[] ) {
	arraystr = newVal;
	for  (var gg in newVal) {
		tempray.push(gg);
	}
	origlen = tempray.length;
	
	for(var ssz = 0; ssz < tempray.length; ssz++){
	//view.owner.ToString()
		if (grab_name() == tempray[ssz].ToString()   ) {
			playercolorlocal = ssz;
		}
	}
	
}


private var settlementorroad : boolean = true;
private var playercolorlocal : int = 0; 
private var buildcount : int = 0;


function increment_turn_order() {

	var holdfirstentry : String = tempray.Shift();
	tempray.push(holdfirstentry);
	
}

var mysettlements =  Array () ;
var myroads = Array() ;

@RPC 
function builder (nameselected : String, buildcase : int,playercolorfunc : int) {
print (buildcount);
	var selectedgo : GameObject = GameObject.Find(nameselected);
	if (buildcase == 0) {
		if( selectedgo.tag == 'vertex') {
			if (playercolorfunc == playercolorlocal) {
				mysettlements.push(selectedgo);
			}
			buildcount +=1;
			selectedgo.renderer.material.color = colors[playercolorfunc];
			increment_turn_order();
		}
	}
	if (buildcase == 1) {
		if( selectedgo.tag == 'road') {
			if (playercolorfunc == playercolorlocal) {

				myroads.push(selectedgo);
				
			}
		selectedgo.renderer.material.color = colors[playercolorfunc];
		buildcount +=1;
		increment_turn_order();
		}
	}
	if (buildcount == 4 * tempray.length) {
		startingphase = false;
		allocate_resources();
	}
}

function splitreturn (tile: GameObject) {
	var arrayLists : String[] = tile.name.ToString().Split(","[0]);
	return arrayLists;	
}
				
var resourcelist = Array() ;

function allocate_resources() {

	for (var setl : GameObject in mysettlements) {
		var arr : Array = nearby_resources(setl);
		for (var obj : int in arr ) {
			resourcelist.push(obj);
		}
		
}


for (var res in resourcelist) {
switch(res) {
	case 0:
		h['wood'] 	+=1;
		break;
	case 1:
		h['wheat'] +=1;
				break;

	case 2:
	
h['sheep'] +=1;
		break;

	case 3:
h['brick'] +=1;
		break;

	case 4:
h['stone'] +=1;
		break;


}

}
}

	
function nearby_resources(selectedgo : GameObject) {

	var cityloc : Vector3 = selectedgo.transform.position;
	var texintlist = Array();
	     var tlls = GameObject.FindGameObjectsWithTag("tiletag"); 
for (var tl : GameObject in tlls) {

if (( tl.transform.position - selectedgo.transform.position).magnitude < 26) {
				var aa : String[] = splitreturn(tl);
				     var theInt : int = parseInt (aa[3]);
				texintlist.push(theInt);
					}
		}
		
		return texintlist;
}

	
function checktouchingvert(selectedgo : GameObject) {

	     var vertexs = GameObject.FindGameObjectsWithTag("vertex"); 
for (var vrt : GameObject in vertexs) {

if (( vrt.transform.position - selectedgo.transform.position).magnitude < 25 && vrt.renderer.material.color != Color.gray) {
					return false;
					}
		}
		
		return true;
}

var h = new Dictionary.<String,int> ();

//var h : Hashtable;
//h = new Hashtable();
h.Add("wheat", 0);
h.Add("sheep", 0);
h.Add("brick", 0);
h.Add("stone", 0);
h.Add("wood", 0);
private var startingphase : boolean = true;
function OnGUI() {

	 
		GUI.skin = superbigfontskin;

	 			var	tileGOs = GameObject.FindGameObjectsWithTag("tiletag"); 
				
				for (var tile in tileGOs) {
				    var screenPos : Vector3 = Camera.main.WorldToScreenPoint (tile.transform.position);
					
					var arrayLists : String[] = tile.name.ToString().Split(","[0]);
					
				var frequency : String =  arrayLists[0];
				GUI.Label(Rect(screenPos.x,-screenPos.y+750,100,100), frequency ) ;
	 }
	 
	 		GUI.skin = bigfontskin;

	//update this less frequently.
		var hashprinter = Array();
for (var item in h) {
   // print (item.Value);
		hashprinter.push(item.Value);
				hashprinter.push(item.Key);

		}
		
			//if(  GUI.Button (Rect (700, 310, 200, 100), 'drop settlement ') ) {
GUI.Label( Rect (800, 210, 200, 200), hashprinter.ToString() ) ;
			  //simply count the number of turns that occur and turn off startingphase with an rpc!
			  
			  
			  
			  
			  
			  if (startingphase) {
			  
			  if (tempray.length !=0) {
			  
			  if (grab_name() == tempray[0].ToString()  && raycastselector.lockselect){
			  

var selectedgo : GameObject = GameObject.Find(raycastselector.currentnameselected);

			  
			//  if (selectedgo.renderer.material.color == Color.gray) {
			  
						if (settlementorroad) {
			  if( selectedgo.tag == 'vertex' && selectedgo.renderer.material.color == Color.gray ) {
				var nottooclosetoanothersettlement = checktouchingvert(selectedgo);
				
				if (nottooclosetoanothersettlement) {
			  			if(  GUI.Button (Rect (700, 310, 200, 100), 'drop settlement ') ) {
							view.RPC("builder", PhotonTargets.All, raycastselector.currentnameselected,0,playercolorlocal);
											  settlementorroad = false;
						}
	}
		}
									}
									
									else{
										  if( selectedgo.tag == 'road' && selectedgo.renderer.material.color == Color.black) {
							  			if(  GUI.Button (Rect (700, 310, 200, 100), 'drop road ') ) {
									  		  settlementorroad = true;
									  							view.RPC("builder", PhotonTargets.All, raycastselector.currentnameselected,1,playercolorlocal);
						}
					}
				}
			  }
			}
		}
	}

// appip app ip app ID 90cf1c16-0e23-49bc-a65c-f484db4b52d9
function create_tiles() {

	randtiles.push(5); //1 desert tile
	//18 tiles 4 sheep 4 wood 4 wheat 3 brick 3 ore 3x5 grid is 19 so 1 desert
	//forest wheat sheep  brick ore desert
	// 0            1         2         3       4       5
	for (var tld = 0; tld < 4; tld++) {
		if (tld > 0) {
			randtiles.push(3);
			randtiles.push(4);
		}
		randtiles.push(0);
		randtiles.push(1);
		randtiles.push(2);
	}
	RandomizeArray(randtiles);
	
	//Make number distribution
	tilenumray.push(2); 
	tilenumray.push(12);
	//	[2, 3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12];
	for (var aqq = 3; aqq < 12; aqq++) {
		if (aqq != 7) {
			tilenumray.push(aqq);
			tilenumray.push(aqq);
		}
	}
	RandomizeArray(tilenumray);

  var tiletextures = new int[randtiles.length];
  var tilefreq = new int[tilenumray.length];
  
  //Convert to static network arrays
	for (var ff = 0; ff < randtiles.length; ff++) {
		tiletextures[ff] = randtiles[ff];
	}
	for (var ffff = 0; ffff < tilenumray.length; ffff++) {
		tilefreq[ffff] = tilenumray[ffff];
	}
			
	view.RPC("spawninfo", PhotonTargets.Others,tiletextures,tilefreq);
   spawnboard() ;
}





static function RandomizeStaticArray(arr : String[])
{
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Random.Range(0,i);
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
	
	}
	
		static function RandomizeStaticArrayI(arr : int[])
{
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Random.Range(0,i);
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
	
}

	static function RandomizeArray(arr : Array)
{
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Random.Range(0,i);
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
	
}



function getvertpos(tileobj : GameObject,scale : float,scale2 : float) {

	var coll = tileobj.GetComponent(typeof(MeshCollider));
	var c : Vector3= coll.bounds.center;
	var r = coll.bounds.extents.x;
	var s = r / (Mathf.Cos(30*Mathf.Deg2Rad) );
	var h = s*(Mathf.Sin(30*Mathf.Deg2Rad) );
	var u = coll.bounds.extents.z;
	var uv : Vector3 = Vector3(0,0,u);
	var rv : Vector3 = Vector3(r,0,0);
	var hu : Vector3 =  Vector3(0,0,h) ;
	var vertices = new Vector3[6] ;

	vertices[0] =  c + (uv) /scale2;
	vertices[1] = c + (rv + hu)/scale;
	vertices[2] = c + ( rv - hu)/scale;
	vertices[3] = c -( uv) /scale2;
	vertices[4] = c - ( rv + hu  )/scale;
	vertices[5] =   c -( rv - hu   )/scale;

	var roads = new Vector3[6] ;
	roads[0] = c + (rv/2 + hu*1.5)/scale;
	roads[1] = c + (rv)/scale;
	roads[3] = c - (rv/2 + hu*1.5)/scale;
	roads[4] = c - (rv)/scale;
	roads[2] = c + (rv/2 - hu*1.5)/scale;
	roads[5] = c - (rv/2 - hu*1.5)/scale;

	var roadrots = new Quaternion[6] ;
	roadrots[0] = Quaternion.Euler(0,-60,0);
	roadrots[1] = Quaternion.Euler(0,0,0);
	roadrots[2] = Quaternion.Euler(0,60,0);
	roadrots[3] = Quaternion.Euler(0,-60,0);
	roadrots[4] = Quaternion.Euler(0,0,0);
	roadrots[5] = Quaternion.Euler(0,60,0);
	return [vertices, roads,roadrots];
	}
