import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import {Icon,Tooltip,Position} from "@blueprintjs/core"


class ThemeToggle extends Component {
    static contextType= ThemeContext;
    render() {
        const {toggleTheme,isLightTheme} = this.context
        return (
            isLightTheme?<Tooltip position={Position.BOTTOM}  content="Dark Mode" ><Icon  icon="moon"   onClick={toggleTheme} /></Tooltip>:
            <Tooltip position={Position.BOTTOM} content="Light Mode" ><Icon  icon="flash" style={{color:"gold"}}  onClick={toggleTheme} /></Tooltip>
            
        );
    }
}

export default ThemeToggle;