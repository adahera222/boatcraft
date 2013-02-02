#pragma strict
  //var goct : GameObject  = new GameObject("Cam Target");
// Objects to drag in
public var motor : MovementMotor;
public var character : Transform;
public var cursorPrefab : GameObject;
public var joystickPrefab : GameObject;
 var maar : GameObject;

// Settings
public var cameraSmoothing : float = 0.01;
public var cameraPreview : float = 2.0f;
 static var cursorWorldPosition : Vector3 ;
// Cursor settings
public var cursorPlaneHeight : float = 0;
public var cursorFacingCamera : float = 0;
public var cursorSmallerWithDistance : float = 0;
public var cursorSmallerWhenClose : float = 1;

// Private memeber data
private var mainCamera : Camera;

private var cursorObject : Transform;
private var joystickLeft : Joystick;
private var joystickRight : Joystick;

private var mainCameraTransform : Transform;
private var cameraVelocity : Vector3 = Vector3.zero;
private var cameraOffset : Vector3 = Vector3.zero;
private var initOffsetToPlayer : Vector3;

// Prepare a cursor point varibale. This is the mouse position on PC and controlled by the thumbstick on mobiles.
private var cursorScreenPosition : Vector3;

private var playerMovementPlane : Plane;

private var joystickRightGO : GameObject;

private var screenMovementSpace : Quaternion;
private var screenMovementForward : Vector3;
private var screenMovementRight : Vector3;


function IsLocalPlayer(val : boolean ){
	this.enabled = val;

}

function Awake () {		
	motor.movementDirection = Vector2.zero;
	motor.facingDirection = Vector2.zero;
	
	// Set main camera
	mainCamera = Camera.main;
	mainCameraTransform = mainCamera.transform;
	
	// Ensure we have character set
	// Default to using the transform this component is on
	if (!character)
		character = transform;
	
	initOffsetToPlayer = mainCameraTransform.position - character.position;
	
	
	// Save camera offset so we can use it in the first frame
	cameraOffset = mainCameraTransform.position - character.position;
	
	// Set the initial cursor position to the center of the screen
	cursorScreenPosition = Vector3 (0.5 * Screen.width, 0.5 * Screen.height, 0);
	
	// caching movement plane
	playerMovementPlane = new Plane (character.up, character.position + character.up * cursorPlaneHeight);
}
var marc : GameObject;

	var mastergolist : GameObject;

