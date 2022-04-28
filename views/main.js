import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'https://unpkg.com/three@0.126.1/examples/jsm/webxr/VRButton.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer
const renderer = new THREE.WebGLRenderer({
// select the DOM element to use
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
});

// Add the VR button to the page
function main() {
  const canvas = document.querySelector('#bg');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
}
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;


// add lighting to the scene
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(15, 15, 15);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(light, ambientLight);

const watercanLight = new THREE.DirectionalLight(0xffffff, 2);
watercanLight.position.set(0, -.5, -3);
watercanLight.target.position.set(.2, -.2, -1);
scene.add(watercanLight);
scene.add(watercanLight.target);


// Adding Watering Can to the scene
const loader = new GLTFLoader();
loader.load( 'assets/models/watering_can.glb', function ( gltf ) {
  gltf.scene.position.set(.3, -.4, -1.5);
  gltf.scene.rotation.set(0, 80, 0);
  scene.add( gltf.scene );
}, undefined, function ( error) {
  console.error( error );
});

// Adding the plant animation to the scene
loader.load( 'assets/models/untitled.glb', function ( gltf ) {
  gltf.scene.position.set(-.4, -.6, -1.5);
  gltf.scene.scale.set(.5, .5, .5);
  gltf.scene.rotation.set(0, 80, 0);
  scene.add( gltf.scene );
}, undefined, function ( error) {
  console.error( error );
});


renderer.setPixelRatio (window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render (scene, camera);



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
scene.background = new THREE.Color(0xAFE3C0)  // 0xAFE3C0


// Scroll Animation
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    // tomato.rotation.x += 0.05;
    // tomato.rotation.y += 0.075;
    // tomato.rotation.z += 0.05;
  
    // gil.rotation.y += 0.01;
    // gil.rotation.z += 0.01;
  
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