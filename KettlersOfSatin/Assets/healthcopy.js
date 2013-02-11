

#pragma strict
private var view : PhotonView;
function Start () {

view  = GetComponent(typeof(PhotonView));
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

var textures : Texture[];
var hexmeshgo : GameObject;
var roadgo : GameObject;
var whex : GameObject;
	var flag : boolean = true;

var spheretester : GameObject;
var phi : float = 1.61803398875;
	function getvertpos(tileobj : GameObject,scale : float,scale2 : float) {
	
//    var scale2 =Mathf.Pow(phi,.5);
	//extents = r
	//so, instantiate all the game objects and vertices and roads, add a script to each that is oncolliderstay
	//populate that script with an array that contains the entries of oncollid.
 //  print (s);
   // print (h);
  //print (topvertex);
 // var scale =Mathf.Pow(phi,.9);
	
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
vertices[0] =  c + (uv) /scale2          ;//Vector3(x,0,y);
	  vertices[1] = c + (rv + hu)/scale          ;      //Vector3(x + r, 0,y - h);
	  
	vertices[2] = c + ( rv - hu)/scale      ;                   //Vector3(x + r,0, y -s - h);
	vertices[3] = c -( uv) /scale2             ;               //Vector3(x, 0,y - s - h -h);
	vertices[4] = c - ( rv + hu  )/scale     ;                //Vector3(x - r, 0,y - s - h);
	vertices[5] =   c -( rv - hu   )/scale         ;               //Vector3(x - r, 0,y - h);
	 
	      var roads = new Vector3[6] ;
  roads[0] = c + (rv/2 + hu*1.5)/scale    ;//Vector3(x,0,y);
    roads[1] = c + (rv)/scale    ;//Vector3(x,0,y);
    roads[3] = c - (rv/2 + hu*1.5)/scale;
	    roads[4] = c - (rv)/scale    ;//Vector3(x,0,y);
 roads[2] = c + (rv/2 - hu*1.5)/scale    ;
   roads[5] = c - (rv/2 - hu*1.5)/scale    ;
	 
	        var roadrots = new Quaternion[6] ;
roadrots[0] = Quaternion.Euler(0,-60,0);
	   roadrots[1] = Quaternion.Euler(0,0,0);
	   roadrots[2] = Quaternion.Euler(0,60,0);
	   roadrots[3] = Quaternion.Euler(0,-60,0);
	   roadrots[4] = Quaternion.Euler(0,0,0);
	   roadrots[5] = Quaternion.Euler(0,60,0);
	return [vertices, roads,roadrots];
	}
		   //  var playerGOs = GameObject.FindGameObjectsWithTag("Player"); 
	   //right click select deselect, then drop settlement button. after build.
	
  var colors = new  Color[6];
  colors[0] = Color.red;
    colors[1] = Color.green;
  colors[2] = Color.blue;
  colors[3] = Color.yellow;
  colors[4] = Color.gray;
  colors[5] = Color.magenta;
	
	
	var tilenumray = Array();

var randtiles = Array();
	
function create_tiles() {

randtiles.push(5);
//randtiles.push(5);
//randtiles.push(5);

//18 tiles 4 sheep 4 wood 4 wheat 3 brick 3 ore 3x5 grid is 19 so 1 desert//?
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
//print (randtiles.length);

// var tempgog : GameObject = PhotonNetwork.Instantiate(whex.name  ,Vector3(-70,10,-70) + (2*uv - hu)*tiledex + tiledex*(rv/scale2),Quaternion.Euler(0,330,0) ,0);
//good diag spacing but too closex . 

RandomizeArray(randtiles);
	tilenumray.push(2);
	tilenumray.push(12);
	
	
for (var aqq = 3; aqq < 12; aqq++) {
if (aqq != 7) {
	tilenumray.push(aqq);

	tilenumray.push(aqq);
	}
	}
//	[2, 3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12];
	RandomizeArray(tilenumray);

	
//find the tile scale size using phi, phi helps make the city / road to tile size look pleasant. you need a preformed tile for the dimensions to be known
 
  //print(totalcount);
  
  var tiletextures = new int[randtiles.length];
  var tilefreq = new int[tilenumray.length];
  
for (var ff = 0; ff < randtiles.length; ff++) {
tiletextures[ff] = randtiles[ff];
}
for (var ffff = 0; ffff < tilenumray.length; ffff++) {
tilefreq[ffff] = tilenumray[ffff];

}

//for (var tex : int in tilefreq) {
//print(tex.ToString() ) ;
//}

//print(tilefreq.ToString() ) ;
print ('testONCE');
			view.RPC("spawninfo", PhotonTargets.Others,tiletextures,tilefreq);

   spawnboard() ;


}

var apparentlyyouneedafuckingbooleanswitchhereoritfirestwiceWTF : boolean = true;
//why is this rpc being called without a signal?/ oh it was aghost game?

@RPC
function spawninfo( tiletextures : int[], tilefreq : int[] ) {

print('test');

//if (apparentlyyouneedafuckingbooleanswitchhereoritfirestwiceWTF) {

//apparentlyyouneedafuckingbooleanswitchhereoritfirestwiceWTF = false;
for (var tex :int in tiletextures) {
randtiles.push(tex);
}

print ( randtiles.ToString() );
for (var freq :int  in tilefreq) {
tilenumray.push(freq);
}

print ( tilenumray.ToString() );
   spawnboard() ;

  // }


} 


function spawnboard() {

var testhex : GameObject = new GameObject.FindWithTag("bound")  ;
 
 
 var gridsize : int = 19;
  var sca = Mathf.Pow(phi,5.8);
  
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
	   
	//var vertsetalpha = [0,1,2,3,4,5];
	var tilemax = 3;
    var scalez =Mathf.Pow(phi,.9);
  var tilescale = Mathf.Pow(phi,5.8);
		var onceflip : boolean = false;
	var totalcount : int = 0;
	var zoffset = Vector3(0,0,0);
	
		var roadray = Array();

	var vertray = Array();
	
	
   for (var tiledex2 = 0; tiledex2 < 5; tiledex2++) {
   

   for (var tiledex = 0; tiledex < tilemax; tiledex++) {
totalcount+=1;
//var zoffset =  (2*uv - hu)*tileset ;
   var xoffset =  tiledex*(rv*scale);
    var tempgog : GameObject = Instantiate(whex  ,Vector3(-70,10,-70) +zoffset+xoffset,Quaternion.Euler(0,330,0) );

 //var tempgog : GameObject = PhotonNetwork.Instantiate(whex.name  ,Vector3(-70,10,-70) +zoffset+xoffset,Quaternion.Euler(0,330,0) ,0);

//so either we pass in the gameobjects tag location.... or just clientside instantiate and rpc//?
//does splitstring work??

 var statarrayaa =  getvertpos(tempgog,scale,scale2);
	var verticesaa :   Vector3[] = statarrayaa[0];
	var roadsaa :   Vector3[] = statarrayaa[1];
	var roadrotsaa : Quaternion[] = statarrayaa[2];

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
 //var tempvert : GameObject = PhotonNetwork.Instantiate(spheretester.name,verticesaa[vertd] + Vector3(0,1,0),Quaternion.identity,0);
    var tempvert : GameObject = Instantiate(spheretester,verticesaa[vertd] + Vector3(0,1,0),Quaternion.identity);

   
   vertray.push(tempvert.transform.position);
   tempvert.transform.localScale = Vector3(scaa,scaa,scaa);
   tempvert.renderer.material.color = Color.gray;// colors[vertd];
   }
} 


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

  // var roadd : GameObject = PhotonNetwork.Instantiate(roadgo.name,roadsaa[hid] + Vector3(0,1,0),roadrotsaa[hid],0);
	      //  roadray.push(roadd.transform.position);
//add an rpc for each of these?? we need rpcs anyways in order to modify the color.. so this will jsut be the first of those.
		 
		 roadd.transform.localScale = Vector3(scaa/2,scaa/3,scaa*2);
   roadd.renderer.material.color = Color.black;// colors[hid];
  }
}
	if (tilenumray.length != 0 ) {

 var tileint : int = randtiles.pop();
}

	if (!(tileint==5)) {
	if (tilenumray.length != 0 ) {
	var num = tilenumray.pop();
	}
	tempgog.name = num.ToString();

	}
	else{
	tempgog.name = '0';
	}


 tempgog.renderer.material.mainTexture = textures[tileint]; //tileint

 tempgog.transform.localScale = Vector3(tilescale,3,tilescale); // oh snap probably should be 
  
  	 var collera = testhex.GetComponent(typeof(MeshCollider));

  //doing this step BEFORE i pass it's position to the roads and vertices.. oh well FIX IT LATERR!! and by
  //that i mean put this step before and fix offsets proportional to the scales.
