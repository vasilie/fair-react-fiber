export const getLengthBetweenTwoPointsOnACircle = (angle, radius) => {
  return angle / 360 * 2 * Math.PI * radius;
}

export const getAngleFromLengthAndRadius = (length, radius) => {
  return length / (2 * Math.PI * radius)  * 360;
}

export const getPointOnACircle = (angle, radius, y = 0.5) => [radius * Math.sin(angle), y, radius * Math.cos(angle)];

export const toRadians = (angle) => angle * Math.PI / 180;
export const toDegrees = (radianAngle) => radianAngle / (Math.PI / 180);