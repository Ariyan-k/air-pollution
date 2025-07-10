import L, { map, marker } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'

export default function Mapcontainer({lat, setLat, lng, setLng, msg}) {

    const countRef = useRef(0);
    useEffect(() => {
        countRef.current+=1;
    })

    let markerRef = useRef(null);

    //useRef will keep map safe from re-renders.
    const mapRef = useRef(null);
    
    //this will set map only once, componet might get re-rendered and trigger this but the if condition will keep our map safe.
    useEffect(() => {
        
        if (!mapRef.current) {
            mapRef.current = L.map('map')
            mapRef.current.setView([lat, lng], 7);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapRef.current);
        }
        //else do nothing

        if (!msg) {
            if (markerRef.current !== null) {
                mapRef.current.removeLayer(markerRef.current);
                markerRef.current = null;
            }
            
            markerRef.current = L.marker([lat, lng]);
            markerRef.current.addTo(mapRef.current);

            //set the tile layer for dynamic coords from user's input through search.
            mapRef.current.setView([lat, lng], 7);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapRef.current);

            mapRef.current.on('click', (e) => {
                if (markerRef.current) {
                    mapRef.current.removeLayer(markerRef.current);
                    markerRef.current = null;
                }
                let clickLat = e.latlng.lat;
                let clickLng = e.latlng.lng;
                markerRef.current = L.marker([clickLat, clickLng]);
                markerRef.current.addTo(mapRef.current);
            });
        
        }
        // else if (msg || lat !== null){
        //     alert("Couldn't find city, check for any typing erros.");
        // }

    },[lat, lng]);
    // this was hard ngl, but let's gooo it's finally done.

    return (
        <div id='map' className="
            w-[95vw] h-[40vh]
            lg:w-[50vw] lg:h-[80vh]
            bg-[rgb(205,205,205)] rounded-[5px] shadow-2xs shadow-gray-700 hover:shadow-2xl transition-all duration-500
            flex justify-center items-center overflow-hidden
            text-black

        ">
            
        </div>
    )
}
