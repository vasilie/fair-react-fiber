import Pavement from "./Pavement";
import { toRadians } from "../lib/helpers/math";
import Quadrant from "./Quadrant";
import { useContext, useState, useEffect, memo } from "react";
import { GridContext } from "../Contexts/GridContext";
import { getPointOnACircle } from "../lib/helpers/math";


const Quadrants = memo(function Quadrants() {
  
  const { quadrantAngle, radius, quadrantsGenerated, setQuadrantsGenerated } = useContext(GridContext);
  const [quadrants, setQuadrants] = useState([]);
  
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

  useEffect(()=>{
    if (!quadrantsGenerated) {
      setQuadrants(generateQuadrants());
    }
    
  },[]);

  return (
    <group>
      {quadrants.map(quadrant => <Quadrant {...quadrant}></Quadrant>)}
    </group>
  );
});


Quadrants.propTypes = {

};

Quadrants.defaultProps = {

};

export default Quadrants;