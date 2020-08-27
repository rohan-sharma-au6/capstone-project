import React from 'react';
import "../style/error.css"
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    const user = localStorage.getItem("jwt")
    return (
        <div>
            <h1 className="h1tag">404</h1>
        <p className="ptag">Oops! Something is wrong.</p>
        <Link className="button" to={!user ?"/":"/home"}><i class="icon-home"></i> Go back in initial page, it's better.</Link>
            
        </div>
    );
};

export default ErrorPage;