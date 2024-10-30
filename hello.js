import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as lil from 'lil-gui';

const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 350);

// Renderer setup
const canvas = document.getElementById('canvas') || document.createElement('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
document.body.appendChild(renderer.domElement);

// Load HDRi as environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/rogland_sunset_4k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;

    // Load the GLTF models once the environment is set
    loadGLTFModels();
});

// Variables for animation mixer
let phoenixMixer;

function loadGLTFModels() {
    const loader = new GLTFLoader();

    // Load Bumblebee model
    loader.load('./bumblebee.glb', function (gltf) {
        gltf.scene.position.set(0, -100, 0);

        const box = new THREE.Box3().setFromObject(gltf.scene);
        console.log('Bumblebee Bounding Box:', box);

        scene.add(gltf.scene);
    });

    // Load Phoenix Bird model
    loader.load('./phoenix_bird.glb', function (gltf) {
        const phoenixBird = gltf.scene;
        phoenixBird.position.set(-300, +100, 40);

        // Scale down the phoenix bird model
        phoenixBird.scale.set(0.2, 0.2, 0.1);

        const box = new THREE.Box3().setFromObject(phoenixBird);
        console.log('Phoenix Bird Bounding Box:', box);

        // Set up animation mixer if the model has animations
        if (gltf.animations && gltf.animations.length) {
            phoenixMixer = new THREE.AnimationMixer(phoenixBird);
            gltf.animations.forEach((clip) => {
                phoenixMixer.clipAction(clip).play();
            });
        }

        scene.add(phoenixBird);
    });
}

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Update animation mixer if it exists
    if (phoenixMixer) {
        phoenixMixer.update(0.01);
    }

    renderer.render(scene, camera);
}

animate();
