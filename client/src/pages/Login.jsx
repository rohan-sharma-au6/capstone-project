import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from "react-toastify"
import "../style/login.css"

//to add toast
toast.configure()

const Login = () => {
    const [password, setPasword] = useState("")
    const [email, setEmail] = useState("")
    const history = useHistory()
    const login1 = () => {

        fetch("http://localhost:8080/login",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    email,
                    password
                })
            }).then(res => res.json()).then(
                data => {
                    if (data.error) {

                        toast.error(data.error + "🔄", {
                            className: "toasti",
                            draggable: false,
                            position: toast.POSITION.TOP_CENTER
                        })

                    }
                    else {
                        
                        toast.success("Logged In", {
                            className: "toasti",
                            draggable: false,
                            position: toast.POSITION.TOP_CENTER
                        })
                        
                        localStorage.setItem("jwt", data.token)
                        localStorage.setItem("user", JSON.stringify(data.savedUser))
                        history.push('/home')
                        window.location.reload()
                        history.push('/home')

                    }
                }
            ).catch(err => {
                toast.error("Wrong Password 🔄", {
                    className: "toasti",
                    draggable: false,
                    position: toast.POSITION.TOP_CENTER
                })
            })
    }
    return (
        <div className="panel">
            <div className="state"><br /><i className="fa fa-unlock-alt"></i><br /><h1>Login</h1></div>
            <div className="form">
                <input placeholder='Email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder='Password' type="password" value={password} onChange={(e) => setPasword(e.target.value)} />
                <div onClick={(e) => { e.preventDefault(); login1(); }} className="login">login</div>
            </div>
            <div className="fack"><Link to={'/reset'}><i className="fa fa-question-circle"></i>Forgot password?</Link></div>
        </div>

    );
};

export default Login;