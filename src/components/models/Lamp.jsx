
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import modelPath from "./StreetLight_02.glb";
export function Lamp(props) {
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.geo1.geometry}
        material={materials.Frame}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.geo1_1.geometry}
        material={materials.Bulb}
      />
    </group>
  );
}

useGLTF.preload("/StreetLight_02.glb");