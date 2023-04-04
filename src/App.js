import { Suspense, useContext, useState, useTransition, useRef } from "react";
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls,  Stage, Environment, ContactShadows, RandomizedLight, Line, BakeShadows, Effects, Html, Sky, useHelper, Cloud} from '@react-three/drei'
import './index.css';
import Box from "./components/Box";
import { Dome } from "./components/models/Dome";
import { generateCubes, generateCurvedLinePoints } from './lib/helpers/sceneGeneration';
// const radians = angleInDegrees * Math.PI / 180
import "./styles.css"
import { dummyData } from './lib/helpers/dummyData';
import { AmbientLight, CircleGeometry,  CameraHelper } from 'three';
import * as THREE from 'three';
import Sector from './components/Sector';
import { useControls, folder } from 'leva'
import Grid from "../src/components/Grid";
import GridProvider, { GridContext } from "./Contexts/GridContext";
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

extend({ SAOPass });

export default function App() {
  const hemisphereColor = new THREE.Color();
  const hemisphereGroundColor = new THREE.Color();
  hemisphereColor.setHSL( 0.6, 1, 0.6 ); 
  hemisphereGroundColor.setHSL( 0.095, 1, 0.75 ); 
  const [envPreset, setPreset] = useState('sunset');
  // const { sectorAngle } =  useControls({sectorAngle: { value: 0, min: 0, max: 360}});
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
        // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
        // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
        // That way we can hang onto the current environment until the new one has finished loading ...
      }
    })
  });

  const shadowCameraRef = useRef();
  const radius = 8.1;

  const gardenMiddleZeroPosition = getPointOnACircle(toRadians(45), radius, 0.1);
  const gardenMovePosition = getPointOnACircle(toRadians(45), radius + 0.8, 0.1);
  const gardenDistanceToMove = [gardenMovePosition[0] - gardenMiddleZeroPosition[0], 0, gardenMovePosition[2] - gardenMiddleZeroPosition[2]];

  

  return (
    <div className="main">
      <GridProvider>
        <Canvas  shadows camera={{ position: [0, 13, -25], fov: 80, }} >
          {/* <Grid renderOrder={-1} sectionColor={[0.51, 0.51, 0.41, 0.1]} opacity={0.1} position={[0, 0.01, 0]} infiniteGrid/> */}
    
          
          {/* <Box renderOrder={0} castShadow clickable size={[2, 2, 2]}  position={[0, 1, 0]} color="#E8E8EB" roughness={0.1} metalness={0.9}/> */}
          {/* <Box size={[350, 0, 350]} metalness={0.7}  roughness={0.7} rotation={[ Math.PI, 0 , 0]} position={[0, 0, 0]} color="white" /> */}
          {/* {cubes.map(cube => <Box castShadow roughness={0.1} metalness={0.9} clickable color="#FFC619" {...cube} />)} */}

          <Suspense fallback={null}> 
            <Landscape position={[0, -0.04, 0]} scale={3.8}/>
            {/* <Stage adjustCamera={false} intensity={0.0000001} shadows="accumulative" > */}
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
            </mesh>            <mesh
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
                {saoEnabled && <Scene cameraRef={shadowCameraRef}/>} 
            {/* </Stage> */}
            
            <Dome position={[0,0.07,0]} scale={7}></Dome>
            <group position={gardenDistanceToMove}>
              <WaterRegion position={[0, 0.01, 0]} scale={20} rotation={[0, toRadians(90), 0]}/>
              <Theatre position={[14.3, 0.01, 14.4]} scale={8} rotation={[0, toRadians(45), 0]} />
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
              </group>
              <group position={[27, 0, 20]}>
                <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
                <Tree2 position={[8.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[6.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              </group>
              <group position={[16, 0, 16]}>
                <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
                <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              </group>
              <group position={[10, 0, 20]}>
                <Tree1 position={[11.3, 0.01, 6.4]} scale={17}/>
                <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              </group>
              <group position={[32, 0, 0]}>
                <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
                <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
              </group>
              <group position={[-2, 0, 32]}>
                <Tree1 position={[4.3, 0.01, 8.4]} scale={17}/>
                <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
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
                <Tree2 position={[5.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
                <Tree3 position={[5.3, 0.01,8.4]} scale={17}/>
                <Tree4 position={[5.3, 0.01, 6.4]} scale={17}/>
              </group>
              <group position={[36, 0, 8]}>
                <Tree1 position={[2.3, 0.01, 13.4]} scale={17}/>
                <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
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
          </Suspense>
          <Windmil  position={[36, -0.1, 36]}  scale={2} rotation={[0, toRadians(225), 0]}/>
          <Windmil  position={[20, -0.1, 50]}  scale={2} rotation={[0, toRadians(225), 0]}/>
          <Windmil  position={[50, -0.1, 20]}  scale={2} rotation={[0, toRadians(225), 0]}/>
          {/* <Line color="purple" points={[[0,1,0], [gardenMovePosition[0],1,gardenMovePosition[2]]]}></Line> */}
          
          {/* <color attach="background" args={['white']} /> */}

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
          <OrbitControls autoRotate={true} maxDistance={50} autoRotateSpeed={0.05} makeDefault polarAngle={3 * Math.PI /13} minPolarAngle={Math.PI  / 12} maxPolarAngle={Math.PI / 2.01}  />
          <Sky scale={1000} sunPosition={[10, 10, 30]} turbidity={0.1} />
        
        </Canvas>
      </GridProvider>
    </div>
  )
}

function Scene({cameraRef}) {
  const { size, scene, camera } = useThree();
  const {saoBias, saoIntensity, saoScale, saoKernelRadius, saoMinResolution, saoBlur, saoBlurRadius, saoBlurStdDev, saoBlurDepthCutoff } = useControls("SAO Pass",{
    saoBias: {value: 0.06, min: 0, max: 2 }, // Set the SAO bias here
    saoIntensity: {value: 0.02, min: 0, max: 2 },
    saoScale: {value: 100, min: 0, max:100 },
    saoKernelRadius: {value: 27, min: 0, max:100 },
    saoMinResolution: {value: 0.00001, min: 0, max:2 },
    saoBlur: true,
    saoBlurRadius: {value: 4, min: 0, max:200 },
    saoBlurStdDev: {value: 2, min: 0, max:200 },
    saoBlurDepthCutoff:{value: 0.65, min: 0, max:5 },
  });
  //useHelper(cameraRef, CameraHelper);
  const {isSceneGenerated, rotateCamera} = useContext(GridContext);
  return (
    <>
        <Effects multisamping={8} renderIndex={10} disableGamma={false} disableRenderPass={false} disableRender={false}>
          <sAOPass args={[scene, camera]} params={{
            output:  0,
            saoBias: saoBias, // Set the SAO bias here
            saoIntensity: saoIntensity,
            saoScale: saoScale,
            saoKernelRadius:saoKernelRadius,
            saoMinResolution:saoMinResolution,
            saoBlur: saoBlur,
            saoBlurRadius: saoBlurRadius,
            saoBlurStdDev: saoBlurStdDev,
            saoBlurDepthCutoff: saoBlurDepthCutoff,
          }}/>
          {/* {isSceneGenerated && <BakeShadows />} */}
        </Effects>
    </>
  )
}