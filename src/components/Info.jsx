import React from "react";
import localBtsData from "../btsdata.json"
import localGpsData from "../gpsdata.json"
import "../scss/Info.css"

function Info({ btsDataFunc, gpsDataFunc }) {

  const loadBtsLocal=() =>{
    if (btsDataFunc) {
      btsDataFunc(localBtsData)
      alert("Sample BTS data loaded succesfully.")
    }
  }
  const loadGpsLocal=() =>{
    if (gpsDataFunc) {
      gpsDataFunc(localGpsData)
      alert("Sample GPS data loaded succesfully.")
    }
  }
  return (
    <>
        <div className="info">
          <div className="infoText">
            <div className="text">
              <h4>Upload Data Files</h4>
               <p>
                In the <strong>Upload</strong> section, you can upload CSV files containing BTS data or GPX files with GPS tracks.  
                The application is optimized for data exported from specific mobile apps — namely <em>Net Monitor</em> and <em>GPS Logger</em>.  
                Links to these apps are provided below:
              </p>
              <div className="links">
                <a href="https://play.google.com/store/apps/details?id=ru.v_a_v.netmonitor&hl=en" target="_blank" rel="noopener noreferrer">Net Monitor</a>
                <a href="https://play.google.com/store/search?q=gps%20logger&c=apps" target="_blank" rel="noopener noreferrer">
                GPS Logger
              </a>
              </div>
              <p>
              CSV and GPX files from other applications will likely not work.  
              For your convenience, sample data is provided so you can try the TowSat application without needing your own data.
              </p>          
          </div>
          <div className="infoButtons">
            <img src="/signal-tower.png" alt="tower icon" className="infoIcon" />
            <button className="myButton" onClick={loadBtsLocal}>
              sample BTS file
            </button>
            <button className="myButton" onClick={loadGpsLocal}>
              sample GPS file
            </button>
            <img src="/pin-mark.png" alt="gps icon" className="infoIcon" />   
          </div >
            <div className="text2">
              <h4>Data Visualization</h4>
              <p>
                Once the data is uploaded, you can explore it in detail within the <strong>Data Tables</strong> section, where all records are clearly organized and easy to review.  
                For a spatial overview, you can further examine the data in the interactive <strong>Map</strong> section.  
                If needed, the uploaded data can also be saved through the <strong>Upload</strong> section for later use.
              </p>              
            </div>
            <div className="text2">
              <h4>Manage Your Data</h4>
                <p>
                The <strong>Records</strong> section allows you to manage all your saved entries in one place.  
                You can browse through existing records, load a specific entry for further use, or delete any data that is no longer needed.  
                </p>
            </div>
          </div>
          
        </div>     
    </>
  );
}
export default Info;
