#pragma strict
var gpf : GameObject;
function Start () {

for (var i=0; i<33; i++) {
var ang = i * 2 * Mathf.PI / 33;
var pos = 3*Vector3( Mathf.Sin(ang),5, Mathf.Cos(ang) ) ;
Instantiate(gpf, pos, Quaternion.identity);
//gg.GetComponent("Lens Flare").brightness = PlayerMoveController.scrolldistexp;
}


}

function Update () {

}