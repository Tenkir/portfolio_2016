(function() {
  'use strict';

  var camera, scene, renderer, composer, light;
  var canvasElement;

  var boxGroup, object;
  var j = 0, mod=0, delta = Math.PI * 20 / 314;

  init();
  animate();
  function init() {
    var canvasElement = document.getElementById('header');
    renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( canvasElement.clientWidth, canvasElement.clientHeight );
    canvasElement.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 120, canvasElement.clientWidth / canvasElement.clientHeight, 1, 1000 );
    camera.position.set( 0, 0, 4);

    camera.lookAt(new THREE.Vector3(0,0,0));

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, -1, 20 );

    boxGroup = new THREE.Object3D();
    scene.add(boxGroup);

    //var material = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } );
    var material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      shading: THREE.FlatShading,
      wireframe: true
    });
    var geometry = new THREE.CubeGeometry( 0.5, 0.8, 0.75);

    var rx, ry, rz
      , mesh;

    for (var i = 0; i < 315; i++) {
      mesh = new THREE.Mesh(geometry, material);
      j += delta;
      rx = sin( j * 0.7);
      ry = cos( j * 0.3);
      rz = sin( j * 0.2);
      mesh.position.set( rx * 5, ry * 5, rz * 5 );
      rx = sin( (1 + j) * 0.7 );
      ry = cos( (1 + j) * 0.3 );
      rz = sin( (1 + j) * 0.2 );
      mesh.lookAt( v( rx * 5, ry * 5, rz * 5) );
      boxGroup.add( mesh );
    }

    scene.add(new THREE.AmbientLight(0x222222));

    light = new THREE.AmbientLight(0xdddddd);
    light.position.set(10, 10, 10);
    //scene.add(light);

    light = new THREE.HemisphereLight( 0x657a97, 1, 2 );
    scene.add(light);

    light = new THREE.PointLight( 0x272F3B, 1, 10 );
    //scene.add(light);

    renderer.setClearColor(0xa7a8ab, 1.0);
//eeeff3

    window.addEventListener( 'resize', onWindowResize, false );
  }

  function animate() {
    requestAnimationFrame( animate );
    move();
    renderer.render(scene, camera);
  }

  function move() {
    j = 0;
    for(var i=0; i<boxGroup.children.length; i++) {
       var mesh = boxGroup.children[i];
      j += delta;
      var rx = sin( j * 7.7 + mod);
      var ry = cos( j * 1.3 + mod*2);
      var rz = sin( j * 8.2 + mod);
      mesh.position.set( rx * 5, ry * 5, rz * 5 );
      rx = sin( (1 + j) * 0.7 + mod);
      ry = cos( (1 + j) * 0.3 +mod*2);
      rz = sin( (1 + j) * 0.2 +mod);
      mesh.lookAt( v( rx * 5, ry * 5, rz * 5) );
    }
    mod += 0.0003;
  }

  function onWindowResize() {
    camera.aspect = canvasElement.clientWidth / canvasElement.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( canvasElement.clientWidth, canvasElement.clientHeight );
  }

  function onMouseMove() {
    mod += 0.0005;
    console.log('hi');
  }

  function cos( a ){ return Math.cos( a ); }
  function sin( a ){ return Math.sin( a ); }
  function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

  window.onload = function() {
    this.addEventListener( 'mousemove', onMouseMove(), false );

  }
})();
