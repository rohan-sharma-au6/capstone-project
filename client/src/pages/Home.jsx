import React, { Component } from 'react';
import "../style/Home.css"
import { Link } from 'react-router-dom';
import { Button, Intent, Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";
import { Icon } from "@blueprintjs/core";
import { ThemeContext } from '../contexts/ThemeContext';

class Home extends Component {
// theme Context
    static contextType = ThemeContext
    
    state = {
        caption: null,
        user: [],
        saved: [],
        comments: [],
        autoFocus: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        isOpen: false,
        usePortal: true,

    }
    componentDidMount() {
//to get all post of followings
        fetch("http://localhost:8080/followingpost",
            {
                method: "get",
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                },
            }
        ).then(res => res.json())
            .then(json => {
                
                this.setState({ caption: json.posts })
                this.setState({ user: json.user })
                this.setState({ saved: json.user.savedId })

            });
    }
    //to save post
    savepost = (id) => {
        fetch(`http://localhost:8080/saved/${id}`, {
            method: "post",
            headers: {

                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
        
                this.setState({ saved: result.user.savedId })



            })
    }
    //remove from save
    unsavepost = (id) => {
        fetch(`http://localhost:8080/unsaved/${id}`, {
            method: "post",
            headers: {

                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log("hjkhj", result)
                this.setState({ saved: result.user.savedId })



            })
    }
//like any post
    likepost = (id) => {
        fetch("http://localhost:8080/like", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const post = this.state.caption.map(data => {
                    if (data._id === result._id) {
                        return result
                    } else {
                        return data
                    }
                })
                this.setState({ caption: post })

            })
    }
//unlike any post
    unlikepost = (id) => {
        fetch("http://localhost:8080/unlike", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const post = this.state.caption.map(data => {
                    if (data._id === result._id) {
                        return result
                    } else {
                        return data
                    }
                })
                this.setState({ caption: post })
            })
    }
    //to set time of post
     timer(timeStamp) {

        // variables
        var createdTime = new Date(timeStamp) / 60000
        var currentTime = new Date() / 60000
    
        // total time since created
        var time = ((currentTime - createdTime) / 60)
        time = time.toFixed(2)
    
        // converting time into min, hrs & days respectively
        if (time < 1) return `${parseInt(time/0.016)} mins ago`
        else if (time >= 1 && time < 24) return `${parseInt(time)} hrs ago`
        else if (time > 24) return `${parseInt(time/24)} days ago`
    }
//add comment on post
    addComment = (text, postId) => {
        fetch("http://localhost:8080/addcomment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }, body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const post = this.state.caption.map(data => {
                    if (data._id == result._id) {
                        return result
                    } else {
                        return data
                    }
                })
                console.log(post)
                this.setState({ caption: post })
                this.setState({ comments: post.comments })

            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        
        const {isLightTheme, light, dark,curruser} = this.context
        const theme = isLightTheme ? light :dark
        return (
            (<div style={{ marginTop: "70px" }}>
                {this.state.caption===null ?
                <><div style={{marginTop:"400px",margin:"0 auto"}} className="loader" >Loading...</div></>:
                this.state.caption.length===0?<div style={{marginLeft:"650px"}}>
                <Icon style={{ marginLeft: "15px",marginBottom:"10px",marginTop:"7px"  }} icon="trash" iconSize={200} intent={Intent.NONE} />
                <h3 style={{ marginLeft: "10px ",color:theme.syntax  }}>No Post follow someone </h3></div>:
                this.state.caption.map(item => (
                    <div key={item._id} >
                        <div style={{ margin: "40px auto",background:theme.ui,color:theme.syntax, border:theme.ui }} className="instagram-card">
                            <div className="instagram-card-header">
                                <img style={{ float: "left",border:theme.ui }} src={item.postedBy.profilePic} className="instagram-card-user-image" alt="" />
                                <Link to={item.postedBy._id === this.state.user._id ? '/profile' : `/user/${item.postedBy._id}`} style={{ float: "left", marginTop: "7px",color:theme.head }} className="instagram-card-user-name" >{item.postedBy.name}</Link>
                                <div className="instagram-card-time">{this.timer(item.createdAt)}</div>
                    
                            </div>

                            <hr className="card-hr" />

                            <div className="intagram-card-image">
                                <img style={{ width: "599px" }} src={item.picture} />
                            </div>

                            <div style={{ marginLeft: "10px" }} className="instagram-card-footer">
                                {item.likes.includes(this.state.user._id) ?
                                    <Icon style={{marginBottom:"10px",color:"red",marginTop:"7px",cursor:"pointer" }} icon="heart" iconSize={25} intent={Intent.DANGER} onClick={() => this.unlikepost(item._id)} />
                                    :
                                    <Icon style={{marginBottom:"10px",color:"grey",marginTop:"7px",cursor:"pointer" }} icon="heart" iconSize={25} intent={Intent.PRIMARY} onClick={() => this.likepost(item._id)} />}

                                <Popover
                                    interactionKind={PopoverInteractionKind.CLICK}
                                    popoverClassName= {theme.pop}
                                    position={Position.BOTTOM_LEFT}
                                    
                                >
                                    <Icon style={{ marginLeft: "15px",marginBottom:"10px",marginTop:"7px",cursor:"pointer",color:"blueviolet" }} icon="comment" iconSize={25} intent={Intent.PRIMARY} />
                                    
                                    <div>
                                        <h5>Comments<i style={{ float: "right" }} className="bp3-button bp3-minimal bp3-icon-small-cross bp3-popover-dismiss"></i></h5>
                                        <div style={{ overflowY: "scroll", height: "200px", width: "300px" }}>
                                            {
                                                item.comments.map(all => (
                                                    <p key={all._id}><Link to={curruser._id===all.postedBy._id?"/profile" : `/user/${all.postedBy._id}`}><b>{all.postedBy.name}</b></Link>  {all.text}</p>
                                                ))
                                            }

                                            <Button className="bp3-popover-dismiss">Dismiss</Button>
                                        </div>
                                    </div>
                                </Popover>
                                {this.state.saved.includes(item._id) ?  
                                <Icon style={{ marginLeft: "15px",marginBottom:"10px",float: "right",marginTop:"7px",color:"blueviolet" ,cursor:"pointer"  }} icon="bookmark" iconSize={25} intent={Intent.PRIMARY} onClick={() => { this.unsavepost(item._id) }} /> :
                                    
                                    <Icon style={{ marginLeft: "15px",marginBottom:"10px",float: "right",marginTop:"7px",color:"#ccc",cursor:"pointer"   }} icon="bookmark" iconSize={25} intent={Intent.PRIMARY} onClick={() => { this.savepost(item._id) }} />}

                                <p className="likes">{item.likes.length} likes</p>
                                <p ><Link to={curruser._id===item.postedBy._id?"/profile" : `/user/${item.postedBy._id}`}><b>{item.postedBy.name}</b></Link>   {item.caption}</p>
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <p className="comments">{item.comments.length} comments</p>
                                {
                                    item.comments.slice(0, 2).map(all => (
                                        <p key={all._id}><Link to={curruser._id===all.postedBy._id?"/profile" : `/user/${all.postedBy._id}`}><b>{all.postedBy.name}</b></Link>  {all.text}</p>
                                    ))
                                }
                                <hr />
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    this.addComment(e.target[0].value, item._id);
                                    e.target[0].value = ''

                                }}>
                                    <input style={{background:theme.ui,color:theme.syntax}} className="comments-input" type="text" placeholder="add comments" />
                                </form>
                                
                            </div>
                        </div>
                    </div>

                ))}


            </div>)
        );
    }
}

export default Home;