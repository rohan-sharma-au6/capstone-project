import React, { useState, useEffect, useContext } from 'react';
import "../style/upload.css"
import { useHistory } from 'react-router-dom';
import {ThemeContext} from "../contexts/ThemeContext"
import { toast } from "react-toastify"

toast.configure()

const Upload = () => {
    const {isLightTheme, light,dark} = useContext(ThemeContext)
    const theme = isLightTheme ? light :dark
    const [caption, setCaption] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const history = useHistory()
    useEffect(() => {
        if (url) {
            fetch("http://localhost:8080/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    caption,
                    picture: url
                })
            }).then(res => res.json())
                .then(data => {


                    if (data.error) {

                        toast.error(data.error + "🔄", {
                            className: "toasti",
                            draggable: false,
                            position: toast.POSITION.TOP_CENTER
                        })
                    }
                    else {
                        toast.info("uploading", {
                            className: "toasti",
                            draggable: false,
                            position: toast.POSITION.TOP_CENTER,
                            delay: 0
                        })

                        console.log(data)
                    }
                }).catch(err => {
                    console.log(err)
                    toast.error("failed 🔄", {
                        className: "toasti",
                        draggable: false,
                        position: toast.POSITION.TOP_CENTER
                    })

                })
        }

    }, [url])

    const upload = () => {
        const data = new FormData()
        console.log(image)
        data.append("file", image)
        data.append("upload_preset", "instagram")
        data.append("cloud_name", "dqmpbgxs3")
        fetch("https://api.cloudinary.com/v1_1/dqmpbgxs3/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    toast.error("please select picture" +" 🔄", {
                        className: "toasti",
                        draggable: false,
                        position: toast.POSITION.TOP_CENTER
                    })
                }


                setUrl(data.url)

            })
            .catch(err => {

                toast.error(err + "🔄", {
                    className: "toasti",
                    draggable: false,
                    position: toast.POSITION.TOP_CENTER,
                    delay: 3000
                })
            })
    }

    return (
        <div className="upload-pic" style={{background:theme.ib,color:theme.syntax}}>
            <form>
                <div className="bp3-navbar-heading">Instabook</div>
                <h2>Upload Media</h2>
                <br />
                <label >Picture:</label>
                <input type="file" name=" Picture" placeholder="Profile Picture"
                    onChange={(e) => { setImage(e.target.files[0]) }} />
                <input type="text" name="caption" placeholder="Add Caption" value={caption} onChange={(e) => { setCaption(e.target.value) }} />
                <input className="up-bt" type="submit" value="Upload" onClick={(e) => { e.preventDefault(); upload() }} />
            </form>
        </div>
    );
};

export default Upload;