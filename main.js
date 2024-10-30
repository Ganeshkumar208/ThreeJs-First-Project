import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as lil from 'lil-gui';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
// scene.add(camera);

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2)
highIntensityLight.position.set(5, 10, 7.5);
scene.add(highIntensityLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
//tells you where that point of light is projected on box
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);
//tells you from light is coming
const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.position.set(2, 2, 2);
scene.add(directionLight);

//helps you to show from where the light is coming from
const directionalLight = new THREE.DirectionalLightHelper(directionLight, 2);
scene.add(directionalLight);

let loader = new THREE.TextureLoader();
let color = loader.load('./images/color.jpg');
let roughness = loader.load('./images/roughness.jpg');
let normal = loader.load('./images/normal.png')

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ map: color, roughnessMap: roughness, metalness: 0.5, normalMap: normal });
const cone = new THREE.Mesh(geometry, material); scene.add(cone);

// mesh.rotation.y = 1.5;
// scene.add(mesh);

// renderer.render(scene, camera)
// renderer.setAnimationLoop(animate);

const gui = new lil.GUI();

const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'roughness', 0, 1).name('Roughness');
materialFolder.add(material, 'metalness', 0, 1).name('Metalness');
materialFolder.addColor(material, 'color').name('Color');
materialFolder.close();


const meshFolder = gui.addFolder('Mesh');
meshFolder.add(cone.scale, 'x', 0.1, 5).name('Scale X');
meshFolder.add(cone.scale, 'y', 0.1, 5).name('Scale Y');
meshFolder.add(cone.scale, 'z', 0.1, 5).name('Scale Z');
meshFolder.add(cone.position, 'x', -10, 10).name('Position X');
meshFolder.add(cone.position, 'y', -10, 10).name('Position Y');
meshFolder.add(cone.position, 'z', -10, 10).name('Position Z');
meshFolder.open();



const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
controls.enableZoom = false;
controls.enableDamping = true;
controls.dampingFactor = 0.02;

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})


function animate() {
  window.requestAnimationFrame(animate);
  // mesh.rotation.y += 0.01
  // mesh.rotation.z += 0.01
  // mesh.rotation.x += 0.01
  controls.update();
  renderer.render(scene, camera);
}

animate();
























// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// // Scene
// const scene = new THREE.Scene();

// // Camera with a further z-position to view the entire sphere
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 30; // Move camera further back to see the full sphere

// // Renderer
// const canvas = document.querySelector('canvas');
// const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// // document.body.appendChild(renderer.domElement); // Make sure renderer is appended to the body

// // Geometry and Material
// const geometry = new THREE.SphereGeometry(15, 32, 16);
// const material = new THREE.MeshBasicMaterial({ color: 0xffff00, antialias: true });
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

// // Controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;
// controls.enableZoom = false;
// controls.enableDamping = true;
// controls.dampingFactor = 0.02;

// // Handle Window Resize
// window.addEventListener('resize', () => {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// });

// // Animation Loop
// function animate() {
//   requestAnimationFrame(animate);
//   controls.update();
//   renderer.render(scene, camera);
// }

// animate();