var ccc : Vector3= collera.bounds.center;


  	//   var numbr : GameObject = PhotonNetwork.Instantiate(roadgo.name,Vector3(-70,10,-70) +zoffset+xoffset + Vector3(0,1,0),Quaternion.identity,0);
//adjust the scale of the tiles AFTER road/vert to eliminate clipping edges
  //print('ok');
  
  }
  
     zoffset +=  Vector3(0,0,29.5);
	if (tilemax<5 && !onceflip) {

	    zoffset +=  Vector3(-15.5,0,0);

  tilemax +=1;
  }
  else{
  	onceflip = true;

  }
  if (onceflip){
     tilemax -=1;
   	    zoffset +=  Vector3(15,0,0);
		}
  
  
  }
  
  }
//renderer.material.mainTexture = textures[0] thru 4;
private var flipswitchonce : boolean = true;

/*
@RPC
function settile(tempgog : GameObject, tileint : int) {
  var tilescale = Mathf.Pow(phi,5.8);

 tempgog.renderer.material.mainTexture = textures[tileint];

  tempgog.transform.localScale = Vector3(tilescale,3,tilescale);
}
*/
// var tgo = tempgog.GetInstanceID;
 //var tgo = new GameObject[1];
// tgo[0] = tempgog;
//so make a hashtable inside the RPC call that looks up all gameobjects and creates an id table.
//ORRRRR instantiate the objects locally, give them all named location tags, and then do RPCs by location.
// i like the id table thing better it in some ways.
 	//		view.RPC("settile", PhotonTargets.All,tgo,tileint);
