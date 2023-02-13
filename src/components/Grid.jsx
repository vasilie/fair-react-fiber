import { calcPosFromAngles, Circle, Line } from "@react-three/drei";
import { useControls } from "leva";
import { getAngleFromLengthAndRadius, getPointOnACircle, toRadians  } from "../lib/helpers/math";
import { generateCurvedLinePoints  } from "../lib/helpers/sceneGeneration";
import Cell from "./Cell";

const Grid = ({gridSizeX, gridSizeY, radius, snapAngle}) => {

  const angle = -Math.abs(getAngleFromLengthAndRadius(gridSizeX, radius, snapAngle));
  const radiusLength = 2 * Math.PI * radius;
  const maxCells = Math.floor(radiusLength / gridSizeX);
  const circlePoints = generateCurvedLinePoints(50, radius, 360 ,0.31);
  
  const { maxRows } = useControls({
    maxRows: {value: 3, min: 1, max: 5, step: 1 },
  });

  const { debugGrid } = useControls({
    debugGrid: { value: false },
  });

  const generateRow = (gridSizeX, radius) => {
    const radiusLength = 2 * Math.PI * radius;
    const maxCells = Math.floor(radiusLength / gridSizeX); 
    const angle = getAngleFromLengthAndRadius(gridSizeX, radius, snapAngle);
    const row = [];
    for (let i = 0; i < maxCells; i++) {
      const position = getPointOnACircle(i * angle, radius);
      row.push(position);
    }
    return row;
  }

  const DebugAngleLines = () => {
    let lines = [];
    for (let i = 0; i < maxCells; i++) {
      lines.push(<Line color="blue" points={[[0,0.01,0], getPointOnACircle(toRadians(angle * i), 3 * radius, 0.1)]} />);
    }
    return lines;
  }

  const DebugRowLines = () => {
    let lines = [];
    for (let i = 0; i < maxRows + 1; i++) {
      lines[i] = <Line color="green" points={generateCurvedLinePoints(50, radius + gridSizeY * i, 360 ,0.1)}/>  ;
    }
    return lines;
  }

  const Rows = () => {
    let map = [];
    for (let i = 0; i < maxRows; i++) {
      let rowPositions = generateRow(gridSizeX, radius + gridSizeY * i);
      let rowsArray = [];
      for (let j = 0; j < rowPositions.length; j++) {
        rowsArray[j] = (
          <Cell
          positionX={j}
          radius={radius + gridSizeY * i}
          gridSizeX={gridSizeX}
          gridSizeY={gridSizeY}
          angle={-getAngleFromLengthAndRadius(gridSizeX, radius + gridSizeY * i, snapAngle)  * Math.PI / 180}
          key={`cell${j}`}
        ></Cell>
        )
      }
      map[i] = rowsArray;
    }
    return map;
  }

  return (
    <>
     <Rows />
    {debugGrid && (
      <>
        <Line color="red" points={[[0,0.01,0], [0,0.01,40]]} lineWidth={2}/>
        <DebugRowLines />
        <DebugAngleLines />
        <Line color="orange" points={circlePoints}/>
        <Line color="green" points={[[0,0.01,0], getPointOnACircle(-toRadians(snapAngle), radius + 25, 0.01)]} lineWidth={2}  />
      </>
    )}
    </>
  );
}

export default Grid;