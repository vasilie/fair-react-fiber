import { Suspense } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls,  Stage, Environment, AccumulativeShadows, RandomizedLight, Line} from '@react-three/drei'
import './index.css';
import Box from "./components/Box";
import { Dome } from "./components/models/Dome";
import { generateCubes, generateCurvedLinePoints } from './lib/helpers/sceneGeneration';
// const radians = angleInDegrees * Math.PI / 180

import { dummyData } from './lib/helpers/dummyData';
import { CircleGeometry } from 'three';
import Sector from './components/Sector';
import { useControls } from 'leva'
import Grid from "../src/components/Grid";
export default function App() {

  // const { sectorAngle } =  useControls({sectorAngle: { value: 0, min: 0, max: 360}});
  const { gridSizeX, gridSizeY, gridSnapAngle, radius } = useControls({
    gridSizeX: {value: 3, min: 1, max: 10 },
    gridSizeY: {value: 4, min: 2, max: 5.35 },
    gridSnapAngle: {value: 45, min:30, max: 180, step: 15},
    radius: {value: 12, min:5, max: 20},
  });

  return (
    <div className="main">
      <Canvas shadows camera={{ position: [0, 10, -17], fov: 80, }} >
        {/* <Grid renderOrder={-1} sectionColor={[0.51, 0.51, 0.41, 0.1]} opacity={0.1} position={[0, 0.01, 0]} infiniteGrid/> */}
        <ambientLight intensity={0.8}  />
        <directionalLight 
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          castShadow
          intensity={0.9}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-camera-right={20}
          shadow-camera-left={-20}
        />
        <Stage intensity={1} environment="city" shadows="contact" adjustCamera={false} />
        {/* <Box renderOrder={0} castShadow clickable size={[2, 2, 2]}  position={[0, 1, 0]} color="#E8E8EB" roughness={0.1} metalness={0.9}/> */}
        <Box size={[150, 0, 150]} roughness={0.7} rotation={[ Math.PI, 0 , 0]} position={[0, 0, 0]} color="white" />
        {/* {cubes.map(cube => <Box castShadow roughness={0.1} metalness={0.9} clickable color="#FFC619" {...cube} />)} */}
        <Suspense fallback={null}> 
          <Grid 
            position = {[0, 0, 0]}
            gridSizeX={gridSizeX}
            gridSizeY={gridSizeY}
            radius={radius}
            snapAngle={gridSnapAngle}
          />
          <Dome position={[0,0,0]} scale={8}></Dome>
        </Suspense>
        <Sector position={[0, 0.003, 0]} rotation={[-Math.PI / 2, 0, 0 * Math.PI / 180]}></Sector>
        <Environment background preset="sunset" blur={0.8} />
        <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault polarAngle={3 * Math.PI /13} minPolarAngle={Math.PI  / 12} maxPolarAngle={Math.PI / 2.01}  />
      </Canvas>
      
    </div>
  )
}
