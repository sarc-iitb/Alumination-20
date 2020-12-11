import * as THREE from '../three.js/build/three.module.js';
THREE.Cache.enabled = true;

		import { TWEEN } from '../three.js/examples/jsm/libs/tween.module.min.js';
		import { TrackballControls } from '../three.js/examples/jsm/controls/TrackballControls.js';
		import { CSS3DRenderer, CSS3DObject } from '../three.js/examples/jsm/renderers/CSS3DRenderer.js';

		const table = ["Back (RED).svg", "Back (White).svg", "Clubs 2.svg", "Clubs 3.svg", "Clubs 4.svg", "Clubs 5.svg", "Clubs 6.svg", "Clubs 7.svg", "Clubs 8.svg", "Clubs 9.svg", "Clubs 10.svg", "Clubs A.svg", "Diamond 2.svg", "Diamond 3.svg", "Diamond 4.svg", "Diamond 5.svg", "Diamond 6.svg", "Diamond 7.svg", "Diamond 8.svg", "Diamond 9.svg", "Diamond 10.svg", "Diamond A.svg", "Hearts 2.svg", "Hearts 3.svg", "Hearts 4.svg", "Hearts 5.svg", "Hearts 6.svg", "Hearts 7.svg", "Hearts 8.svg", "Hearts 9.svg", "Hearts 10.svg", "Hearts A.svg", "J.svg", "K.svg", "Q.svg", "Spade 2.svg", "Spade 3.svg", "Spade 4.svg", "Spade 5.svg", "Spade 6.svg", "Spade 7.svg", "Spade 8.svg", "Spade 9.svg", "Spade 10.svg", "Spade A.svg"];
		
		let camera, scene, renderer, cameraTarget;
		let textGeo, textMesh1, textMesh2, materials, group;
		let controls;
		var is_random_falling = 1;
		const objects = [];
		const targets = { table: [], sphere: [], helix: [], grid: [], random: [] };

		init();
		animate(targets.random);

		function init() {

			camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
			// camera.position.z = 3000;
			camera.position.set( 0, 400, 700 );

			cameraTarget = new THREE.Vector3( 0, 150, 0 );

			scene = new THREE.Scene();
			// initText();

			// table

			const k = 3;
			for (let i = 0; i < k*table.length; i += 1) {

				const element = document.createElement('div');
				element.className = 'element';
				element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';

				const details = document.createElement('img');
				details.className = 'front_image';
				// if i%5
				if(i<(k-3)*table.length)
				details.setAttribute('src', "/static/Cards/"+table[i%table.length]);
				else if (i<(k-2)*table.length)
					details.setAttribute('src', "/static/Cards/J.svg");
				else if (i<(k-1)*table.length)
					details.setAttribute('src', "/static/Cards/K.svg");
				else if (i<k*table.length)
					details.setAttribute('src', "/static/Cards/Q.svg");
				
				// details.attr('src', );
				
				element.appendChild(details);
				
				// const details = document.createElement('div');
				// details.className = 'details';
				// details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
				// element.appendChild(details);

				const objectCSS = new CSS3DObject(element);
				objectCSS.position.x = Math.random() * 4000 - 2000;
				objectCSS.position.y = Math.random() * 4000 - 2000;
				objectCSS.position.z = Math.random() * 4000 - 2000;

				objectCSS.velocity = new THREE.Vector3(0, 0, 0);
				objectCSS.acceleration = new THREE.Vector3(0, 0.02, 0);
				scene.add(objectCSS);

				objects.push(objectCSS);

				//

				let object = new THREE.Object3D();
				// object.position.x = ( table[ i + 3 ] * 140 ) - 1330;
				// object.position.y = - ( table[ i + 4 ] * 180 ) + 990;

				// targets.table.push( object );

				object.position.x = Math.random() * 4000 - 2000;
				object.position.y = Math.random() * 4000 - 2000;
				object.position.z = Math.random() * 4000 - 2000;
				targets.random.push(object);
			}

			// sphere

			const vector = new THREE.Vector3();

			for (let i = 0, l = objects.length; i < l; i++) {

				const phi = Math.acos(- 1 + (2 * i) / l);
				const theta = Math.sqrt(l * Math.PI) * phi;

				const object = new THREE.Object3D();

				object.position.setFromSphericalCoords(800, phi, theta);

				vector.copy(object.position).multiplyScalar(0);

				object.lookAt(new THREE.Vector3(0,100,0));

				targets.sphere.push(object);

			}

			// helix

			for (let i = 0, l = objects.length; i < l; i++) {

				const theta = i * 0.175 + Math.PI;
				const y = - (i * 8) + 750;

				const object = new THREE.Object3D();

				object.position.setFromCylindricalCoords(1500, theta, y);

				vector.x = object.position.x * 2;
				vector.y = object.position.y;
				vector.z = object.position.z * 2;

				object.lookAt(vector);

				targets.helix.push(object);

			}

			// grid

			for (let i = 0; i < objects.length; i++) {

				const object = new THREE.Object3D();

				object.position.x = ((i % 5) * 400) - 800;
				object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
				object.position.z = (Math.floor(i / 25)) * 1000 - 2000;

				targets.grid.push(object);

			}
			// Alumination
			// const textGeometry = new THREE.TextGeometry("ALUMINATION 2020");
			// scene.add(textGeometry);

			//

			renderer = new CSS3DRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.getElementById('back_container').appendChild(renderer.domElement);

			//

			controls = new TrackballControls(camera, renderer.domElement);
			controls.minDistance = 300;
			controls.maxDistance = 3000;
			controls.addEventListener('change', render);

			// const buttonTable = document.getElementById( 'table' );
			// buttonTable.addEventListener( 'click', function () {

			// 	transform( targets.table, 2000 );

			// }, false );
			document.addEventListener('keypress',onDocumentKeyPress,false);

			function onDocumentKeyPress( event ) {
					console.info("PRESSED SOME KEY", event.which);
					const keyCode = event.which;
					if ( keyCode == 75 || keyCode == 107) {
						// keys - S or s
						is_random_falling = 0;
						transform(targets.sphere, 2000);	
					} 
					else if ( keyCode == 65 || keyCode == 97){
						// keys - A or a
						is_random_falling = 0;
						transform(targets.helix, 2000);
					}
					else if ( keyCode == 81 || keyCode == 113){
						// keys - D or d
						is_random_falling = 0;
						transform(targets.grid, 2000);
					}
					else if ( keyCode == 74 || keyCode == 106){
						// keys - W or w
						is_random_falling = 1;
						transform(targets.random, 2000);
					}
					else{
						console.info("NO Relevant Key Pressed");
					}
				}
	
			// const buttonRandom = document.getElementById('table');
			// buttonRandom.addEventListener('click', function () {
			// 	is_random_falling = 1;
			// 	transform(targets.random, 2000);

			// }, false);

			// const buttonSphere = document.getElementById('sphere');
			// buttonSphere.addEventListener('click', function () {
			// 	is_random_falling = 0;
			// 	transform(targets.sphere, 2000);

			// }, false);

			// const buttonHelix = document.getElementById('helix');
			// buttonHelix.addEventListener('click', function () {
			// 	is_random_falling = 0;
			// 	transform(targets.helix, 2000);

			// }, false);

			// const buttonGrid = document.getElementById('grid');
			// buttonGrid.addEventListener('click', function () {
			// 	is_random_falling = 0;
			// 	transform(targets.grid, 2000);

			// }, false);

			// transform( targets.table, 2000 );
			transform(targets.random, 2000);

			//

			window.addEventListener('resize', onWindowResize, false);

		}

		function transform(targets, duration) {

			TWEEN.removeAll();

			for (let i = 0; i < objects.length; i++) {

				const object = objects[i];
				const target = targets[i];

				new TWEEN.Tween(object.position)
					.to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
					.easing(TWEEN.Easing.Exponential.InOut)
					.start();

				new TWEEN.Tween(object.rotation)
					.to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
					.easing(TWEEN.Easing.Exponential.InOut)
					.start();

			}

			new TWEEN.Tween(this)
				.to({}, duration * 2)
				.onUpdate(render)
				.start();

		}

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);

			render();

		}
		var count = 0;
		function animate(targets) {

			requestAnimationFrame(animate);
			// controls.update();
			render();
			if (is_random_falling) {
				for (let i = 0; i < objects.length; i++) {
					const object = objects[i];
					const target = targets[i];

					// 
					try {
						if (object === undefined)
							throw new Error(target);
						// count++;
						object.velocity.y += object.acceleration.y;
						object.position.y -= object.velocity.y;
						if (object.position.y < -2000) {
							count++;
							object.position.y = 500 + Math.random()*1500;
							object.velocity.y = 0;
						}
					}
					catch (error) {
						console.log(error)
					}
				}
			}
			controls.update();
			TWEEN.update();
			// console.log(count);
		}

		function render() {

			camera.lookAt( new THREE.Vector3(0,200,0) );
			renderer.render(scene, camera);
			// controls.update();
		}
