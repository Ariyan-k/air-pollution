import Typewriter from "./typewriter-effect"
import { Link } from "react-router-dom"

export default function Title () {
    return (
        <>
        <div className="
            drop-shadow-[2px_1px_0_white]
            titleBg
            text-3xl
            lg:text-6xl lg:pb-5
            w-[100vw] h-auto pt-3 pb-7
            flex justify-center
            text-transparent bg-clip-text
            font-extrabold font-sans 
        ">
            <Typewriter text={"Airlytics"} delay={200}/>
        </div>
        </>
    )
}