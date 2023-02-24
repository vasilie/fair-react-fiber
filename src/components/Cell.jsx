import PropTypes from "prop-types";
import { useState, Suspense } from "react";
import { Line, Billboard, Text } from "@react-three/drei"
import { getPointOnACircle, toDegrees, toRadians } from "../lib/helpers/math";
import Box from "./Box";
import { useControls } from "leva";
import Sector from "./Sector";
import { ExpoBooth } from "./models/ExpoBooth";

const Cell = ({positionX, radius, gridSizeX, gridSizeY, angle, sectorId}) => {
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const pointA = getPointOnACircle(positionX * angle, radius, 0.1 );
  const pointB = getPointOnACircle(positionX * angle + angle, radius, 0.1 );
  const pointC = getPointOnACircle(positionX * angle + angle, radius + gridSizeY, 0.1);
  const pointD = getPointOnACircle(positionX * angle, radius + gridSizeY, 0.1);
  const points = [pointA, pointB, pointC, pointD, pointA];

  const childPosition = getPointOnACircle(positionX * angle - angle / 2, radius + 1, 0.03);
  const childRotation = [0, positionX * angle - angle / 2 - toRadians(90), 0];

  const { debugCellBoundingBox } = useControls({
    debugCellBoundingBox: {value: false},
  });

  return (
    <>
      {debugCellBoundingBox && <Line color="red" points={points}></Line>}
      <Billboard
          follow={true}
          lockX={false}
          lockY={false}
          position={[childPosition[0], 3, childPosition[2]]}
          lockZ={false} // Lock the rotation on the z axis (default=false)
        >
        <Text color="blue" fontSize={1}>{sectorId}</Text>
      </Billboard>
      <Sector
        length={gridSizeX}
        innerRadius={radius}
        outerRadius={radius+gridSizeY}
        position={[0, 0.03, 0]}
        sectorId={sectorId}
        angle={toDegrees(positionX * angle + angle)}
        rotation={[-Math.PI / 2, 0, 0]} />
 
      {/* <Box castShadow roughness={0.1} metalness={0.9} clickable color="#FFC619" position={childPosition} rotation={childRotation} /> */}
      <ExpoBooth scale={20} position={childPosition} rotation={childRotation}></ExpoBooth>
    </>
  )
}

Cell.defaultProps = {
  positionX: 7,
}

Cell.propTypes = {
  position: PropTypes.array,
}

export default Cell;