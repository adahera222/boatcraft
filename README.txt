


BOATCRAFT README:


Developed on Unity 0.4.0.7f Pro version I'm not sure what the conflicts are so just use that version.

IMPORTANT REFERENCES:

FREE MILITARY BOAT MODELS: http://3dmodel.domawe.com/tag/3D%20Military%20Boats  //There used to be more on this page but they dissapeared, need more models then. 
^Plenty of other sites but these are pretty good. 

*Quick note on models* They do NOT like to be imported into Unity! .obj / .mtl / .max will NOT import correctly into Unity. To import free models download 3ds Max.
From 3dsMax, open the .max of the free model (not the obj / .mtl). Make sure it imported the materials correctly and there is no warping.

WARNING: if the bounding box is messed up when you import it to unity you will get serious model warping / deformation 
and nobody on google searches had an answer for this except this (which wasn't about Unity even.) But it works to reset the bounding box.
 http://area.autodesk.com/forum/autodesk-3ds-max/autodesk-3ds-max--3ds-max-design-2010/reset-bounding-box/ 
 
 Export from 3dsmax with the default Autodesk settings to .FBX. Copy the .FBX into Unity's asset folder. 
 
 You might still be missing textures some of the time and have to reassign them.
 TO REASSIGN TEXTURES: Look for a materials folder created automatically in the same folder as your .FBX import, there should be like 5-10 files of texture maps inside with names.
 Instantiate your model in the scene view, open its child game objects and find the mesh that needs materials on it. Match the materials in the material folder to the names
 of the Mesh renderers material textures. Just drag and drop images from the asset folder onto the Right Inspector panel of the appropriate mesh. Once you've assigned
 materials this way they should be 'remembered' later. 
 
 *NOTE if you don't download a free model and just work in Maya / 3dsMax you shouldn't have any import issues like that. 
 *Quick note on how to work in Maya / 3dsMax. There's a bunch of tutorials but the hardest part is UV-Mapping. Quick example:
 I make a polygon in Maya, start with a cube with like 20x20x5 divisions. Then select various edges and drag and modify / extrude them to get some sort of shape.
 
 Then in Maya you go to the Window -> Rendering Editor -> Hypershader and create a material, assign it to an object in the scene, 
 and/or make a material from a file by clicking the black and white checkered button next to "Color" in the material attribute editor 
 and selecting File (double click the material to get to attributes of it).
 
 In 3dsMax you go to Material Editors -> Slate or Compact editor and create a material the same way, theres a file option in there too for the same functionality. 

In Maya if I took that deformed cube and then hit -> Create UV - > Automatic UV Layout. Then Edit UV -> UV texture. It would show me the file I added to the material in a separate
window with 4 white grid patterns representing the 4 sides of the boats layed out like a tailor's pattern. 
(I.e. the picture gets cut out around the white grids and they get 'imprinted' or lacquered with whatever part of the image is over them.) I can then drag around each of
 the grid edges of the boat separately  on the picture to make the picture render on the skin of the model exactly how I want. Process very similar in 3dsMax
 
 If you've ever seen those game texture files, they're laid out almost like stickers or pieces / art for a model car. You can just put 4 "sides" of a boat in a PSD doc, then
 adjust the grids to match up with their locations in the document from Maya afterwards.
 
http://unitycoder.com/blog/2012/12/15/photon-networking-multiplayer-game/   Describes how to strip AngryBots PUN multiplayer demo down to barebones.
This is where project started.

Scripting reference / examples / camera controllers : http://wiki.unity3d.com/index.php/Scripts/Controllers

Long 20 pg discussion on camera controllers: http://forum.unity3d.com/threads/16949-WOW-Camera-Movement

If you want to use a .NET DLL check runtime class DllImport available in next links left panel VVV

http://docs.unity3d.com/Documentation/ScriptReference/Vector3.html The base class for vectors, this is the most important class in Unity.

Character positions are stored as vector objects e.g: (also check http://wiki.unity3d.com/index.php/UnityScript_versus_JavaScript for language differences. )
 /*
var character : Transform; 
 
var pos = Vector3(0 , 10, 0);

Update {
	character.position = pos 
}
*/

So the character.position must be declared in MonoBehaviour runtime class like Update or Start or onCollision etc.. 
Check ScriptReference/MonoBehaviour (Unity docs) to see all available functions.

If you stuck character.position = pos inside an Update { } function and attached the script to the character gameobject, the character would never move.
(Well, unless you updated later in the same script it's position, which can be used for a quick switch/case logic without changing much.) 

In order to have networking support, there is a function called OnPhotonSerializeNetworkView, this 'serializes' two scripts just like a JSON serializer. 
There's a Network runtime class that implements the same functionality, but the examples are less easy to use than PUN. 
So once you get above 100 users it's pretty easy to build Unity's C++ Master server and use the Network.Instantiate runtime classes that PUN wraps. 

Right now the way the game is working to serialize stuff is pretty straightforward and simple. In MovementMotor inside Scripts/Movement there is a serialization function that
updates the characters position and linearly interpolates to make sure they don't lag or stutter. The ONLY important variable there is the interpolation distance
which is set to 45 right now. If you scale the boat sizes that must be adjusted or you will get lag and stutter effects! The only other serializers are 
in autofiredowncastbuildings.js which is connected to the build GUI button right now for an example as how to network instantiate building prefabs. 

Quick word on prefabs. To make a prefab, drag a gameobject from the scene view to your asset folder. This will 'save' the config of that gameobject and it's child game objects
Resources/currentworkingplayer.prefab is the current 'character' prefab. It has the collider, health, network view, character controller, movement motor, 
and weapon scripts in child objects. 
 
Right now I left the player inside the scene view to minimize errors, the idiot who wrote Angrybots demo made like 10,000 child game objects of the 'player' model, so
to access the weapon scripts search for 'weapon' in the scene view of the game with a playerprefab inside the scene. (Drag from resources to scene to 
instantiate a test model to mess with it's child game objects.) You should see WeaponSlot game object with scripts AutoFire and TriggerOnMouseOrJoystick.

Those scripts show you how network instantiation works. TriggerOnMouse, when viewed from the Unity Editor on a WeaponSlot has 2 'signal senders'.
Their 'recievers' are set to WeaponSlot as well, which means on mouse signals get redirected back to the WeaponSlot game object. 
The WeaponSlot game object then has Autofire.js which accepts those game signals by having two function inside of it. OnStartFire and OnStopFire. 
Those functions trigger a boolean that starts a recurring firing sequence where bulletPrefabs are instantiatedwith velocity towards where you're firing. 
It's pretty easy to modify it to shoot in the direction of PlayerMoveController.cursorWorldPosition (fire where mouse is) instead of firing forward only
but its not set that way yet.

At the bottom of Autofire.js you'll see some strange serialization code. Don't touch that. It looks funny but that is how they do it. 
There is a runtime class that does OnSerialize without photon so check 
Unity docs for examples.

Autofire.js / TrigOnMouse were replicated in autofiredowncastbuildings.js and trigonbut.js. 
It seems to instantiate over the network like bullets, but for some reason if you instantiate 
before a client connects, it doesn't appear. Needs some kind of fix. 

This is allows you to click the GUI button (created in FreeMovementMotor.js just because I needed the GUI to print out movement debugs.) 

So the three main scripts are FreeMovementMotor, PlayerMoveController, and AutoFire.js. These contain all the 'meat'.

Almost all the modifications made so far are to PlayerMoveController where the camera codes / character input resides.
Right now there's only one movement type possible, a continuous acceleration a la boats. The code for that is disabled in FlyCam.

The camera system right now is written using a bool switch for FlyCam versus Not-Flycam.
Once in Not-flycam (toggled by key T): there is RTSCamera and FollowCamera modes.

RTSCamera is up down left right movement like starcraft + a smoothdamp function for zoom distance. LMB Pivots about camera's current worldposition. RMB look-rotates in place. 
!!(TO BE ADDED) Need to be able to adjust the pivot point a la 3ds max, and assign it via camera look function.

Followcam is triggered by F. Strict followcam (locks rotation axes and follows char position AND rotation.) triggered by G once in follow.

Flycam controls are QE / shift etc. and are declared near the end of the script. 

Camera system needs smoothing and matching / a class instantiation later on but it's 'good enough' for now. There are a ton of different options for rotating, quick list
camera.LookAt(target : Transform); LookRotation, Slerp, Smoothdamp, Lerp, LerpAngle, transform.rotation, transform.position,  and more!!! 
need to go through all these options with GUI menus to see what is most visually pleasing.) 

PlayerMoveController ( PMC) also contains a selection code for drawing a circle above the player if he is clicked on and then moving a waypoint placeholder.

The waypoint placeholder is just a sphere gameobject that was preffabbed by dragging to assets and then dragged onto the Inspector of PMC script.


I plan on wrapping all these things in classes later but right now they are all just stuffed into a few scripts for simplicity of testing.
  
Also:

The Resources folder must contain the Player prefab because it gets preloaded!
The Plugin folder MUST contain GameManager.cs because it gets precompiled! 
All C# / .NET classes must be in plugin folder to be available for use in scripts!!!!

In the scene "Code" gameobject holds GameManager.cs which holds the Playerprefab to instantiate. GameManager also sets where you can click by excluding the chat box from TriggerOnMouse
You can edit the lobby views / create room functionality by messing with GameManager and the photon scripts. Very easy to create rooms / custom graphics, etc.

Main Camera game object in scene holds the initial camera offset and a bunch of useless scripts. Mobile bloom is what gets triggered when you get shot at.
Health.js is player health and SpawnCheckpoint can be set to anything but right now it searches for a Tag of Spawnpoint.

Tags are the best way to find gameobjects. Gameobject has a findwithtag method. Inside the Unity editor you can create new tags and then assign gameobjects to them.



JSON example is included in PlayerMoveController near the top. WWW HTTP POST request example also given uses SimpleServer.py (google python POST server simpleserver.py)
Both are working. In order to save stuff between game sessions use runtime class PlayerPrefs, which accepts dictionary entries of strings (thus Json encoding.)

Current JSON package may not work with iOS!

  

//DEPLOYMENT //BUILD SETTINGS

In order to deploy the game you need to download the Photon Server SDK, run the installer batch file, and run the PhotonControl.exe panel. 
It docks in the tray, by default, so right click, select Loadbalancing ( MyCloud) -> Start Application. Don't use the other options they won't work.

Open up the scene in Unity, if you didn't look at the Photon Multiplayer Networking link above then you might not have set the Build Settings.

Go to File, Build Settings. Now look in the bottom Assets panel (there is a console/project button switch on the bottom panel, 
so if you see the console, switch to assets).

Click on Assets/Scenes folder, inside there are numbered scenes. Double click the top scene, then go to build settings and hit 'add current'.
Add scenes in the correct order!!!, 0, 1, 2, 3. If you add them in the wrong order untoggle them and start over. 

Right now for scene 2 I am using 02_OceanLoder.unity. The other 02_Angrybots is the legacy original scene file from the barebones, 
there's various effects you might want to borrow inside like correct AI pathing laid out.

