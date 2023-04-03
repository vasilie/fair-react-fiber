/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import modelPath from "./windmil.glb";
import DefaultMaterial from "../materials/DefaultMaterial";

export function Windmil(props) {
  const group = useRef();
  const blades = React.useRef()
  const { nodes, materials, animations } = useGLTF(modelPath);
  const randomTime = Math.random() * 59;
  const speedFactor = Math.random() * (0.9 - 1.1) + 0.9;
  useFrame(({clock}) => {
    blades.current.rotation.y = clock.getElapsedTime() * speedFactor + randomTime;
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Cylinder"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          position={[0, 0.37, 0]}
          scale={0.37}
        >
          <DefaultMaterial />  
        </mesh>
        <mesh
          name="Cylinder001"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials.Motar}
          position={[0, 6.49, -0.14]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.29, 0.37, 0.29]}
        >
          <DefaultMaterial />  
        </mesh>
        <mesh
          name="Cylinder003"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003.geometry}
          material={materials.Motar}
          position={[0, 6.49, -0.14]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.29, 0.37, 0.29]}
          ref={blades}
          >
          <DefaultMaterial />  
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/windmil.glb");