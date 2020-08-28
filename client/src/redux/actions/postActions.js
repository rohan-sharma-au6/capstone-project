import {ADD_POST,ALL_POST,LIKE,UNLIKE,COMMENT} from "../actionTypes"
import axios from "axios"


export const addPost = (url) => async dispatch => {
    try{
        dispatch({type:ADD_POST, payload:null})
        
        const {data}= await axios.post("http://localhost:8080/createpost",url,{headers:{"Authorization": localStorage.getItem("jwt")}});
        console.log(data)
        dispatch({
            type:ADD_POST,
            payload:data
        })

    }catch (err){
        console.error(err)
    }
}
export const allPost = () => async dispatch => {
    try{
        dispatch({type:ADD_POST, payload:null})
        
        const {data}= await axios("http://localhost:8080/allpost");
      
        dispatch({
            type:ALL_POST,
            payload:data
        })

    }catch (err){
        console.error(err)
    }
}

export const likePost = (postId) => async dispatch => {
    try{
        dispatch({type:ADD_POST, payload:null})
        
        const {data}= await axios.post("http://localhost:8080/like",postId,{headers:{"Authorization": localStorage.getItem("jwt")}});
        console.log(data)
        dispatch({
            type:LIKE,
            payload:data
        })

    }catch (err){
        console.error(err)
    }
}
export const unlikePost = (postId) => async dispatch => {
    try{
        dispatch({type:ADD_POST, payload:null})
        
        const {data}= await axios.post("http://localhost:8080/unlike",postId,{headers:{"Authorization": localStorage.getItem("jwt")}});
        console.log(data)
        dispatch({
            type:UNLIKE,
            payload:data
        })

    }catch (err){
        console.error(err)
    }
}

export const addComment = (postId) => async dispatch => {
    try{
        dispatch({type:ADD_POST, payload:null})
        
        const {data}= await axios.post("http://localhost:8080/createpost",postId,{headers:{"Authorization": localStorage.getItem("jwt")}});
        console.log(data)
        dispatch({
            type:COMMENT,
            payload:data
        })

    }catch (err){
        console.error(err)
    }
}
