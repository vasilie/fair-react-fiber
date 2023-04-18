import { useState, useEffect, useMemo, useContext } from "react";
import { Line, useGLTF, Instances } from "@react-three/drei";
import modelPath from "./models/blender/expoBooth.glb";
import { GridContext } from "../Contexts/GridContext";
import { getAngleFromLengthAndRadius, getPointOnACircle, toRadians  } from "../lib/helpers/math";
import { generateCurvedLinePoints } from "../lib/helpers/sceneGeneration";
import DefaultMaterial from "./materials/DefaultMaterial";
import Cell from "./Cell";

const Rows = () => {
  const { nodes, materials } = useGLTF(modelPath);
  const [count, setCount] = useState(0);
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

  const generateBooths = () => {
    console.log("Rerendering Booths");
    let map = [];
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
    return map;
  }
  const booths = useMemo(() => generateBooths(), []);
 

  return (
    <Instances castShadow receiveShadow range={1000}  geometry={nodes.ExpoBooth.geometry}>
      {booths}
      <DefaultMaterial />
    </Instances>
  );
}

export default Rows;