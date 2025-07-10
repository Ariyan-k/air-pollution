import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import { useEffect, useState } from 'react';

export default function Mapcontainer({ lat, lng, setLat, setLng, msg }) {
  const [markerPos, setMarkerPos] = useState([lat, lng]);

  const heatPoints = [
    [28.7041, 77.1025, 0.9], [19.0760, 72.8777, 0.85], [13.0827, 80.2707, 0.75],
    [22.5726, 88.3639, 0.8], [26.8467, 80.9462, 0.7], [23.0225, 72.5714, 0.6],
    [12.9716, 77.5946, 0.55], [21.1458, 79.0882, 0.65], [17.3850, 78.4867, 0.75],
    [25.5941, 85.1376, 0.65], [24.5854, 73.7125, 0.55], [11.0168, 76.9558, 0.5],
    [18.5204, 73.8567, 0.7], [15.2993, 74.1240, 0.45], [27.1767, 78.0081, 0.6],
    [30.7333, 76.7794, 0.65], [31.1048, 77.1734, 0.5], [34.0837, 74.7973, 0.4],
    [22.7196, 75.8577, 0.7], [20.2961, 85.8245, 0.65], [10.8505, 76.2711, 0.5],
    [23.3441, 85.3096, 0.7], [26.9124, 75.7873, 0.6], [29.9457, 78.1642, 0.5],
    [21.1702, 72.8311, 0.65], [24.8887, 74.6269, 0.6], [32.7266, 74.8570, 0.45],
    [27.8974, 78.0880, 0.6], [24.7998, 84.9814, 0.7], [23.8315, 91.2868, 0.6],
    [26.1445, 91.7362, 0.7],
  ];

  function HeatLayer() {
    const map = useMap();
    useEffect(() => {
      const layer = L.heatLayer(heatPoints, {
        radius: 40,
        blur: 30,
        maxZoom: 10,
        minOpacity: 0.4,
        gradient: {
          0.2: 'blue',
          0.4: 'lime',
          0.6: 'orange',
          0.8: 'red',
          1.0: 'maroon',
        },
      });
      layer.addTo(map);

      return () => {
        map.removeLayer(layer);
      };
    }, [map]);
    return null;
  }

  function ClickHandler() {
    useMapEvents({
      click(e) {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        setMarkerPos([clickLat, clickLng]);
      },
    });
    return null;
  }

  // Keep marker in sync with props
  useEffect(() => {
    if (!msg) {
      setMarkerPos([lat, lng]);
    }
  }, [lat, lng, msg]);

  return (
    <div className="
      w-[95vw] h-[40vh]
      lg:w-[90vw] lg:h-[80vh]
      bg-white rounded-md shadow-xl
      flex justify-center items-center overflow-hidden
      text-black
    ">
      <MapContainer
        center={[lat, lng]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPos} />
        <ClickHandler />
        <HeatLayer />
      </MapContainer>
    </div>
  );
}
