import Inputbox from "./inputbox";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupValidation } from '../authentication/validation'
import { Link } from "react-router-dom";
import { fetchSignup } from "../allfetchrequests/fetch";

export default function Signupform() {

    const [username, setUsername] = useState("");
    const [usernameErr, setUsernameErr] = useState("");

    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const [disabled, setDisabled] = useState(true);
    let isValidUsername = useRef(false);
    let isValidEmail = useRef(false);
    let isValidPassword = useRef(false);

    const Navigate = useNavigate();

    useEffect(() => {
        if(isValidUsername.current === true && isValidEmail.current === true && isValidPassword.current === true)
            setDisabled(false);
        else setDisabled(true);
    }, [isValidUsername.current, isValidEmail.current, isValidPassword.current]);

    function handleChange(e, key, setKey, setErr, isValidKey) {
        setKey(e.target.value);
        const keySchema = signupValidation.shape[key];
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

    function handleClick(e) {
        e.preventDefault();
        fetchSignup(username, email, password)
            .then(msg => {
                alert(msg);
                if (msg === "Account created successfully, redirecting to login page.") Navigate('/');
            });
    }

    return(
        <div className="flex flex-col items-center">
            <form noValidate={true} className="flex items-center flex-col space-y-1">
                <Inputbox type="text" name="username" placeholder="Username" onChange={(e) => {handleChange(e, "username", setUsername, setUsernameErr, isValidUsername)}} err={usernameErr}/>
                <Inputbox type="text" name="email" placeholder="Email" onChange={(e) => {handleChange(e, "email", setEmail, setEmailErr, isValidEmail)}} err={emailErr}/>
                <Inputbox type="password" name="password" placeholder="Password" onChange={(e) => {handleChange(e, "password", setPassword, setPasswordErr, isValidPassword)}} err={passwordErr}/>
                <button onClick={handleClick} disabled={disabled}
                className="
                    curson-pointer
                    w-[80vw] h-[6vh]
                    md:w-[40vw]
                    lg:w-[30vw]
                    p-5
                    flex justify-center items-center
                    border-2 border-white rounded-[5px] text-white
                    disabled:border-[rgb(168,168,168)] disabled:text-[rgb(148,148,148)]
                "
                >Sign Up</button>
            </form>
            <Link to='/' className="p-5 text-blue-700 text-[12px] flex justify-self-center">Redirect to Log In page</Link>
        </div>
    )
}