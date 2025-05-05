/*------ Sidebar & Responsive Behavior ------*/
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const mainContainer = document.querySelector(".main-container");
  const toggleButton = document.getElementById("toggleSidebar");

  // Toggle sidebar on button click
  toggleButton.addEventListener("click", function (e) {
    e.stopPropagation();
    sidebar.classList.toggle("hidden");
    mainContainer.classList.toggle("shifted");
    // For mobile devices: toggle overlay if needed
    if (window.innerWidth <= 767) {
      document.body.classList.toggle("sidebar-open", !sidebar.classList.contains("hidden"));
    }
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (event) {
    if (
      window.innerWidth <= 767 &&
      !sidebar.contains(event.target) &&
      !toggleButton.contains(event.target) &&
      !sidebar.classList.contains("hidden")
    ) {
      sidebar.classList.add("hidden");
      document.body.classList.remove("sidebar-open");
    }
  });

  // Active state for non-layer sidebar links (ignore links inside boundaries submenu)
  const allNavLinks = document.querySelectorAll("#sidebar .nav-link");
  allNavLinks.forEach((link) => {
    if (link.closest("#boundariesSubmenu")) return;
    link.addEventListener("click", function () {
      allNavLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      if (window.innerWidth <= 767) {
        sidebar.classList.add("hidden");
        document.body.classList.remove("sidebar-open");
      }
    });
  });

  // Adjust on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 767 && !sidebar.classList.contains("hidden")) {
      mainContainer.classList.remove("shifted");
      document.body.classList.add("sidebar-open");
    } else if (window.innerWidth > 767 && !sidebar.classList.contains("hidden")) {
      mainContainer.classList.add("shifted");
      document.body.classList.remove("sidebar-open");
    }
  });
});

