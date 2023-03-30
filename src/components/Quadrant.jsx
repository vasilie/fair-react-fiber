import { toRadians } from "../lib/helpers/math";
import { Line } from "@react-three/drei";
import { getPointOnACircle } from "../lib/helpers/math";
import { useContext } from "react";
import { GridContext } from "../Contexts/GridContext";
import Pavement from "./Pavement";

const Quadrant = ({startingAngle, pullbackPosition }) => {
  const { quadrantAngle, radius, maxRows, gridSizeY, debugGrid } = useContext(GridContext);
  const pavements = [];

  for (let i = 0; i < maxRows; i++) {
    const pavementRadius = radius + gridSizeY * i;
    pavements[i] = <Pavement startingAngle={startingAngle} radius={pavementRadius}></Pavement>
  }

  return (
    // <group >
    <group position={pullbackPosition}>
      {debugGrid && <>
        <Line color="purple" points={[[0,0.01,0], getPointOnACircle(toRadians(startingAngle), 3 * radius, 0.1)]} />
        <Line color="purple" points={[[0,0.01,0], getPointOnACircle(toRadians(startingAngle + quadrantAngle), 3 * radius, 0.1)]} />
      </>}
      {pavements}
    </group>
  );
}


Quadrant.propTypes = {

};

Quadrant.defaultProps = {

};

export default Quadrant;