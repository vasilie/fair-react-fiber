import { useRef, useState } from 'react'
import {useFrame } from '@react-three/fiber'
import PropTypes from "prop-types";
import { getAngleFromLengthAndRadius, toRadians } from '../lib/helpers/math';

function Sector({innerRadius, outerRadius,angle, length, ...props}) {

  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const colors = [
    "#FABB2A",
    "#FA9236",
    "#333",
    "white",
  ];
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh {...props}
      receiveShadow    
      ref={ref}
      scale={props.clickable && clicked ? 1 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <ringGeometry
        args={[innerRadius, outerRadius, 50 ,1, toRadians(angle) -toRadians(135), toRadians(getAngleFromLengthAndRadius(length, innerRadius))]}
      />
      <meshStandardMaterial roughness={0.7} metalness={1} color={(props.clickable && hovered)? colors[Math.floor(Math.random()* colors.length )] : props.color}></meshStandardMaterial>
    </mesh>
  )
}

Sector.defaultProps = {
  size: [1, 1, 1],
  metalness: 0.7,
  roughness: 0.4,
  innerRadius: 8,
}

Sector.propTypes = {
  size: PropTypes.array,
  metalness: PropTypes.number,
  roughness: PropTypes.number,
  innerRadius: PropTypes.number,
}

export default Sector;