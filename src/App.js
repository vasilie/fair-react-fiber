import { Suspense } from "react";
import { Canvas, useFrame,useThree, extend } from '@react-three/fiber'
import { OrbitControls,  Stage, Environment, ContactShadows, RandomizedLight, Line, SoftShadows, Effects, Html} from '@react-three/drei'
import './index.css';
import Box from "./components/Box";
import { Dome } from "./components/models/Dome";
import { generateCubes, generateCurvedLinePoints } from './lib/helpers/sceneGeneration';
// const radians = angleInDegrees * Math.PI / 180
import "./styles.css"
import { dummyData } from './lib/helpers/dummyData';
import { AmbientLight, CircleGeometry } from 'three';
import Sector from './components/Sector';
import { useControls } from 'leva'
import Grid from "../src/components/Grid";
import GridProvider from "./Contexts/GridContext";
import { Lamp } from "./components/models/Lamp";
import { WaterRegion } from "./components/models/WaterRegion";
import { toRadians } from "./lib/helpers/math";
import { getPointOnACircle } from "./lib/helpers/math";
import { SAOPass , SSAOBlurShader } from "three-stdlib"
import { Theatre } from "./components/models/Theatre";
import { Tree1 } from "./components/models/Tree1";
import { Tree2 } from "./components/models/Tree2";
import { Tree3 } from "./components/models/Tree3";
import { Tree4 } from "./components/models/Tree4";
import { Landscape } from "./components/models/Landscape";
import { Windmil } from "./components/models/Windmill";

extend({ SAOPass  });

