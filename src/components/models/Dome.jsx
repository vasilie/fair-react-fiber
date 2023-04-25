/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import modelPath from "./blender/dome.glb";
import DefaultMaterial from "../materials/DefaultMaterial";

export function Dome(props) {
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0,  - Math.PI / 4]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.geo1001.geometry}
          // material={materials["frame.002"]}
        >
        <DefaultMaterial />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.geo1001_1.geometry}
          material={materials["GLass.001"]}
          transparent={true}
        >
          <meshStandardMaterial
            {...materials["GLass.001"]}
            opacity={0.15} // set the opacity to control the level of transparency
            transparent // set the transparent property to true
          />
        </mesh>
      </group>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.frame}
        scale={[0.7, 7, 0.7]}
      >
        <DefaultMaterial />
      </mesh> */}
    </group>
  );
}

useGLTF.preload(modelPath);
