import React, { Component } from 'react';
import "../style/Home.css"
import { Link } from 'react-router-dom';

class FollowingPost extends Component {
    state = {
        caption: [],
        user:[]
    }
    componentDidMount() {
        fetch("http://localhost:8080/followingpost",
            {
                method: "get",
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                },
            }
        ).then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({ caption: json.posts })
                this.setState({ user: json.user})
            });
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
                //console.log(result)
                const post = this.state.caption.map(data => {
                    if (data._id == result._id) {
                        return result
                    } else {
                        return data
                    }
                })
                this.setState({ caption: post })


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
                console.log(result)
                const post = this.state.caption.map(data => {
                    if (data._id == result._id) {
                        return result
                    } else {
                        return data
                    }
                })
                this.setState({ caption: post })
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
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div style={{ marginTop: "70px" }}>
                {this.state.caption.map(item => (
                    <div key={item._id} >
                        <div style={{ margin: "40px auto" }} className="instagram-card">
                            <div className="instagram-card-header">
                                <img style={{ float: "left" }} src={item.postedBy.profilePic} className="instagram-card-user-image" />
                                <Link to={`/user/${item.postedBy._id}`} style={{ float: "left", marginTop: "7px" }} className="instagram-card-user-name" >{item.postedBy.name}</Link>
                                <div className="instagram-card-time">{parseInt(((new Date() / 60000) - (new Date(item.createdAt) / 60000)) / 60)} hr ago</div>

                                {/* if hrs>24  than days,
                                if min 60> than hrs 
                                 */}

                            </div>
                            <hr />

                            <div className="intagram-card-image">
                                <img style={{ width: "599px" }} src={item.picture} />
                            </div>

                            <div style={{ marginLeft: "10px" }} className="instagram-card-footer">
                                {item.likes.includes(this.state.user._id)?
                                <i style={{fontSize:"40px",color:"red"}} className="bp3-icon-heart" onClick={() => this.unlikepost(item._id)}></i>:
                                <i style={{fontSize:"40px",color:"grey"}} className="bp3-icon-heart" onClick={() => this.likepost(item._id)}></i>}
                                
                                
                                <p className="likes">{item.likes.length} likes</p>
                                <p ><b>{item.postedBy.name}</b>   {item.caption}</p>
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <p className="comments">{item.comments.length} comments</p>
                                {
                                    item.comments.map(all => (
                                        <p key={all._id}><b>{all.postedBy.name}</b>  {all.text}</p>
                                    ))
                                }
                                <hr />
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    this.addComment(e.target[0].value, item._id)

                                }}>
                                    <input className="comments-input" type="text" placeholder="add comments" />
                                </form>
                                <hr />
                            </div>



                        </div>
                    </div>

                ))}


            </div>
        );
    }
}

export default FollowingPost;