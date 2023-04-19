import { toRadians } from "../lib/helpers/math";
import { Line } from "@react-three/drei";
import { getPointOnACircle } from "../lib/helpers/math";
import { useContext, memo, useEffect, useState, useMemo } from "react";
import { GridContext } from "../Contexts/GridContext";
import Pavement from "./Pavement";

const Quadrant = ({startingAngle, pullbackPosition }) => {
  const { quadrantAngle, radius, maxRows, gridSizeY, debugGrid } = useContext(GridContext);
 
  const generatePavements = () => {
    console.log("generating single quadrant");
    let _pavements = [];
    for (let i = 0; i < maxRows; i++) {
      const pavementRadius = radius + gridSizeY * i;
      // _pavements[i] = <Pavement startingAngle={startingAngle} radius={pavementRadius}></Pavement>
      _pavements[i] = {startingAngle, radius: pavementRadius}
    }
    return _pavements;
  }

  const pavements = useMemo(() => generatePavements(), []);

  return (
    // <group >
    <group position={pullbackPosition}>
      {debugGrid && <>
        <Line color="purple" points={[[0,0.01,0], getPointOnACircle(toRadians(startingAngle), 3 * radius, 0.1)]} />
        <Line color="purple" points={[[0,0.01,0], getPointOnACircle(toRadians(startingAngle + quadrantAngle), 3 * radius, 0.1)]} />
      </>}
      {console.log("pavements were rendered at", new Date().toLocaleTimeString())}
      {pavements.map(pavement => <Pavement startingAngle={pavement.startingAngle} radius={pavement.radius}></Pavement>)}
    </group>
  );
};


Quadrant.propTypes = {

};

Quadrant.defaultProps = {

};

export default memo(Quadrant);