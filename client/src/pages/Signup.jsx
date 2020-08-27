import React,{useState, useEffect,useContext} from 'react';
import "../style/signup.css"
import image1 from "../images/insta.png"
import { Link, useHistory } from 'react-router-dom';
import {toast} from "react-toastify"
import {ThemeContext} from "../contexts/ThemeContext"

toast.configure()
const Signup = () => {
    const {isLightTheme, light,dark} = useContext(ThemeContext)
    const theme = isLightTheme ? light :dark
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage]= useState("")
    const [bio,setBio] = useState("")
    const [url,setUrl] = useState(undefined)

    useEffect(()=>{
        if(url){
            required()
        }

    },[url])
    const upload=()=>{
        const data = new FormData()
        console.log(image)
        data.append("file",image)
        data.append("upload_preset","instagram")
        data.append("cloud_name","dqmpbgxs3")
        fetch("https://api.cloudinary.com/v1_1/dqmpbgxs3/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const required=()=>{
        fetch("http://localhost:8080/register",
        {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },body:JSON.stringify({
                name,
                email,
                password,
                profilePic:url,
                bio
            })
        }).then(res=>res.json()).then(
            data=>{
                if (data.error ){
                    toast.error(data.error+"🔄",{
                        className:"toasti",
                        draggable:false,
                        position:toast.POSITION.TOP_CENTER
                    }) 
                }
                else
                {toast.success("Registered Successfully")
                history.push("/login")}
                
            }).catch(err=>{
                console.log(err)
            })

    }

    const register=()=>{
        if(image){
            upload()
        }else{
            if(name.length>4 && password.length>7 && email.includes("@")){
                required()
            }
            else{
                toast.error("Invalid Credentials 🔄",{
                    className:"toasti",
                    draggable:false,
                    position:toast.POSITION.TOP_CENTER
                }) 
            }
        }    
    }
    return (
        <div className="contact">
        <img style={{width:"380px"}} src={image1} alt="imgg" />

        <div className="container" style={{width:"420px",background:theme.su,color:theme.syntax}}>
            <h2 className="bp3-navbar-heading" style={{marginLeft:"80px"}}>Instabook</h2>
            

            <form >
                <label >Full Name*</label>
                <input type="text" id="fname" name="name" placeholder="Your name.." value={name} onChange={(e)=>setName(e.target.value)} />
                {name.length===0?<p></p>:name.length<=4?<p  style={{fontSize:"13px",color:"red",fontWeight:"bolder"}}>Length should be more than 5 char</p>:<p style={{fontSize:"13px",color:"green",fontWeight:"bolder"}}>Perfect</p>}
                <label >Email*</label>
                <input type="email"  name="email" placeholder="Email"value={email} onChange={(e)=>setEmail(e.target.value)} />
                {email.length===0?<p></p>:!email.includes("@") || !email.includes(".") ?<p style={{fontSize:"13px",color:"red",fontWeight:"bolder"}}>please write a valid email </p>:<p style={{fontSize:"13px",color:"green",fontWeight:"bolder"}}>Perfect</p>}
                <label >Password*</label>
                <input type="Password"  name="password" placeholder="password" value={password} onChange={(e)=>setPasword(e.target.value)} />
                {password.length===0?<p></p>:password.length<=7?<p  style={{fontSize:"13px",color:"red",fontWeight:"bolder"}}>Length should be more than 8 char</p>:<p style={{fontSize:"13px",color:"green",fontWeight:"bolder"}}>Perfect</p>}
                <label >Profile Picture</label>
                <input type="file"  name=" Picture" onChange={(e)=>setImage(e.target.files[0])} />

                <label >InstaBook Bio</label>
                <textarea id="subject" name="subject" placeholder="Write something.." style={{height:"100px"}}
                value={bio} onChange={(e)=>{setBio(e.target.value)}}
                ></textarea>

                <input type="submit" value="Sign Up"onClick={(e)=>{e.preventDefault();register()}} />
                <Link to="/login"><p>Already Registered? login</p></Link>
                <p style={{float:"right",color:theme.syntax}}>* required</p>
  
            </form>
        </div>
         
    </div>
        
    );
};

export default Signup;