/*------ Chart & Data Setup ------*/
const ndviDataLocal = {
  labels: [
    "Jan-2016",
    "Jul-2016",
    "Jan-2017",
    "Jul-2017",
    "Jan-2018",
    "Jul-2018",
    "Jan-2019",
    "Jul-2019",
    "Jan-2020",
    "Jul-2020",
    "Jan-2021",
    "Jul-2021",
    "Jan-2022",
    "Jul-2022",
    "Jan-2023"
  ],
  datasets: [
    {
      label: "Upper NDVI",
      data: [0.72, 0.74, 0.73, 0.70, 0.67, 0.65, 0.62, 0.75, 0.70, 0.72, 0.71, 0.71, 0.70, 0.63, 0.45],
      borderColor: "#00ffff",
      backgroundColor: "#00ffff",
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: "Lower NDVI",
      data: [0.22, 0.22, 0.23, 0.23, 0.22, 0.20, 0.22, 0.22, 0.23, 0.24, 0.23, 0.23, 0.22, 0.22, 0.17],
      borderColor: "yellow",
      backgroundColor: "yellow",
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
};

const mangroveDataLocal = {
  labels: [1973, 1980, 1990, 2000, 2013, 2023],
  datasets: [
    {
      label: "Bare Area",
      data: [5, 5, 5, 5, 5, 12],
      borderColor: "#f000ff",
      backgroundColor: "#f000ff",
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: "Dense Mangrove",
      data: [68, 56, 62, 63, 55, 20],
      borderColor: "#ffe700",
      backgroundColor: "#ffe700",
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: "Sparse Mangrove",
      data: [24, 36, 30, 29, 37, 65],
      borderColor: "#74ee15",
      backgroundColor: "#74ee15",
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: "Water",
      data: [3, 3, 3, 3, 3, 3],
      borderColor: "#3b82f6",
      backgroundColor: "#3b82f6",
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
};

function getChartConfig(data, title) {
  return {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      plugins: {
        legend: {
          labels: { color: "#fff" },
        },
        title: {
          display: true,
          text: title,
          color: "#fff",
          font: { size: 16 },
          padding: { top: 10, bottom: 20 },
        },
        tooltip: {
          backgroundColor: "#114d03",
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: "#fff",
          borderWidth: 1,
          displayColors: true,
          titleFont: { weight: "bold" },
        },
      },
      scales: {
        x: {
          ticks: { color: "#fff" },
          grid: { color: "#fff" },
        },
        y: {
          ticks: { color: "#fff" },
          grid: { color: "#fff" },
          title: {
            display: true,
            text: title.includes("NDVI") ? "NDVI Value" : "Area (%)",
            color: "#10b981",
          },
        },
      },
    },
  };
}

const ctx = document.getElementById("seaLevelChart").getContext("2d");
let chart;
let currentChartType = "ndvi";

function setChartToggle(type) {
  currentChartType = type;
  const btnNDVI = document.getElementById("toggle-ndvi");
  const btnMang = document.getElementById("toggle-mangrove");
  if (type === "ndvi") {
    btnNDVI.classList.add("btn-light");
    btnNDVI.classList.remove("btn-outline-light");
    btnMang.classList.remove("btn-light");
    btnMang.classList.add("btn-outline-light");
  } else {
    btnMang.classList.add("btn-light");
    btnMang.classList.remove("btn-outline-light");
    btnNDVI.classList.remove("btn-light");
    btnNDVI.classList.add("btn-outline-light");
  }
  if (chart) chart.destroy();
  chart = new Chart(
    ctx,
    getChartConfig(
      type === "ndvi" ? ndviDataLocal : mangroveDataLocal,
      type === "ndvi" ? "NDVI Time Series (Local)" : "Mangrove Area Change (Local)"
    )
  );
  chart.update();
}

document.getElementById("toggle-ndvi").addEventListener("click", () => setChartToggle("ndvi"));
document.getElementById("toggle-mangrove").addEventListener("click", () => setChartToggle("mangrove"));
setChartToggle("ndvi");

/*------ Mapbox Single Map Setup ------*/
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FyaW0yNDAiLCJhIjoiY2xxbnZhbGNtMWNtZzJrcDl2amk5bndjbiJ9.K-VQe8qVvIij9URoQR0WaA";
const mapView = { center: [69.3451, 30.3753], zoom: 4 };
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-streets-v12",
  center: mapView.center,
  zoom: mapView.zoom,
});

map.on("load", () => {
  // National Boundary
  map.addSource("nationalBoundary", {
    type: "vector",
    scheme: "tms",
    tiles: [
      "http://172.18.1.170:8080/geoserver/gwc/service/tms/1.0.0/abdul_sattar:National_Boundary@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
    ],
  });
  map.addLayer({
    id: "nationalBoundary",
    type: "line",
    source: "nationalBoundary",
    "source-layer": "National_Boundary",
    layout: { visibility: "none" },
    paint: { "line-opacity": 0.8, "line-color": "black", "line-width": 2 },
  });

  // Provincial Boundary
  map.addSource("provincialBoundary", {
    type: "vector",
    scheme: "tms",
    tiles: [
      "http://172.18.1.170:8080/geoserver/gwc/service/tms/1.0.0/abdul_sattar:Provincial_Boundary@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
    ],
  });
  map.addLayer({
    id: "provincialBoundary",
    type: "line",
    source: "provincialBoundary",
    "source-layer": "Provincial_Boundary",
    layout: { visibility: "none" },
    paint: { "line-opacity": 0.8, "line-color": "green", "line-width": 2 },
  });

  // District Boundary
  map.addSource("districtBoundary", {
    type: "vector",
    scheme: "tms",
    tiles: [
      "http://172.18.1.170:8080/geoserver/gwc/service/tms/1.0.0/abdul_sattar:District_Boundary@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
    ],
  });
  map.addLayer({
    id: "districtBoundary",
    type: "line",
    source: "districtBoundary",
    "source-layer": "District_Boundary",
    layout: { visibility: "none" },
    paint: { "line-opacity": 0.8, "line-color": "purple", "line-width": 1.5 },
  });

  map.addLayer({
    id: "districtBoundary_label",
    type: "symbol",
    source: "districtBoundary",
    "source-layer": "District_Boundary",
    minzoom: 6,
    layout: {
      visibility: "none",
      "text-field": "{DISTRICT}",
      "text-letter-spacing": 0.1,
      "text-size": 12,
      "text-offset": [0, 0],
      "text-anchor": "center",
    },
    paint: { "text-color": "purple", "text-halo-color": "#000000" },
  });

  // Tehsil Boundary
  map.addSource("tehsilBoundary", {
    type: "vector",
    scheme: "tms",
    tiles: [
      "http://172.18.1.170:8080/geoserver/gwc/service/tms/1.0.0/abdul_sattar:Tehsil_Boundary@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
    ],
  });
  map.addLayer({
    id: "TehsilBoundaryLine",
    type: "line",
    source: "tehsilBoundary",
    "source-layer": "Tehsil_Boundary",
    layout: { visibility: "none" },
    paint: { "line-opacity": 0.8, "line-color": "black", "line-width": 1 },
  });

  // Raster layer example (e.g., layer2013)
  map.addSource("layer2013", {
    type: "raster",
    tiles: [
      "http://192.168.11.136:8080/geoserver/test/wms?service=WMS&version=1.1.1&request=GetMap&layers=test:2013_mangroves&transparent=true&format=image/png&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}"
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: "layer2013",
    type: "raster",
    source: "layer2013",
  });
});

/*---- Map Control Buttons ----*/
document.getElementById("zoomInBtn").addEventListener("click", () => {
  map.zoomIn();
});
document.getElementById("zoomOutBtn").addEventListener("click", () => {
  map.zoomOut();
});
document.getElementById("fullscreenBtn").addEventListener("click", () => {
  const container = document.getElementById("mapSingleContainer");
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => console.error(err));
  } else {
    document.exitFullscreen();
  }
});

