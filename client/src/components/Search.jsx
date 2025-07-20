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
    <div
      className="
        absolute bottom-[35vh] left-[5vw] z-[1000] w-[95vw] pb-2
        lg:static lg:flex lg:justify-center lg:items-center lg:rounded-[5px] lg:w-[50vw] lg:pb-0
      "
    >
      <form
        noValidate={true}
        className="flex w-full space-x-[-3px] lg:space-x-3"
      >
        <div
          className="
            h-[4vh] w-[62.5vw] p-[1px] rounded-[5px]
            lg:h-[6vh] lg:bg-gradient-to-br from-red-500 via-orange-500 to-red-500
          "
        >
          <input
            onChange={handleChange}
            value={city}
            type="text"
            spellCheck={false}
            placeholder="Search city ..."
            className="
              flex items-center w-full h-full p-4
              text-[12px] md:text-[16px] lg:text-[20px] text-black placeholder:text-gray-700
              backdrop-blur-[1px] focus:outline-none rounded-[5px] rounded-r-none border-r-0 border-2 border-gray-400
              lg:bg-black lg:text-white lg:placeholder-white lg:placeholder:text-[20px] lg:rounded-[5px] lg:backdrop-blur-none lg:border-none
            "
          />
        </div>

        <div
          className="
            h-[4vh] w-[27.5vw] p-[1px] rounded-[5px]
            lg:h-[6vh] lg:bg-gradient-to-br from-red-500 via-orange-500 to-red-500
          "
        >
          <div className="h-full w-full rounded-[5px] lg:bg-black">
            <button
              id="searchButton"
              onClick={handleClick}
              className="
                flex justify-center items-center w-full h-full p-4
                text-[12px] md:text-[16px] lg:text-[20px] font-bold uppercase tracking-wider text-black
                backdrop-blur-[1px] rounded-[5px] rounded-l-none border-l-0 border-2 border-gray-400 whitespace-nowrap
                lg:bg-gradient-to-tr from-red-700 via-orange-900 to-red-700 lg:bg-clip-text lg:text-transparent lg:rounded-[5px] lg:backdrop-blur-none lg:border-none
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
