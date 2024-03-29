// portrait.js
//
// contains the code to set up and animate your 3d portrait

// keep some globals around for convenience
// (e.g., so you can open the web console and tweak stuff)
var thePortrait = null;
var rotatorNode = null;

// this function sets up the portrait: edit it to load your portrait and
// position it so it is visible to the camera
function initPortrait(scene, renderer) {

  // first, set up some lights
  var ambient = new THREE.AmbientLight( 0x303030 );
  scene.add( ambient );

  var directionalLight = new THREE.DirectionalLight( 0x606040 );
  directionalLight.position.set( 0, 0.2, 1 );
  scene.add( directionalLight );

  var directionalLight2 = new THREE.DirectionalLight( 0x404060 );
  directionalLight2.position.set( 0, -0.2, 1 );
  scene.add( directionalLight2 );

  // create an empty node that we can rotate according to the mouse position
  rotatorNode = new THREE.Object3D();
  scene.add( rotatorNode );

  // create a loading manager and have it print out whenever it loads an item
  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };

  var onProgress = function ( xhr ) {
    // don't do anything with progress reports
  };

  var onError = function ( xhr ) {
    console.log("Loading error: " + xhr);
  };

  // load a texture
  var texture = new THREE.Texture();

  var texloader = new THREE.ImageLoader( manager );
  texloader.load( 'textures/checkerboard.png', function ( image ) {
    texture.image = image;
    texture.needsUpdate = true;
  } );

  // create a basic lambertian material with our texture
  var material = new THREE.MeshLambertMaterial({map: texture});

  // load obj model
  var objloader = new THREE.OBJLoader( manager );
  objloader.load( 'meshes/placeholder_person.obj', material, function ( object ) {

    // this is a good spot to apply what transforms you need to the model
    object.rotation.set(0.0, 0.0, 0.0, 'YXZ');
    object.scale.set(1.2, 1.2, 1.2);
    object.position.set(0.0, -0.5, 0.0);

    // make sure to actually add it to the scene or it won't show up!
    rotatorNode.add( object );

    // set the global se we can easily access the portrait from the console
    thePortrait = object;

  }, onProgress, onError );
}


// this function will get called every frame, with dt being how much
// time (in s) has passed since the last frame
// cursorX and cursorY indicate the relative position of the mouse cursor
// to the viewing window (so you can make the portrait look at the mouse)
function animatePortrait(dt, cursorX, cursorY) {

  // make the portrait tilt towards the mouse cursor
  // (feel free to replace this with something else!)
  var x = Math.max(-2.0, Math.min(2.0, pixelToRadians(cursorX)));
  var y = Math.max(-2.0, Math.min(2.0, pixelToRadians(cursorY)));

  rotatorNode.rotation.set(y, x, 0, 'YXZ');
}

// helper function to non-linearly map an offset in pixels into radians
function pixelToRadians(pixval) {
  var scalefactor = 0.005;
  return Math.tanh(pixval * scalefactor);
}