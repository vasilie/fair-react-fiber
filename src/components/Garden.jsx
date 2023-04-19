import { useContext } from "react";
import { getPointOnACircle, toRadians } from "../lib/helpers/math";
import { GridContext } from "../Contexts/GridContext";
import { WaterRegion } from "./models/WaterRegion";
import { Theatre } from "./models/Theatre";
import { Tree1 } from "./models/Tree1";
import { Tree2 } from "./models/Tree2";
import { Tree3 } from "./models/Tree3";
import { Tree4 } from "./models/Tree4";

const Garden = () => {
  const { radius } = useContext(GridContext);
  const gardenMiddleZeroPosition = getPointOnACircle(toRadians(45), radius, 0.1);
  const gardenMovePosition = getPointOnACircle(toRadians(45), radius + 0.8, 0.1);
  const gardenDistanceToMove = [gardenMovePosition[0] - gardenMiddleZeroPosition[0], 0, gardenMovePosition[2] - gardenMiddleZeroPosition[2]];

  return (
    <group position={gardenDistanceToMove}>
      <WaterRegion position={[0, 0.01, 0]} scale={20} rotation={[0, toRadians(90), 0]}/>
      <Theatre position={[14.3, 0.01, 14.4]} scale={8} rotation={[0, toRadians(45), 0]} />
      <Tree2 position={[5.3, 0.01, 12.4]} scale={17}/>
      <Tree3 position={[6.3, 0.01, 10.4]} scale={17}/>
      <Tree3 position={[5.3, 0.01, 18.4]} scale={17}/>
      <Tree2 position={[3.3, 0.01, 18.4]} scale={17}/>
      <Tree1 position={[5.3, 0.01, 20.4]} scale={17}/>
      <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/>
      {console.log("Garden was rendered at", new Date().toLocaleTimeString())}
      <group position={[7, 0, -7]}>
        <Tree1 position={[8.3, 0.01, 10.4]} scale={17}/>
        <Tree2 position={[2.3, 0.01, 12.4]} scale={17}/>
        <Tree3 position={[6.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[4.3, 0.01,8.4]} scale={17}/>
        <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/>
      </group>
      <group position={[17, 0, -7]}>
        <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
        <Tree2 position={[0.3, 0.01, 8.4]} scale={17}/>
        <Tree3 position={[6.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[4.3, 0.01,8.4]} scale={17}/>
        <Tree4 position={[3.3, 0.01, 10.4]} scale={17}/>
      </group>
      <group position={[27, 0, -7]}>
        <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
        <Tree2 position={[8.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[6.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
      </group>
      <group position={[27, 0, 20]}>
        <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
        <Tree2 position={[8.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[6.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
      </group>
      <group position={[16, 0, 16]}>
        <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
        <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
      </group>
      <group position={[10, 0, 20]}>
        <Tree1 position={[11.3, 0.01, 6.4]} scale={17}/>
        <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
      </group>
      <group position={[32, 0, 0]}>
        <Tree1 position={[9.3, 0.01, 8.4]} scale={17}/>
        <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
      </group>
      <group position={[-2, 0, 32]}>
        <Tree1 position={[4.3, 0.01, 8.4]} scale={17}/>
        <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
      </group>
      <group position={[-2, 0, 20]}>
        <Tree1 position={[9.3, 0.01, 12.4]} scale={17}/>
        <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[3.3, 0.01,8.4]} scale={17}/>
        <Tree4 position={[5.3, 0.01, 6.4]} scale={17}/>
      </group>
      <group position={[22, 0, 6]}>
        <Tree1 position={[2.3, 0.01, 13.4]} scale={17}/>
        <Tree2 position={[5.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[7.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[5.3, 0.01,8.4]} scale={17}/>
        <Tree4 position={[5.3, 0.01, 6.4]} scale={17}/>
      </group>
      <group position={[36, 0, 8]}>
        <Tree1 position={[2.3, 0.01, 13.4]} scale={17}/>
        <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
        <Tree3 position={[3.3, 0.01,6.4]} scale={17}/>
        <Tree4 position={[5.3, 0.01, 3.4]} scale={17}/>
      </group>
      <group position={[26, 0, 22]} >
        <Tree1 position={[2.3, 0.01, 13.4]} scale={17}/>
        <Tree2 position={[3.3, 0.01, 10.4]} scale={17}/>
      </group>
      <group position={[20, 0, 26]} >
        <Tree1 position={[3.3, 0.01, 13.4]} scale={17}/>
        <Tree2 position={[6.3, 0.01, 11.4]} scale={17}/>
        <Tree2 position={[0.3, 0.01, 13.4]} scale={17}/>
        <Tree3 position={[-2.3, 0.01, 16.4]} scale={17}/>
        <Tree4 position={[-8.3, 0.01, 17.4]} scale={17}/>
      </group>
    </group>
  );
}

export default Garden;