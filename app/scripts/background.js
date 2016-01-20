(function() {
  'use strict';

  var camera, scene, renderer;
  var group = new THREE.Object3D();
  var j = 0, mod=0, delta = Math.PI * 20 / 314;

  init();
  animate();
  function init() {
    var headerEl = document.getElementById('header');
    renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
    renderer.setSize( headerEl.clientWidth, headerEl.clientHeight );
    headerEl.appendChild( renderer.domElement );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 120, headerEl.clientWidth / headerEl.clientHeight, 1, 1000 );
    camera.position.set( 0, 0, 8);

    for( var i = scene.children.length - 1; i >= 0; i--) { }
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000});
    var geometry = new THREE.CubeGeometry( 0.5, 0.5, 0.5 );
    var mesh;
    geometry = new THREE.CubeGeometry( 0.5, 0.8, 0.75);
    material = new THREE.MeshNormalMaterial({ opacity: 0.9 });
    var rx, ry, rz;
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
      group.add( mesh );
    }
    scene.add(group);
  }
  function animate() {
    requestAnimationFrame( animate );
    move();
    renderer.render( scene, camera );
  }

  function move() {
    j = 0;
    for(var i=0; i<group.children.length; i++) {
       var mesh = group.children[i];
      j += delta;
      rx = sin( j * 0.7 + mod);
      ry = cos( j * 0.3 + mod*2);
      rz = sin( j * 0.2 + mod);
      mesh.position.set( rx * 5, ry * 5, rz * 5 );
      rx = sin( (1 + j) * 0.7 + mod);
      ry = cos( (1 + j) * 0.3 +mod*2);
      rz = sin( (1 + j) * 0.2 +mod);
      mesh.lookAt( v( rx * 5, ry * 5, rz * 5) );
    }
    mod += 0.0003;
  }

  function cos( a ){ return Math.cos( a ); }
  function sin( a ){ return Math.sin( a ); }
  function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }
})();
