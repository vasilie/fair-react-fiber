import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Plane, Grid, Stage, Environment, AccumulativeShadows, RandomizedLight, } from '@react-three/drei'
import './index.css';
import Box from "./components/Box";
import { generateCubes } from './lib/helpers/sceneGeneration';
// const radians = angleInDegrees * Math.PI / 180
//import { CompressedPixelFormat } from 'three';

export default function App() {

  const cubes = generateCubes(16,8);

  return (
    <div className="main">
      <Canvas shadows camera={{ position: [-15, 7, 10]}}>
        <Grid renderOrder={-1} sectionColor={[0.21, 0.21, 0.21, 0.2]} opacity={0.1} position={[0, 0.001, 0]} infiniteGrid/>
        <ambientLight intensity={0.3}  />
        <directionalLight position={[10, 10, 10]} angle={0.3} penumbra={0.3} castShadow intensity={0.3}/>
        <Stage intensity={0.1} environment="city" shadows="contact" adjustCamera={false} />
        <Box size={[2, 2, 2]} position={[0, 1, 0]} material-color="#7AF5E2" />
        <Plane castShadow receiveShadow args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} />
        <Environment background preset="sunset" blur={0.8} castShadow/>
        <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault polarAngle={3 * Math.PI /13} minPolarAngle={Math.PI/ 6} maxPolarAngle={Math.PI / 2.01}  />
        {cubes.map(cube => <Box color="#F5C001" {...cube} />)}
      </Canvas>
    </div>
  )
}
