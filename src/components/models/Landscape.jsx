/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import modelPath from "./Landscape.glb";
import DefaultMaterial from "../materials/DefaultMaterial";

export function Landscape(props) {
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Landscape.geometry}
        material={materials.Frame}
      >
        <DefaultMaterial />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Landscape.glb");