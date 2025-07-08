import Result from "../components/result";
import Mapcontainer from "../components/map-container";
import Title from "../components/title";
import Userquerydisplay from "../components/User-query-display";
import Search from "../components/Search";
import { fetchHomepage } from "../allfetchrequests/fetch";
import { useEffect, useState } from "react";
import { isValid } from "zod";

export default function Homepage() {

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
    }, [isValidAuth]);

    if (isValidAuth === "authOK")
    return (
        <div className="
            lg:p-5
            flex justify-center items-center overflow-hidden
            flex-col
            lg:flex lg:flex-row
        ">
            <Mapcontainer/>
            <div className="
                w-auto h-[40vh]
                lg:w-auto lg:h-[80vh] 
                flex flex-col items-baseline
            ">
                <Result/>
                <Userquerydisplay/>
                <Search/>
            </div>
        </div>
    )
    else return (
        <div className="h-[60vh] w-[100vw] font-extrabold text-2xl bg-black text-white flex justify-center items-center">
            {isValidAuth}
        </div>
    )
}