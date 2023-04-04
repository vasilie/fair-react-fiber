import React, { createContext, useState, useEffect } from "react";
import { useControls } from "leva";
import { getAngleFromLengthAndRadius, getPointOnACircle, toRadians  } from "../lib/helpers/math";
import { generateCurvedLinePoints, getRandomColor } from "../lib/helpers/sceneGeneration";
import { dummyData } from "../lib/helpers/dummyData";

export const GridContext = createContext();

function GridProvider({ children }) {

  const { gridSizeX, gridSizeY, gridSnapAngle, radius, maxRows, debugGrid, quadrantAngle } = useControls("Scene Generation", {
    gridSizeX: {value: 2.09, min: 1, max: 10 },
    gridSizeY: {value: 4.54, min: 2, max: 15.35, step: 0.01 },
    gridSnapAngle: {value: 45, min:30, max: 180, step: 15},
    radius: {value: 8.1, min:5, max: 20},
    maxRows: {value: 8, min: 1, max: 15, step: 1 },
    debugGrid: { value: false },
    quadrantAngle: { value: 45 },
  }, {collapsed: true, order: 10});

  const angle = -Math.abs(getAngleFromLengthAndRadius(gridSizeX, radius, quadrantAngle));
  const radiusLength = 2 * Math.PI * radius;
  const maxCells = Math.floor(radiusLength / gridSizeX);
  const circlePoints = generateCurvedLinePoints(50, radius, 360 ,0.31);
  const [gridPositions, setGridPositions] = useState([]);
  const [isSceneGenerated, setIsSceneGenerated] = useState(false);
  const [areQuadrantsGenerated, setQuadrantsGenerated] = useState(false);
  const [rotateCamera, setRotateCamera] = useState(true);
  const [isSomethingHovered, setSomethingHovered] = useState(false);
  useEffect(()=> {
    let positions = generatePossibleGridPositions();

    let newPositions = positions;
    for (let i = 0; i < dummyData.length; i++) {
      let sectorColor = getRandomColor();
      newPositions = assignPositionToItems(dummyData[i].items, newPositions, dummyData[i].id, dummyData[i].label);
    }

    setGridPositions(positions);
  }, [gridSizeX])

useEffect(()=> {
  if (gridPositions.length > 1 && areQuadrantsGenerated){ // If positions set
    setIsSceneGenerated(true);
  }
}, [gridPositions, areQuadrantsGenerated]);

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
    
    for (let i = 0; i <= items.length; i++) {
      for (let row = currentRow; row < maxRows; row++){
        let itemAssigned = false;

        for (let x = 0; x < gridPositions[row].length; x++) {
          if (gridPositions[row][x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row)] === null) {
            if (checkIfInQuadrant(currentQuadrant, [x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row), row])){
              console.log(`[${[x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row), row]}] in quadrant`);
              console.log("placing",[x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row), row] )
              lastAssignedPosition = [x, row];
              gridPositions[row][x + quadrantStartingXPositionBasedOnRow(currentQuadrant, row)] = {...items[i], sectorId, sectorColor};
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
      if (i === items.length){
        let remainingEmptyCells =  getCellsPerQuadrant(lastAssignedPosition) - lastAssignedPosition[0];
        console.log("Remaining cells", remainingEmptyCells);
        for (let x = 0; x < remainingEmptyCells; x++) {
          gridPositions[lastAssignedPosition[1]][lastAssignedPosition[0] + x + quadrantStartingXPositionBasedOnRow(currentQuadrant, lastAssignedPosition[1])] = {sectorId, falseBuilding: true, sectorColor};
        }
      }
    }
    return gridPositions;
  };


  const props = {
    angle,
    gridSizeX,
    gridSizeY,
    gridSnapAngle,
    radius,
    maxRows,
    debugGrid,
    quadrantAngle,
    maxCells,
    circlePoints,
    gridPositions,
    generatePossibleGridPositions,
    getNextFreeGridPosition,
    getQuadrantPosition,
    getCellsPerQuadrant,
    checkIfInQuadrant,
    quadrantStartingXPositionBasedOnRow,
    assignPositionToItems,
    isSceneGenerated,
    setQuadrantsGenerated,
    rotateCamera,
    isSomethingHovered,
    setSomethingHovered
  }

  return (
    <GridContext.Provider value={{ ...props }}>
      {children}
    </GridContext.Provider>
  );
}

export default GridProvider;
