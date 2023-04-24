import { Suspense, useRef, useState, useEffect, useContext, memo } from "react";
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Sky, Text, Box, PerspectiveCamera, Html, BakeShadows } from '@react-three/drei'
import { useSpring, animated } from "@react-spring/three";
import './index.css';
import { Dome } from "./components/models/Dome";
import "./styles.css"
import * as THREE from 'three';
import { useControls, folder } from 'leva'
import Grid from "../src/components/Grid";
import { toRadians } from "./lib/helpers/math";
import { SAOPass } from "three-stdlib"
import { Landscape } from "./components/models/Landscape";
import { Windmil } from "./components/models/Windmill";
import Garden from "./components/Garden";
import PostProcessing from "./components/PostProcessing";
import Quadrants from "./components/Quadrants";
import GridScene from "./components/GridScene";
import { GridContext } from "./Contexts/GridContext";
import { PREVIEW_STATES } from "./lib/consts/states";
import { Theatre } from "./components/models/Theatre";

extend({ SAOPass });

const MainScene = memo(function MainScene(){
  const hemisphereColor = new THREE.Color();
  const hemisphereGroundColor = new THREE.Color();
  hemisphereColor.setHSL( 0.6, 1, 0.6 ); 
  hemisphereGroundColor.setHSL( 0.095, 1, 0.75 ); 


  const { ambientColor, ambientIntensity, saoEnabled, dirColor, dirIntensity, environmentPreset } = useControls({
    "SAO Pass": folder({
      saoEnabled: true,
    }),
    "Lights": folder({
      dirColor: "#fffbb4",
      dirIntensity: {value: 0.8, min: 0, max: 2},
      ambientColor: "#29add6",
      ambientIntensity: {value: 0.1, min: 0, max: 1},
      environmentPreset: {
        value: 'sunset',
        options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      }
    })
  });

  const shadowCameraRef = useRef();
  const radius = 8.1;
  const orbitControlsCameraRef = useRef();
  const orbitControlsRef = useRef();

  // const getNewCameraPosition = (clickedBuildingPosition) => {
  //   const distance = 5; // Change this value according to your desired camera distance from the building
  //   const offset = new THREE.Vector3(0, distance, distance);
  //   return clickedBuildingPosition;
  // }

  // const cameraSpring = useSpring({
  //   position: clickedBuildingPosition
  //     ? getNewCameraPosition(clickedBuildingPosition)
  //     : [0, 0, 0], // Default camera position
  //   target: clickedBuildingPosition
  //     ? clickedBuildingPosition
  //     : [0, 0, 0], // Default camera target
  //   config: { mass: 1, tension: 170, friction: 50 },
  // });


  return (
    <Canvas shadows camera={{ position: [0, 13, -25], fov: 80, }} >
      <group rotation={[0, toRadians(0), 0]}>
        <Quadrants />
        <mesh
          receiveShadow    
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, 0]}
          >
          <ringGeometry
            args={[radius, radius  + 37.6, 120 ,1, toRadians(-3) , toRadians(276)]}
          />
          <meshStandardMaterial roughness={0.8} metalness={1} color={"#f4f3f4"}></meshStandardMaterial>
        </mesh>
        <mesh
          receiveShadow    
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, 0]}
        >
          <ringGeometry
            args={[radius, radius  + 2, 50 ,1, toRadians(-87) , toRadians(84)]}
          />
          <meshStandardMaterial roughness={0.8} metalness={1} color={"#f4f3f4"}></meshStandardMaterial>
        </mesh>
        <Suspense fallback={null}> 
        <GridScene />
        {/* <Grid handleBuildingClick={handleBuildingClick} /> */}
        {saoEnabled && <PostProcessing cameraRef={shadowCameraRef}/>} 
        <Dome position={[22,0.07,22]} scale={14}></Dome>
        <Text position={[-2.59,-0.08, -0.33]} rotation={[0,toRadians(45),0]} color="#c0c0c0" scale={0.021}>Psst kid, wanna buy some frames?</Text>
        <Theatre position={[0, -0.1, 0]} scale={10} rotation={[0, toRadians(45), 0]} />
        <Garden />
        <BakeShadows />
      </Suspense>
      </group>
      <Landscape position={[0, -0.04, 0]} scale={3.8}/>
      <Windmil  position={[-26, 5.1, -176]}  scale={4} rotation={[0, toRadians(225 + 180), 0]}/>
      <Windmil  position={[-180, 5.1, -50]}  scale={4} rotation={[0, toRadians(225 + 180), 0]}/>
      <Windmil  position={[-90, 5.1, -150]}  scale={4} rotation={[0, toRadians(225 + 180), 0]}/>
      <hemisphereLight color={hemisphereColor}  groundColor={hemisphereGroundColor} position={[-7, 25, 13]} intensity={0.5} />
      <ambientLight color={ambientColor} intensity={ambientIntensity}/>
      <directionalLight 
        position={[10, 60, 50]}
        angle={0.3}
        penumbra={1}
        castShadow
        intensity={dirIntensity}
        color={dirColor}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.00001}
      >
      <orthographicCamera fov={80} ref={shadowCameraRef} shadowMap attach="shadow-camera" args={[-50, 50, 40, -50, 0.1, 130]} />
      </directionalLight>
      <Environment background preset={environmentPreset} blur={1}  />
      <Controls />
      <Sky scale={1000} sunPosition={[10, 10, 30]} turbidity={0.1} />
    </Canvas>
  )
});

function Controls() {
  const { gl, camera } = useThree();
  const animatedCameraRef = useRef();
  const { clickedPosition, cameraPosition, previewState, setPreviewState } = useContext(GridContext);
  const isDomePreview = previewState === PREVIEW_STATES.DOME;
  console.log(camera.position.x);
  const [springs, api] = useSpring(
    () => ({
      from: {
        position: [camera.position.x, camera.position.y, camera.position.z],
      },
      to: {
        position: isDomePreview ? [0, 13, -25] : cameraPosition,
        target: isDomePreview ? [0, 0, 0] : clickedPosition,
      },
      config: {
        mass: 1, 
        tension: 100, 
        friction: 20,
        precision: 0.001,
      },
      reset: true,
    }),
    [previewState]
  );

  
  const AnimatedBox = animated(Box);
  const AnimatedCamera = animated(PerspectiveCamera);
  const AnimatedOrbitControls = animated(OrbitControls);
  return (
    <>
    
    {/* <AnimatedBox material-color="red" position={springs.target.to((x, y, z) => [x, y, z])} /> */}
    <AnimatedCamera ref={animatedCameraRef} fov={80} makeDefault position={springs.position} />
    <AnimatedOrbitControls
    enableDamping
    dampingFactor={0.1}
    rotateSpeed={0.5}
    args={[camera, gl.domElement]}
    autoRotate={true}
    maxDistance={70}
    autoRotateSpeed={0}
    target={springs.target.to((x, y, z) => [x, y, z])}
    makeDefault
    enableRotate={isDomePreview}
    enablePan={isDomePreview}
    polarAngle={3 * Math.PI /13 }
    minPolarAngle={isDomePreview ? Math.PI  / 12 : Math.PI  / 24}
    maxPolarAngle={isDomePreview ? Math.PI / 2.01 : Math.PI }  />
    
  </>
    
  )
}

export default MainScene;