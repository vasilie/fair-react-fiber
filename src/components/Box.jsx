import { useRef, useState } from 'react'
import {useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei';
import PropTypes from "prop-types";
function Box(props) {

  const { size, color, metalness, roughness } = props;
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      receiveShadow    
      ref={ref}
      scale={props.clickable && clicked ? 1 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={size} />
      <Html >
        <div class="content">
          hello <br />
          world
        </div>
      </Html>
      <meshStandardMaterial metalness={metalness} roughness={roughness} color={(props.clickable && hovered)? "#E0167E" : props.color} />
    </mesh>
  )
}

Box.defaultProps = {
  size: [1, 1, 1],
  metalness: 0.7,
  roughness: 0.4,
}

Box.propTypes = {
  size: PropTypes.array,
}

export default Box;