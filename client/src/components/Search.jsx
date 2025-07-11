import { useEffect, useState } from "react";
import { fetchCoordinates } from "../allfetchrequests/fetch";

export default function Search({ setLat, setLng }) {
  const [city, setCity] = useState("");

  function handleChange(e) {
    setCity(e.target.value);
  }

  async function handleClick(e) {
    e.preventDefault();
    const { coordinates } = await fetchCoordinates(city);
    try {
      setLat(coordinates.lat);
      setLng(coordinates.lng);
    } catch (err) {
      alert("Invalid search.");
    }
  }

  return (
    <div className="w-[95vw] lg:w-[50vw] ml-5 py-4 flex justify-center items-center">
      <form noValidate={true} className="flex w-full space-x-3">
        <input
          onChange={handleChange}
          value={city}
          type="text"
          placeholder="Search city"
          className="
            flex-grow
            h-[7vh]
            px-5
            text-lg md:text-xl lg:text-2xl
            bg-black border border-neutral-700
            rounded-md
            text-white placeholder:text-neutral-500
            focus:outline-none focus:ring-1 focus:ring-amber-400
            transition-all duration-300 ease-in-out
          "
        />
        <button
          id="searchButton"
          onClick={handleClick}
          className="
            px-6
            h-[7vh]
            text-lg md:text-xl lg:text-2xl
            text-red-400
            font-bold uppercase tracking-wider
            bg-clip-text
            border border-neutral-700 rounded-md
            hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]
            transition-all duration-300
            whitespace-nowrap
          "
        >
          Search
        </button>
      </form>
    </div>
  );
}
