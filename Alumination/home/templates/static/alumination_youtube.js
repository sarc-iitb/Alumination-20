import * as THREE from './three.js/build/three.module.js';
THREE.Cache.enabled = true;

import { TrackballControls } from './three.js/examples/jsm/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from './three.js/examples/jsm/renderers/CSS3DRenderer.js';
import { TransformControls } from './three.js/examples/jsm/controls/TransformControls.js';

		let camera, scene, renderer;
		let controls;
		let videoWidth = 360, videoHeight = 270;
		function Element(id, x, y, z, ry, rx = 0, rz = 0) {

			const div = document.createElement('div');
			div.style.width = toString(videoWidth) + 'px';
			div.style.height = toString(videoHeight) + 'px';

			div.style.marginTop = "20px";
			div.style.marginBottom = "20px";
			div.style.backgroundColor = 'pink';
			const iframe = document.createElement('iframe');
			iframe.id = id
			// iframe.style.left = "-100px";
			iframe.style.width = "360px";
			iframe.style.height = "220px";
			// iframe.style.border = '0px';
			iframe.src = ['https://www.youtube.com/embed/', id].join('');
			iframe.frameBorder = 0;
			iframe.allowFullscreen = 1;
			iframe.allow = "clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			div.appendChild(iframe);

			const object = new CSS3DObject(div);
			object.position.set(x, y, z);
			object.rotation.set(rx, ry, rz);

			return object;

		};

		init();
		animate();

		function init() {

			const container = document.getElementById('youtube_container');

			camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 5000);
			camera.position.set(2*videoWidth,videoHeight,0);

			scene = new THREE.Scene();

			renderer = new CSS3DRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);

			const group = new THREE.Group();
			group.add(new Element('a-EgX4AY89E', 0, 0, videoWidth / 2, 0));
			group.add(new Element('nb4A7lsQLg8', videoWidth / 2, 0, 0, Math.PI / 2));
			group.add(new Element('M6jZteQnkE0', 0, 0, - videoWidth / 2, Math.PI));
			group.add(new Element('mIquY-OL_8w', -videoWidth / 2, 0, 0, - Math.PI / 2));

			// group.position.set(0,0,200);
			// camera.lookAt(0,0,200);
			group.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 180) );
			// scene.position.set(0,0,200);
			scene.add(group);
			controls = new TrackballControls(camera, renderer.domElement);
			controls.rotateSpeed = 4;
			controls.minDistance = 500;
			controls.panSpeed = 0.5;
			window.addEventListener('resize', onWindowResize, false);
			controls.position0.set(200,0,0);
			// controls.target.set(0,0,180);
			// Block iframe events when dragging camera

			const blocker = document.getElementById('blocker');
			blocker.style.display = 'none';

			controls.addEventListener('start', function () {
				blocker.style.display = '';
			});
			controls.addEventListener('end', function () {
				blocker.style.display = 'none';
			});

		}

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		function animate() {
			
			controls.update();
			renderer.render(scene, camera);

		let parent = document.getElementById('a-EgX4AY89E').parentElement.parentElement.parentElement
			parent.style.overflow = "visible";
			parent.style.left = "-100px !important";
			
			requestAnimationFrame(animate);
		}