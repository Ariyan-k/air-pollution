import Result from "../components/result";
import Mapcontainer from "../components/map-container";
import Title from "../components/title";
import Userquerydisplay from "../components/User-query-display";
import Search from "../components/Search";
import { fetchHomepage } from "../allfetchrequests/fetch";
import { useEffect, useState } from "react";
import { isValid } from "zod";



export default function Homepage() {

    const [lat, setLat] = useState(28.7041);
    const [lng, setLng] = useState(77.1025);
    const [msg, setMsg] = useState({});
    const [isValidAuth, setIsValidAuth] = useState("");

    useEffect(() => {
    }, [lat, lng, msg]);

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
    }, [isValidAuth]);

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
                <div className="h-[80vh] flex flex-col justify-between">
                    <Result/>
                    <Userquerydisplay/>
                    <Search setLat={setLat} setLng={setLng}/>
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