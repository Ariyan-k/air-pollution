import Loginform from "../components/loginform";
import Showcase from "../components/Showcase";

export default function Login() {
    return(
        <div className="
            h-[80vh]
            flex flex-col justify-between items-center
            lg:flex-row lg:justify-evenly lg:items-center
        ">
            <Showcase/>
            <Loginform/>
        </div>
    )
}