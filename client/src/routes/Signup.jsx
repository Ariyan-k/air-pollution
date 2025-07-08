import Signupform from "../components/signupform";
import Showcase from "../components/Showcase";

export default function Signup() {
    return (
        <div className="
             h-[80vh]
            flex flex-col justify-between items-center
            lg:flex-row lg:justify-evenly lg:items-center
        ">
            <Showcase/>
            <Signupform/>
        </div>
    )
}