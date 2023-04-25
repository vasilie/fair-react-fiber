import Pavement from "./Pavement";
import { toRadians } from "../lib/helpers/math";
import * as THREE from "three";
import Quadrant from "./Quadrant";
import { useContext, useState, useEffect, memo, useMemo } from "react";
import { GridContext } from "../Contexts/GridContext";
import { getPointOnACircle } from "../lib/helpers/math";
import { Box, Instance, Instances } from "@react-three/drei";
import { pavementMeshGenerator } from "../lib/helpers/pavementMeshGenerator";
import DefaultMaterial from "./materials/DefaultMaterial";
import { ExpoBooth } from "./models/ExpoBooth";
import { Lamp } from "./models/Lamp";
import { to } from "react-spring";


const Quadrants = () => {
  
  const { quadrantAngle, radius, setQuadrantsGenerated, gridSizeY, maxRows } = useContext(GridContext);
  // const [quadrants, setQuadrants] = useState([]);
  
  const rows = Array.from({length: maxRows});

  const generateQuadrants = () => {
    const quadrantsLength = 270 / quadrantAngle;
    let _quadrants = [];
    console.log("Generating quadrants");
    for (let i = 0; i < quadrantsLength; i++) {
      const quadrantRowZeroMiddlePosition = getPointOnACircle(toRadians(- 45 * i - 22.5), radius, 0.1);
      const quadrantMovePosition = getPointOnACircle(toRadians(- 45 * i - 22.5), radius + 1.3, 0.1);
      const quadrantDistanceToMove = [quadrantMovePosition[0] - quadrantRowZeroMiddlePosition[0], 0, quadrantMovePosition[2] - quadrantRowZeroMiddlePosition[2]];
      
      _quadrants.push({
        index: i,
        startingAngle: quadrantAngle * i,
        pullbackPosition:  quadrantDistanceToMove,
       
      });
    }
    setQuadrantsGenerated(true);
   return _quadrants;
  }

  const generateGeometries = () => {
    let geometries = [];
    for (let i = 0; i < maxRows; i++) {
      geometries[i] = pavementMeshGenerator({startingAngle: 0, segmentThetaAngle: 45, radius: 8.1 + i * gridSizeY, gridSizeY});
    }
    return geometries;
  }
  const quadrants = useMemo(() => generateQuadrants(), []);
  const geometries = useMemo(() => generateGeometries(), []);
  console.log(geometries);
  return (
    <group>
      {/* {quadrants.map(quadrant => <Quadrant {...quadrant}></Quadrant>)} */}
      {/* {rows.map(row => ( */}
        {geometries.map((row, index) => (
          <>
            <Instances castShadow receiveShadow range={100}>
              <DefaultMaterial />
              <extrudeGeometry 
                {...geometries[index]}
              />
              {quadrants.map(quadrant => <>
                <group position={quadrant.pullbackPosition}>
                  <Instance scale={1} position={[0,0.01,0]} rotation={[toRadians(270), toRadians(0), toRadians(-quadrant.startingAngle)]}/>
                </group>
              </>)}
            </Instances>
          </>
        ))
        }
    
    </group>
  );
};


export default Quadrants;