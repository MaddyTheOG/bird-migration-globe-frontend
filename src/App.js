// src/App.js
import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import axios from "axios";

function App() {
  const globeRef = useRef();
  const speciesColors = {};

  const getColorForSpecies = (code) => {
    if (!speciesColors[code]) {
      const hue = Math.floor(Math.random() * 360);
      speciesColors[code] = `hsl(${hue}, 100%, 50%)`;
    }
    return speciesColors[code];
  };

  const loadBirdData = () => {
    const regions = ["US", "CA", "MX", "GB", "FR", "DE", "CN", "JP", "IN", "AU"];
    const allBirds = [];

    Promise.all(
      regions.map((region) =>
        axios.get(`https://bird-migration-globe-backend.onrender.com/birds/${region}`).then((res) => res.data)
      )
    ).then((results) => {
      results.forEach((birds) => {
        allBirds.push(...birds);
      });

      const minDistance = 0.3; // degrees


const repelPoint = (point) => {
  let tries = 0;
  while (placedPoints.some(p => distance(p, point) < minDistance) && tries < 100) {
    const angle = Math.random() * 2 * Math.PI;
    point.lat += Math.cos(angle) * 0.1;
    point.lng += Math.sin(angle) * 0.1;
    tries++;
  }
  return point;
};

const clusterMap = {};
const placedPoints = [];

const distance = (a, b) => {
  const dx = a.lat - b.lat;
  const dy = a.lng - b.lng;
  return Math.sqrt(dx * dx + dy * dy);
};

const repelOrCluster = (point) => {
  for (let p of placedPoints) {
    if (distance(p, point) < minDistance) {
      const key = `${p.lat.toFixed(4)},${p.lng.toFixed(4)}`;
      if (!clusterMap[key]) {
        clusterMap[key] = {
          lat: p.lat,
          lng: p.lng,
          count: 1,
          names: new Set([p.label]),
          color: p.color,
        };
        p._clustered = true;
      }
      clusterMap[key].count++;
      clusterMap[key].names.add(point.label);
      point._clustered = true;
      return null;
    }
  }
  placedPoints.push(point);
  return point;
};

const pointsRaw = allBirds.map((bird) => ({
  lat: bird.lat,
  lng: bird.lng,
  size: 1.2,
  color: getColorForSpecies(bird.speciesCode),
  label: `${bird.comName} (${bird.sciName})
${bird.locName} @ ${bird.obsDt}`,
}));

const uniquePoints = pointsRaw.map(repelOrCluster).filter(Boolean);
const clusters = Object.values(clusterMap).map((c) => ({
  lat: c.lat,
  lng: c.lng,
  size: Math.min(2.0, 0.3 + Math.log(c.count)),
  color: c.color,
  label: `${c.count} overlapping sightings:
${[...c.names].join('\n')}`,
}));

const pointsData = [...uniquePoints, ...clusters];

      globeRef.current
        .pointsData(pointsData)
        .pointAltitude(0.01)
        .pointRadius((d) => d.size * 3.2)
        .pointColor("color")
        .pointLabel((d) => d.label);

      function pulsePoints() {
        pointsData.forEach(d => d.size = 0.1 + Math.random() * 0.1);
        globeRef.current.pointRadius((d) => d.size);
        setTimeout(pulsePoints, 1000);
      }
      pulsePoints();
    });
  };

  useEffect(() => {
    globeRef.current = Globe()(document.getElementById("globeViz"))
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .width(window.innerWidth)
      .height(window.innerHeight);

    loadBirdData();
  }, []);

  return (
    <div>
      <div style={{ position: "absolute", zIndex: 2, padding: "1rem" }}>
        <h1 style={{ color: "white" }}>Global Bird Migration</h1>
        <p style={{ color: "white" }}>
          Pulsing species-colored dots show real-time migration
        </p>
      </div>
      <div id="globeViz" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
}

export default App;