export default function App() {
  
  // const { sectorAngle } =  useControls({sectorAngle: { value: 0, min: 0, max: 360}});
  const { gridSizeX, gridSizeY, gridSnapAngle, radius } = useControls({
    gridSizeX: {value: 2.09, min: 1, max: 10 },
    gridSizeY: {value: 4.7, min: 2, max: 15.35 },
    gridSnapAngle: {value: 45, min:30, max: 180, step: 15},
    radius: {value: 8.1, min:5, max: 20},
  });

  const gardenMiddleZeroPosition = getPointOnACircle(toRadians(45), radius, 0.1);
  const gardenMovePosition = getPointOnACircle(toRadians(45), radius + 0.8, 0.1);
  const gardenDistanceToMove = [gardenMovePosition[0] - gardenMiddleZeroPosition[0], 0, gardenMovePosition[2] - gardenMiddleZeroPosition[2]];

  

  return (
    <div className="main">
      <Canvas  shadows camera={{ position: [0, 13, -25], fov: 80, }} >

        {/* <Grid renderOrder={-1} sectionColor={[0.51, 0.51, 0.41, 0.1]} opacity={0.1} position={[0, 0.01, 0]} infiniteGrid/> */}
        <directionalLight 
          position={[10, 20, 30]}
          angle={0.4}
          penumbra={1}
          castShadow
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={0.0002}
        >
 
         <orthographicCamera shadowMap attach="shadow-camera" args={[-50, 50, 40, -50, 0.1, 200]} />
        </directionalLight>
        <Stage contactShadow={{ opacity: 1, blur: 0.5 }} intensity={0.1} environment="apartment" shadows="contact" adjustCamera={false} />
        {/* <Box renderOrder={0} castShadow clickable size={[2, 2, 2]}  position={[0, 1, 0]} color="#E8E8EB" roughness={0.1} metalness={0.9}/> */}
        {/* <Box size={[350, 0, 350]} metalness={0.7}  roughness={0.7} rotation={[ Math.PI, 0 , 0]} position={[0, 0, 0]} color="white" /> */}
        {/* {cubes.map(cube => <Box castShadow roughness={0.1} metalness={0.9} clickable color="#FFC619" {...cube} />)} */}

        <Suspense fallback={null}> 
          <Landscape position={[0, -0.1, 0]} scale={2.9}/>
          <GridProvider>
            <Grid 
              position = {[0, 0, 0]}
              gridSizeX={gridSizeX}
              gridSizeY={gridSizeY}
              radius={radius}
              snapAngle={gridSnapAngle}
            />
          </GridProvider>
          <Dome position={[0,0,0]} scale={7}></Dome>
          <group position={gardenDistanceToMove}>
            <WaterRegion position={[0, 0.01, 0]} scale={20} rotation={[0, toRadians(90), 0]}/>
            <Theatre position={[14.3, 0.01, 14.4]} scale={8} rotation={[0, toRadians(45), 0]} />
            {/* <Tree1 position={[7.3, 0.01, 9.4]} scale={17}/> */}
            <Tree2 position={[5.3, 0.01, 12.4]} scale={17}/>
            <Tree3 position={[6.3, 0.01, 10.4]} scale={17}/>
            <Tree3 position={[5.3, 0.01, 18.4]} scale={17}/>
            <Tree2 position={[3.3, 0.01, 18.4]} scale={17}/>
            <Tree1 position={[5.3, 0.01, 20.4]} scale={17}/>
            <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/>
            <group position={[7, 0, -7]}>
              <Tree1 position={[8.3, 0.01, 10.4]} scale={17}/>
              <Tree2 position={[2.3, 0.01, 12.4]} scale={17}/>
              <Tree3 position={[6.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[4.3, 0.01,8.4]} scale={17}/>
              <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/>
            </group>
            <group position={[17, 0, -7]}>
              <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
              <Tree2 position={[0.3, 0.01, 8.4]} scale={17}/>
              <Tree3 position={[6.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[4.3, 0.01,8.4]} scale={17}/>
              <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/>
            </group>
            <group position={[27, 0, -7]}>
              <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
              <Tree2 position={[8.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[6.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              {/* <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/> */}
            </group>
            <group position={[27, 0, 20]}>
              <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
              <Tree2 position={[8.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[6.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              {/* <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/> */}
            </group>
            <group position={[16, 0, 16]}>
              <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
              <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              {/* <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/> */}
            </group>
            <group position={[10, 0, 20]}>
              <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
              <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              {/* <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/> */}
            </group>
            <group position={[32, 0, 0]}>
              <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
              <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              {/* <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/> */}
            </group>
            <group position={[-2, 0, 32]}>
              <Tree1 position={[4.3, 0.01, 8.4]} scale={17}/>
              <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              {/* <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/> */}
            </group>
            <group position={[-2, 0, 20]}>
              <Tree1 position={[9.3, 0.01, 12.4]} scale={17}/>
              <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              <Tree4 position={[5.3, 0.01, 6.4]} scale={17}/>
            </group>
            <group position={[22, 0, 6]}>
              <Tree1 position={[2.3, 0.01, 13.4]} scale={17}/>
              <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
              <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              <Tree4 position={[5.3, 0.01, 6.4]} scale={17}/>
            </group>
            <group position={[36, 0, 8]}>
              <Tree1 position={[2.3, 0.01, 13.4]} scale={17}/>
              <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
              {/* <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/> */}
              <Tree3 position={[3.3, 0.01,6.4]} scale={17}/>
              <Tree4 position={[5.3, 0.01, 3.4]} scale={17}/>
            </group>
            <group position={[26, 0, 22]} >
              <Tree1 position={[2.3, 0.01, 13.4]} scale={17}/>
              <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
            </group>
            <group position={[20, 0, 26]} >
              <Tree1 position={[3.3, 0.01, 13.4]} scale={17}/>
              <Tree2 position={[6.3, 0.01, 11.4]} scale={17}/>
              <Tree2 position={[0.3, 0.01, 13.4]} scale={17}/>
              <Tree3 position={[-2.3, 0.01, 16.4]} scale={17}/>
              <Tree4 position={[-8.3, 0.01, 17.4]} scale={17}/>
            </group>
          </group>
          <fog attach="fog" args={['white', 190, 200]} />
        </Suspense>
        <color attach="background" args={['white']} />
        
        <hemisphereLight color="white"  position={[-7, 25, 13]} intensity={0.14} />
        {/* <ambientLight castShadow  color="white" intensity={0.2}/> */}
        {/* <Environment background preset="apartment" blur={1}  /> */}
        <Scene /> 
       
        <Windmil  position={[36, -0.1, 36]}  scale={2} rotation={[0, toRadians(225), 0]}/>
        <Windmil  position={[20, -0.1, 50]}  scale={2} rotation={[0, toRadians(225), 0]}/>
        <Windmil  position={[50, -0.1, 20]}  scale={2} rotation={[0, toRadians(225), 0]}/>
        {/* <Line color="purple" points={[[0,1,0], [gardenMovePosition[0],1,gardenMovePosition[2]]]}></Line> */}
        <OrbitControls autoRotate autoRotateSpeed={0.05} makeDefault polarAngle={3 * Math.PI /13} minPolarAngle={Math.PI  / 12} maxPolarAngle={Math.PI / 2.01}  />
      </Canvas>
      
    </div>
  )
}

function Scene() {
  const { size, scene, camera } = useThree();
  return (
    <>
        <Effects multisamping={8} renderIndex={10} disableGamma={false} disableRenderPass={false} disableRender={false}>
          <sAOPass args={[scene, camera]} params={{
            output: 1,
            saoBias: 0.2, // Set the SAO bias here
            saoIntensity: 1.5,
            saoScale: 200,
            saoKernelRadius: 100,
            saoMinResolution: 0,
            saoBlur: true,
            saoBlurRadius: 8,
            saoBlurStdDev: 4,
            saoBlurDepthCutoff: 0.01,
          }}/>
  
        </Effects>
    </>
  )
}