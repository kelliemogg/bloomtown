import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'https://unpkg.com/three@0.126.1/examples/jsm/webxr/VRButton.js';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer
const renderer = new THREE.WebGLRenderer({
// select the DOM element to use
  canvas: document.querySelector('#bg'),
})
// Add the VRButton to the page
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;

renderer.setPixelRatio (window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render (scene, camera);


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// add lighting to the scene
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(15, 15, 10);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light, ambientLight);

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
const fieldTexture = new THREE.TextureLoader().load('/assets/img/rohit-ranwa-unsplash.jpg');
scene.background = fieldTexture;


// Avatar
const avatar = new THREE.TextureLoader().load('/assets/img/girl-with-plant.png');
const gil = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({ map: avatar }));

scene.add(gil);
// Tomato and Girl
const tomatoTexture = new THREE.TextureLoader().load('/assets/img/tomato.jpg');
const tomato = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), new THREE.MeshBasicMaterial({ map: tomatoTexture }));
scene.add(tomato);

tomato.position.z = 30;
tomato.position.setX(-10);

gil.position.z = -5;
gil.position.x = 2;

// Scroll Animation
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    tomato.rotation.x += 0.05;
    tomato.rotation.y += 0.075;
    tomato.rotation.z += 0.05;
  
    gil.rotation.y += 0.01;
    gil.rotation.z += 0.01;
  
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }
  
  document.body.onscroll = moveCamera;
  moveCamera();

// animation loop


renderer.setAnimationLoop (function () { 

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    tomato.rotation.x += 0.005;
    // controls.update();

  renderer.render(scene, camera);
});