function Start () {
	//START FUNCTION THIS GETS RUN ONCE if you need to set something up at the start this is probably better than awake

	if(GetComponent(typeof(PhotonView)).isMine){
		/*
	
	
	if (autofiredowncastbuildings.arty.length != 0){
	for(var i : int = 0; i < autofiredowncastbuildings.arty.length; i++) {
		counter += 5;
		Spawner.Spawn(autofiredowncastbuildings.arty[i],Vector3(0,0,counter),Quaternion.identity) ;
		}
		}
	
	*/
	var s = "{ \"foo\": \"bar\", \"baz\" : [ 17, 18, 19, { \"fish\" : \"soup\" } ]}";

	
//WORKING JSON EXAMPLES!!!! might not work on iOS or mobile
var j:json = json.fromString(s);
print( "tostring: " + j.toString() );
print( "stringified: " + j.stringify() );

print( "obj.foo: " + j._get("foo").toString() );
print( "obj.baz[2]: " + j._get("baz")._get(2).toString() );
print( "obj.baz[3].fish: " + j._get("baz")._get(3)._get("fish").toString() );

var json_obj = json._object(); // new empty object
json_obj._set("key", json._string("value")); // note that the string could have been passed "unwrapped"
print( json_obj.stringify() ); // {"key":"value"}

var json_array = json._array();
json_array._push(1)._push("two")._push( json._object()._set("foo","bar") ); // chaining, jQuery-style
print( json_array.stringify() ); // [ 1, "two", {"foo":"bar"} ];
	
	
	
//WORKING POST EXAMPLES SimpleServer.py script used for http post listener.
var screenShotURL= "http://localhost:8000";
	
 var form = new WWWForm();
    form.AddField("frameCount", "send this out");
	
	var w = WWW(screenShotURL, form);
	 yield w;
    if (w.error != null)
        print(w.error);
    else
        print("Finished Uploading Screenshot");
	
		marc = Instantiate(maar, character.position, Quaternion.identity);
		print("this should only print once");
	#if UNITY_IPHONE || UNITY_ANDROID
		if (joystickPrefab) {
			// Create left joystick re-parameterize poekr hands J9  as vectors 8d
			var joystickLeftGO : GameObject = Instantiate (joystickPrefab) as GameObject;
			joystickLeftGO.name = "Joystick Left";
			joystickLeft = joystickLeftGO.GetComponent.<Joystick> ();
			
			// Create right joystick
			joystickRightGO = Instantiate (joystickPrefab) as GameObject;
			joystickRightGO.name = "Joystick Right";
			joystickRight = joystickRightGO.GetComponent.<Joystick> ();			
		}
	#else
		if (cursorPrefab) {
			cursorObject = (Instantiate (cursorPrefab) as GameObject).transform;
		}
	#endif
	}
	
	if(joystickRightGO!=null){
		// Move to right side of screen
		var guiTex : GUITexture = joystickRightGO.GetComponent.<GUITexture> ();
		guiTex.pixelInset.x = Screen.width - guiTex.pixelInset.x - guiTex.pixelInset.width;			
	}
	
	// it's fine to calculate this on Start () as the camera is static in rotation
	
	screenMovementSpace = Quaternion.Euler (0, mainCameraTransform.eulerAngles.y, 0);
	screenMovementForward = screenMovementSpace * Vector3.forward;
	screenMovementRight = screenMovementSpace * Vector3.right;	
	
	motor.facingDirection = character.forward;
	motor.facingDirection.y = 0 ;
	
// This will return the game object named Hand in the scene.
	mastergolist = GameObject.Find("mastergolist");
	var other : amaster = mastergolist.GetComponent(amaster);

}
//iOS / mobile crap
function OnDisable (){ 
	if (joystickLeft) 
		joystickLeft.enabled = false;
	
	if (joystickRight)
		joystickRight.enabled = false;
}

function OnEnable () {
	if (joystickLeft) 
		joystickLeft.enabled = true;
	
	if (joystickRight)
		joystickRight.enabled = true;
}
var maxthrust  : float = 60;
var maxturn  : float = 60;
static var thrust : float = 0;
static var  turn : float = 0;
static var  rmb : float = 0;
static var  rmbd : float = 0;
var lockf : boolean = false;


static var trplclicked : boolean = false;


var mcp : Vector3;
var flycam : boolean = false;
var ptmc : Vector3;

var scrolldist : float = 10;
var RTScam : boolean = true;
static var selected : boolean = false;
var pointcameralooksat : Vector3;
var distanceToGround : float ;
var dblclicked : boolean = false;
var moveflag : boolean = true;
static var dmoschar : Vector3; //sound cluip ausstralian looks like we got som pirates!
var rdt : Vector3;
var meA : Vector3;
var camq : Vector3;
static var wtf : float  = 0;
var rotationX : float = 0 ;
var rotationY : float = 0 ;
static var rmbA :  Array = [0.0f,0.0f,0.0f]; 

static var rmbAd :  Array = [0.0f,0.0f]; 
 var goct : GameObject  = new GameObject("Cam Target");
 var ff : boolean = true;
		var bulletPrefab : GameObject;
 var flipped : boolean = true;
