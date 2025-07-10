import { useEffect, useState } from "react";
import { fetchCoordinates } from "../allfetchrequests/fetch";

export default function Search({ setLat, setLng, setMsg }) {
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
      setMsg(coordinates.msg);
    } catch (err) {
      // handle error silently
    }
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 py-5 w-full justify-center items-center">
      <form
        noValidate={true}
        className="flex justify-center items-center space-x-4"
      >
        <input
          onChange={handleChange}
          value={city}
          type="text"
          placeholder="Search city"
          className="
            w-[75vw] lg:w-[40vw]
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
            h-[7vh]
            px-9
            text-lg md:text-xl lg:text-2xl
            text-red-400
            font-bold uppercase tracking-wider
            bg-clip-text
            border border-neutral-700 rounded-md
            hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]
            transition-all duration-300
          "
        >
          Search
        </button>
      </form>
    </div>
  );
}
