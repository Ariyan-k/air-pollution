import Result from "../components/result";
import Mapcontainer from "../components/map-container";
import Userquerydisplay from "../components/User-query-display";
import Search from "../components/Search";
import { fetchHomepage } from "../allfetchrequests/fetch";
import { useEffect, useState } from "react";

export default function Homepage() {

    const [lat, setLat] = useState(28.7041);
    const [lng, setLng] = useState(77.1025);
    const [reqCity, setReqCity] = useState("(city)"); //to set city in displays like result and user-query when user clicks on search button.
    const [reqTime, setReqTime] = useState("00:00"); //to set time of request in user request display.
    const [isValidAuth, setIsValidAuth] = useState("");

    useEffect(() => {
        const authHeader = localStorage.getItem('Authorization');
        if (authHeader) {
            async function wrapper() {
                const token = authHeader.split(" ")[1];
                const data = await fetchHomepage(token);
                setIsValidAuth(data);
            }
            wrapper();
        }
        else setIsValidAuth("Error: Bad request.");
    }, []);

    if (isValidAuth === "authOK")
    return (
        <div className="
            lg:p-5
            flex justify-center items-center overflow-hidden gap-y-5 lg:gap-x-5 
            flex-col
            lg:flex lg:flex-row
        ">
            <Mapcontainer lat={lat} lng={lng}/>
            <div className="
                w-auto h-[40vh]
                lg:w-auto lg:h-[80vh] 
                flex flex-col items-baseline
            ">
                <div className="h-full lg:h-[80vh] flex justify-between flex-col space-y-3">
                    <Result reqCity={reqCity}/>
                    <Userquerydisplay reqCity={reqCity} reqTime={reqTime}/>
                    <Search setLat={setLat} setLng={setLng} setReqCity={setReqCity} setReqTime={setReqTime}/>
                </div>
            </div>
        </div>
    )
    else return (
        <div className="h-[60vh] w-[100vw] font-extrabold text-2xl bg-black text-white flex justify-center items-center">
            {isValidAuth}
        </div>
    )
}