import { useEffect, useState } from "react";
import { fetchCoordinates } from "../allfetchrequests/fetch"

export default function Search({setLat, setLng, setMsg}) {

    const [city, setCity] = useState("");

    function handleChange(e) {
        setCity(e.target.value);
    }

    async function handleClick(e) {
        e.preventDefault();
        const {coordinates} = await fetchCoordinates(city);
        try {
            setLat(coordinates.lat);
            setLng(coordinates.lng);
            setMsg(coordinates.msg);
        }
        catch(err) {
            //do nothing
        }
    } 

    return (
        <div className="
            flex flex-row justify-between
        ">
        <form noValidate={true} className="flex lg:ml-5 justify-center items-center space-x-2">
            <input onChange={handleChange} value={city} type="text" placeholder="Search City ..." className="
                w-[75vw] h-[8vh] p-3
                lg:w-[40vw]
                bg-[rgb(0,0,0)] rounded-[5px]
                text-white
            "/>
            <button className="
                w-[20vw] h-[8vh]
                md:text-2xl
                lg:w-[10vw] lg:text-3xl
                flex justify-center items-center
                font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-900 via-purple-400 to-amber-300
                hover:drop-shadow-xl hover:drop-shadow-[rgb(84,84,84)]
                transition-all duration-500
            " 
            id="searchButton" onClick={handleClick}>
                Search
            </button>
        </form>
        </div>
    )
}