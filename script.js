//Toggling of sidebar
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const mainContainer = document.querySelector('.main-container');
  const toggleButton = document.getElementById('toggleSidebar');
  
  toggleButton.addEventListener('click', function() {
    sidebar.classList.toggle('hidden');
    mainContainer.classList.toggle('shifted');
    
    // For mobile devices, add overlay when sidebar is open
    if (window.innerWidth <= 767) {
      if (!sidebar.classList.contains('hidden')) {
        document.body.classList.add('sidebar-open');
      } else {
        document.body.classList.remove('sidebar-open');
      }
    }
  });
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 767 && 
        !sidebar.contains(event.target) && 
        !toggleButton.contains(event.target) && 
        !sidebar.classList.contains('hidden')) {
      sidebar.classList.add('hidden');
      document.body.classList.remove('sidebar-open');
    }
  });
  
  // Handle active state for nav links
  const navLinks = document.querySelectorAll('#sidebar .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
      
      // On mobile, close sidebar after clicking a link
      if (window.innerWidth <= 767) {
        sidebar.classList.add('hidden');
        document.body.classList.remove('sidebar-open');
      }
    });
  });
  
  // Adjust for window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 767 && !sidebar.classList.contains('hidden')) {
      mainContainer.classList.remove('shifted');
      document.body.classList.add('sidebar-open');
    } else if (window.innerWidth > 767 && !sidebar.classList.contains('hidden')) {
      mainContainer.classList.add('shifted');
      document.body.classList.remove('sidebar-open');
    }
  });
});

// === Data Definitions === //
// Local NDVI data
const ndviDataLocal = {
  labels: [
    'Jan-2016',
    'Jul-2016',
    'Jan-2017',
    'Jul-2017',
    'Jan-2018',
    'Jul-2018',
    'Jan-2019',
    'Jul-2019',
    'Jan-2020',
    'Jul-2020',
    'Jan-2021',
    'Jul-2021',
    'Jan-2022',
    'Jul-2022',
    'Jan-2023'
  ],
  datasets: [
    {
      label: 'Upper NDVI',
      data: [0.72, 0.74, 0.73, 0.70, 0.67, 0.65, 0.62, 0.75, 0.70, 0.72, 0.71, 0.71, 0.70, 0.63, 0.45],
      borderColor: '#00ffff',
      backgroundColor: '#00ffff',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Lower NDVI',
      data: [0.22, 0.22, 0.23, 0.23, 0.22, 0.20, 0.22, 0.22, 0.23, 0.24, 0.23, 0.23, 0.22, 0.22, 0.17],
      borderColor: 'yellow',
      backgroundColor: 'yellow',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    }
  ]
};

// Local Mangrove data
const mangroveDataLocal = {
  labels: [1973, 1980, 1990, 2000, 2013, 2023],
  datasets: [
    {
      label: 'Bare Area',
      data: [5, 5, 5, 5, 5, 12],
      borderColor: '#f000ff',
      backgroundColor: '#f000ff',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Dense Mangrove',
      data: [68, 56, 62, 63, 55, 20],
      borderColor: '#ffe700',
      backgroundColor: '#ffe700',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Sparse Mangrove',
      data: [24, 36, 30, 29, 37, 65],
      borderColor: '#74ee15',
      backgroundColor: '#74ee15',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Water',
      data: [3, 3, 3, 3, 3, 3],
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    }
  ]
};

// Global NDVI data
const ndviDataGlobal = {
  labels: ndviDataLocal.labels.slice(),
  datasets: [
    {
      label: 'Upper NDVI (Global)',
      data: [0.60, 0.62, 0.61, 0.58, 0.55, 0.53, 0.50, 0.65, 0.60, 0.62, 0.61, 0.60, 0.58, 0.50, 0.40],
      borderColor: '#ff7f50',
      backgroundColor: '#ff7f50',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Lower NDVI (Global)',
      data: [0.18, 0.18, 0.19, 0.20, 0.18, 0.17, 0.18, 0.19, 0.20, 0.21, 0.20, 0.19, 0.18, 0.17, 0.15],
      borderColor: '#adff2f',
      backgroundColor: '#adff2f',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    }
  ]
};

