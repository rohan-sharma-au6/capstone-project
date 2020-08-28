import {ADD_POST,ALL_POST,LIKE,UNLIKE,COMMENT} from "../actionTypes"

const initialState= {
    post:null,
}

const postReducers =(state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case ADD_POST:
            return {...state, post:payload}
        case ALL_POST:
            return {...state, post:payload}
        case LIKE:
            return {...state, post:payload}
        case UNLIKE:
            return {...state, post:payload}
        case COMMENT:
            return {...state, post:payload}
    }
}


export default postReducers



















































































