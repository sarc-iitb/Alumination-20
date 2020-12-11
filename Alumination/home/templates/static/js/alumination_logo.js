import * as THREE from '../three.js/build/three.module.js';
import { TrackballControls } from '../three.js/examples/jsm/controls/TrackballControls.js';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';
import {OBJLoader2} from '../three.js/examples/jsm/loaders/OBJLoader2.js';

THREE.Cache.enabled = true;
const objectPath = "3d alumination.obj",
      objectLoader = new OBJLoader2();

let camera, scene, renderer, controls;
init();
animate();
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set( 0, 50, 700 );
    camera.panSpeed = 4;

    const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );

    const helper = new THREE.GridHelper( 1200, 60, 0xFF4444, 0x404040 );
    // scene.add( helper );

    const ambientLight = new THREE.AmbientLight( 0xffffff, 1000 );
    const dirlight1 = new THREE.DirectionalLight(0xffffff,0.5);
    const dirlight2 = new THREE.DirectionalLight(0xffffff,0.5);
    scene.add( ambientLight );
    scene.add(dirlight1);
    scene.add(dirlight2);

    scene.add(camera);
    let logo = loadLogo(objectPath);
            
    renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.createElement('div',{classList: ["container"], id: "logo_container"})
    document.getElementById("logo_container").appendChild(renderer.domElement);

    controls = new OrbitControls(camera,renderer.domElement);
    controls.maxDistance = 900;
    controls.minDistance = 300;
    controls.maxAzimuthAngle = Math.PI/6;
    controls.minAzimuthAngle = -Math.PI/6;
    // controls.maxPolarAngle = -Math.PI/2;
    // controls.minPolarAngle = -Math.PI/2;
}

// function onMouseOver

function loadLogo(objectPath){
    let object_ret;
    objectLoader.load( 
        '/static/'+objectPath, 
        function ( object ) {
            object.position.set( 0, -120, 200);
            scene.add( object );console.log(object);
            object_ret = object;
        },
        function ( xhr ) {console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );},
        function ( error ) {console.log( 'An error happened' );}
    );
    return object_ret;
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    camera.updateProjectionMatrix();
    render();
}

function render() {
 	camera.lookAt( scene.position );
    renderer.render(scene, camera);
}