// Global Mangrove data
const mangroveDataGlobal = {
  labels: mangroveDataLocal.labels.slice(),
  datasets: [
    {
      label: 'Bare Area (Global)',
      data: [10, 12, 15, 18, 20, 25],
      borderColor: '#ff1493',
      backgroundColor: '#ff1493',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Dense Mangrove (Global)',
      data: [50, 48, 45, 40, 35, 30],
      borderColor: '#ffd700',
      backgroundColor: '#ffd700',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Sparse Mangrove (Global)',
      data: [30, 35, 40, 45, 50, 55],
      borderColor: '#32cd32',
      backgroundColor: '#32cd32',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Water (Global)',
      data: [10, 5, 0, 0, 0, 0],
      borderColor: '#1e90ff',
      backgroundColor: '#1e90ff',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    }
  ]
};

// === Chart Configuration Helper ===
function getChartConfig(data, title) {
  return {
    type: 'line',
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      plugins: {
        legend: { labels: { color: '#fff' } },
        title: {
          display: true,
          text: title,
          color: '#fff',
          font: { size: 16 },
          padding: { top: 10, bottom: 20 }
        },
        tooltip: {
          backgroundColor: '#2fff00ad',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#fff',
          borderWidth: 1,
          displayColors: true,
          titleFont: { weight: 'bold' }
        }
      },
      scales: {
        x: { ticks: { color: '#fff' }, grid: { color: '#fff' } },
        y: {
          ticks: { color: '#fff' },
          grid: { color: '#fff' },
          title: {
            display: true,
            text: title.includes('NDVI') ? 'NDVI Value' : 'Area (%)',
            color: '#10b981'
          }
        }
      }
    }
  };
}

// === Chart Initialization ===
const ctxLocal = document.getElementById('seaLevelChartLocal').getContext('2d');
const ctxGlobal = document.getElementById('seaLevelChartGlobal').getContext('2d');
let chartLocal, chartGlobal;

// State variables to track current view and chart type
let currentView = 'local'; // 'local' or 'global'
let currentChartType = 'ndvi'; // 'ndvi' or 'mangrove'

// Updated setChartToggle function: updates only the visible chart based on currentView
function setChartToggle(type) {
  currentChartType = type;
  // Button styling
  const btnNDVI = document.getElementById('toggle-ndvi');
  const btnMang = document.getElementById('toggle-mangrove');
  if (type === 'ndvi') {
    btnNDVI.classList.add('btn-light');
    btnNDVI.classList.remove('btn-outline-light');
    btnMang.classList.remove('btn-light');
    btnMang.classList.add('btn-outline-light');
  } else {
    btnMang.classList.add('btn-light');
    btnMang.classList.remove('btn-outline-light');
    btnNDVI.classList.remove('btn-light');
    btnNDVI.classList.add('btn-outline-light');
  }
  
  // Update chart only for the active view
  if (currentView === 'local') {
    if (chartLocal) chartLocal.destroy();
    chartLocal = new Chart(
      ctxLocal,
      getChartConfig(
        type === 'ndvi' ? ndviDataLocal : mangroveDataLocal,
        type === 'ndvi' ? 'NDVI Time Series (Local)' : 'Mangrove Area Change (Local)'
      )
    );
    chartLocal.update();
  } else {
    if (chartGlobal) chartGlobal.destroy();
    chartGlobal = new Chart(
      ctxGlobal,
      getChartConfig(
        type === 'ndvi' ? ndviDataGlobal : mangroveDataGlobal,
        type === 'ndvi' ? 'NDVI Time Series (Global)' : 'Mangrove Area Change (Global)'
      )
    );
    chartGlobal.update();
  }
}

// Attach chart toggle listeners
document.getElementById('toggle-ndvi').addEventListener('click', () => setChartToggle('ndvi'));
document.getElementById('toggle-mangrove').addEventListener('click', () => setChartToggle('mangrove'));

// Initial render for local view
setChartToggle('ndvi');

// === Mapbox + Compare Setup ===
mapboxgl.accessToken =
 'pk.eyJ1Ijoic2FyaW0yNDAiLCJhIjoiY2xxbnZhbGNtMWNtZzJrcDl2amk5bndjbiJ9.K-VQe8qVvIij9URoQR0WaA';
const localView = { center: [69.3451, 30.3753], zoom: 4 };
const globalView = { center: [30.3451, 15.3753], zoom: 1.5 };

