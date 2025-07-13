import { useEffect, useState } from "react";
import { fetchCoordinates } from "../allfetchrequests/fetch";

export default function Search({ setLat, setLng, setReqCity, setReqTime }) {
  const [city, setCity] = useState("");

  function handleChange(e) {
    setCity(e.target.value);
  }
  
  const now = new Date();

  async function handleClick(e) {
    e.preventDefault();
    setReqCity(city);
    const time = `${now.getHours()}:${now.getMinutes()}`;
    setReqTime(time);
    const { coordinates } = await fetchCoordinates(city);
    try {
      setLat(coordinates.lat);
      setLng(coordinates.lng);
    } catch (err) {
      alert("Invalid search.");
    }
  }

  return (
    <div className="w-[95vw] lg:w-[50vw] flex justify-center items-center">
      <form noValidate={true} className="flex w-full space-x-3">
        <div className="w-[65vw] h-[7vh] p-0.5 rounded-[5px] bg-gradient-to-tr from-indigo-600 via-pink-600 to-purple-600">
            <input
            onChange={handleChange}
            value={city}
            type="text"
            placeholder="Search city ..."
            className="
                flex-grow
                w-full h-full
                p-5
                text-[12px] md:text-xl lg:text-2xl
                bg-black 
                rounded-[5px]
                text-white placeholder:text-neutral-500
            "
            />
        </div>
        <div className="h-[7vh] w-[30vw] p-0.5 rounded-[5px] bg-gradient-to-tr from-indigo-600 via-pink-600 to-purple-600">
            <div className="h-full w-full bg-black rounded-[5px]">
                <button
                id="searchButton"
                onClick={handleClick}
                className="
                    p-4
                    w-full h-full
                    flex justify-center items-center
                    text-[12px] md:text-xl lg:text-2xl
                    font-bold uppercase tracking-wider
                    rounded-[5px]
                    bg-gradient-to-tr from-indigo-600 via-pink-600 to-purple-600
                    bg-clip-text text-transparent
                    whitespace-nowrap
                "
                >
                Search
                </button>
            </div>
        </div>
      </form>
    </div>
  );
}