var numgo : GameObject;
function Update () {

if (view.isMine) {
	if(PhotonNetwork.isMasterClient){
	
	if(cursorcapture.started ){
	
		if(flipswitchonce){
	//serialize flipswitchonce in another script to make sure you don't double instantiantiate on someone leaving who is host.
	create_tiles();
	
			flipswitchonce = false;
		print ('ONCE PRINT');
			
						
	     var playerGOs = GameObject.FindGameObjectsWithTag("Player"); 
		 		var myArray = new String[playerGOs.length];    //WORKS

		 var count : int = 0;
		   for ( var gon : GameObject in playerGOs)  { //GetComponent(typeof(PhotonView)).isMine
						var name = gon.GetComponent(typeof(PhotonView)).owner;
					myArray[count] = name.ToString();
					count +=1 ;
					}
					
			RandomizeStaticArray(myArray);
			
			view.RPC("SetHP", PhotonTargets.All,myArray);
			}
}
}

}




}
static var arraystr : String[];
		var tempray = Array();
	//if(view.isMine && !view.isSceneView){
var bigfontskin : GUISkin;
var superbigfontskin : GUISkin;

@RPC
function SetHP(newVal : String[] ){//(newVal :Dictionary.<String,String>  ){
  //  cursorcapture.localte =newVal.ToString();// newVal['test'];
  arraystr = newVal;
  		
		for  (var gg in arraystr) {
		tempray.push(gg);
		}
	//	tempray.pop();
}

function OnGUI() {

	
	 if (view.isMine){
		GUI.skin = superbigfontskin;

	 			var	tileGOs = GameObject.FindGameObjectsWithTag("tiletag"); 
				
				for (var tile in tileGOs) {
				    var screenPos : Vector3 = Camera.main.WorldToScreenPoint (tile.transform.position);

				GUI.Label(Rect(screenPos.x,-screenPos.y+750,100,100), tile.name.ToString() ) ;
	 }
	 
	 		GUI.skin = bigfontskin;

			  GUI.Label (Rect (700, 10, 300, 100),tempray.ToString() + '   TurnOrder Left is first');
			  
			  if (tempray.length !=0) {
			  if (view.owner.ToString() == tempray[0].ToString() ){
			  			  GUI.Button (Rect (700, 310, 100, 100), 'drop settlement ');

			  }
}
}

}