var counter : float = 0;
var fireRate = 0.5;
private var nextFire = 0.0;
var LR : LineRenderer;
static var mcfov = 80;
static var cpe : Vector3;
function Update () {
cpe = character.position;
    // var otherScript: OtherScript = GetComponent(Health); 

	var view : PhotonView = GetComponent(typeof(PhotonView));

	if(PhotonNetwork.isMasterClient){
	    // Die if no health left
	    if (cpe.y < -50) {		
	        if(view.isSceneView){
	            view.RPC("Die", PhotonTargets.AllBuffered);
	        }else{
	        view.RPC("Die", PhotonTargets.All);
	     }
		}
		}

mainCamera.fieldOfView = mcfov;

//gui build object code for some reason needs to be outside autofiredowncastbuildings??

//FINALLY THIS build code works. SendNext with type array is NOT working for some reason. 
//possible options for sending data / destroying instantiated objects after joining a running server
// when you don't have a list of them
//amaster.js has RPC code demonstrations for synchronizing data. haven't tested yet 
//also can use Json strings to pass strings with SendNext or RPC
//OR the easiest way, photonnetwork.instantiate and then to destroy objects GameObject.Find or findwithtag
//thats probably the easiest way ; the array thing is irritating but json works.

if(autofiredowncastbuildings.fexport) {
	if (flipped){
		counter +=5;
	//	var buildgameobject : GameObject = Spawner.Spawn (bulletPrefab, Vector3(0,0,counter), Quaternion.identity)  as GameObject;
//Remember PhotonNetwork.Instantiate requires a prefab in /Resources, otherwise you need to assign the photonview manually

     var buildgameobject : GameObject =  PhotonNetwork.Instantiate(bulletPrefab.name, Vector3(0,0,counter), Quaternion.identity, 0);


		autofiredowncastbuildings.arty.push(buildgameobject);
		
		flipped = false;
		}
}
else{
flipped = true;
}

//iOS / mobile crap


	// HANDLE CHARACTER MOVEMENT DIRECTION
	/*#if UNITY_IPHONE || UNITY_ANDROID
		//motor.movementDirection = joystickLeft.position.x * screenMovementRight + joystickLeft.position.y * screenMovementForward;
	#else
	//	motor.movementDirection = Input.GetAxis ("Horizontal") * screenMovementRight + Input.GetAxis ("Vertical") * screenMovementForward;
	#endif
	
	*/
	if (!flycam){
	thrust += Input.GetAxis ("Vertical");
	thrust = Mathf.Clamp(thrust, -maxthrust, maxthrust);
	turn += Input.GetAxis ("Horizontal") ;
	turn = Mathf.Clamp(turn, -maxturn, maxturn);
}
	motor.facingDirection = Quaternion.Euler (0, turn / 60, 0) * motor.facingDirection;
	//character.rotation = Quaternion.Euler (0, turn / 60, 0);
	motor.movementDirection = motor.facingDirection * (thrust/60);
	
	// Make sure the direction vector doesn't exceed a length of 1
	// so the character can't move faster diagonally than horizontally or vertically
	if (motor.movementDirection.sqrMagnitude > 1)
		motor.movementDirection.Normalize();
	
	
	// HANDLE CHARACTER FACING DIRECTION AND SCREEN FOCUS POINT
	
	// First update the camera position to take into account how much the character moved since last frame
	//mainCameraTransform.position = Vector3.Lerp (mainCameraTransform.position, character.position + cameraOffset, Time.deltaTime * 45.0f * deathSmoothoutMultiplier);
	
	// Set up the movement plane of the character, so screenpositions
	// can be converted into world positions on this plane
	//playerMovementPlane = new Plane (Vector3.up, character.position + character.up * cursorPlaneHeight);
	
	// optimization (instead of newing Plane):
	
	playerMovementPlane.normal = character.up;
	playerMovementPlane.distance = -character.position.y + cursorPlaneHeight;
	
	// used to adjust the camera based on cursor or joystick position
	
	var cameraAdjustmentVector : Vector3 = Vector3.zero;
	
	//iOS / mobile crap to be implemented later

	/*
	#if UNITY_IPHONE || UNITY_ANDROID
	
		// On mobiles, use the thumb stick and convert it into screen movement space
		motor.facingDirection = joystickRight.position.x * screenMovementRight + joystickRight.position.y * screenMovementForward;
				
		cameraAdjustmentVector = motor.facingDirection;		
	
	#else
	
		#if !UNITY_EDITOR && (UNITY_XBOX360 || UNITY_PS3)

			// On consoles use the analog sticks
			var axisX : float = Input.GetAxis("LookHorizontal");
			var axisY : float = Input.GetAxis("LookVertical");
			motor.facingDirection = axisX * screenMovementRight + axisY * screenMovementForward;
	
			cameraAdjustmentVector = motor.facingDirection;		
		
		#else

			// On PC, the cursor point is the mouse position
			
					if (FreeMovementMotor.dsf)
		{
			if (Input.GetMouseButtonDown(1) ) {
				FreeMovementMotor.dsf = false;}
		if (Input.GetMouseButtonDown(0) )
					{
						Instantiate(FreeMovementMotor.brickdrillshaft, PlayerMoveController.cursorWorldPosition, Quaternion.identity);
						FreeMovementMotor.dsf = false;
						}
					else {
					//inform player building failed.
					}
		}
			
				*/
			
			
			
			
			
			
			var cursorScreenPosition : Vector3 = Input.mousePosition;
						
			// Find out where the mouse ray intersects with the movement plane of the player
		 cursorWorldPosition= ScreenPointToWorldPointOnPlane (cursorScreenPosition, playerMovementPlane, mainCamera);
		if (selected){
		if (Input.GetMouseButtonDown(1) ){	
	marc.transform.position = cursorWorldPosition;
			}
			}
		var halfWidth : float = Screen.width / 2.0f;
			var halfHeight : float = Screen.height / 2.0f;
			var maxHalf : float = Mathf.Max (halfWidth, halfHeight);
			dmoschar = cursorWorldPosition-character.position;
			//THIS TELLS IF YOU CLICKED ON YOUR CHARACTER AND SELECTS HIM WITH A LINE RENDERER ATTACHED TO CHAR
				if (dmoschar.sqrMagnitude < 100 ){
					if(Input.GetMouseButtonDown(0)) {
						if (selected) {
							selected = false;
							}
						else {
							selected = true;
							}
						}
						}
						
							if (selected) {
							LR.enabled = true;
					//	.GetComponent(typeof(PhotonView)).owner
						}
						else{
						LR.enabled = false;
						}
						var pe = Mathf.PI;
						var radiusLR = 3;
						   for(var i : int = 0; i < 33; i++) {
				var pos : Vector3 = character.position + Vector3(radiusLR*Mathf.Cos(i*pe/15), 2, radiusLR*Mathf.Sin(i*pe/15) );
        LR.SetPosition(i, pos);
    }
			// Acquire the relative screen position			
			
			//IMPORTANT NUMBERS HERE PEOPLE, posrel is PROPORTIONAL TO SCREEN SIZE IN MAGNITUDE and usualy like -1 to +1
			var posRel : Vector3 = cursorScreenPosition - Vector3 (halfWidth, halfHeight, cursorScreenPosition.z);		
			posRel.x /= maxHalf; 
			posRel.y /= maxHalf;
						
			cameraAdjustmentVector = posRel.x * screenMovementRight + posRel.y * screenMovementForward;
			cameraAdjustmentVector.y = 0.0;	
									
			// The facing direction is the direction from the character to the cursor world position
		//	motor.facingDirection = (cursorWorldPosition - character.position);
		//	motor.facingDirection.y = 0;			
			
			// Draw the cursor nicely
			HandleCursorAlignment (cursorWorldPosition);
			
		#endif
		
	#endif
	// these need to be switched to this signal 		//	Screen.lockCursor = (Screen.lockCursor == false) ? true : false;

										if (Input.GetKeyDown ("g")){
			if (lockf == true) {
				lockf = false;
				

				}
			else {
				lockf = true;
				}
			}
	
									if (Input.GetKeyDown ("t")){
			if (flycam == true) {
				flycam = false;
				
								Screen.lockCursor = false;

				}
			else {
				flycam = true;
				Screen.lockCursor = true;
				}
			}
			
			
			if (Input.GetAxis("Mouse ScrollWheel") < 0) // back
			{
			scrolldist = (scrolldist + 2);
			}
			if (Input.GetAxis("Mouse ScrollWheel") > 0) // forward switch these for getaxis below
			
			{
			scrolldist = (scrolldist - 2);
			}
			var  deltascrolldist = scrolldist  - mainCameraTransform.position.y;
			
		if (!flycam) 
		{
		
		
	// HANDLE CAMERA POSITION
		//RTS CAMERA
		

				//if ( rmb > 0 ) {
			    
				if  (Time.time > nextFire) {
				nextFire = Time.time + 1;
			//	rmb = 0;
				
			//	rmb = 0 ;
				}
			var wqqtf : float = rmbA[2] ;
			var watf : float = rmbA[1] ;
			var wqtf : float = rmbA[0] ;
			
			//Takes you back home if you click your heels (RMB) three times.

		//	 wtf = (wqqtf - watf) - (watf - wqtf);
			//if ( (  Mathf.Abs(wtf) < .3 ) ){ 
					if ( watf - wqtf < .5 && wqqtf - watf < .5 && wqtf - wqqtf < .5  )     { 
					if (!trplclicked) {
					trplclicked =true;
				mainCameraTransform.position = character.position + character.up*scrolldist - character.forward*scrolldist; 
				//change this to follow = on or a flag for camtargetposition
				}
			//	rmbA[0] = Time.time + 1;
		//		rmbA = [0,0,0];
}
					else{
							trplclicked = false;
							}
							

/*
		else{
		
		if ( ( Mathf.Abs( wqtf - watf ) < .3) || ( Mathf.Abs( watf - wqqtf ) < .3 ) ) {
			dblclicked = true;
						//	rmbA[0] = Time.time + 1 ;
			}
		else{
			dblclicked = false;
				}
}		
	*/	
	//LEGACY RTS CODE EXAMPLE
			//	main		// Do camera movement by mouse position // change these to mct.right
	//mainCameraTransform.Translate(Vector3.right * -scrollSpeed * Time.deltaTime);}
	//		if (mPosX >= Screen.width-scrollAreaw) {mainCameraTransform.Translate(Vector3.right * scrollSpeed * Time.deltaTime);}
			
		//	var camtilt : Quaternion = Quaternion.Euler(-mainCameraTransform.eulerAngles.x, 0, 0);
	//		if (mPosY < scrollAreah) {mainCameraTransform.Translate(camtilt*(Vector3.forward) * -scrollSpeed * Time.deltaTime);}
	//		if (mPosY >= Screen.height-scrollAreah) {mainCameraTransform.Translate(camtilt*(Vector3.forward) * scrollSpeed * Time.deltaTime);
		//if (rmb > 2) {
			
		//	mainCameraTransform.position = character.position + character.up*20 - character.forward*10; 
			
		//	}
			if (!lockf){
					if (Input.GetMouseButtonDown(1)){
					rmbA[rmb] = Time.time;
					rmb += 1 ;
					rmb = rmb % 3 ;
					
					rmbAd[rmbd] = Time.time;
					rmbd += 1 ;
					rmbd = rmbd % 2 ;
					
								var dd : float = rmbAd[1] ;
			var ss : float = rmbAd[0] ;

						if ( ss - dd < .5 || dd - ss < .5  )     { 
						dblclicked = true;
					}
					else{
											dblclicked = false;

					}
					mcp = mainCameraTransform.position;
				meA = mainCameraTransform.eulerAngles;
		rdt =posRel;
		
		
		}
		
		// RMB PIVOT TRACK CONTROLS!
		if (Input.GetMouseButton(1) ) {
	
			if (Input.GetKey('left alt')  )   { 
		 
				 var yy =	(rdt.y-posRel.y)*50 ;
				 var xx =	(rdt.x-posRel.x)*40  ;
				 var rotay : float = mainCameraTransform.eulerAngles.y ;
				 mainCameraTransform.position = mcp + Quaternion.Euler(0,rotay,0) * Vector3(-xx,0,-yy);
				 
		
				 }
				 
				 else{
				 
				 
				 	var qqqcurrentRotation = Quaternion.Euler(meA.x +(rdt.y-posRel.y)*50 ,	meA.y - (rdt.x-posRel.x)*40 , meA.z);
				 mainCameraTransform.rotation = qqqcurrentRotation;
				 
		
				 }
				 }
	
		//		 }
				 
			//else{
			//

		//	}
}

			
							if (Input.GetKeyDown ("f")){
			if (RTScam == true) {
				RTScam = false;
				}
			else {
				RTScam = true;
				}
			}
							if (Input.GetKeyDown ("b")){
			if (moveflag == true) {
				moveflag = false;
				}
			else {
				moveflag = true;
				}
			}
			
			
			//MAIN CAMERA SWITCH BETWEEN FOLLOWCAM AND RTSCAM THIS IS IMPORTANT DIVIDER
			
			if (RTScam) {
			var panpivot : Vector3 = mainCameraTransform.position;

	
			if (moveflag){
			var cameraTargetPosition : Vector3 = panpivot- mainCameraTransform.forward*(deltascrolldist+30);//+inputoffset  ;
		


		}
			else{
		
			//wasd camera 
			
			//WORking wasd camera these two lines below
		//var inputoffset : Vector3 = mainCameraTransform.rotation*Vector3( Input.GetAxis("Horizontal") * 2 , Input.GetAxis("Vertical") ,  0) ;
//cameraTargetPosition = panpivot- mainCameraTransform.forward*(deltascrolldist+30)+inputoffset*scrolldist/7  ;
		



		}
				/*
			if (Input.GetKey("left alt") ){
							if (Input.GetMouseButtonDown(0)){
										var hinputoffset : Vector3 = cursorWorldPosition;
										}
				if (Input.GetMouseButton(0)){
					
cameraTargetPosition = -1*mainCameraTransform.forward*(deltascrolldist+30)+02  ;
					}
				}
	
				
						*/
						
						
				var mct = mainCameraTransform;

					if (Input.GetMouseButtonDown(0))
					{
		    var hit : RaycastHit;
    if (Physics.Raycast (mct.position, mct.forward, hit)) {
        distanceToGround = hit.distance;
		
    }
		pointcameralooksat = mct.position + mct.forward*distanceToGround;
goct.transform.position = pointcameralooksat ;
		camq = posRel;
		}
				var scrollSpeed : float = scrolldist + 40;
//LMB MOUSEORBIT PIVOT ABOUT WORLDPOINT TO BE DONE, Change pivot location like 3dsmax
		if  (Input.GetMouseButton(0) ) {
		var ddd = camq - posRel;
			var camang = mainCameraTransform.eulerAngles.x;
		// + newcamang*Vector3(0.0, 0.0, -distanceToGround)
	//	Mathf.Sin(camang * Mathf.Deg2Rad ) // cam ang 0 = flat 90 = straight down 60 = typical, sin0 = 0  
		mct.LookAt(goct.transform);
		mct.Translate(Vector3.right *ddd.x*2* -scrollSpeed * Time.deltaTime);
		mct.Translate(Vector3.up *(ddd.y/1 )*-scrollSpeed * Time.deltaTime);

		
//	var displ = newcamang*Vector3(0.0, 0.0, -distanceToGround) + target.position
		}
		else{
					//RTS CAMERA
			var mPosX = Input.mousePosition.x;
			var mPosY = Input.mousePosition.y;
			var scrollAreaw : float = Mathf.Pow(Screen.width,.3);
			var scrollAreah : float = Mathf.Pow(Screen.height,.3);

			// Do camera movement by mouse position // change these to mct.right
			if (mPosX < scrollAreaw) {mainCameraTransform.Translate(Vector3.right * -scrollSpeed * Time.deltaTime);}
			if (mPosX >= Screen.width-scrollAreaw) {mainCameraTransform.Translate(Vector3.right * scrollSpeed * Time.deltaTime);}
			
			var camtilt : Quaternion = Quaternion.Euler(-mainCameraTransform.eulerAngles.x, 0, 0);
			if (mPosY < scrollAreah) {mainCameraTransform.Translate(camtilt*(Vector3.forward) * -scrollSpeed * Time.deltaTime);}
			if (mPosY >= Screen.height-scrollAreah) {mainCameraTransform.Translate(camtilt*(Vector3.forward) * scrollSpeed * Time.deltaTime);}
}		

		}
		
//FOLLOW CAMERA HEEER		
			else{
			if (lockf){
			
			var rotahy = mainCameraTransform.eulerAngles.y;
			var qq = Quaternion.Euler(0,rotahy,0);
			mainCameraTransform.rotation = Quaternion.Euler(mainCameraTransform.eulerAngles.x, character.eulerAngles.y, 0 );
			cameraTargetPosition = character.position + qq*Vector3(0,deltascrolldist+80, -50);//+inputoffset  ;
}
			else{
			cameraTargetPosition = character.position - mainCameraTransform.forward*(deltascrolldist+80);//+inputoffset  ;
		
				}
				}
				
		//	if (Input.GetKeyDown('left ctrl') ) {
		//	var cwt = cursorWorldPosition; 
			//cameraTargetPosition = Vector3(cwt.x, mainCameraTransform.position.y, cwt.z) ;
		//	}
			
				//		if (Input.GetKey('left ctrl') ) {
					//	cameraTargetPosition = ptmc - mainCameraTransform.forward*(deltascrolldist+80);
			//	}
			//HERE IS THE MAIN SMOOTHDAMP THAT MOVES THE RTSCAM AND STABILIZES IT, ALSO CONSIDER LERPSLERP/etc.
			mainCameraTransform.position = Vector3.SmoothDamp (mainCameraTransform.position, cameraTargetPosition, cameraVelocity, cameraSmoothing);
			
			//LERP SLERP
			//mainCameraTransform.position =Vector3.Lerp(mainCameraTransform.position, cameraTargetPosition, cameraVelocity, cameraSmoothing);
			//mainCameraTransform.position =Vector3.Slerp (mainCameraTransform.position, cameraTargetPosition, cameraVelocity, cameraSmoothing);
			
			
			
			}
			
			else{//FLYCAM!!!!
/*		
if (!Input.GetKey('left ctrl') ) {
	Screen.lockCursor = false;
					var inputoffset : Vector3 = mainCameraTransform.rotation*Vector3( Input.GetAxis("Horizontal") * 2 , Input.GetAxis("Vertical") ,  0) ;
cameraTargetPosition = mainCameraTransform.position - mainCameraTransform.forward*(deltascrolldist+30)+inputoffset*scrolldist/7  ;
		mainCameraTransform.position = Vector3.SmoothDamp (mainCameraTransform.position, cameraTargetPosition, cameraVelocity, cameraSmoothing);
}

else{
*/		

			var climbSpeed : float = 55f;

				var cameraSensitivity : float = 555;

			var fastMoveFactor : float = 5;

			var slowMoveFactor : float = 2;
			var normalMoveSpeed : float = 55;
			
			rotationX += Input.GetAxis("Mouse X") * cameraSensitivity * Time.deltaTime;
		rotationY += Input.GetAxis("Mouse Y") * cameraSensitivity * Time.deltaTime;
		rotationY = Mathf.Clamp (rotationY, -90, 90);
 
		mainCameraTransform.localRotation = Quaternion.AngleAxis(rotationX, Vector3.up);
		mainCameraTransform.localRotation *= Quaternion.AngleAxis(rotationY, Vector3.left);
 
	 	if (Input.GetKey (KeyCode.LeftShift) || Input.GetKey (KeyCode.RightShift))
	 	{
			mainCameraTransform.position += mainCameraTransform.forward * (normalMoveSpeed * fastMoveFactor) * Input.GetAxis("Vertical") * Time.deltaTime;
			mainCameraTransform.position += mainCameraTransform.right * (normalMoveSpeed * fastMoveFactor) * Input.GetAxis("Horizontal") * Time.deltaTime;
	 	}
	 	else if (Input.GetKey (KeyCode.LeftControl) || Input.GetKey (KeyCode.RightControl))
	 	{
			mainCameraTransform.position += mainCameraTransform.forward * (normalMoveSpeed * slowMoveFactor) * Input.GetAxis("Vertical") * Time.deltaTime;
			mainCameraTransform.position += mainCameraTransform.right * (normalMoveSpeed * slowMoveFactor) * Input.GetAxis("Horizontal") * Time.deltaTime;
	 	}
	 	else
	 	{
	 		mainCameraTransform.position += mainCameraTransform.forward * normalMoveSpeed * Input.GetAxis("Vertical") * Time.deltaTime;
			mainCameraTransform.position += mainCameraTransform.right * normalMoveSpeed * Input.GetAxis("Horizontal") * Time.deltaTime;
	 	}
 
 
		if (Input.GetKey (KeyCode.Q)) {mainCameraTransform.position += mainCameraTransform.up * climbSpeed * Time.deltaTime;}
		if (Input.GetKey (KeyCode.E)) {mainCameraTransform.position -= mainCameraTransform.up * climbSpeed * Time.deltaTime;}
 
		if (Input.GetKeyDown (KeyCode.End))
		{
			Screen.lockCursor = (Screen.lockCursor == false) ? true : false;
		}
		
	//	}
		}
			
			
			
		}

		
		//original
	/*	
	// Set the target position of the camera to point at the focus point
	var cameraTargetPosition : Vector3 = character.position + initOffsetToPlayer + cameraAdjustmentVector * cameraPreview;
	
	// Apply some smoothing to the camera movement
	mainCameraTransform.position = Vector3.SmoothDamp (mainCameraTransform.position, cameraTargetPosition, cameraVelocity, cameraSmoothing);
	
	// Save camera offset so we can use it in the next frame
	cameraOffset = mainCameraTransform.position - character.position;
	
	*/

