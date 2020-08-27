import React, { Component } from 'react';
import "../style/profile.css"
import { ThemeContext } from '../contexts/ThemeContext';
import { Intent, Icon } from "@blueprintjs/core";

class Saved extends Component {
    static contextType = ThemeContext
    state = {
        post: null,

    }
    componentDidMount() {
        fetch("http://localhost:8080/rendersaved",
            {
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                }
            }).then(res =>
                res.json())
            .then(json => {
                console.log(json)
                this.setState({ post: json.user.savedId })

            });

    }
    render() {
        const { isLightTheme, light, dark } = this.context
        const theme = isLightTheme ? light : dark

        return ((this.state.post===null?<div style={{position:"absolute",top:"100px",left:"680px"}} className="loader" >Loading...</div>:
            <div className="container1" style={{ background: theme.ib, height: "100vw" }}>
                <section>
                    <div className="pic-grid" style={{ marginTop: '50px' }}>
                        <div className="wrapper">
                            {this.state.post.length===0? <>
                             <h1 style={{ marginLeft: "10px ",color:theme.syntax  }}>No Post Saved</h1>
                             <Icon style={{ marginLeft: "15px",marginBottom:"10px",marginTop:"7px"  }} icon="trash" iconSize={200} intent={Intent.PRIMARY} />
                             </>: 
                            this.state.post.map(picture => (
                                <a >
                                    <span><i className="bp3-icon-heart">{picture.likes.length}</i>
                                        <i className="bp3-button bp3-minimal bp3-icon-comment">{picture.comments.length}</i></span>
                                    <img className="post" key={picture._id} src={picture.picture} alt="" />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

            </div>)
        );
    }
}

export default Saved;