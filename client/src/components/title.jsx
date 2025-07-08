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
            w-[100vw] h-auto p-5 pb-10
            flex justify-center
            text-transparent bg-clip-text bg-gradient-to-br from-orange-600 via-amber-900 to-amber-950
            font-extrabold font-sans 
        ">
            <Typewriter text={"Airlytics"} delay={200}/>
        </div>
        </>
    )
}