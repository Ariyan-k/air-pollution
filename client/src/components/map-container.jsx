import L, { map } from 'leaflet';
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
    const popupRef = useRef(null);

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
            const aqi = heatdata.respectiveAqi; //an array of aqis.
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
                    0.1: '#00bfff', 
                    0.2: '#00ffff',  
                    0.3: '#00ff80',   
                    0.4: '#7fff00', 
                    0.5: '#ffff00', 
                    0.6: '#ffbf00',   
                    0.7: '#ff8000',   
                    0.8: '#ff4000',   
                    0.9: '#ff0000',
                    1.0: '#800000'   
                },
            });

            heatlayerRef.current.addTo(mapRef.current);

            mapRef.current.on('zoomend', () => {
                mapRef.current.removeLayer(heatlayerRef.current);
                const zoom = mapRef.current.getZoom();
                if (zoom <= 4) {
                    mapRef.current.removeLayer(heatlayerRef.current);
                    // mapRef.current.removeLayer(markerLayer);
                }
                else {
                    heatlayerRef.current.addTo(mapRef.current);
                    // markerLayer.addTo(mapRef.current);
                }
            });

            //bind aqi markers - 
            const markers = [];
            console.log(heatdata.respectiveAqi[1]);
            console.log(heatdata.heatpoints[1][0], heatdata.heatpoints[1][1]);
            for (let i = 0; i < heatdata.respectiveAqi.length; i++) {
                const marker = L.marker([heatdata.heatpoints[i][0], heatdata.heatpoints[i][1]], {opacity: 0})
                    .bindTooltip(`AQI: ${heatdata.respectiveAqi[i]}`, { permanent: true, direction: 'center', className: 'my-label' })
                markers.push(marker);
            }
            const markerLayer = L.markerClusterGroup();
            markerLayer.addLayers(markers);
            markerLayer.addTo(mapRef.current);

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
                    w-[95vw] h-[55vh]
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
