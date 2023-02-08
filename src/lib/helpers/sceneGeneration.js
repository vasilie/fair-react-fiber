export const generateCubes = (length, radius) =>
{ 
  let angles = [];
  let cubes = [];
  
  for (let i = 0; i < length; i++) {
    angles.push(i * 360 / length * Math.PI / 180);
  }
  
  for (let i = 0; i < length; i++) {
    cubes[i] = {
      position: [radius * Math.sin(angles[i]), 0.5, radius * Math.cos(angles[i])],
      rotation: [0, i * 360 / length * Math.PI / 180, 0],
    }
  }
  return cubes;
}