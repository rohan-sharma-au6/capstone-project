import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom"
import './App.css';

// Pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import Upload from './pages/UploadMain';
import Home from './pages/Home';
import Profile from './pages/Profile';
import UserProfile from "./pages/UserProfile"
import Saved from './pages/Saved';
import Explore from "./pages/Explore"
import CurrentuserContext from './contexts/currentuserContext';
import Uploadstory from './pages/UploadStory';
import ThemeContextProvider from "./contexts/ThemeContext"
import LandingPage from './pages/LandingPage';
import EditProfile from './pages/EditProfile';
import ResetPassword from './pages/ResetPassword';
import NewPassword from "./pages/NewPassword"
import ErrorPage from './pages/ErrorPage';

//Components
import Navbar from './components/Navbar.jsx';
import Stories from "./components/Stories"

function App() {
    const user = localStorage.getItem("jwt")
    return (<div className="App"  >
        <CurrentuserContext>
            <ThemeContextProvider>
            <Navbar />         
            <Switch >
                <Route path="/" exact component={LandingPage}/>
                <Route path="/home" exact>{!user?<Redirect to="/login"/>:<Home/>}</Route>
                <Route path="/signup" exact component={Signup} />
                <Route path="/login" exact component={Login} />
                <Route path="/explore" exact component={Explore} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/edit" exact component={EditProfile}/>
                <Route path ="/reset" exact component={ResetPassword}/>
                <Route path="/reset/:token" exact component={NewPassword}/>
                <Route path="/upload" exact component={Upload} />
                <Route path="/user/:id" exact component={UserProfile} />
                <Route path="/saved" exact component={Saved} />
                <Route path="/addstory" exact component={Uploadstory}/>
                <Route path="/seestory" exact component={Stories}/>
                <Route component={ErrorPage}/>
            </Switch>
            </ThemeContextProvider>
        </CurrentuserContext>
    </div>
    );
}

export default App;