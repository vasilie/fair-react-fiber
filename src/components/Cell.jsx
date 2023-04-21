import PropTypes from "prop-types";
import { useContext } from "react";
import { Line } from "@react-three/drei"
import { getPointOnACircle, toDegrees, toRadians } from "../lib/helpers/math";
import { useControls } from "leva";
import { ExpoBooth2 } from "./models/ExpoBooth2";

import { GridContext } from "../Contexts/GridContext";
import { PREVIEW_STATES } from "../lib/consts/states";

const Cell = ({positionX, radius, gridSizeX, gridSizeY, cellWidthInDegreesBasedOnRow, sectorId, sectorColor, quadrant, label}) => {
  const { setCameraPosition, setCameraClickedPosition, setPreviewState} = useContext(GridContext);
  
  //Note points need to be pulled with quadrantDistanceToMove aswell 
  const pointA = getPointOnACircle(positionX * cellWidthInDegreesBasedOnRow, radius, 0.1 );
  const pointB = getPointOnACircle(positionX * cellWidthInDegreesBasedOnRow + cellWidthInDegreesBasedOnRow, radius , 0.1 );
  const pointC = getPointOnACircle(positionX * cellWidthInDegreesBasedOnRow + cellWidthInDegreesBasedOnRow, radius + gridSizeY, 0.1);
  const pointD = getPointOnACircle(positionX * cellWidthInDegreesBasedOnRow, radius + gridSizeY, 0.1);
  const points = [pointA, pointB, pointC, pointD, pointA];

  const childPosition = getPointOnACircle(cellWidthInDegreesBasedOnRow + positionX * cellWidthInDegreesBasedOnRow - cellWidthInDegreesBasedOnRow / 2, radius + 2, 0.115);
  const childCameraPosition = getPointOnACircle(cellWidthInDegreesBasedOnRow + positionX * cellWidthInDegreesBasedOnRow - cellWidthInDegreesBasedOnRow / 2, radius + 1.7, 0.8);
  const childRotation = [0, cellWidthInDegreesBasedOnRow + positionX * cellWidthInDegreesBasedOnRow - cellWidthInDegreesBasedOnRow / 2 , 0];

  const quadrantRowZeroMiddlePosition = getPointOnACircle(toRadians(- 45 * quadrant - 22.5), radius, 0.1);
  const quadrantMovePosition = getPointOnACircle(toRadians(- 45 * quadrant - 22.5), radius + 1.3, 0.1);
  const quadrantDistanceToMove = [quadrantMovePosition[0] - quadrantRowZeroMiddlePosition[0], 0, quadrantMovePosition[2] - quadrantRowZeroMiddlePosition[2]];
  const childPositionPulledBack = [childPosition[0] + quadrantDistanceToMove[0], childPosition[1], childPosition[2] + quadrantDistanceToMove[2]];
  const { debugCellBoundingBox } = useControls("Scene Generation", {
    debugCellBoundingBox: { value: false },
  });

  const handleBuildingClick = (cameraPosition, clickedPosition) => {
    setCameraClickedPosition(clickedPosition);
    setCameraPosition(cameraPosition);
    setPreviewState(PREVIEW_STATES.BOOTH);
  }

  return (
    <>
      {debugCellBoundingBox && <Line color="red" points={points}></Line>}
      <group position={[0 + quadrantDistanceToMove[0] , 0.03, 0 + quadrantDistanceToMove[2]]}>
      </group>
      <ExpoBooth2 onClick={() => handleBuildingClick(childCameraPosition, childPositionPulledBack)} label={label} sectorId={sectorId} scale={0.1} position={childPositionPulledBack} color={"white"} rotation={childRotation}></ExpoBooth2>
    </>
  )
}

Cell.defaultProps = {
  positionX: 7,
  sectorId: "Unknown",
  label: "No name",
}

Cell.propTypes = {
  position: PropTypes.array,
  sectorId: PropTypes.string,
  label: PropTypes.string,
}

export default Cell;