#pragma strict


function Start () {

	
}


static var currentnameselected = 'nothing selected';
private var lastFireTime : float = 0; 
var placemarker : GameObject;
var bigfontskin : GUISkin;

function OnGUI(){
		GUI.skin = bigfontskin;

  GUI.Label (Rect (800, 110, 110, 100),currentnameselected.ToString());
  
    GUI.Label (Rect (700, 10, 300, 100),game_manager.tempray.ToString() + '   TurnOrder Left is first');


}


static var lockselect : boolean = false;

function Update () {




			if (Input.GetMouseButtonDown(1) ) {
			
						lockselect = (lockselect == false) ? true : false;

			}
			


if (!lockselect) {
		placemarker.renderer.material.color = Color.green;

    var hit: RaycastHit;
    var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	    
        if (Physics.Raycast (ray, hit, 500)) 
        {//(hit.collider.gameObject.transform.position.ToString());
		
		currentnameselected = hit.collider.gameObject.name;
		placemarker.transform.position = (hit.collider.gameObject.transform.position);
		
          //  if(hit.collider.gameObject.tag == "tagOfYourObect")
		
		}
		
		}
		else{//enderer.material.color = Color.black
		
		placemarker.renderer.material.color = Color.black;
		
		}
		
		
		
		
}

