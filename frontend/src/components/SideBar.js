import React from 'react';

import './SideBar.css';




const Sidebar = () => {

  return (

    <div className="sidebar">

      <ul className="sidebar-items">

        <li className="sidebar-item">

          <button className="sidebar-button"style={{paddingTop:"50px"}}>User Profile</button>

        </li>

        <li className="sidebar-item">

          <button className="sidebar-button">Write Story</button>

        </li>

        <li className="sidebar-item">
        <a href="/Landing">
        <button className="sidebar-button">Logout</button>
        </a>
        </li>

      </ul>

    </div>

  );

};




export default Sidebar;