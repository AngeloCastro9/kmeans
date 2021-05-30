import dataset from '../dataset';

export function getRandomPoints(points) {
  const randomPoints = [];
  for (let i = 0; i < dataset.quantityClusters; i += 1) {
    const randomIndex = Math.floor((Math.random() * points.length));
    randomPoints.push(points[randomIndex]);
  }
  return randomPoints;
}

export function calculateAverageFromCluster(cluster) {
  const sumsAllPoints = cluster.points.reduce((accumulatedPoints, currentPoint) => (
    [accumulatedPoints[0] + currentPoint[0], accumulatedPoints[1] + currentPoint[1]]
  ));
  const numberOfPoints = cluster.points.length;
  const avgAllPoints = [
    parseFloat((sumsAllPoints[0] / numberOfPoints).toFixed(1)),
    parseFloat((sumsAllPoints[1] / numberOfPoints).toFixed(1)),
  ];
  return avgAllPoints;
}

export function calculateGeometricDistance(point1, point2) {
  return Math.sqrt(Math.abs(((point2[0] - point2[0]) ** 2) - ((point2[1] - point1[1]) ** 2)));
}
