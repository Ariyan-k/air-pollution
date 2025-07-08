import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import Inputbox from "./inputbox"
import { loginValidation } from "../authentication/validation";
import { fetchLogin } from "../allfetchrequests/fetch";


export default function Loginform() {

    const [username, setUsername] = useState("");
    const [usernameErr, setUsernameErr] = useState("");

    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const [disabled, setDisabled] = useState(true);
    let isValidUsername = useRef(false);
    let isValidPassword = useRef(false);

    const Navigate = useNavigate();

    useEffect(() => {
        if(isValidUsername.current === true && isValidPassword.current === true)
            setDisabled(false);
        else setDisabled(true);
    }, [isValidUsername.current, isValidPassword.current]);

    function handleClick(e) {
        e.preventDefault();
        fetchLogin(username, password)
            .then(async (msg) => {
                if (msg && msg !== "Incorrect password" && msg !== "User does not exist, sign up to continue") {
                    await localStorage.setItem('Authorization', `Bearer ${msg}`);
                    Navigate('/Homepage');
                }
                else if (msg === "Incorrect password") alert(msg);
                else {alert(msg); Navigate('/signup');}
            });
    }

    function handleChange(e, key, setKey, setErr, isValidKey) {
        setKey(e.target.value);
        const keySchema = loginValidation.shape[key];
        const isValid = keySchema.safeParse(e.target.value);
        if (!isValid.success) {
            setErr(isValid.error.issues[0].message);
            isValidKey.current = false;
        }
        else {
            setErr("");
            isValidKey.current = true;
        }
    }
    
    return(
        <div className="flex flex-col items-center">
        <form noValidate={true} className="flex items-center flex-col space-y-1">
            <Inputbox type="text" name="username" placeholder="Username" onChange={(e) => {handleChange(e, "username", setUsername, setUsernameErr, isValidUsername)}} err={usernameErr}/>
            <Inputbox type="password" name="" placeholder="Password" onChange={(e) => {handleChange(e, "password", setPassword, setPasswordErr, isValidPassword)}} err={passwordErr}/>
            <button onClick={handleClick} disabled={disabled}
                className="
                    curson-pointer
                    w-[80vw] h-[6vh]
                    md:w-[30vw]
                    lg:w-[30vw]
                    p-5
                    flex justify-center items-center
                    border-2 border-white rounded-[5px] text-white
                    disabled:border-[rgb(168,168,168)] disabled:text-[rgb(148,148,148)]
                "
            >Log in</button>
        </form>
        <Link to="/signup" className="p-5 text-blue-700 text-[12px] flex justify-self-center">Do not have an account? Click here to Sign Up.</Link>
        </div>
    )
}