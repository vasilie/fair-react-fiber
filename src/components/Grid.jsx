import PropTypes from "prop-types";

import { useState, useEffect } from "react";
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

  const { quadrantAngle } = useControls({
    quadrantAngle: { value: 45 },
  });

  useEffect(()=> {
    let positions = generatePossibleGridPositions();
    setGridPositions(assignPositionToItems(dummyData[0].items, positions, dummyData[0].id ));
  }, [])



  const generatePossibleGridPositions = () => {
    let gridPositions = [];
    for (let i = 0; i < maxRows; i++) {
      gridPositions[i] = [];
      const radiusLength = 2 * Math.PI * (radius + gridSizeY * i);
      let maxCells = Math.floor(radiusLength / gridSizeX); 
      for (let j = 0; j < maxCells; j++) {
        gridPositions[i].push(null);
      }
    }
    return gridPositions;
  }

  const getNextFreeGridPosition = (gridPositions) => {
    console.log("griddziiton", gridPositions);
    for (let i = 0; i < gridPositions.length; i++) {
      for (let j = 0; j < gridPositions[i].length; j++) {
        if (gridPositions[i][j] === null){
          return [j,i];
        }      
      }
    }
  }

  const getQuadrantPosition = (position) => {
    const cellsPerQuadrant = getCellsPerQuadrant(position);
    console.log("cellsperq", cellsPerQuadrant);
    return Math.floor(position[0] / cellsPerQuadrant) ;
  }

  const getCellsPerQuadrant = (position) => {
    const radiusLength = 2 / (360 / quadrantAngle)  * Math.PI * (radius + gridSizeY * position[1]);
    return Math.floor(radiusLength / gridSizeX); 
  }

  const checkIfInQuadrant = (quadrant, position) => {
    return getQuadrantPosition(position) === quadrant;
  }

  const assignPositionToItems = (items, gridPositions, sectorId) => {
    const startingPosition = getNextFreeGridPosition(gridPositions);
    console.log("startingPosition",startingPosition);
    let currentRow = startingPosition[1];
    let currentQuadrant = getQuadrantPosition(startingPosition);
     console.log("currentQuadrant",currentQuadrant);
    for (let i = 0; i < items.length; i++) {
      for (let row = currentRow; i < maxRows; row++){
        let itemAssigned = false;
        for (let x = 0; x < gridPositions[row].length; x++) {
          if (gridPositions[row][x + startingPosition[0]] === null) {
            if (checkIfInQuadrant(currentQuadrant, [x + startingPosition[0], startingPosition[1] + row], radius, gridSizeX, gridSizeY, quadrantAngle )){
              console.log(`[${[x + startingPosition[0], row]}] in quadrant`);
              console.log("placing",[x + startingPosition[0], row] )
              gridPositions[row][x + startingPosition[0]] = {...items[i], sectorId};
              itemAssigned = true;
            } else {
              console.log(`[${[x + startingPosition[0], row]}] not in quadrant`);
              console.log("Tried", [x + startingPosition[0], row] );
            }
            break;
          }
        }
        if (itemAssigned) {
          break;
        }
      }
    }
    return gridPositions;
  };

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
      // let rowPositions = generateRow(gridSizeX, radius + gridSizeY * i);
      let rowPositions = gridPositions;
      let rowsArray = [];
      for (let j = 0; j < rowPositions[i].length - 4; j++) {
        rowsArray[j] = (
          <Cell
          {...(rowPositions[i][j])}
          positionX={j}
          positionY={i}
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

Grid.defaultProps = {
  gridSizeX: 5,
  gridSizeY: 5,
  radius: 8,
  snapAngle: 45,
}

Grid.propTypes = {
  gridSizeX: PropTypes.number,
  gridSizeY: PropTypes.number,
  radius: PropTypes.number,
  snapAngle: PropTypes.number,
}

export default Grid;