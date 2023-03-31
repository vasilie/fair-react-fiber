import PropTypes from "prop-types";

import { useState, useEffect, useContext } from "react";
import { Line, useGLTF, Instances } from "@react-three/drei";
import { useControls } from "leva";
import { getAngleFromLengthAndRadius, getPointOnACircle, toRadians  } from "../lib/helpers/math";
import { generateCurvedLinePoints, getRandomColor  } from "../lib/helpers/sceneGeneration";
import Cell from "./Cell";
import { dummyData } from "../lib/helpers/dummyData";
import modelPath from "./models/expoBooth.glb";
import Pavement from "./Pavement";
import Quadrant from "./Quadrant";
import { GridContext } from "../Contexts/GridContext";
import Quadrants from "./Quadrants";

const Grid = ({}) => {
  const {
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

  } = useContext(GridContext);

  const DebugAngleLines = () => {
    let lines = [];
    for (let i = 0; i < maxCells; i++) {
      lines.push(<Line color="blue" points={[[0,0.01,0], getPointOnACircle(toRadians(angle * i), 3 * radius, 0.1)]} />);
    }
    return lines;
  }

  const DebugRowLines = () => {
    let lines = [];
    lines[0] = <Line color="indianred" points={generateCurvedLinePoints(50, 9.3, 360 ,0.1)}/>;
    for (let i = 0; i < maxRows + 1; i++) {
      lines[i+1] = <Line color="green" points={generateCurvedLinePoints(50, radius + gridSizeY * i, 360 ,0.1)}/>  ;
    }
    return lines;
  }

  const Rows = () => {
    let map = [];
    const { nodes, materials } = useGLTF(modelPath);

    for (let i = 0; i < maxRows; i++) {
      let rowPositions = gridPositions;
      let rowsArray = [];
      let cellWidthInDegreesBasedOnRow = -getAngleFromLengthAndRadius(gridSizeX, radius + gridSizeY * i, 45)  * Math.PI / 180;
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
    return <Instances castShadow receiveShadow range={1000}  geometry={nodes.ExpoBooth.geometry}>
      {map}
      <meshStandardMaterial metalness={0.7}  roughness={0.7} color={"white"}></meshStandardMaterial>
      </Instances>;
  }

  return (
    <>
     <Rows />
     <Quadrants></Quadrants>
    {debugGrid && (
      <>
        <Line color="red" points={[[0,0.01,0], [0,0.01,40]]} lineWidth={2}/>
        <DebugRowLines />
        <DebugAngleLines />
        <Line color="orange" points={circlePoints}/>
        <Line color="green" points={[[0,0.01,0], getPointOnACircle(-toRadians(45), radius + 25, 0.01)]} lineWidth={2}  />
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