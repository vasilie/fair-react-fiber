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

export const generateSectorPath = (length, radius) => {
  const angles = generateAngles(length, 0.352, -6);
  const linePoints = [];
  for (let i = 0; i < length; i++) {
    const point = getPointOnACircle(angles[i], radius - .7, 0.01);
    linePoints[i] = point;
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


export const getPointOnACircle = (angle, radius, y = 0.5) => [radius * Math.sin(angle), y, radius * Math.cos(angle)];