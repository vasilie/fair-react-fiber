import { toRadians, getPointOnACircle } from "./math";


export const generateCubes = (length, radius) =>
{ 
  let angles = [];
  let cubes = [];
  let linePoints = [];
  
  angles = generateAngles(length);
  
  for (let i = 0; i < length; i++) {
    const point = getPointOnACircle(angles[i], radius);

    cubes[i] = {
      position: point,
      rotation: [0, i * 360 / length * Math.PI / 180, 0],
    }
    linePoints[i] = point;
  }
  return cubes;
}

export const generateCurvedLinePoints = (segments, radius, angle = 30,  y = 0.01) => {
  const angles = generateAngles(segments, 1);
 
  const linePoints = [];
  for (let i = 0; i < segments; i++) {
    const point = getPointOnACircle(angles[i], radius, y);
    linePoints[i] = point;
  }
  if (angle === 360){
    linePoints.push(getPointOnACircle(angles[0], radius, y));
  }
  return linePoints;
}

export const generateAngles = (length, percentage = 1, offset = 0) => {
  let angles = [];
  for (let i = 0; i < length; i++) {
    angles.push(offset * Math.PI / 180 + i * 360 * percentage / length * Math.PI / 180);
  }
  return angles;
}