/*

   //  var scale2 =Mathf.Pow(phi,.5);

  //var scale =Mathf.Pow(phi,.9);
   var statarrayaa =  getvertpos(tempgog,scale,scale2);
	var verticesaa :   Vector3[] = statarrayaa[0];
	//var roads :   Vector3[] = statarray[1];
//	var roadrots : Quaternion[] = statarray[2];
for (var vertdex in vertsetalpha) {
 var tempvert : GameObject = PhotonNetwork.Instantiate(spheretester.name,verticesaa[vertdex] + Vector3(0,1,0),Quaternion.identity,0);
   tempvert.transform.localScale = Vector3(scaa,scaa,scaa);
   tempvert.renderer.material.color = colors[vertdex];
} 
 
 if (tiledex2 == 0){ 
 vertsetalpha = [0,1,2,3];
 }

 
 if (tiledex2 != 0 && !onceflip) { 
	if(tiledex == 0) {
	vertsetalpha = [0,1,2,5];
	}
	if(tiledex == tilemax) {
	vertsetalpha = [0,1,2];
	}
	if (tiledex != tilemax && tiledex != 0){
	vertsetalpha = [0,1];
	}
 }
 
  if (onceflip) { 
		if(tiledex == 0) {
	vertsetalpha = [0,1,2];
	}
	else{
		vertsetalpha = [0,1];
	}
	
	}
//WORKS
@RPC
function SetHP(newVal : String[] ){
    cursorcapture.localte = newVal[0] + newVal[1];
}
  function playernames() {
   
   
	     var playerGOs = GameObject.FindGameObjectsWithTag("Player"); 
		var namearray = Array(); 

				var baknames = Array(); 
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
						baknames.push(name);
										

					}
					tempbool = tempb;
					return [namearray, baknames];
					}			//var nl : Array = cursorcapture.baknames;
			//var len : int = nl.length;
		//	var myArray = new String[cursorcapture.baknames.length];    //WORKS
			//			for (var qq = 0; qq < 3; qq++) {

		//	for (var ii=0; ii < cursorcapture.baknames.length-1;ii++)  {
		//		myArray[ii] = cursorcapture.baknames[ii];
		//	}

			//var myArray = new String[2];    //WORKS
		//	var myArray = new Array(); //DOESNT WORK
			//var myArrayList = new ArrayList();   //DOESNT WORK
		//	var myHashtable:Hashtable = new Hashtable();  //untested
			//var myDictionary : Dictionary.<String,String> = new Dictionary.<String,String> (); //WORKS
				//	myDictionary['test'] = 'fggg';
		//	var myList : List.<String> = new List.<String> ();  //DOESNT WORK
			

			//myList.Add('fuuuu');
		//	myList.Add('wht');
			//
				   
	   
 //  var statarray =  getvertpos(testhex,scale,scale2);
//	var vertices :   Vector3[] = statarray[0];
	//var roads :   Vector3[] = statarray[1];
//	var roadrots : Quaternion[] = statarray[2];

	
	   /*
  for (var vert : Vector3 in vertices) {
   var tempgo : GameObject = PhotonNetwork.Instantiate(spheretester.name,vert + Vector3(0,1,0),Quaternion.identity,0);

  //add an animation of a picture on fire for the robber hah and screams when you mouseover 
   tempgo.transform.localScale = Vector3(scaa,scaa,scaa);
   tempgo.renderer.material.color = colors[cnt];
   cnt++;
  }



// perform a remote procedure call function that updates the color of road / settlement to whatever., for cities add an extra gameobject,
//on top of it that is a black sphere probly.
//wide angle lens bend sphere

for (var hii = 0; hii < 6; hii++) {


   var roadz : GameObject = PhotonNetwork.Instantiate(roadgo.name,roads[hii] + Vector3(0,1,0),roadrots[hii],0);
	     roadz.transform.localScale = Vector3(scaa/2,scaa/3,scaa*2);
   roadz.renderer.material.color = colors[hii];

}

*/


 // for (var vertdex = 0; vertdex < vertmax, vertdex++) {
  
  
  //}
  
 // Instantiate(spheretester,metatemp,Quaternion.identity));
  //first tile flag, spawn 6 vertices
  //next tiles in that row, spawn 4, 4
  //next row top = 4, then 2, 2 , 3
  // 6 , 4 , 4 bottom four
  // 4, 2 , 2 , 3 , 
  // 4, 2, 2,....,3
  // 3, 2, .....2
  
  /*

	*/
//  print ('debug');
/*
 points[0] = new PointF(x, y);
                points[1] = new PointF(x + r, y + h);
                points[2] = new PointF(x + r, y + side + h);
                points[3] = new PointF(x, y + side + h + h);
                points[4] = new PointF(x - r, y + side + h);
                points[5] = new PointF(x - r, y + h);
*/
// 3, 4, 5, 4, 3 ; ii+1, +1,, -1, -1 if i>3 i*=-1 

//if i in restricted roads/ etc. 6 4 2 3 pattern then skip bool
   
	  //roads[1] = c + (rv - hu)/scale          ;      //Vector3(x + r, 0,y - h);

  
  
 // var tilemax = 3;
//populate the vertex roads line by line, so along ltiling 3 pattern hit the bottom three or whatnot. each has 2 rails.
/*
   for (var tileset = 0; tileset < 5; tileset++) {
	var zoffset =  (2*uv - hu)*tileset ;
	if (tilemax < 5){
	tilemax += 1;//3, 4, 5, 4, 3
	}
	else{
	tilemax -= 1;
	}
	
	*/