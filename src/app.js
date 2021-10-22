import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
let loader = new GLTFLoader();



const textureLoader = new THREE.TextureLoader();




let car;
let directionalLight;
let light;
let light2;
let light3;
let light4;

document.body.onload = () => {
  main();
};

window.onresize = () => {
  scene.background = new THREE.Color(0xdddddd);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight, true);
};



function main() {
  // Configuracion inicial
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
  renderer.shadowMap.enabled = true;
  scene.background = new THREE.Color(0xdddddd);
  document.body.appendChild(renderer.domElement);

  // Visual Configs
  cameraConfig();
  controlsConfig();

  // Light
  setupLights();

  // Modelo
  loadInitialModel();
}

function loadInitialModel() {
  loader.load(
    'assets/modelOne/scene.gltf',
    function (gltf) {
      car = gltf.scene.children[0];
      //console.log(car.children[0].children[0]);
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log(`Un error ocurrio ${error}`);
    },
  );
}

export function changeModel(assetFolder) {
  scene.children = [];
  // Light
  setupLights();
  loader.load(
    `assets/${assetFolder}/scene.gltf`,
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}

export function changeTexture(assetFolder, texture) {
  var a = parseInt(assetFolder);
  var b = parseInt(texture);
  console.log(a);
  console.log(b);
  var global= a+b;
  var resultado1 = a+b;
  var resultado2 = a+b;
  var resultado = a+b;
  var resultado3 = a+b;
  
  switch(global){
    case 0:
  //modelo 1
  switch(resultado){
    
  case 1:
     route ="assets/modelOne/textures/license_normal.png";
     break;
  case 2:
      route ="assets/modelOne/textures/Material_baseColor_rosa.png";
      break;
  case 3:
     route ="assets/modelOne/textures/Material_metallicRoughness.png";
      break;
      
  } 
    
     console.log(resultado);
     
//modelo 2 
  switch(resultado1){
  case 4:
     route ="assets/modelTwo/textures/gt_tire_normal.png";
      break;
  case 5:
      route ="assets/modelTwo/textures/gt_black_occlusion.png";
      break;
  case 6:
      route ="assets/modelTwo/textures/gt_tire_diffuse.png";
      break;
  }
     
    console.log(resultado1);
   
//modelo3
  switch(resultado2){
  case 7:
      route ="assets/modelThree/textures/930_chromes_baseColor.png";
      break;
  case 8:
     route ="assets/modelThree/textures/930_rim_normal.png";
       break;
  case 9:
      route ="assets/modelThree/textures/930_plastics_baseColor.png";
      break;
  }
      
 
      console.log(resultado2);
     
    
    //modelo4
    switch(resultado3){
  case 10:
      route ="assets/modelFour/textures/material.010_baseColor.png";
      break;
  case 11:
     route ="assets/modelFour/textures/tyre_normal.png";
     break;
  case 12:
     route ="assets/modelFour/textures/tyre_baseColor.png";
     break;
    }
    
    console.log(resultado3);
  }

  
  const map = textureLoader.load(
   'assets/$ {route}',
  );
  map.enconding = THREE.sRGBEnconding;
  map.flipY = false;
  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
     node.material.map = map
      }
    
    });
  
    animate();
  
}












function controlsConfig() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.enablePan = false;
}

function cameraConfig() {
  camera.position.x = 8;
  camera.position.y = 2;
  camera.position.z = 8;
}

function setupLights() {
  directionalLight = new THREE.DirectionalLight(0xffffff, 20);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  light = new THREE.PointLight(0xc4c4c4, 1.5);
  light.position.set(0, 300, 500);
  scene.add(light);

  light2 = new THREE.PointLight(0xc4c4c4, 1.5);
  light2.position.set(500, 100, 0);
  scene.add(light2);

  light3 = new THREE.PointLight(0xc4c4c4, 1.5);
  light3.position.set(0, 100, -500);
  scene.add(light3);

  light4 = new THREE.PointLight(0xc4c4c4, 1.5);
  light4.position.set(-500, 300, 500);
  scene.add(light4);
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}