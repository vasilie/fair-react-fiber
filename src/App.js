import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Plane, Grid, Stage, Environment, AccumulativeShadows, RandomizedLight, Line} from '@react-three/drei'
import './index.css';
import Box from "./components/Box";
import { generateCubes, generateSectorPath } from './lib/helpers/sceneGeneration';
// const radians = angleInDegrees * Math.PI / 180
//import { CompressedPixelFormat } from 'three';
import { dummyData } from './lib/helpers/dummyData';
import { CircleGeometry } from 'three';
import Sector from './components/Sector';


export default function App() {

  const cubes = generateCubes(16,8);
  const points = generateSectorPath(50, 8);
  const points2 = generateSectorPath(50, 13);
  const points3 = generateSectorPath(50, 21);
  const points4 = [points2[points2.length-1], points[points2.length-1]];
  const points5 = [points[0], points2[0]];

  return (
    <div className="main">
      <Canvas shadows camera={{ position: [-15, 7, 10], fov: 80}} >
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
          shadow-camera-right={10}
          shadow-camera-left={-10}
        />
        <Stage intensity={1} environment="city" shadows="contact" adjustCamera={false} />
        <Box renderOrder={0} castShadow clickable size={[2, 2, 2]}  position={[0, 1, 0]} color="#E8E8EB" roughness={0.1} metalness={0.9}/>
        <Box size={[150, 0, 150]} roughness={0.7} rotation={[Math.PI, 0 , 0]} position={[0, 0, 0]} color="white" />
        {cubes.map(cube => <Box castShadow roughness={0.1} metalness={0.9} clickable color="#FFC619" {...cube} />)}
        <Line points={points} color="#85869E"></Line>     
        <Line points={points2} color="#85869E"></Line> 
        
        <Line points={points3} color="#85869E"></Line>       
        <Line points={points4} color="#85869E"></Line> 
        <Line points={points5} color="#85869E"></Line> 
        <Sector position={[0, 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}></Sector>
        <Environment background preset="sunset" blur={0.8} />
        <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault polarAngle={3 * Math.PI /13} minPolarAngle={Math.PI  / 12} maxPolarAngle={Math.PI / 2.01}  />
       
      </Canvas>
    </div>
  )
}
