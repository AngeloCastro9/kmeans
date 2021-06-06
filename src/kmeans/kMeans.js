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
    const closestCluster = distances.reduce((previousValue, currentValue) => {
      if (previousValue.distance < currentValue.distance) {
        return previousValue;
      }
      return currentValue;
      });
    closestCluster.cluster.points.push(point);
  });
  return clusters;
}

function getCentroidsFromClustersPoints(clusters) {
  return clusters.map((cluster) => (
    calculateAverageFromCluster(cluster)
  ));
}

export default function kMeans(previousClusters = null, index=0) {
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
    if (index < 20) {
    const clusters = createClusters(centroids, dataset.points);
    executions.push(clusters);
      const nextExecutions = kMeans(clusters, index+1);
      if (nextExecutions.length > 0) {
        executions.push(...nextExecutions);
      }
    } else {
      console.log("deu erro");
    }
  }
  return executions;
}
