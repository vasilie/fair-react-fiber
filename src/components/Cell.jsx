import PropTypes from "prop-types";
import { useState, Suspense } from "react";
import { Line, Billboard, Text } from "@react-three/drei"
import { getPointOnACircle, toDegrees, toRadians, getQuadrantFromAngle, getAngleFromLengthAndRadius } from "../lib/helpers/math";
import Box from "./Box";
import { useControls } from "leva";
import Sector from "./Sector";
import { ExpoBooth } from "./models/ExpoBooth";
import { ExpoBooth2 } from "./models/ExpoBooth2";
import { getQuadrantPosition } from "../lib/helpers/sceneGeneration";
import Pavement from "./Pavement";

import { Vector3 } from "three";

const Cell = ({positionX, radius, gridSizeX, gridSizeY, cellWidthInDegreesBasedOnRow, sectorId, sectorColor, quadrant}) => {
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  //Note points need to be pulled with quadrantDistanceToMove aswell 
  const pointA = getPointOnACircle(positionX * cellWidthInDegreesBasedOnRow, radius, 0.1 );
  const pointB = getPointOnACircle(positionX * cellWidthInDegreesBasedOnRow + cellWidthInDegreesBasedOnRow, radius , 0.1 );
  const pointC = getPointOnACircle(positionX * cellWidthInDegreesBasedOnRow + cellWidthInDegreesBasedOnRow, radius + gridSizeY, 0.1);
  const pointD = getPointOnACircle(positionX * cellWidthInDegreesBasedOnRow, radius + gridSizeY, 0.1);
  const points = [pointA, pointB, pointC, pointD, pointA];

  const childPosition = getPointOnACircle(cellWidthInDegreesBasedOnRow + positionX * cellWidthInDegreesBasedOnRow - cellWidthInDegreesBasedOnRow / 2, radius + 2, 0.15);
  
  const childRotation = [0, cellWidthInDegreesBasedOnRow + positionX * cellWidthInDegreesBasedOnRow - cellWidthInDegreesBasedOnRow / 2 - toRadians(90), 0];

  const quadrantRowZeroMiddlePosition = getPointOnACircle(toRadians(- 45 * quadrant - 22.5), radius, 0.1);
  const quadrantMovePosition = getPointOnACircle(toRadians(- 45 * quadrant - 22.5), radius + 1.3, 0.1);
  const quadrantDistanceToMove = [quadrantMovePosition[0] - quadrantRowZeroMiddlePosition[0], 0, quadrantMovePosition[2] - quadrantRowZeroMiddlePosition[2]];
  const childPositionPulledBack = [childPosition[0] + quadrantDistanceToMove[0], childPosition[1], childPosition[2] + quadrantDistanceToMove[2]];
  const { debugCellBoundingBox } = useControls({
    debugCellBoundingBox: { value: false },
  });

  return (
    <>
      {debugCellBoundingBox && <Line color="red" points={points}></Line>}
      {/* <Billboard
          follow={true}
          lockX={false}
          lockY={false}
          position={[childPosition[0], 3, childPosition[2]]}
          lockZ={false} // Lock the rotation on the z axis (default=false)
        >
        <Text outlineWidth={0.1} fontSize={0.8} outlineColor="white" color="#333" >{sectorId}</Text>
      </Billboard> */}
      <group position={[0 + quadrantDistanceToMove[0] , 0.03, 0 + quadrantDistanceToMove[2]]}>
      {/* <Sector
        length={gridSizeX}
        innerRadius={radius}
        outerRadius={radius+gridSizeY -1}
        position={[0, 0, 0]}
        sectorId={sectorId}
        angle={toDegrees(positionX * cellWidthInDegreesBasedOnRow + cellWidthInDegreesBasedOnRow)}
        sectorColor={sectorColor}
        rotation={[-Math.PI / 2, 0, 0]} /> */}
      </group>
    

      {/* <Box castShadow roughness={0.1} metalness={0.9} clickable color="#FFC619" position={childPosition} rotation={childRotation} /> */}
      <ExpoBooth2 scale={20} position={childPositionPulledBack} color={sectorColor} rotation={childRotation}></ExpoBooth2>
      {/* <Pavement  position={[0, 0.1, 0]} rotation={[toRadians(90), toRadians(0),toRadians(0)]}/> */}
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