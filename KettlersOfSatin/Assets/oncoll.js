#pragma strict
//soo either call this after you do all the instantiation? yes that . or it might miss some vertexes if you mix that in the for loop
function Start () {

}

function Update () {

}

function OnCollisionEnter(collisionInfo : Collision) {

	var sss : String = collisionInfo.gameObject.name; //.renderer.material.mainTexture.name
//	print(sss);
    // Debug-draw all contact points and normals
  //  for (var contact : ContactPoint in collisionInfo.contacts) {
   //     Debug.DrawRay(contact.point, contact.normal * 10, Color.white);
 //   }
}