// - Local Maps
const beforeMapLocal = new mapboxgl.Map({
  container: 'beforeLocal',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: localView.center,
  zoom: localView.zoom
});
const afterMapLocal = new mapboxgl.Map({
  container: 'afterLocal',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: localView.center,
  zoom: localView.zoom
});
beforeMapLocal.on('load', () => {
  beforeMapLocal.addSource('layer2013', {
    type: 'raster',
    tiles: [
      "http://192.168.164.136:8080/geoserver/test/wms?" +
        "service=WMS&version=1.1.1&request=GetMap&layers=test:2013_mangroves" +
        "&transparent=true&format=image/png&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}"
    ],
    tileSize: 256
  });
  beforeMapLocal.addLayer({ id: 'layer2013', type: 'raster', source: 'layer2013' });
});
afterMapLocal.on('load', () => {
  afterMapLocal.addSource('layer2024', {
    type: 'raster',
    tiles: [
      "http://192.168.164.136:8080/geoserver/test/wms?" +
        "service=WMS&version=1.1.1&request=GetMap&layers=test:2023_Mangroves" +
        "&transparent=true&format=image/png&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}"
    ],
    tileSize: 256
  });
  afterMapLocal.addLayer({ id: 'layer2024', type: 'raster', source: 'layer2024' });
});
const compareLocal = new mapboxgl.Compare(beforeMapLocal, afterMapLocal, '#comparison-container-local');

// - Global Maps
const beforeMapGlobal = new mapboxgl.Map({
  container: 'beforeGlobal',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: globalView.center,
  zoom: globalView.zoom
});
const afterMapGlobal = new mapboxgl.Map({
  container: 'afterGlobal',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: globalView.center,
  zoom: globalView.zoom
});
beforeMapGlobal.on('load', () => {
  beforeMapGlobal.addSource('layer2013Global', {
    type: 'raster',
    tiles: [
      "http://192.168.164.136:8080/geoserver/test/wms?" +
        "service=WMS&version=1.1.1&request=GetMap&layers=test:2013_mangroves" +
        "&transparent=true&format=image/png&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}"
    ],
    tileSize: 256
  });
  beforeMapGlobal.addLayer({ id: 'layer2013Global', type: 'raster', source: 'layer2013Global' });
});
afterMapGlobal.on('load', () => {
  afterMapGlobal.addSource('layer2024Global', {
    type: 'raster',
    tiles: [
      "http://192.168.164.136:8080/geoserver/test/wms?" +
        "service=WMS&version=1.1.1&request=GetMap&layers=test:2023_Mangroves" +
        "&transparent=true&format=image/png&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}"
    ],
    tileSize: 256
  });
  afterMapGlobal.addLayer({ id: 'layer2024Global', type: 'raster', source: 'layer2024Global' });
});
const compareGlobal = new mapboxgl.Compare(beforeMapGlobal, afterMapGlobal, '#comparison-container-global');

// === Fullscreen Toggle ===
document.getElementById('fullscreenBtn').addEventListener('click', () => {
  const container = document.getElementById('mapSingleContainer');
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => console.error(err));
  } else {
    document.exitFullscreen();
  }
});

// === View Toggle (Local / Global) ===
const globalBtn = document.getElementById('global-toggle');
const localBtn = document.getElementById('local-toggle');
function setViewButtonState(activeBtn, inactiveBtn) {
  activeBtn.classList.add('btn-light');
  activeBtn.classList.remove('btn-outline-light');
  inactiveBtn.classList.remove('btn-light');
  inactiveBtn.classList.add('btn-outline-light');
}
globalBtn.addEventListener('click', () => {
  setViewButtonState(globalBtn, localBtn);
  // swap maps
  document.getElementById('mapContainerLocal').style.display = 'none';
  document.getElementById('mapContainerGlobal').style.display = 'block';
  // swap charts
  document.getElementById('seaLevelChartLocal').style.display = 'none';
  document.getElementById('seaLevelChartGlobal').style.display = 'block';
  // update current view and reinitialize chart for global view
  currentView = 'global';
  setChartToggle(currentChartType);
  // force redraw + center slider
  requestAnimationFrame(() => {
    beforeMapGlobal.resize();
    afterMapGlobal.resize();
    compareGlobal.setSlider(0.5);
  });
});
localBtn.addEventListener('click', () => {
  setViewButtonState(localBtn, globalBtn);
  document.getElementById('mapContainerGlobal').style.display = 'none';
  document.getElementById('mapContainerLocal').style.display = 'block';
  document.getElementById('seaLevelChartGlobal').style.display = 'none';
  document.getElementById('seaLevelChartLocal').style.display = 'block';
  // update current view and reinitialize chart for local view
  currentView = 'local';
  setChartToggle(currentChartType);
  requestAnimationFrame(() => {
    beforeMapLocal.resize();
    afterMapLocal.resize();
    compareLocal.setSlider(0.5);
  });
});
// Initialize to Local view
setViewButtonState(localBtn, globalBtn);
document.getElementById('mapContainerGlobal').style.display = 'none';
document.getElementById('seaLevelChartGlobal').style.display = 'none';


