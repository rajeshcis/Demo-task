import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">Videos</Link>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <label className="nav-link" >Test User</label>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;