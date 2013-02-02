#pragma strict
var water_tile : Transform;
function Start () {
//IN order to make a civilization style wrap-around camera, you need to have an overlap zone for interpolating so to speak
//between different sides of the map, i.e. the camera or characters need to have their positions updated
//from x = +worldboundary to x = -worldboundary. same with the cameras, in order for that to be smooth
//you need to calculate playerviewdistance_max, and doubleinstantiate player and game environments on each 'fold'
//so that when you transform you can see other players within viewdist in a 'buffer' that folds back to the other side.
//why there is not a method for this i don't know. google search reveals not much.
	for (var i : int = 0;i < 2; i++) {
		for (var j: int = 0;j < 2; j++) {
				Instantiate (water_tile, Vector3(i * 100-100, 5, j * 100-100), Quaternion.identity); // scale the tile and try diff
				//also add a color map slider in game for adjust water details. //add a field of view to scroll dist function, and a LOTR style switch
				
				//n is for nukes.
		}
	}
}

function Update () {

}