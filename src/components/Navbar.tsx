import React from 'react';
import logo from '../assets/PrimeLogoTransparent.svg';
import { useAuthContext } from '../auth/useAuthContext';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  const { account } = useAuthContext();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm pb-3">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
        
        {/* Left: Logo and Company Name */}
        <Link to={"/"}>
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="PRIME AE Logo"
              style={{ height: '30px', marginRight: '10px' }}
            />
            
              <span className="navbar-brand mb-0 h1">Operations Management Portal</span>
                    
          </div>
        </Link> 

        {/* Hamburger Toggle */}
        <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Nav Items */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {/* Left Nav Links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/management">Management</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/reporting">Reporting</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/forecasting">Forecasting</Link>
                </li>
            </ul>

            {/* Right Side: User Name + Logout */}
            <div className="d-flex align-items-center text-white">
                {account ? (
                    <>
                        <span className="me-3">Welcome, {account.name}!</span>
                        <Link className="btn btn-sm text-white" to="/logout">
                            Logout
                        </Link>
                    </>
                ) : (
                    <span>Waiting for login...</span>
                )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
