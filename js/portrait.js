// portrait.js
//
// contains the code to set up and animate your 3d portrait

// keep some globals around for convenience
// (e.g., so you can open the web console and tweak stuff)
var thePortrait = null;

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
  texloader.load( 'textures/myface_tex_0.jpg', function ( image ) {
    texture.image = image;
    texture.needsUpdate = true;
  } );

  // create a basic lambertian material with our texture
  var material = new THREE.MeshLambertMaterial({map: texture});

  // load obj model
  var objloader = new THREE.OBJLoader( manager );
  objloader.load( 'meshes/myface_big.obj', material, function ( object ) {

    // this is a good spot to apply what transforms you need to the model
    object.rotation.set(0.0, Math.PI / 2.0, 0.0, 'YXZ');
    object.scale.set(1.0, 1.0, 1.0);
    object.position.set(0.0, 0.0, 0.0);

    // make sure to actually add it to the scene or it won't show up!
    scene.add( object );

    // set the global se we can easily access the portrait from the console
    thePortrait = object;

  }, onProgress, onError );
}


// this function will get called every frame, with dt being how much
// time (in s) has passed since the last frame
// cursorX and cursorY indicate the relative position of the mouse cursor
// to the viewing window (so you can make the portrait look at the mouse)
function animatePortrait(dt, cursorX, cursorY) {
  // nothing to do?
}