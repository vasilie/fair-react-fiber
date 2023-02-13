export const getLengthBetweenTwoPointsOnACircle = (angle, radius) => {
  return angle / 360 * 2 * Math.PI * radius;
}

export const getAngleFromLengthAndRadius = (length, radius, snapAngle = 45) => {
  const angle = length / (2 * Math.PI * radius)  * 360;

  if (360 % angle === 0){
    return angle;
  } else {
    const divisions = Math.floor(snapAngle / angle);
    const correction = snapAngle - divisions * angle;
    return angle + correction / divisions;
  }
}

export const getPointOnACircle = (angle, radius, y = 0.5) => [radius * Math.sin(angle), y, radius * Math.cos(angle)];

export const toRadians = (angle) => angle * Math.PI / 180;
export const toDegrees = (radianAngle) => radianAngle / (Math.PI / 180);