public static function PlaneRayIntersection (plane : Plane, ray : Ray) : Vector3 {
	var dist : float;
	plane.Raycast (ray, dist);
	return ray.GetPoint (dist);
}

public static function ScreenPointToWorldPointOnPlane (screenPoint : Vector3, plane : Plane, camera : Camera) : Vector3 {
	// Set up a ray corresponding to the screen position
	var ray : Ray = camera.ScreenPointToRay (screenPoint);
	
	// Find out where the ray intersects with the plane
	return PlaneRayIntersection (plane, ray);
}

function HandleCursorAlignment (cursorWorldPosition : Vector3) {
	if (!cursorObject)
		return;
	
	// HANDLE CURSOR POSITION
	
	// Set the position of the cursor object
	cursorObject.position = cursorWorldPosition;
	
	// Hide mouse cursor when within screen area, since we're showing game cursor instead
//	Screen.showCursor = (Input.mousePosition.x < 0 || Input.mousePosition.x > Screen.width || Input.mousePosition.y < 0 || Input.mousePosition.y > Screen.height);
	//cam controller: lmb move to location + add wave offset potential related to user input histogram, s.t. 
	//when left click far away, zoom out a bit, and also move the offset of the camera maybe a bit in direction, etc.
	//weighted by ml histo -> wave 
	//add a follow toggle and click to move rmb up
	// HANDLE CURSOR ROTATION
	
	var cursorWorldRotation : Quaternion = cursorObject.rotation;
	if (motor.facingDirection != Vector3.zero)
		cursorWorldRotation = Quaternion.LookRotation (motor.facingDirection);
	
	// Calculate cursor billboard rotation
	var cursorScreenspaceDirection : Vector3 = Input.mousePosition - mainCamera.WorldToScreenPoint (transform.position + character.up * cursorPlaneHeight);
	cursorScreenspaceDirection.z = 0;
	var cursorBillboardRotation : Quaternion = mainCameraTransform.rotation * Quaternion.LookRotation (cursorScreenspaceDirection, -Vector3.forward);
	
	// Set cursor rotation
	cursorObject.rotation = Quaternion.Slerp (cursorWorldRotation, cursorBillboardRotation, cursorFacingCamera);
	
	
	// HANDLE CURSOR SCALING
	
	// The cursor is placed in the world so it gets smaller with perspective.
	// Scale it by the inverse of the distance to the camera plane to compensate for that.
	var compensatedScale : float = 0.1 * Vector3.Dot (cursorWorldPosition - mainCameraTransform.position, mainCameraTransform.forward);
	
	// Make the cursor smaller when close to character
	var cursorScaleMultiplier : float = Mathf.Lerp (0.7, 1.0, Mathf.InverseLerp (0.5, 4.0, motor.facingDirection.magnitude));
	
	// Set the scale of the cursor
	cursorObject.localScale = Vector3.one * Mathf.Lerp (compensatedScale, 1, cursorSmallerWithDistance) * cursorScaleMultiplier;
	
	// DEBUG - REMOVE LATER
	if (Input.GetKey(KeyCode.O)) cursorFacingCamera += Time.deltaTime * 0.5;
	if (Input.GetKey(KeyCode.P)) cursorFacingCamera -= Time.deltaTime * 0.5;
	cursorFacingCamera = Mathf.Clamp01(cursorFacingCamera);
	
	if (Input.GetKey(KeyCode.K)) cursorSmallerWithDistance += Time.deltaTime * 0.5;
	if (Input.GetKey(KeyCode.L)) cursorSmallerWithDistance -= Time.deltaTime * 0.5;
	cursorSmallerWithDistance = Mathf.Clamp01(cursorSmallerWithDistance);
}
