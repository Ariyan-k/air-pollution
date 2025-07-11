import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'

export default function Mapcontainer({lat, lng}) {

    let markerRef = useRef(null);

    //useRef will keep map safe from re-renders.
    const mapRef = useRef(null);

    useEffect(() => {
        mapRef.current = L.map('map');

        mapRef.current.on('click', (e) => {
            const clickLat = e.latlng.lat;
            const clickLng = e.latlng.lng;
            if (markerRef.current) {
                mapRef.current.removeLayer(markerRef.current);
                markerRef.current = null;
            }
            markerRef.current = L.marker([clickLat, clickLng]);
            markerRef.current.addTo(mapRef.current);
        });
    }, []);

    useEffect(() => {
        mapRef.current.setView([lat, lng], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapRef.current);

        if (markerRef.current !== null) {
            mapRef.current.removeLayer(markerRef.current);
            markerRef.current = null;
        }
        markerRef.current = L.marker([lat, lng]);
        markerRef.current.addTo(mapRef.current);

    }, [lat, lng]);

    return (
        <div id='map' className="
            w-[95vw] h-[40vh]
            lg:w-[50vw] lg:h-[80vh]
            bg-[rgb(205,205,205)] rounded-[5px] shadow-2xs shadow-gray-700 hover:shadow-2xl transition-all duration-500
            flex justify-center items-center overflow-hidden
            text-black

        "></div>
    )
}
