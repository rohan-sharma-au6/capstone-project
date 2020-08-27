import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Intent, Popover, PopoverInteractionKind, Position,Tooltip } from "@blueprintjs/core";
import ThemeToggle from './ThemeToggle';
import {ThemeContext} from "../contexts/ThemeContext"
import {UserContext} from "../contexts/currentuserContext"
import { useContext } from 'react';

const Navbar1 = () => {
    const history = useHistory()
    const [user, setuser] = useState(null)
    const [search, setSearch] = useState('')
    const [result, setResult] = useState([])
    const curruser = useContext(UserContext)
    const {isLightTheme, light,dark} = useContext(ThemeContext)
    const theme = isLightTheme ? light :dark
    useEffect(() => {
        fetch(`http://localhost:8080/current`, {
            method: "get",
            headers: {

                "Authorization": localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>
            {console.log(result)
            setuser(localStorage.getItem("jwt"))
        }
            
        )
    }, [])

    useEffect(()=>{
        
    },[user])
    

    const searchUser = (searchQuery) => {
        setSearch(searchQuery);
        fetch('http://localhost:8080/searchuser', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                searchQuery
            })
        }).then(res =>
            res.json())
            .then(results => {
                //console.log(results)
                setResult(results.user)
            })

    }
    const authbar = () => {

        if (!user) {
            return (<>
                
                <Link to={`/login`}> <button className="bp3-button bp3-minimal ">Login</button></Link>
                <span className="bp3-navbar-divider"></span>
                <Link to={`/signup`}><button className="bp3-button bp3-minimal ">Sign Up</button></Link>
            </>)
        } if(user) {
            return (
                <>
                    
                    <Link to={`/home`}><Tooltip position={Position.BOTTOM} content="Home"><button className="bp3-button bp3-minimal bp3-icon-home"></button></Tooltip></Link>
                    <span className="bp3-navbar-divider"></span>
                    <Link to={`/explore`}><Tooltip position={Position.BOTTOM} content="Explore"><button className="bp3-button bp3-minimal bp3-icon-compass"></button></Tooltip></Link>
                    <span className="bp3-navbar-divider"></span>
                    <Link to={`/upload`}><Tooltip position={Position.BOTTOM} content="Upload"><button className="bp3-button bp3-minimal bp3-icon-upload"></button></Tooltip></Link>  
                    <span className="bp3-navbar-divider"></span>
                    <Link to={`/seestory`}><Tooltip position={Position.BOTTOM} content="Stories"><button className="bp3-button bp3-minimal bp3-icon-layout-grid"></button></Tooltip></Link>  
                    <span className="bp3-navbar-divider"></span>
                    <Link to={`/profile`}><Tooltip position={Position.BOTTOM} content="Profile"><button className="bp3-button bp3-minimal bp3-icon-user"></button></Tooltip></Link>
                    <span className="bp3-navbar-divider"></span>
                    <Link to={`/saved`}><Tooltip position={Position.BOTTOM} content="Saved"><button className="bp3-button bp3-minimal bp3-icon-bookmark"></button></Tooltip></Link>
                    <span className="bp3-navbar-divider"></span>
                    <button className="bp3-button bp3-minimal bp3-icon-log-out "
                        onClick={(e) => { e.preventDefault(); localStorage.clear(); setuser(); history.push("/"); }}
                    >logout</button>
                </>
            )

        }

    }
    return (
        <div>

            <nav style={{ position: "fixed", top: "0px" }} className={theme.bar}>
                <div className="bp3-navbar-group bp3-align-left">
                    <div className="bp3-navbar-heading"><Link className="lk" to={!user ?"/":"/home"}>Instabook</Link></div>

                    <Popover
                        interactionKind={PopoverInteractionKind.CLICK}
                        popoverClassName="bp3-popover-content-sizing"
                        position={Position.BOTTOM}
                    >
                        <input className="bp3-input " placeholder="Search..." type="text"
                            intent={Intent.PRIMARY} value={search}
                            onChange={(e) => searchUser(e.target.value)} />
                            
                        <div style={{overflowY:"scroll",height:"400px"}}>
                        <h5>Search results <i style={{float:"right"}} className="bp3-button bp3-minimal bp3-icon-small-cross bp3-popover-dismiss"></i></h5>
                            {result.map(details => (
                                <Link to={curruser._id===details._id ?"/profile":  `/user/${details._id}`} >
                                    <div key={details._id} className="search-results">
                                        <img src={details.profilePic} className="search-image" alt="" />
                                        <h3>{details.name}</h3>
                                    </div>
                                    <hr style={{color:"black",marginBottom:"5px"}} />
                                </Link>

                            ))}

                            <Button className="bp3-popover-dismiss">Dismiss</Button>
                        </div>
                    </Popover>
                </div>
                <div className="bp3-navbar-group bp3-align-right">
                    <ThemeToggle />
                    <span className="bp3-navbar-divider"></span>
                    
                    {authbar()}
                </div>
            </nav>
        </div>
    );
};

export default Navbar1;