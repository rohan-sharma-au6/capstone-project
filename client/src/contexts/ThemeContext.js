import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    isLightTheme: true,
    light: { syntax: 'black', ui: 'white', bg: '#eee', bar:"bp3-navbar ",pop:"bp3-popover-content-sizing",ib:"whitesmoke",bor:"#ccc 1px solid",bt:"",su:"#FAFAFA",gr:"linear-gradient(to right , rgba(4, 2, 96, 0.7), rgba(180, 49, 183, 0.9))"},
    dark: { syntax: '#ddd', ui: '#30404D', bg: '#555',head:"blueviolet",bar:"bp3-navbar bp3-dark ",pop:"bp3-popover-content-sizing bp3-dark",ib:"#18191B",bor:"whitesmoke 1px solid",gr:"linear-gradient(to right, #0f2027, #203a43, #2c5364)",bt:".bp3-intent-primary",su:'#30404D'},
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
  toggleTheme= ()=>{
      this.setState({isLightTheme:!this.state.isLightTheme})
  }
  render() { 
    return (
      <ThemeContext.Provider value={{...this.state, toggleTheme:this.toggleTheme}}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
 
export default ThemeContextProvider;