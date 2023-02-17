/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import modelPath from "./dome.glb";

export function Dome(props) {
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.geo1001.geometry}
          material={materials["frame.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.geo1001_1.geometry}
          material={materials["GLass.001"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.frame}
        scale={[1, 7, 1]}
      />
    </group>
  );
}

useGLTF.preload("dome.glb");