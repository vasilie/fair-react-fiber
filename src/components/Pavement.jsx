import PropTypes from "prop-types";
import * as THREE from 'three';
import { getAngleFromLengthAndRadius, getPointOnACircle, toRadians } from '../lib/helpers/math';
import { Line } from "@react-three/drei";
import { useContext } from "react";
import { GridContext } from "../Contexts/GridContext";

const Pavement = (props) => {
  const {startingAngle, segmentThetaAngle, radius} = props;
  
  const { gridSizeY, debugGrid } = useContext(GridContext);

  const extrudeSettings = {
    steps: 4,
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelOffset: -0.01,
    bevelSegments: 8
  };

  const shape = new THREE.Shape();

  let innerRadius = radius;
  let outerRadius = radius + gridSizeY - 1;
  
  const offsetAngle = -135;
  const bevelOffset = 1;
  const innerBevelOffsetAnle = getAngleFromLengthAndRadius(bevelOffset, innerRadius + bevelOffset);
  const outerBevelOffsetAnle = getAngleFromLengthAndRadius(bevelOffset, outerRadius - bevelOffset);

  const pointA = getPointOnACircle(toRadians(-startingAngle), innerRadius, 0);
  const pointB = getPointOnACircle(toRadians(-startingAngle - segmentThetaAngle), innerRadius, 0);
  const pointC = getPointOnACircle(toRadians(-startingAngle - segmentThetaAngle), outerRadius, 0);
  const pointD = getPointOnACircle(toRadians(-startingAngle), outerRadius, 0);

  const pointABevel = getPointOnACircle(toRadians(startingAngle + innerBevelOffsetAnle  + 180), innerRadius + bevelOffset, 0);
  const pointABevelLine = getPointOnACircle(toRadians(- startingAngle - innerBevelOffsetAnle), innerRadius + bevelOffset, 0);
  
  const pointBBevel = getPointOnACircle(toRadians(startingAngle - innerBevelOffsetAnle + segmentThetaAngle + 180), innerRadius + bevelOffset, 0);
  const pointBBevelLine = getPointOnACircle(toRadians(- startingAngle + innerBevelOffsetAnle - segmentThetaAngle), innerRadius + bevelOffset, 0);

  const pointCBevel = getPointOnACircle(toRadians(startingAngle - outerBevelOffsetAnle + segmentThetaAngle + 180), outerRadius - bevelOffset, 0);
  const pointCBevelLine = getPointOnACircle(toRadians(- startingAngle + outerBevelOffsetAnle - segmentThetaAngle), outerRadius - bevelOffset, 0);

  const pointDBevel = getPointOnACircle(toRadians(startingAngle + outerBevelOffsetAnle  + 180), outerRadius - bevelOffset, 0);
  const pointDBevelLine = getPointOnACircle(toRadians(- startingAngle - outerBevelOffsetAnle), outerRadius - bevelOffset, 0);

  const points = [pointA, pointB, pointC, pointD, pointABevelLine, pointBBevelLine, pointCBevelLine, pointDBevelLine];

    
  shape.absarc(0, 0, outerRadius, toRadians(0 + offsetAngle - startingAngle + outerBevelOffsetAnle), toRadians(45 + offsetAngle - startingAngle - outerBevelOffsetAnle))
  shape.absarc(pointDBevel[0], pointDBevel[2], bevelOffset ,toRadians(270 - startingAngle), toRadians(0 - startingAngle), false);
  shape.absarc(pointABevel[0], pointABevel[2], bevelOffset ,toRadians(0  - startingAngle), toRadians(90  - startingAngle), false);
  shape.absarc(0, 0, innerRadius, toRadians(offsetAngle + 45 - startingAngle - innerBevelOffsetAnle), toRadians(offsetAngle - startingAngle + innerBevelOffsetAnle), true)
  shape.absarc(pointBBevel[0], pointBBevel[2], bevelOffset ,toRadians(45 - startingAngle), toRadians(135 - startingAngle), false);
  shape.absarc(pointCBevel[0], pointCBevel[2], bevelOffset ,toRadians(135 - startingAngle), toRadians(225 - startingAngle), false);


  return (
    <>
      <mesh
        {...props}
        rotation={[toRadians(270), toRadians(0), toRadians(0)]}
        castShadow
        receiveShadow
      >
        <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]} />
        <meshStandardMaterial roughness={0.7} metalness={1} color={"lightGray"}></meshStandardMaterial>
      </mesh>
      {debugGrid && points.map(point => <Line color="green" points={[point, [ point[0], point[1] + 10, point[2]]]}/>)}
    </>
  );
}

Pavement.defaultProps = {
  startingAngle: 0,
  radius: 12,
  gridSizeY: 5,
  segmentThetaAngle: 45,
}

Pavement.propTypes = {
  startingAngle: PropTypes.number,
  radius: PropTypes.number,
  gridSizeY: PropTypes.number,
  segmentThetaAngle: PropTypes.number,
}

export default Pavement;