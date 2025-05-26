import React from "react";
import "../scss/Home.css";

function Home() {
  return (
    <>
      <div className="home">
        <div className="homeTitle">
          <h4>Welcome to the TowSat application</h4>
        </div>
        <div className="homeText">
           <p>
    This Phone Tracker application enables users to manage and visualize location data collected from BTS (Base Transceiver Stations) and GPS devices. Users can upload data files, which are then stored securely in a database. 
    The app provides functionality to browse through saved BTS and GPS records, load detailed information for each entry, and delete unwanted records.  
    With a clean and intuitive interface, the app facilitates efficient tracking and analysis of mobile network data and GPS logs.
    The backend API is built with Node.js and Express, communicating seamlessly with the React frontend via RESTful endpoints. Deployed on Render, it ensures reliable performance and cross-origin support for a smooth user experience.
          </p>
        </div>
        <div className="graphics">          
            <img src="/signal-tower.png" alt="tower icon" className="homeIcon" />
             <img src="/map.png" alt="map" className="mapPicture" />
             <img src="/pin-mark.png" alt="gps icon" className="homeIcon" />          
        </div>
      </div>
    </>
  );
}
export default Home;
