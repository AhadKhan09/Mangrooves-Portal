// -------- Sidebar & Responsive Behavior --------
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const mainContainer = document.querySelector('.main-container');
  const toggleButton = document.getElementById('toggleSidebar');

  // Toggle sidebar on button click
  toggleButton.addEventListener('click', function(e) {
    e.stopPropagation();
    sidebar.classList.toggle('hidden');
    mainContainer.classList.toggle('shifted');
    // For mobile devices: toggle overlay
    if (window.innerWidth <= 767) {
      document.body.classList.toggle('sidebar-open', !sidebar.classList.contains('hidden'));
    }
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
    if (
      window.innerWidth <= 767 &&
      !sidebar.contains(event.target) &&
      !toggleButton.contains(event.target) &&
      !sidebar.classList.contains('hidden')
    ) {
      sidebar.classList.add('hidden');
      document.body.classList.remove('sidebar-open');
    }
  });

  // Active state for sidebar submenu links
  const navLinks = document.querySelectorAll('#sidebar .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      if (window.innerWidth <= 767) {
        sidebar.classList.add('hidden');
        document.body.classList.remove('sidebar-open');
      }
    });
  });

  // Adjust on window resize
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

// -------- Chart & Data Setup --------
const ndviDataLocal = {
  labels: ['Jan-2016','Jul-2016','Jan-2017','Jul-2017','Jan-2018','Jul-2018','Jan-2019','Jul-2019','Jan-2020','Jul-2020','Jan-2021','Jul-2021','Jan-2022','Jul-2022','Jan-2023'],
  datasets: [
    {
      label: 'Upper NDVI',
      data: [0.72,0.74,0.73,0.70,0.67,0.65,0.62,0.75,0.70,0.72,0.71,0.71,0.70,0.63,0.45],
      borderColor: '#00ffff',
      backgroundColor: '#00ffff',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Lower NDVI',
      data: [0.22,0.22,0.23,0.23,0.22,0.20,0.22,0.22,0.23,0.24,0.23,0.23,0.22,0.22,0.17],
      borderColor: 'yellow',
      backgroundColor: 'yellow',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    }
  ]
};

const mangroveDataLocal = {
  labels: [1973,1980,1990,2000,2013,2023],
  datasets: [
    {
      label: 'Bare Area',
      data: [5,5,5,5,5,12],
      borderColor: '#f000ff',
      backgroundColor: '#f000ff',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Dense Mangrove',
      data: [68,56,62,63,55,20],
      borderColor: '#ffe700',
      backgroundColor: '#ffe700',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Sparse Mangrove',
      data: [24,36,30,29,37,65],
      borderColor: '#74ee15',
      backgroundColor: '#74ee15',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Water',
      data: [3,3,3,3,3,3],
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    }
  ]
};

function getChartConfig(data, title) {
  return {
    type: 'line',
    data: data,
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

const ctx = document.getElementById('seaLevelChart').getContext('2d');
let chart;
let currentChartType = 'ndvi';

function setChartToggle(type) {
  currentChartType = type;
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
  
  if (chart) chart.destroy();
  chart = new Chart(ctx, getChartConfig(
    type === 'ndvi' ? ndviDataLocal : mangroveDataLocal,
    type === 'ndvi' ? 'NDVI Time Series (Local)' : 'Mangrove Area Change (Local)'
  ));
  chart.update();
}

document.getElementById('toggle-ndvi').addEventListener('click', () => setChartToggle('ndvi'));
document.getElementById('toggle-mangrove').addEventListener('click', () => setChartToggle('mangrove'));
setChartToggle('ndvi');

// -------- Mapbox & Compare Setup --------
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyaW0yNDAiLCJhIjoiY2xxbnZhbGNtMWNtZzJrcDl2amk5bndjbiJ9.K-VQe8qVvIij9URoQR0WaA';
const mapView = { center: [69.3451, 30.3753], zoom: 4 };

const beforeMap = new mapboxgl.Map({
  container: 'before',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: mapView.center,
  zoom: mapView.zoom
});

const afterMap = new mapboxgl.Map({
  container: 'after',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: mapView.center,
  zoom: mapView.zoom
});

beforeMap.on('load', () => {
  beforeMap.addSource('layer2013', {
    type: 'raster',
    tiles: [
      "http://192.168.11.136:8080/geoserver/test/wms?" +
      "service=WMS&version=1.1.1&request=GetMap&layers=test:2013_mangroves" +
      "&transparent=true&format=image/png&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}"
    ],
    tileSize: 256
  });
  beforeMap.addLayer({
    id: 'layer2013',
    type: 'raster',
    source: 'layer2013'
  });
});

afterMap.on('load', () => {
  afterMap.addSource('layer2024', {
    type: 'raster',
    tiles: [
      "http://192.168.11.136:8080/geoserver/test/wms?" +
      "service=WMS&version=1.1.1&request=GetMap&layers=test:2023_Mangroves" +
      "&transparent=true&format=image/png&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}"
    ],
    tileSize: 256
  });
  afterMap.addLayer({
    id: 'layer2024',
    type: 'raster',
    source: 'layer2024'
  });
});

// Instantiate Mapbox Compare
const compare = new mapboxgl.Compare(beforeMap, afterMap, '#comparison-container');

// -------- Map Control Buttons --------
document.getElementById('zoomInBtn').addEventListener('click', () => {
  beforeMap.zoomIn();
  afterMap.zoomIn();
});

document.getElementById('zoomOutBtn').addEventListener('click', () => {
  beforeMap.zoomOut();
  afterMap.zoomOut();
});

document.getElementById('fullscreenBtn').addEventListener('click', () => {
  const container = document.getElementById('mapSingleContainer');
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => console.error(err));
  } else {
    document.exitFullscreen();
  }
});
