import React, { Component } from 'react';
import { Button, Intent, Popover, PopoverInteractionKind, Position,Icon } from "@blueprintjs/core";
import ProfilePost from "../components/ProfileListItems"
import "../style/userProf.css"
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

class Profile extends Component {
    static contextType  = ThemeContext

    state = {
        user: null,
        post: null,
        followers: [],
        following: [],
        followersDetails: [],
        followingsDetails: []
    }
    componentDidMount() {
        fetch("http://localhost:8080/mypost",
            {
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                }
            }).then(res =>
                res.json())
            .then(json => {
                
                this.setState({ post: json.post })
                this.setState({ user: json.user })
                this.setState({ followers: json.user.followers })
                this.setState({ following: json.user.following })
            });
           
    }

    render() {
        const followers = () => {
            fetch(`http://localhost:8080/followers/${this.state.user._id}`
            ).then(res => res.json()).then(
                data => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    console.log(data)
                    this.setState({ followersDetails: data })

                }).catch(err => {
                    console.log(err)
                })

        }
        const followings = () => {
            fetch(`http://localhost:8080/followings/${this.state.user._id}`
            ).then(res => res.json()).then(
                data => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    console.log(data)
                    this.setState({ followingsDetails: data })

                }).catch(err => {
                    console.log(err)
                })

        }
        
        const {isLightTheme, light, dark} = this.context
        const theme = isLightTheme ? light :dark
        
        
        return (this.state.user ===null?<div style={{position:"absolute",top:"100px",left:"680px"}} className="loader" >Loading...</div>:

            <div style={{  width: "1000px", margin: "0 auto",color:theme.syntax }}>
                <header>
                    <div className="container" style={{background: theme.ib}}>

                        <div className="profile">

                            <div className="profile-image"  >

                                <img style={{ width: "180px", height: "180px" }} src={this.state.user.profilePic} alt="" />

                            </div>

                            <div className="profile-user-settings">

                                <h1 className="profile-user-name">{this.state.user.name}</h1>

                                <Link to="/edit"><button className="btn profile-edit-btn" >Edit Profile</button></Link>


                            </div>

                            <div className="profile-stats">

                                <ul>
                                    <li><span className="profile-stat-count">{this.state.post.length}</span> posts</li>
                                    <Popover
                                        interactionKind={PopoverInteractionKind.CLICK}
                                        popoverClassName={theme.pop}
                                        position={Position.RIGHT}
                                    >
                                        <li style={{ marginLeft: "35px" }} intent={Intent.PRIMARY} onClick={() => { followers() }} ><span className="profile-stat-count">{this.state.followers.length}</span> followers</li>
                                        <div>
                                            <h5>Followers <i style={{float:"right"}} className="bp3-button bp3-minimal bp3-icon-small-cross bp3-popover-dismiss"></i></h5>
                                            <div style={{ overflowY: "scroll", height: "400px" }}>
                                                {this.state.followersDetails.map(details => (
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
                                        <li style={{ marginLeft: "35px" }} intent={Intent.PRIMARY} onClick={() => { followings() }} ><span className="profile-stat-count">{this.state.following.length}</span> following</li>
                                        <div>
                                            <h5>Following <i style={{float:"right"}} className="bp3-button bp3-minimal bp3-icon-small-cross bp3-popover-dismiss"></i></h5>
                                            <div style={{ overflowY: "scroll", height: "400px" }}>
                                                {this.state.followingsDetails.map(details => (
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
                                <p><span className="profile-real-name"></span> {this.state.user.bio} </p>
                            </div>
                        </div>
                        <hr />
                    </div>
                </header>

                <section style={{ background: theme.ui, width: "1000px", margin: "0 auto" }}>
                    <div className="pic-grid" >
                        {this.state.post.length === 0 ?<>
                             <h1 style={{ marginLeft: "10px ",  }}>No Post Yet</h1>
                             <Icon style={{ marginLeft: "15px",marginBottom:"10px",marginTop:"7px"  }} icon="camera" iconSize={200} intent={Intent.PRIMARY} />
                             </>: this.state.post.map(picture => (
                            
                            <ProfilePost post={picture} />
                        ))}
                    </div>
                </section>
            </div>
        );
    }
}

export default Profile;
