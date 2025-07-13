import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { useEffect, useRef, useState } from 'react';
import { fetchHeatdata } from '../allfetchrequests/fetch';
import AboutHeatmap from './aboutHeatmap';

export default function Mapcontainer({ lat, lng }) {

    //date time to be passed as props
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    let markerRef = useRef(null);
    const mapRef = useRef(null);
    const heatlayerRef = useRef(null);

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

    //for heatlayer
    useEffect(() => {
        async function wrapper() {
            const heatdata = await fetchHeatdata();
            setDate(heatdata.date);
            setTime(heatdata.time);
            const heatpoints = heatdata.heatpoints;
            if(heatlayerRef.current) {
                map.removeLayer(heatlayerRef.current);
                heatlayerRef.current = null;
            }
            heatlayerRef.current = L.heatLayer(heatpoints, {
                radius: 30,
                blur: 30,
                maxZoom: 6,
                minOpacity: 0.4,
                gradient: {
                    0.2: '#add8e6',
                    0.3: '#00ff00',
                    0.5: '#ffff00',
                    0.7: '#ffa500', 
                    0.9: '#ff0000',
                    1.0: '#800000', 
                },
            });

            mapRef.current.on('zoomend', () => {
                const zoom = mapRef.current.getZoom();
                if (zoom <= 4) mapRef.current.removeLayer(heatlayerRef.current);
                else heatlayerRef.current.addTo(mapRef.current);
            });
        }
        wrapper();
    }, []);

    //for search
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
        <>
            <div
                id='map'
                className="
                    w-[95vw] h-[40vh]
                    lg:w-[90vw] lg:h-[80vh]
                    bg-white rounded-md shadow-xl relative
                    text-black
                "
            >
                <AboutHeatmap date={date} time={time}/>
            </div>
            
        </>
    );
}
