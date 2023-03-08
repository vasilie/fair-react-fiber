import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import { Line, useGLTF, Instances } from "@react-three/drei";
import { useControls } from "leva";
import { getAngleFromLengthAndRadius, getPointOnACircle, toRadians  } from "../lib/helpers/math";
import { generateCurvedLinePoints, getRandomColor  } from "../lib/helpers/sceneGeneration";
import Cell from "./Cell";
import { dummyData } from "../lib/helpers/dummyData";
import modelPath from "./models/expoBooth.glb";

const Grid = ({ gridSizeX, gridSizeY, radius, snapAngle }) => {

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
  }, [gridSizeX])

  const generatePossibleGridPositions = () => {
    let gridPositions = [];
    for (let i = 0; i < maxRows; i++) {
      gridPositions[i] = [];
      const radiusCellAngle = getAngleFromLengthAndRadius(gridSizeX, radius + gridSizeY * i);
      const radiusFullAngle = 270;
      let maxCells = Math.floor(radiusFullAngle / radiusCellAngle); 
      for (let j = 0; j < maxCells; j++) {
        gridPositions[i].push(null);
      }
    }
    return gridPositions;
  }

  const getNextFreeGridPosition = (gridPositions) => {
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
    return Math.floor(position[0] / cellsPerQuadrant) ;
  }

  const getCellsPerQuadrant = (position) => {
    const radiusLength = 2 / (360 / quadrantAngle)  * Math.PI * (radius + gridSizeY * position[1]);
    return Math.floor(radiusLength / gridSizeX); 
  }

  const checkIfInQuadrant = (quadrant, position) => {
    return getQuadrantPosition(position) === quadrant;
  }

  const quadrantStartingXPositionBasedOnRow = (quadrant, row) => {
    return quadrant * getCellsPerQuadrant([0, row]);
  }

  const assignPositionToItems = (items, gridPositions, sectorId, label, sectorColor) => {
    const startingPosition = getNextFreeGridPosition(gridPositions);
    let lastAssignedPosition = [];
    let currentRow = startingPosition[1];
    let currentQuadrant = getQuadrantPosition(startingPosition);
    
    for (let i = 0; i < items.length; i++) {
      for (let row = currentRow; row < maxRows; row++){
        let itemAssigned = false;

        for (let x = 0; x < gridPositions[row].length; x++) {
          if (gridPositions[row][x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row)] === null) {
            if (checkIfInQuadrant(currentQuadrant, [x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row), row])){
              console.log(`[${[x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row), row]}] in quadrant`);
              console.log("placing",[x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row), row] )
              lastAssignedPosition = [x, row];
              gridPositions[row][x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row)] = {...items[i], sectorId, label, sectorColor};
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
    const { nodes, materials } = useGLTF(modelPath);

    for (let i = 0; i < maxRows; i++) {
      let rowPositions = gridPositions;
      let rowsArray = [];
      let cellWidthInDegreesBasedOnRow = -getAngleFromLengthAndRadius(gridSizeX, radius + gridSizeY * i, snapAngle)  * Math.PI / 180;
      for (let j = 0; j < rowPositions[i]?.length; j++) {
        rowsArray[j] = (
          <Cell
          {...(rowPositions[i][j])}
          positionX={j}
          positionY={i}
          radius={radius + gridSizeY * i}
          gridSizeX={gridSizeX}
          gridSizeY={gridSizeY}
          quadrant={getQuadrantPosition([j, i])}
          cellWidthInDegreesBasedOnRow={cellWidthInDegreesBasedOnRow}
          key={`cell${i}-${j}`}
        ></Cell>
        )
      }
      map[i] = rowsArray;
    }
    return <Instances castShadow receiveShadow range={1000} material={materials["frame.001"]} geometry={nodes.ExpoBooth.geometry}>{map}</Instances>;
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

useGLTF.preload("/ExpoBooth.glb");