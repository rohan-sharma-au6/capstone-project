import React, {createContext, Component} from 'react';

export const UserContext = createContext()

class CurrentuserContext extends Component {
    state={
        curruser:[]
    }
    
    componentDidMount(){
        fetch(`http://localhost:8080/current`, {
            method: "get",
            headers: {

                "Authorization": localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("sjjh",result)
            this.setState({curruser:result})
        })  
        if(this.state.curruser){} 
    }
    
    render() {
        return (
           <UserContext.Provider  value={{...this.state.curruser}}>
               {this.props.children}
           </UserContext.Provider>
        );
    }
}

export default CurrentuserContext;