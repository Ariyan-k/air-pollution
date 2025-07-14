import './fix-leaflet-icon';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster'; 
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
