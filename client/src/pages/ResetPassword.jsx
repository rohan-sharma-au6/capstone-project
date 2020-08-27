import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from "react-toastify"
import { ThemeContext } from "../contexts/ThemeContext"
import { useContext } from 'react';
import "../style/signup.css"


toast.configure()

const ResetPassword = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark
    const reset = () => {
        fetch("http://localhost:8080/reset",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    email
                })
            }).then(res => res.json()).then(
                data => {
                    if (data.error) {

                        toast.error(data.error + "🔄", {
                            className: "toasti",
                            draggable: false,
                            position: toast.POSITION.TOP_CENTER
                        })
                        console.log(data.error)
                    }
                    else {
                        toast.success(data.message, {
                            className: "toasti",
                            draggable: false,
                            position: toast.POSITION.TOP_CENTER
                        })

                        history.push("/login")


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

        <div className="upload-pic" style={{ background: theme.ib, color: theme.syntax }}>
            <h2 className="bp3-navbar-heading" style={{ marginLeft: "80px" }}>Instabook</h2>
            <label >Email</label>
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
           
            <input type="submit" onClick={() => reset()} value="Reset" />

        </div>
    );
};

export default ResetPassword;