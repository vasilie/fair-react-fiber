import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Plane, Grid, Stage, Environment, AccumulativeShadows, RandomizedLight} from '@react-three/drei'
import './index.css';
import Box from "./components/Box";
import { generateCubes } from './lib/helpers/sceneGeneration';
// const radians = angleInDegrees * Math.PI / 180
//import { CompressedPixelFormat } from 'three';

export default function App() {

  const cubes = generateCubes(16,8);

  return (
    <div className="main">
      <Canvas shadows camera={{ position: [-15, 7, 10]}} >
        {/* <Grid renderOrder={-1} sectionColor={[0.51, 0.51, 0.41, 0.1]} opacity={0.1} position={[0, 0.01, 0]} infiniteGrid/> */}
        <ambientLight intensity={0.8}  />
        <directionalLight 
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          castShadow
          intensity={1}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-camera-right={10}
          shadow-camera-left={-10}
        />
        <Stage intensity={1} environment="city" shadows="contact" adjustCamera={false} />
        <Box castShadow clickable size={[2, 2, 2]}  position={[0, 1, 0]} color="white" roughness={0.1} metalness={0.9}/>
        <Box size={[150, 0, 150]} roughness={0.9} rotation={[180 * Math.PI / 180, 0 , 0]} position={[0, 0, 0]} color="white" />
        {cubes.map(cube => <Box castShadow roughness={0.1} metalness={0.9} clickable color="#F5C001" {...cube} />)}
        <Environment background preset="sunset" blur={0.8} />
        <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault polarAngle={3 * Math.PI /13} minPolarAngle={Math.PI/ 6} maxPolarAngle={Math.PI / 2.01}  />
       
      </Canvas>
    </div>
  )
}
