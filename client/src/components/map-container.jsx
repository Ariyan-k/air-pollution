import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Mapcontainer() {

    return (
        <div className="
            w-[95vw] h-[40vh]
            lg:w-[50vw] lg:h-[80vh]
            bg-[rgb(205,205,205)] rounded-[5px] shadow-2xs shadow-gray-700 hover:shadow-2xl transition-all duration-500
            flex justify-center items-center overflow-hidden
            text-black

        ">
            <MapContainer center={[28.7041, 77.1025]} zoom={7} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[28.7041, 77.1025]}>
                    <Popup>
                        AQI: xyz
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}