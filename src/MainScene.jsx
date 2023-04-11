import { Suspense, useRef } from "react";
import { Canvas, extend } from '@react-three/fiber'
import { OrbitControls, Environment, Sky } from '@react-three/drei'
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

extend({ SAOPass });

export default function MainScene() {
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

  return (
    <Canvas shadows camera={{ position: [0, 13, -25], fov: 80, }} >
      <Suspense fallback={null}> 
        <Landscape position={[0, -0.04, 0]} scale={3.8}/>
        {/* Roads */}
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
        <Grid />
        {saoEnabled && <PostProcessing cameraRef={shadowCameraRef}/>} 
        <Dome position={[0,0.07,0]} scale={7}></Dome>
        <Garden />
      </Suspense>
      <Windmil  position={[36, -0.1, 36]}  scale={2} rotation={[0, toRadians(225), 0]}/>
      <Windmil  position={[20, -0.1, 50]}  scale={2} rotation={[0, toRadians(225), 0]}/>
      <Windmil  position={[50, -0.1, 20]}  scale={2} rotation={[0, toRadians(225), 0]}/>
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
      <orthographicCamera ref={shadowCameraRef} shadowMap attach="shadow-camera" args={[-50, 50, 40, -50, 0.1, 130]} />
      </directionalLight>
      <Environment background preset={environmentPreset} blur={1}  />
      <OrbitControls autoRotate={true} maxDistance={50} autoRotateSpeed={0} makeDefault polarAngle={3 * Math.PI /13} minPolarAngle={Math.PI  / 12} maxPolarAngle={Math.PI / 2.01}  />
      <Sky scale={1000} sunPosition={[10, 10, 30]} turbidity={0.1} />
    </Canvas>
  )
}

