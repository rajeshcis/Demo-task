import React from 'react';
import { Link } from 'react-router-dom';

const SubHeader = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
            Actions
  </button>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to={"/videos/new"}>Add New Video</Link><br />
            <Link className="dropdown-item" to={"/"}>All Videos</Link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
);

export default SubHeader;