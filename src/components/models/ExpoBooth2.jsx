/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import { Instance } from "@react-three/drei";
import * as THREE from "three";

export function ExpoBooth2(props) {
  const ref = useRef();
  useEffect(()=> {
    ref.current.color = new THREE.Color(props.color);
  },[])

  return (
    <group {...props} dispose={null}>
      <Instance ref={ref} castShadow receiveShadow/>
    </group>
  );
}

