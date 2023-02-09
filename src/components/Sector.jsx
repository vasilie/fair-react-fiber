import { useRef, useState } from 'react'
import {useFrame } from '@react-three/fiber'
import PropTypes from "prop-types";

function Sector(props) {


  // Hold state for hovered and clicked events

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh {...props}>
      <ringGeometry
        args={[7.3, 22.3, 50 ,1, 0, Math.PI / 1.4]}
      />
      <meshStandardMaterial roughness={0.7} metalness={1} color="black"></meshStandardMaterial>
    </mesh>
  )
}

Sector.defaultProps = {
  size: [1, 1, 1],
  metalness: 0.7,
  roughness: 0.4,
}

Sector.propTypes = {
  size: PropTypes.array,
}

export default Sector;