import L from 'leaflet';
import markerIcon2x from '/assets/leaflet/marker-icon-2x.png';
import markerIcon from '/assets/leaflet/marker-icon.png';
import markerShadow from '/assets/leaflet/marker-shadow.png';

import layers from '/assets/leaflet/layers.png';
import layers2x from '/assets/leaflet/layers-2x.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
