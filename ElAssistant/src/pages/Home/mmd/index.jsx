import * as THREE from 'three';
import {useEffect,useRef} from 'react'
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper.js';
export default function MMD() {
    const mmd = useRef()
  useEffect(()=>{
    let mesh, camera, scene, renderer, effect;
    let helper, ikHelper, physicsHelper;

    const clock = new THREE.Clock();
        init();
        animate();
    function init() {
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
      camera.position.z = 30;

      // scene

      scene = new THREE.Scene();
    //极坐标辅助器
    //   const gridHelper = new THREE.PolarGridHelper( 30, 0 );
    //   gridHelper.position.y = - 10;
    //   scene.add( gridHelper );

      const ambient = new THREE.AmbientLight( 0xaaaaaa, 3 );
      scene.add( ambient );

      const directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
      directionalLight.position.set( - 1, 1, 1 ).normalize();
      scene.add( directionalLight );

      //

      renderer = new THREE.WebGLRenderer( { antialias: true,alpha: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setClearColor(0x000000, 0);
      mmd.current.appendChild( renderer.domElement );

      effect = new OutlineEffect( renderer );


      // model

      function onProgress( xhr ) {

        if ( xhr.lengthComputable ) {

          const percentComplete = xhr.loaded / xhr.total * 100;
          console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

        }

      }



      helper = new MMDAnimationHelper( {
        afterglow: 2.0
      } );

      const loader = new MMDLoader();
      const modelFile = import.meta.env.BASE_URL+'./miku/miku_v2.pmd'
      const vmdFiles = import.meta.env.BASE_URL+'./vmds/wavefile_v2.vmd'
      loader.loadWithAnimation( modelFile, vmdFiles, function ( mmd ) {

        mesh = mmd.mesh;
        mesh.position.y = - 10;
        scene.add( mesh );

        helper.add( mesh, {
          animation: mmd.animation,
          physics: true
        } );

        ikHelper = helper.objects.get( mesh ).ikSolver.createHelper();
        ikHelper.visible = false;
        scene.add( ikHelper );

        physicsHelper = helper.objects.get( mesh ).physics.createHelper();
        physicsHelper.visible = false;
        scene.add( physicsHelper );

        initGui();

      }, onProgress, null );

      const controls = new OrbitControls( camera, renderer.domElement );
      controls.minDistance = 10;
      controls.maxDistance = 100;

      window.addEventListener( 'resize', onWindowResize );

      function initGui() {

        const api = {
          'animation': true,
          'ik': true,
          'outline': true,
          'physics': true,
          'show IK bones': false,
          'show rigid bodies': false
        };

        // const gui = new GUI();

        // gui.add( api, 'animation' ).onChange( function () {

        //   helper.enable( 'animation', api[ 'animation' ] );

        // } );

        // gui.add( api, 'ik' ).onChange( function () {

        //   helper.enable( 'ik', api[ 'ik' ] );

        // } );

        // gui.add( api, 'outline' ).onChange( function () {

        //   effect.enabled = api[ 'outline' ];

        // } );

        // gui.add( api, 'physics' ).onChange( function () {

        //   helper.enable( 'physics', api[ 'physics' ] );

        // } );

        // gui.add( api, 'show IK bones' ).onChange( function () {

        //   ikHelper.visible = api[ 'show IK bones' ];

        // } );

        // gui.add( api, 'show rigid bodies' ).onChange( function () {

        //   if ( physicsHelper !== undefined ) physicsHelper.visible = api[ 'show rigid bodies' ];

        // } );

      }

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      effect.setSize( window.innerWidth, window.innerHeight );

    }

    //

    function animate() {

      requestAnimationFrame( animate );
      render();

    }

    function render() {

      helper.update( clock.getDelta() );
      effect.render( scene, camera );

    }

			
  },[])
  return (
    <div ref={mmd} className='mmd'></div>
  )
}
