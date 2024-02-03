interface CartesianPoint {
  x: number
  y: number
}

export function getDistanceBetweenTwoPoints(
  pointA: CartesianPoint,
  pointB: CartesianPoint,
): number {
  if (pointA.x === pointB.x && pointA.y === pointB.y) return 0

  return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y)
}
