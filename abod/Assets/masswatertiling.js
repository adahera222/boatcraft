#pragma strict
var water_tile : Transform;
function Start () {

	for (var i : int = 0;i < 9; i++) {
		for (var j: int = 0;j < 9; j++) {
				Instantiate (water_tile, Vector3(i * 100-450, 0, j * 100-450), Quaternion.identity); // scale the tile and try diff
				//also add a color map slider in game for adjust water details. //add a field of view to scroll dist function, and a LOTR style switch
				
				//n is for nukes.
		}
	}
}

function Update () {

}