#pragma strict
#pragma downcast
@script RequireComponent (Rigidbody)
var drillshafts : float = 1;
static var moveselGridInt : int = 0;
var moveselStrings : String[] = ["Sail", "Walk"];
static var camadjust : boolean = true;
static var mouseturn : boolean = true;

static var tte : boolean = false;
			
static var brickdrillshaft : GameObject;
var radariconimage : Texture;
static var dsf : boolean = false;
		var bulletPrefab : GameObject;

class FreeMovementMotor extends MovementMotor {
	
	//public var movement : MoveController;
	//create a target that can be given waypoints to squads AFTER they are assigned.
	
	//right click selects a target in world space, drops a waypoint on the radar and hud for teammates to see
	//and allows you to connect to 'global operands' , i.e target + mass retreat pivot will run the opposite direction 
	//perpendicular wrt to the point, target + squad 5 + slow walk == etc. etc.
	
	//camera system real important, alt LMB MO global pivot; LMB non-linear motion, METRIC WARPS how?
	// metric warps thru radar. and angular rotation /?? use a weak overlay grid to show warpage.
	//LMB nonlinear, click far away, move camera towards that direction,... hold click, make camera move like
	
	public var walkingSpeed : float = 5.0;
	public var walkingSnappyness : float = 50;
	public var turningSmoothing : float = 0.3;
		var buildflag : boolean = false;
		
		
	function OnGUI () {
		var alphaBlend;
	
	 if (photonView.isMine){
	                                                       

//	GUILayout.BeginArea(AspectUtility.screenRect);
		GUILayout.BeginArea (Rect (Screen.width/4,Screen.height/9,200,300));
		if (PlayerMoveController.selected) {
		/* //this works like you'd want for dropping a building from a gui button by a flag, it needs to be instantiated though somewhere else like on trigonbut.js
		if (buildflag) {
				GUILayout.Label ('#drillshafts: ' + drillshafts.ToString());
				if(GUILayout.Button ('drop drillshaft')) {
					buildflag = false;
			
							if (drillshafts > 0) {
									dsf = true;
						drillshafts += -1;
						}
		}
		else{
		
					if(GUILayout.Button ('build')) {
					buildflag = true; }
				}
		}
		*/
		}
		

					if(GUILayout.Button ('build')) {
					
						if (tte == true) {
		

				tte = false;
				}
			else {

				tte = true;
				}
			}
		//	var go : GameObject = Spawner.Spawn (bulletPrefab, Vector3(0,0,0), Quaternion.identity) as GameObject;
				
						GUILayout.Label (tte.ToString() );
						GUILayout.Label (autofiredowncastbuildings.faf.ToString() );
//RADAR HERE!! needs to be modified substantially, background image grid, scaling, etc.
				
			var playerGOs = GameObject.FindGameObjectsWithTag("Player"); 
		
			   for ( var gon : GameObject in playerGOs)  { //GetComponent(typeof(PhotonView)).isMine
						var xyz = gon.transform.position;
						var name = gon.GetComponent(typeof(PhotonView)).owner;
			   		   GUILayout.Label (xyz.ToString() + ' ' +name.ToString());
					   var xoffset = (xyz.x/6);
					   var yoffset = (xyz.z/6);
					   var radarposition : Rect = Rect(100+xoffset,150+yoffset,8,8);
						GUI.DrawTexture(radarposition, radariconimage, ScaleMode.ScaleToFit, true, 0f);
						GUI.Label(Rect(90+xoffset,130+yoffset,50,50), name.ToString());
						
						//LEAVE ALL THIS STUFF HERE FOR TOGGLING OPTIONS OUT
					//	var texCoords : Rect = Rect(0,0,1,1 ) ;
					//	var radarposition : Rect = Rect(Screen.width/4+xoffset,Screen.height/2+yoffset,16,16 ) ;
					//	GUI.DrawTextureWithTexCoords (radarposition, radariconimage,texCoords);//, alphaBlend : boolean = true // radarposition
				//		GUI.DrawTexture(radarposition, radariconimage, ScaleMode.StretchToFill);

					   
					   //+': '+ go.transform.position.ToString());
			}

			//var playernameGOs = GameObject.FindGameObjectsWithTag("playername"); 
				//	var tee : TextMesh;
		//	   var script : ScriptName;
//script = gameObject.GetComponentInChildren(ScriptName);
//script.DoSomething ();
			//		 nametextmesh = go.GetComponentsInChildren(TextMesh); // + 
					//	tee =  gon.GetComponent(TextMesh)
					//list of player positions and names.
	//				GUILayout.Label (	PlayerMoveController.goct.transform.position.ToString() );
					
		//	GUILayout.Label (PlayerMoveController.rmbA.ToString() );

			//GUILayout.Label (PlayerMoveController.dmoschar.ToString() );

			   //PlayerMoveController.dmoschar = GUILayout.Toggle(mouseturn, "mouseturn");
		//GUILayout.Label (Input.GetAxis("Horizontal").ToString() + 'x' + Input.GetAxis("Vertical").ToString()  );

		//	moveselGridInt = GUILayout.SelectionGrid (moveselGridInt, moveselStrings, 2);
			//PlayerMoveController.xcr = GUILayout.HorizontalSlider (PlayerMoveController.xcr, 0, 90);
	//		mouseturn = GUILayout.Toggle(mouseturn, "mouseturn");
		//	camadjust = GUILayout.Toggle(camadjust, "camadjust");
					//		GUILayout.Label ('ang: ' + PlayerMoveController.posRel.ToString());

		//}
	//	GUILayout.Label ('walkingSpeed: ' + walkingSpeed.ToString());
	//	walkingSpeed = GUILayout.HorizontalSlider (walkingSpeed, 0	, 222);
		/////	GUILayout.Label ('MovementMotor.dst : ' + MovementMotor.dst.ToString());
	//	MovementMotor.dst = GUILayout.HorizontalSlider (MovementMotor.dst, 0	, 222);
		//	GUILayout.Label ('MovementMotor.ac : ' + MovementMotor.ac.ToString());
	//	MovementMotor.ac = GUILayout.HorizontalSlider (MovementMotor.ac, 0	, 33);
		GUILayout.EndArea ();	
	//	GUILayout.EndArea ();	
		
		}
	}
	/*
	function Update() {
			

	}
	*/
	function FixedUpdate () {
		
            // Handle the movement of the character
		    var targetVelocity : Vector3 = movementDirection * walkingSpeed;
		    var deltaVelocity : Vector3 = targetVelocity - rigidbody.velocity;
		    if (rigidbody.useGravity)
			    deltaVelocity.y = 0;
		    rigidbody.AddForce (deltaVelocity * walkingSnappyness, ForceMode.Acceleration);
    		//NEED TO ADD A FRICTION CROSS PRODUCT TO SHIP VELOCITY * FORWARD EITHER HERE OR IN VECTOR NOT ADDED YET!!!
		    // Setup player to face facingDirection, or if that is zero, then the movementDirection
		    var faceDir : Vector3 = facingDirection;
		    if (faceDir == Vector3.zero)
			    faceDir = movementDirection;
    		
		    // Make the character rotate towards the target rotation
		    if (faceDir == Vector3.zero) {
			    rigidbody.angularVelocity = Vector3.zero;
		    }
		    else {
			    var rotationAngle : float = AngleAroundAxis (transform.forward, faceDir, Vector3.up);
			    rigidbody.angularVelocity = (Vector3.up * rotationAngle * turningSmoothing);
		    }
		
	}
	
	// The angle between dirA and dirB around axis
	static function AngleAroundAxis (dirA : Vector3, dirB : Vector3, axis : Vector3) {
	    // Project A and B onto the plane orthogonal target axis
	    dirA = dirA - Vector3.Project (dirA, axis);
	    dirB = dirB - Vector3.Project (dirB, axis);
	   
	    // Find (positive) angle between A and B
	    var angle : float = Vector3.Angle (dirA, dirB);
	   
	    // Return angle multiplied with 1 or -1
	    return angle * (Vector3.Dot (axis, Vector3.Cross (dirA, dirB)) < 0 ? -1 : 1);
	}
	
	 function OnPhotonSerializeView (stream : PhotonStream,  info : PhotonMessageInfo)    
    {
        OnPhotonSerializeViewBase(stream, info);
    }
	
	
}
