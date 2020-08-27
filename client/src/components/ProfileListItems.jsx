import React, { Component } from 'react';
import { Button, Classes, Dialog, Tooltip } from "@blueprintjs/core";
import { Link } from 'react-router-dom';
import { UserContext } from "../contexts/currentuserContext"
import { ThemeContext } from "../contexts/ThemeContext"

class Profilepost extends Component {
    
    static contextType = ThemeContext;
    state = {
        posts: [],
        user: [],
        comments: [],
        likes: [],
        autoFocus: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        isOpen: false,
        usePortal: true,

    }
    deletepost = (id) => {
        fetch(`http://localhost:8080/delete/${id}`, {
            method: "delete",
            headers: {

                "Authorization": localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result.likes)

            })
    }
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
                // console.log(result.likes)

                this.setState({ likes: result.likes })

            })
    }

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
                //console.log(result.likes)

                this.setState({ likes: result.likes })
            })
    }
    
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
                //console.log(result)


                this.setState({ comments: result.comments })

            }).catch(err => {
                console.log(err)
            })
    }
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
    render() {

        const getPost = (postid) => {

            fetch(`http://localhost:8080/post/${postid}`,
            {
                method: "get",
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                },
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    this.setState({ posts: json.post })
                    this.setState({ user: json.post.postedBy })
                    this.setState({ comments: json.post.comments })
                    this.setState({ likes: json.post.likes })
                    console.log(this.state.posts)


                });


        }

        const { isLightTheme, light, dark,curruser } = this.context
        const theme = isLightTheme ? light : dark
        const handleOpen = () => this.setState({ isOpen: true });
        const handleClose = () => this.setState({ isOpen: false });
        return (
            <div className="card" style={{ marginTop: "0px",marginLeft:"15px" }}>
                <div key={this.props.post._id} className="card-inner"   >
                    <div className="card-front">
                        <img style={{ width: "300px", height: "300px" }} src={this.props.post.picture} alt="all" className="exp-img" />
                    </div>
                    <div className="card-back">
                        <div style={{ marginTop: "100px", marginLeft: "80px" }}>
                            <i className="bp3-icon-heart">{this.props.post.likes.length}</i>
                            <i style={{ color: "white" }} className="bp3-button bp3-minimal bp3-icon-comment">{this.props.post.comments.length}</i>
                            <br />
                            <Button className="know" style={{background:theme.ui,color:theme.syntax}} onClick={(e) => { getPost(this.props.post._id); handleOpen() }}>Know More</Button>
                            <Dialog style={{ width: "900px", height: "600px" }}
                                className={theme.bar}
                                icon="info-sign"
                                onClose={handleClose}
                                title="Post Details"
                                {...this.state}
                            >
                                <div className="big-card" style={{ background: theme.ui, color: theme.syntax }} >
                                    <img style={{ width: "500px", height: "500px", border: theme.bor }} src={this.state.posts.picture} alt="" />
                                    <div className="post-details" style={{ background: theme.ui, color: theme.syntax, width: "400px", border: "#ccc 1px solid", padding: "10px" }}>
                                        <div className="user-info" style={{ marginLeft: "10px", background: theme.ui, color: theme.syntax }} >
                                            <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={this.state.user.profilePic} alt="" />
                                            <Link to={curruser._id === this.state.user._id ? "/profile" : `/user/${this.state.user._id}`}><h3 style={{ marginLeft: "20px", marginTop: "15px" }}>{this.state.user.name}</h3></Link>

                                        </div>
                                        <hr style={{ padding: "8px" }} />
                                        <br />
                                        <div style={{ marginLeft: "10px", background: theme.ui, color: theme.syntax }}>
                                            <p><b>{this.state.user.name}</b>  {this.state.posts.caption}</p>
                                            <p style={{ color: "grey" }}>total comments: {this.state.comments.length}</p>
                                            <div style={{ height: "150px", overflowY: "scroll",border:theme.bor,padding:"5px",background: theme.ib }}> {this.state.comments.map(comment => (

                                                <li key={comment._id} ><Link to={curruser._id===comment.postedBy._id? "/profile" :`user/${comment.postedBy._id}`}><b>{comment.postedBy.name}</b></Link>  {comment.text}</li>


                                            ))}
                                            </div>
                                            <br />
                                            <hr />
                                            {this.state.likes.includes(this.state.user._id) ?
                                                <i style={{ fontSize: "40px", color: "red" }} className="bp3-icon-heart" onClick={() => this.unlikepost(this.state.posts._id)}></i> :
                                                <i style={{ fontSize: "40px", color: "grey" }} className="bp3-icon-heart" onClick={() => this.likepost(this.state.posts._id)}></i>}
                                            <p>{this.state.likes.length} likes</p>
                                            <hr />
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                this.addComment(e.target[0].value, this.state.posts._id);
                                                e.target[0].value = ''


                                            }}>
                                                <input type="text" placeholder="add comments" />
                                            </form>
                                            <hr />
                                            <div className="instagram-card-time">{this.timer(this.state.posts.createdAt)}</div>
                                        </div>
                                        <Button style={{marginTop:"5px"}} onClick={(e) => { { this.deletepost(this.state.posts._id); handleClose() } }}>Delete</Button>

                                    </div>
                                    

                                </div>
                                <div className={Classes.DIALOG_FOOTER}>
                                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                                        <Tooltip content="This button is hooked up to close the dialog.">
                                            <Button style={{marginTop:"5px"}} onClick={handleClose}>Close</Button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </Dialog>

                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        );
    }
}

export default Profilepost;


// import React, { useState, useRef, useEffect } from 'react';


// const ExplorepostList = ({ post }) => {

//     const [post, setPost] = useState([])
//     const getPost = (postid) => {

//         fetch(`http://localhost:8080/post/${postid}`)
//             .then(res => res.json())
//             .then(json => {
//                 //console.log(json);
//                 setPost(json)
//                 //console.log(post)

//             });


//     }


//     return (

//         <div className="card">
//             <div key={post._id} className="card-inner" onClick={(e) => { getPost(post._id)  }} >
//                 <div className="card-front">
//                     <img style={{ width: "300px", height: "300px" }} src={post.picture} alt="all" className="exp-img" />
//                 </div>
//                 <div className="card-back">
//                     <div style={{ marginTop: "100px", marginLeft: "80px" }}>
//                         <i className="bp3-icon-heart">{post.likes.length}</i>
//                         <i style={{ color: "white" }} className="bp3-button bp3-minimal bp3-icon-comment">{post.comments.length}</i>
//                     </div>
//                 </div>
//             </div>
//             <div>

//             </div>

//         </div>

//     );
// };

// export default ExplorepostList;
