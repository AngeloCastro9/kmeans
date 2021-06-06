import dataset from '../dataset';

export function getRandomPoints(points) {
  const randomPoints = [];
  let pointsToBeSelected = [...points];
  for (let i = 0; i < dataset.quantityClusters; i += 1) {
    const randomIndex = Math.floor((Math.random() * pointsToBeSelected.length));
    randomPoints.push(pointsToBeSelected[randomIndex]);
    pointsToBeSelected.splice(randomIndex, 1)
  }
  
  return randomPoints;
}

export function calculateAverageFromCluster(cluster) {
  let sumsAllPoints = [0, 0];
  if (cluster.points.length > 1) {
    sumsAllPoints = cluster.points.reduce((accumulatedPoints, currentPoint) => (
      [accumulatedPoints[0] + currentPoint[0], accumulatedPoints[1] + currentPoint[1]]
    ));
  }
  if (cluster.points.length === 1) {
    sumsAllPoints = [cluster.points[0][0], cluster.points[0][1]]
  }
  let numberOfPoints = cluster.points.length;
  if (numberOfPoints === 0) {
    numberOfPoints = 1;
  }

  const avgAllPoints = [
    sumsAllPoints[0] / numberOfPoints,
    sumsAllPoints[1] / numberOfPoints,
  ];
  if (avgAllPoints[0] > 0) {
    avgAllPoints[0].toFixed(1);
  }
  if (avgAllPoints[1] > 0) {
    avgAllPoints[1].toFixed(1);
  }
  return avgAllPoints;
}

export function calculateGeometricDistance(point1, point2) {
  return Math.sqrt(Math.abs(((point2[0] - point2[0]) ** 2) - ((point2[1] - point1[1]) ** 2)));
}
