import PropTypes from "prop-types";

import { useState, useEffect, useMemo, useContext } from "react";
import { Line, useGLTF, Instances } from "@react-three/drei";
import { getAngleFromLengthAndRadius, getPointOnACircle, toRadians  } from "../lib/helpers/math";
import { generateCurvedLinePoints } from "../lib/helpers/sceneGeneration";
import Cell from "./Cell";
import Rows from "./Rows";
import modelPath from "./models/blender/expoBooth.glb";

import { GridContext } from "../Contexts/GridContext";
import Quadrants from "./Quadrants";
import DefaultMaterial from "./materials/DefaultMaterial";
import Debug from "./Debug";

const Grid = () => {
  const {
    angle,
    gridSizeX,
    gridSizeY,
    radius,
    maxRows,
    debugGrid,
    maxCells,
    circlePoints,
    gridPositions,
    getQuadrantPosition,
  } = useContext(GridContext);


  return (
    <>
     <Rows />
    {debugGrid && (
      <>
        <Line color="red" points={[[0,0.01,0], [0,0.01,40]]} lineWidth={2}/>
        <Debug />
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

useGLTF.preload("./models/blender/ExpoBooth4.glb");