/*---- Indus Delta Slider Functionality ----*/
let indusDeltaTimer = null;
// Update the Indus Delta layer using the new file naming.
// Now the layer name is simply the year (e.g. 2017, 2018, etc.), and the URL
// is built using your tested 2017 link as the model.
function updateIndusDeltaLayer(year) {
  // Remove the old layer if it exists.
  if (map.getLayer("indusDelta")) {
    map.removeLayer("indusDelta");
    map.removeSource("indusDelta");
  }
  const url = `http://192.168.11.136:8080/geoserver/Indus_Delta/wms?service=WMS&version=1.1.0&request=GetMap&layers=Indus_Delta:${year}&transparent=true&format=image/png&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}`;
  map.addSource("indusDelta", {
    type: "raster",
    tiles: [url],
    tileSize: 512,
  });
  map.addLayer({
    id: "indusDelta",
    type: "raster",
    source: "indusDelta",
  });
}

// Listen for manual slider changes.
document
  .getElementById("indusDeltaSlider")
  .addEventListener("input", function () {
    const year = this.value;
    document.getElementById("indusDeltaYearLabel").textContent = year;
    updateIndusDeltaLayer(year);
  });

// Listen for play/pause button events.
document
  .getElementById("indusDeltaPlayPauseBtn")
  .addEventListener("click", function () {
    if (indusDeltaTimer) {
      clearInterval(indusDeltaTimer);
      indusDeltaTimer = null;
      this.textContent = "Play";
    } else {
      this.textContent = "Pause";
      indusDeltaTimer = setInterval(function () {
        const slider = document.getElementById("indusDeltaSlider");
        let currentYear = parseInt(slider.value);
        if (currentYear < parseInt(slider.max)) {
          slider.value = currentYear + 1;
        } else {
          slider.value = slider.min;
        }
        const newYear = slider.value;
        document.getElementById("indusDeltaYearLabel").textContent = newYear;
        updateIndusDeltaLayer(newYear);
      }, 2000);
    }
  });

// Add event listeners for the National Layers submenu.
document.querySelectorAll("#nationalSubmenu .nav-link").forEach((link) => {
  if (link.textContent.trim() === "Indus Delta") {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sliderContainer = document.getElementById("indusDeltaSliderContainer");
      // Toggle the slider container visibility.
      if (sliderContainer.style.display === "none" || sliderContainer.style.display === "") {
        sliderContainer.style.display = "flex";
        this.classList.add("active");
        // Initialize the slider and update the layer.
        document.getElementById("indusDeltaSlider").value = 2017;
        document.getElementById("indusDeltaYearLabel").textContent = "2017";
        updateIndusDeltaLayer(2017);
      } else {
        sliderContainer.style.display = "none";
        this.classList.remove("active");
        // Remove the Indus Delta layer.
        if (map.getLayer("indusDelta")) {
          map.removeLayer("indusDelta");
          map.removeSource("indusDelta");
        }
        // Stop auto-play if active.
        if (indusDeltaTimer) {
          clearInterval(indusDeltaTimer);
          indusDeltaTimer = null;
          document.getElementById("indusDeltaPlayPauseBtn").textContent = "Play";
        }
      }
    });
  } else {
    // For Option 2 and Option 3, hide the slider if visible.
    link.addEventListener("click", function (e) {
      const sliderContainer = document.getElementById("indusDeltaSliderContainer");
      if (sliderContainer) {
        sliderContainer.style.display = "none";
      }
    });
  }
});

/*------ Toggle Boundary Layers in Sidebar ------*/
document.querySelectorAll("#boundariesSubmenu .nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const text = this.textContent.trim();
    if (text === "National Boundary") {
      toggleLayer("nationalBoundary");
      updateLinkActive(this, "nationalBoundary");
    } else if (text === "Provincial Boundary") {
      toggleLayer("provincialBoundary");
      updateLinkActive(this, "provincialBoundary");
    } else if (text === "District Boundary") {
      // Toggle both district boundary and its label.
      toggleLayer("districtBoundary");
      toggleLayer("districtBoundary_label");
      updateLinkActive(this, "districtBoundary");
    } else if (text === "Tehsil Boundary") {
      toggleLayer("TehsilBoundaryLine");
      updateLinkActive(this, "TehsilBoundaryLine");
    }
  });
});

function toggleLayer(layerId) {
  const current = map.getLayoutProperty(layerId, "visibility");
  map.setLayoutProperty(layerId, "visibility", current === "none" ? "visible" : "none");
}

function updateLinkActive(link, layerId) {
  const visibility = map.getLayoutProperty(layerId, "visibility");
  if (visibility === "visible") {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
}
