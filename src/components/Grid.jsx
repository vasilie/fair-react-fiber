import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import { calcPosFromAngles, Circle, Line } from "@react-three/drei";
import { useControls } from "leva";
import { getAngleFromLengthAndRadius, getPointOnACircle, toRadians  } from "../lib/helpers/math";
import { generateCurvedLinePoints, getRandomColor  } from "../lib/helpers/sceneGeneration";
import Cell from "./Cell";
import { dummyData } from "../lib/helpers/dummyData";

const Grid = ({gridSizeX, gridSizeY, radius, snapAngle}) => {

  const angle = -Math.abs(getAngleFromLengthAndRadius(gridSizeX, radius, snapAngle));
  const radiusLength = 2 * Math.PI * radius;
  const maxCells = Math.floor(radiusLength / gridSizeX);
  const circlePoints = generateCurvedLinePoints(50, radius, 360 ,0.31);
  const [gridPositions, setGridPositions] = useState([]);

  const { maxRows } = useControls({
    maxRows: {value: 5, min: 1, max: 15, step: 1 },
  });

  const { debugGrid } = useControls({
    debugGrid: { value: false },
  });

  const { quadrantAngle } = useControls({
    quadrantAngle: { value: 45 },
  });

  useEffect(()=> {
    let positions = generatePossibleGridPositions();

    let newPositions = positions;
    for (let i = 0; i < dummyData.length; i++) {
      let sectorColor = getRandomColor();
      newPositions = assignPositionToItems(dummyData[i].items, newPositions, dummyData[i].id, dummyData[i].label, sectorColor);
    }

    setGridPositions(positions);
  }, [])



  const generatePossibleGridPositions = () => {
    let gridPositions = [];
    for (let i = 0; i < maxRows; i++) {
      gridPositions[i] = [];
      const radiusLength = (1.5 * Math.PI) * (radius + gridSizeY * i);
      const radiusCellAngle = getAngleFromLengthAndRadius(gridSizeX, radius + gridSizeY * i);
      const radiusFullAngle = 270;

      console.log("RADIUS LENGHT", radiusLength);
      console.log("RADIUS", radius);
      let maxCells = Math.floor(radiusFullAngle / radiusCellAngle); 
      console.log("maxCells", maxCells);
      console.log("gridSizeX", gridSizeX);
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
    console.log("Cells per quadrant", Math.floor(radiusLength / gridSizeX));
    console.log("position", position[1]);
    return Math.floor(radiusLength / gridSizeX); 
  }

  const checkIfInQuadrant = (quadrant, position) => {
    return getQuadrantPosition(position) === quadrant;
  }

  const quadrantStartingXPositionBasedOnRow = (quadrant, row) => {
    return quadrant * getCellsPerQuadrant([0, row]);
  }

  const assignPositionToItems = (items, gridPositions, sectorId, label, sectorColor) => {
    console.log("color", sectorColor);
    const startingPosition = getNextFreeGridPosition(gridPositions);
    console.log("startingPosition",startingPosition);
    console.log("sectorId", sectorId);
    
    let lastAssignedPosition = [];
    let currentRow = startingPosition[1];
    let currentQuadrant = getQuadrantPosition(startingPosition);
     console.log("currentQuadrant",currentQuadrant);
    for (let i = 0; i < items.length; i++) {
      
      for (let row = currentRow; row < maxRows; row++){
        let itemAssigned = false;
        for (let x = 0; x < gridPositions[row].length; x++) {
          if (gridPositions[startingPosition[1] + row][x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row)] === null) {
            if (checkIfInQuadrant(currentQuadrant, [x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row), startingPosition[1] + row])){
              console.log(`[${[x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row), startingPosition[1] + row]}] in quadrant`);
              console.log("placing",[x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row), row] )
              lastAssignedPosition = [x, startingPosition[1] + row];
              gridPositions[startingPosition[1] + row][x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row)] = {...items[i], sectorId, label, sectorColor};
              itemAssigned = true;
            } else {
              console.log(`[${[x + startingPosition[0], row]}] not in quadrant ${currentQuadrant}`);
              console.log("Tried", [x + startingPosition[0], row] );
            }
            break;
          }
        }
        if (itemAssigned) {
          break;
        }
      }
      // Check if there is more space until the end of row in qurrent quadrant
      if (i === items.length - 1){
        let remainingEmptyCells =  getCellsPerQuadrant(lastAssignedPosition) - lastAssignedPosition[0];
        console.log("Remaining cells", remainingEmptyCells);
        for (let x = 0; x < remainingEmptyCells; x++) {
          gridPositions[lastAssignedPosition[1]][lastAssignedPosition[0] + x + quadrantStartingXPositionBasedOnRow(currentQuadrant, lastAssignedPosition[1])] = {sectorId, falseBuilding: true, sectorColor};
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
      for (let j = 0; j < rowPositions[i]?.length; j++) {
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