import PropTypes from "prop-types";
import * as THREE from 'three';
import { getPointOnACircle, toRadians } from '../lib/helpers/math';
import { Line } from "@react-three/drei";

const Pavement = (props) => {
  const {startingAngle, gridSizeY, radius, segmentThetaAngle} = props;
  const extrudeSettings = {
    steps: 4,
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelOffset: -0.05,
    bevelSegments: 0
  };

  const shape = new THREE.Shape();

  let innerRadius = radius;
  let outerRadius = radius + gridSizeY;
  
  const offsetAngle = -135;
  const bevelOffset = 1;
  const bevelOffsetAnle = bevelOffset * 4;
  const bevelAngleOffset = 90
  const thetaAngle = 45;

  const pointA = getPointOnACircle(toRadians(startingAngle), innerRadius, 0);
  const pointB = getPointOnACircle(toRadians(startingAngle - segmentThetaAngle), innerRadius, 0);
  const pointC = getPointOnACircle(toRadians(startingAngle - segmentThetaAngle), outerRadius, 0);
  const pointD = getPointOnACircle(toRadians(startingAngle), outerRadius, 0);

  const pointABevel = getPointOnACircle(toRadians(startingAngle + bevelOffsetAnle  + 180), innerRadius + bevelOffset, 0);
  const pointABevelLine = getPointOnACircle(toRadians(startingAngle - bevelOffsetAnle), innerRadius + bevelOffset, 0);
  
  const pointBBevel = getPointOnACircle(toRadians(startingAngle - bevelOffsetAnle + segmentThetaAngle + 180), innerRadius + bevelOffset, 0);
  const pointBBevelLine = getPointOnACircle(toRadians(startingAngle + bevelOffsetAnle - segmentThetaAngle), innerRadius + bevelOffset, 0);

  const points = [pointA, pointB, pointC, pointD, pointABevelLine, pointBBevelLine];

  
  shape.absarc(0, 0, outerRadius, toRadians(0 + offsetAngle + startingAngle), toRadians(45 + offsetAngle + startingAngle))
  shape.absarc(pointABevel[0], pointABevel[2], 1 ,toRadians(0), toRadians(90), false);
  shape.absarc(0, 0, innerRadius, toRadians(offsetAngle + 45 + startingAngle + bevelOffsetAnle), toRadians(offsetAngle + startingAngle + bevelOffsetAnle), true)
  shape.absarc(pointBBevel[0], pointBBevel[2], 1 ,toRadians(0 + thetaAngle ), toRadians(90 + thetaAngle), false);

  return (
    <><mesh
      {...props}
      rotation={[toRadians(270), toRadians(0), toRadians(0)]}
      castShadow
      receiveShadow
    >
      <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]} />
      <meshStandardMaterial roughness={0.7} metalness={1} color={"orange"}></meshStandardMaterial>
    </mesh>
    {points.map(point => <Line color="green" points={[point, [ point[0], point[1] + 10, point[2]]]}/>)}
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