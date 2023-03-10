import PropTypes from "prop-types";
import { useState } from "react";
import { Line } from "@react-three/drei"
import { getPointOnACircle, toDegrees, toRadians } from "../lib/helpers/math";
import Box from "./Box";
import { useControls } from "leva";

const Cell = ({positionX, radius, gridSizeX, gridSizeY, angle}) => {
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const pointA = getPointOnACircle(positionX * angle, radius, 0.1 );
  const pointB = getPointOnACircle(positionX * angle + angle, radius, 0.1 );
  const pointC = getPointOnACircle(positionX * angle + angle, radius + gridSizeY, 0.1);
  const pointD = getPointOnACircle(positionX * angle, radius + gridSizeY, 0.1);
  const points = [pointA, pointB, pointC, pointD, pointA];

  const childPosition = getPointOnACircle(positionX * angle - angle / 2, radius + 1);
  const childRotation = [0, positionX * angle - angle / 2, 0];

  const { debugCellBoundingBox } = useControls({
    debugCellBoundingBox: {value: true},
  });

  return (
    <>
      {debugCellBoundingBox && <Line color="red" points={points}></Line>}
      <Box castShadow roughness={0.1} metalness={0.9} clickable color="#FFC619" position={childPosition} rotation={childRotation} />
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