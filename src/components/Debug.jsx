import { useContext } from "react";
import { Line } from "@react-three/drei";
import { GridContext } from "../Contexts/GridContext";
import { getPointOnACircle, toRadians  } from "../lib/helpers/math";
import { generateCurvedLinePoints } from "../lib/helpers/sceneGeneration";

const DebugAngleLines = () => {
  const {
    angle,
    radius,
    maxCells,
  } = useContext(GridContext);

  let lines = [];
  for (let i = 0; i < maxCells; i++) {
    lines.push(<Line color="blue" points={[[0,0.01,0], getPointOnACircle(toRadians(angle * i), 3 * radius, 0.1)]} />);
  }
  return lines;
}

const DebugRowLines = () => {
  const {
    radius,
    maxRows,
    gridSizeY,
  } = useContext(GridContext);
  let lines = [];
  lines[0] = <Line color="indianred" points={generateCurvedLinePoints(50, 9.3, 360 ,0.1)}/>;
  for (let i = 0; i < maxRows + 1; i++) {
    lines[i+1] = <Line color="green" points={generateCurvedLinePoints(50, radius + gridSizeY * i, 360 ,0.1)}/>  ;
  }
  return lines;
}


const Debug = () => {
  return (
    <>
      <DebugAngleLines />
      <DebugRowLines />
    </>
  )
}

export default Debug;