import { useState, useEffect, useMemo, useContext } from "react";
import { Line, useGLTF, Instances } from "@react-three/drei";
import modelPath from "./models/blender/expoBooth4.glb";
import { GridContext } from "../Contexts/GridContext";
import { getAngleFromLengthAndRadius, getPointOnACircle, toRadians  } from "../lib/helpers/math";
import { generateCurvedLinePoints } from "../lib/helpers/sceneGeneration";
import DefaultMaterial from "./materials/DefaultMaterial";
import Cell from "./Cell";
import { Glass } from "./models/Glass";

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

  console.log(booths);
 
  return (<>
      <Instances castShadow receiveShadow range={1000} geometry={nodes.geo1.geometry}>
        {booths}
        <DefaultMaterial />
      </Instances>
      <Instances castShadow receiveShadow range={1000} geometry={nodes.geo1_1.geometry}>
        {booths.map(boothrow => {
          return boothrow.map(booth => {
            const {cellWidthInDegreesBasedOnRow, positionX, radius: neradius, quadrant} = booth.props;
            console.log("positionx", neradius);
          const quadrantRowZeroMiddlePosition = getPointOnACircle(toRadians(- 45 * quadrant - 22.5), neradius, 0.1);
          const quadrantMovePosition = getPointOnACircle(toRadians(- 45 * quadrant - 22.5), neradius + 1.3, 0.1);
          const quadrantDistanceToMove = [quadrantMovePosition[0] - quadrantRowZeroMiddlePosition[0], 0, quadrantMovePosition[2] - quadrantRowZeroMiddlePosition[2]];
            const position = getPointOnACircle(cellWidthInDegreesBasedOnRow + positionX * cellWidthInDegreesBasedOnRow - cellWidthInDegreesBasedOnRow / 2, neradius + 2, 0.115);
            const positionPulledBack =  [position[0] + quadrantDistanceToMove[0], position[1], position[2] + quadrantDistanceToMove[2]]
            const childRotation = [0, cellWidthInDegreesBasedOnRow + positionX * cellWidthInDegreesBasedOnRow - cellWidthInDegreesBasedOnRow / 2 , 0];

            return (
              <Glass 
                oposition={positionPulledBack}
                rotation={childRotation}
              >
                
              </Glass>)
            })
          })
        }
       <meshStandardMaterial transparent={true} opacity={0.2} color="orange" />
      </Instances>
  </>

  );
}

export default Rows;