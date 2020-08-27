import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link,useHistory } from 'react-router-dom'
import { UserContext } from "../contexts/currentuserContext"
import {ThemeContext} from "../contexts/ThemeContext"
import { Button, Intent, Popover, PopoverInteractionKind, Position,Icon } from "@blueprintjs/core";

const UserProfile = () => {
    const history = useHistory()
    const [profile, setProfile] = useState("")
    const [followers, setfollowers] = useState([])
    const [following,setfollowing ] = useState([])
    const curruser = useContext(UserContext)
    const {isLightTheme, light,dark} = useContext(ThemeContext)
    const theme = isLightTheme ? light :dark

    const { id } = useParams()
    useEffect(() => {
        fetch(`http://localhost:8080/user/${id}`).then(res =>
            res.json())
            .then(json => {

                setProfile(json)

            });
    }, [id,profile])


    const follow = () => {
        fetch("http://localhost:8080/follow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: id
            })
        }).then(res =>
            res.json()
        ).then(result => {
            console.log(result)
            if(result.error){
                history.push("/login")
            }
        }).catch(err=>{
            console.log(err)
           
        })
    }
    const unfollow = () => {
        fetch("http://localhost:8080/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: id
            })
        }).then(res =>
            res.json()
        ).then(result => {
            console.log(result)
        })
    }
    const follower = () => {
        fetch(`http://localhost:8080/followers/${id}`
        ).then(res => res.json()).then(
            data => {
                if (data.error) {
                    console.log(data.error)
                }
                console.log(data)
                setfollowers(data)

            }).catch(err => {
                console.log(err)
            })

    }
    const followings = () => {
        fetch(`http://localhost:8080/followings/${id}`
        ).then(res => res.json()).then(
            data => {
                if (data.error) {
                    console.log(data.error)
                }
                console.log(data)
                setfollowing(data)

            }).catch(err => {
                console.log(err)
            })

    }

    return (

        <>
            {profile==="" ? <div style={{position:"absolute",top:"100px",left:"680px"}} className="loader" >Loading...</div> :
                <div style={{ background: theme.ui, width: "1000px", margin: "0 auto" }}>


                    <header>
                        <div class="container" style={{background: theme.ib,color:theme.syntax}} >

                            <div className="profile">

                                <div className="profile-image"  >

                                    <img style={{ width: "180px", height: "180px" }} src={profile.user.profilePic} alt="" />

                                </div>

                                <div className="profile-user-settings">

                                    <h1 className="profile-user-name">{profile.user.name}</h1>

                                    {profile.user.followers.includes(curruser._id) ?
                                        <button className="un-bt" onClick={() => unfollow()}>Unfollow</button> :
                                        <button className="fl-bt" onClick={() => follow()}>Follow</button>}


                                </div>

                                <div className="profile-stats">

                                    <ul>
                                        <li><span className="profile-stat-count">{profile.post.length}</span> posts</li>

                                        <Popover
                                            interactionKind={PopoverInteractionKind.CLICK}
                                            popoverClassName={theme.pop}
                                            position={Position.RIGHT}
                                        >
                                            <li style={{ marginLeft: "35px" }} intent={Intent.PRIMARY} onClick={() => { follower() }} ><span className="profile-stat-count">{profile.user.followers.length}</span> followers</li>
                                            <div>
                                                <h5>Followers <i style={{ float: "right" }} className="bp3-button bp3-minimal bp3-icon-small-cross bp3-popover-dismiss"></i></h5>
                                                <div style={{ overflowY: "scroll", height: "400px" }}>
                                                    {followers.map(details => (
                                                        <Link to={`/user/${details._id}`} >
                                                            <div key={details._id} className="search-results">
                                                                <img src={details.profilePic} className="search-image" alt="" />
                                                                <h3>{details.name}</h3>
                                                            </div>
                                                            <hr style={{ color: "black", marginBottom: "5px" }} />
                                                        </Link>

                                                    ))}

                                                    <Button className="bp3-popover-dismiss">Dismiss</Button>
                                                </div>
                                            </div>
                                        </Popover>

                                        <Popover
                                            interactionKind={PopoverInteractionKind.CLICK}
                                            popoverClassName={theme.pop}
                                            position={Position.RIGHT}
                                        >
                                            <li style={{ marginLeft: "35px" }} intent={Intent.PRIMARY} onClick={() => { followings() }} ><span className="profile-stat-count">{profile.user.following.length}</span> following</li>
                                            <div>
                                                <h5>Following <i style={{ float: "right" }} className="bp3-button bp3-minimal bp3-icon-small-cross bp3-popover-dismiss"></i></h5>
                                                <div style={{ overflowY: "scroll", height: "400px" }}>
                                                    {following.map(details => (
                                                        <Link to={`/user/${details._id}`} >
                                                            <div key={details._id} className="search-results">
                                                                <img src={details.profilePic} className="search-image" alt="" />
                                                                <h3>{details.name}</h3>
                                                            </div>
                                                            <hr style={{ color: "black", marginBottom: "5px" }} />
                                                        </Link>

                                                    ))}

                                                    <Button className="bp3-popover-dismiss">Dismiss</Button>
                                                </div>
                                            </div>
                                        </Popover>

                                    </ul>

                                </div>

                                <div className="profile-bio">
                                    <p><span className="profile-real-name"></span> {profile.user.bio} </p>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </header>
                    <section>
                        <div className="pic-grid">
                        <div className="wrapper">
                            {profile.post.length===0?<> <h1 style={{ marginLeft: "400px ",  }}>No Post Yet</h1><Icon style={{ marginLeft: "350px",marginBottom:"10px",marginTop:"7px"  }} icon="camera" iconSize={200} intent={Intent.PRIMARY} /></> :profile.post.map(picture => (
                                <a >
                                <span><i className="bp3-icon-heart">{picture.likes.length}</i>
                                    <i className="bp3-button bp3-minimal bp3-icon-comment">{picture.comments.length}</i></span>
                                <img className="post" key={picture._id} src={picture.picture} alt="" />
                            </a>
                                // <img key={picture._id} className="post" src={picture.picture} />

                            ))}
                            </div>
                        </div>
                    </section>

                </div>
            }
        </>
    );
};

export default UserProfile;






