import React, { Component } from 'react';
import "../style/explore.css"
import ExploreItems from "../components/ExploreItemList"

class Explore extends Component {
    state = {
        caption: null,
        user: [],
        saved: []

    }
    componentDidMount() {
        fetch("http://localhost:8080/allpost",
            {
                method: "get",
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                },
            }
        ).then(res => res.json())
            .then(json => {
                this.setState({ caption: json.posts })
                
            });
    }
    
    render() {
        return (
            <div className="cards">
                {this.state.caption===null ? <div style={{position:"absolute",top:"100px",left:"680px"}} className="loader" >Loading...</div>:  this.state.caption.map(item=>(
                    <ExploreItems key={item._id} item={item}  />
                ))}
                
            </div>
        );
    }
}

export default Explore;

