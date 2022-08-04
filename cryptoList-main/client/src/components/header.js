import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav className="navbar">
                 

                <Link to="/">
                <img className='logo' src='https://quikieapps.com/wp-content/uploads/2022/04/cropped-QuikieAppsLogoResized-01-1.png' alt='logo' />
                </Link>
                
            </nav>

        </>
    )
}

export default Header