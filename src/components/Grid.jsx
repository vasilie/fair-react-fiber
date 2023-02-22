import { useState } from "react";
import { calcPosFromAngles, Circle, Line } from "@react-three/drei";
import { useControls } from "leva";
import { getAngleFromLengthAndRadius, getPointOnACircle, toRadians  } from "../lib/helpers/math";
import { generateCurvedLinePoints  } from "../lib/helpers/sceneGeneration";
import Cell from "./Cell";
import { dummyData } from "../lib/helpers/dummyData";

const Grid = ({gridSizeX, gridSizeY, radius, snapAngle}) => {

  const angle = -Math.abs(getAngleFromLengthAndRadius(gridSizeX, radius, snapAngle));
  const radiusLength = 2 * Math.PI * radius;
  const maxCells = Math.floor(radiusLength / gridSizeX);
  const circlePoints = generateCurvedLinePoints(50, radius, 360 ,0.31);
  const [gridPositions, setGridPositions] = useState([]);

  const { maxRows } = useControls({
    maxRows: {value: 7, min: 1, max: 15, step: 1 },
  });

  const { debugGrid } = useControls({
    debugGrid: { value: false },
  });

  const { sectorMinAngle } = useControls({
    sectorMinAngle: { value: 45 },
  });

  const maxColumns = Math.floor(360 / sectorMinAngle);
  const columns = [];

  for (let i = 0; i < maxColumns; i++) {
    columns.push([]);
  }


  const findNextAvailableSectorPosition = () => {
    for (let i = 0; i < gridPositions.length; i++) {
      for (let j = 0; j < gridPositions[i].length; j++) {
        if ()
      }
    }
  }

  const generateSectors = (gridSizeX, radius) => {
    const currentAngle = 0;
    
    const radiusLength =  2 / 360 / sectorMinAngle * Math.PI * radius;
    
    dummyData.forEach((sector, x) => {
      const { items } = sector;


    })

  }

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
          key={`cell${i}-${j}`}
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