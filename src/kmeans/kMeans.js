import {
  getRandomPoints,
  calculateGeometricDistance,
  calculateAverageFromCluster,
} from './calculations/index.js';
import dataset from './dataset';

function createClusters(centroids, points) {
  const clusters = centroids.map((centroid) => (
    { centroid, points: [] }
  ));
  points.forEach((point) => {
    const distances = clusters.map((cluster) => (
      { cluster, distance: calculateGeometricDistance(point, cluster.centroid) }
    ));
    const closestCluster = distances.reduce((previousValue, currentValue) => (
      (previousValue.distance < currentValue.distance
        ? previousValue.cluster
        : currentValue.cluster)
    ));
    closestCluster.points.push(point);
  });
  return clusters;
}

function getCentroidsFromClustersPoints(clusters) {
  return clusters.map((cluster) => (
    calculateAverageFromCluster(cluster)
  ));
}

export default function kMeans(previousClusters = null) {
  const executions = [];
  let centroids = [];
  if (previousClusters === null) {
    centroids = getRandomPoints(dataset.points);
  } else {
    centroids = getCentroidsFromClustersPoints(previousClusters);
  }
  let end = false;
  if (previousClusters) {
    end = centroids.every((centroid, idx) => {
      const lastCentroid = previousClusters[idx].centroid;
      if (centroid[0] === lastCentroid[0] && centroid[1] === lastCentroid[1]) {
        return true;
      }
      return false;
    });
  }
  if (!end) {
    const clusters = createClusters(centroids, dataset.points);
    executions.push(clusters);
    const nextExecutions = kMeans(clusters);
    if (nextExecutions.length > 0) {
      executions.push(...nextExecutions);
    }
  }
  return executions;
}
