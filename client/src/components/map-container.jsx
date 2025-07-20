import L, { map, marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { useEffect, useRef, useState } from 'react';
import { fetchArea, fetchHeatpointsandaqis } from '../allfetchrequests/fetch';
import AboutHeatmap from './aboutHeatmap';
import { fetchWeather } from '../allfetchrequests/fetch';

export default function Mapcontainer({ lat, lng, setReqCity, setReqTime }) {

    //date time to be passed as props
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    let markerRef = useRef(null);
    const mapRef = useRef(null);
    const heatlayerRef = useRef(null);
    const popupRef = useRef(null);

    useEffect(() => {
        mapRef.current = L.map('map');

        mapRef.current.on('click', async (e) => {

            const now = new Date();

            const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
            setReqTime(time);

            const clickLat = e.latlng.lat;
            const clickLng = e.latlng.lng;

            const area = await fetchArea(clickLat, clickLng);
            const displayName = area.display_name;
            setReqCity((area.address.state_district));

            if (markerRef.current) {
                mapRef.current.removeLayer(markerRef.current);
                markerRef.current = null;
            }
            markerRef.current = L.marker([clickLat, clickLng], {opacity: 0});
            
            const data = await fetchWeather(e.latlng);


            const temp = `${data.current.temperature_2m}${data.current_units.temperature_2m}`;
            const apparentTemp = `${data.current.apparent_temperature}${data.current_units.apparent_temperature}`;
            const relHumidity = `${data.current.relative_humidity_2m}${data.current_units.relative_humidity_2m}`;
            const precipitation = `${data.current.precipitation}${data.current_units.precipitation}`;

            markerRef.current.bindTooltip(`<b>${displayName}</b><br/><b>Temp</b>: ${temp}<br/><b>Feels like:</b> ${apparentTemp}<br/><b>Relative Humidity:</b> ${relHumidity}<br/><b>Precipitation:</b> ${precipitation}`, { permanent: true, direction: 'center', className: 'my-label' });

            markerRef.current.addTo(mapRef.current);
        });

    }, []);

    //for heatlayer
    useEffect(() => {
        async function wrapper() {
            const heatdata = await fetchHeatpointsandaqis();
            setDate(heatdata.date);
            setTime(heatdata.time);
            const heatpoints = heatdata.heatpoints;
            const aqi = heatdata.aqis; //an array of aqis.
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
                }
                else {
                    heatlayerRef.current.addTo(mapRef.current);
                }
            });

            //bind aqi markers - 
            const markers = [];
            for (let i = 0; i < heatdata.aqis.length; i++) {
                const marker = L.marker([heatdata.heatpoints[i][0], heatdata.heatpoints[i][1]], {opacity: 0})
                    .bindTooltip(`AQI: ${heatdata.aqis[i]}`, { permanent: true, direction: 'center', className: 'my-label' })
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
        mapRef.current.setView([lat, lng], 9);

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
