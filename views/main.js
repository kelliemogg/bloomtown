import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'https://unpkg.com/three@0.126.1/examples/jsm/webxr/VRButton.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'https://unpkg.com/dat.gui/build/dat.gui.module.js';



// DEBUG
const gui = new dat.GUI();

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
});

renderer.setPixelRatio (window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render (scene, camera);

// LIGHTS
var lights = [];
lights[0] = new THREE.PointLight(0xffffff, .4, 0);
lights[1] = new THREE.PointLight(0xffffff, .3, 0);
lights[2] = new THREE.PointLight(0xffffff, .8, 0);

lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100, 100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add( ambientLight);
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
scene.add(hemiLight);


// GLTF LOADER
const gltfloader = new GLTFLoader();
// Ensures proper loading of textures to gltf models
renderer.outputEncoding = THREE.sRGBEncoding;

// Adding the gardener
gltfloader.load('assets/models/gardener.gltf', function ( gltf ) {
  gltf.scene.position.set(.3, -.4, -1.5);
  gltf.scene.scale.set(.5, .5, .5);
  scene.add(gltf.scene);
  });


// // Adding Watering Can to the scene
// gltfloader.load('assets/models/gardener.gltf', function ( gltf ) {
//   gltf.scene.position.set(.3, -.4, -1.5);
//   gltf.scene.rotation.set(0, 80, 0);
//   scene.add( gltf.scene );
//   // if watering can is clicked on, animate it
//   gltf.scene.addEventListener('click', () => {
//     gltf.scene.rotation.set(10, 10, 10);
//     gltf.scene.rotation.x += 0.01;
//     gltf.scene.rotation.y += 0.01;
// }, undefined, function ( error) {
//   console.error( error );
// });
// });


// // Adding the plant animation to the scene
// var model = new THREE.Object3D();

// gltfloader.load( 'assets/models/plantfive.glb', function ( gltf ) {
//   gltf.scene.position.set(-.4, -.4, -1.5);
//   gltf.scene.scale.set(.4, .4, .4);
//   gltf.scene.rotation.set(0, 80, 0);
//   model = gltf.scene;
//   console.log(gltf.animations);
//   var mixer = new THREE.AnimationMixer( model );
//   var action = mixer.clipAction( gltf.animations[ 0 ] );
//   action.play();
//   console.log(mixer);

//   scene.add( model );
// }, undefined, function ( error ) {
//   console.error( error );
// });


// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Adding random stars throughout the scene
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

// add tomato to the bg scene
//const fieldTexture = new THREE.TextureLoader().load('/assets/img/rezel-apacionado-unsplash.jpg');
// add leaves to the bg scene
// const fieldTexture = new THREE.TextureLoader().load('/assets/img/josh-calabrese-unsplash.jpg');
// add close up leaf texture to the scene
//const fieldTexture = new THREE.TextureLoader().load('/assets/img/rohit-ranwa-unsplash.jpg');
//scene.background = fieldTexture;
// Add hex color to the background scene
scene.background = new THREE.Color(0x81E4DA)  // 0xAFE3C0


// Scroll Animation
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
  
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }
  
  document.body.onscroll = moveCamera;
  moveCamera();

  // animation loop
  renderer.setAnimationLoop (function () { 
    renderer.render(scene, camera);
  });