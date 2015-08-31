// index.js
//
// contains basic setup code

var container;
var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


$(function() {
  init();
  animate();
});

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
  camera.position.z = 2;

  // scene
  scene = new THREE.Scene();

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // portrait setup (this function is defined by portrait.js)
  initPortrait(scene, renderer);

  // event listeners
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 2;
}

function animate() {
  requestAnimationFrame( animate );

  // portrait update (defined in portrait.js)
  animatePortrait(1.0/60.0, mouseX, mouseY);

  render();
}

function render() {
  renderer.render( scene, camera );
}