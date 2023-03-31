/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect, useState } from "react";
import { Instance, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ExpoBooth2(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);

  useFrame(()=> {
    ref.current.color = hovered ? new THREE.Color("gray") : new THREE.Color("white");
  },[])

  return (
    <group {...props} dispose={null}>
      {hovered && <Html>
        <div className="content" >
          <div className="name">{props.label}</div>
          <div className="sector">{props.sectorId}</div>
        </div>
        </Html>}
      <Instance ref={ref} castShadow receiveShadow
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      />
    </group>
  );
}

