import { useState } from "react";
import './scss/custom.scss';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import { Routes, Route, NavLink } from "react-router-dom";
import Info from "./components/Info.jsx";
import Upload from "./components/Upload.jsx";
import Home from "./components/home.jsx"
import Records from "./components/Records.jsx"
import BtsTable from "./components/BtsTable.jsx";
import GpsTable from "./components/GpsTable.jsx"
import Map from "./components/Map.jsx"

function App() {
  const [btsData, setBtsData] = useState([]);
  const [gpsData, setGpsData] = useState([]);
  const [savedRecordsBTS, setSavedRecordsBTS] = useState([]);
  const [savedRecordsGPS, setSavedRecordsGPS] = useState([]);

  const uploadBTSdata = (data) => {
    setBtsData(data);
    // console.log("BTS data in App:", data);
  };
  const uploadGPSdata = (data) => {
    setGpsData(data);
    // console.log("BTS data in App:", data);
  };
  const handleAllRecords= () => {
  loadBtsRecords();
  loadGpsRecords();
}
  const loadBtsRecords = () => {
    axios
      // .get("http://localhost:5000/phone-tracker/bts")
      .get("https://phone-tracker-backendtest.onrender.com/btsdata")
      .then((response) => {
        setSavedRecordsBTS(response.data);
        console.log("Data v savedRecordsBTS", savedRecordsBTS);        
      })
      .catch((error) => {
        console.error("chyba nacitani zaznamu BTS:", error);
      });
  };
  const loadGpsRecords = () => {
    axios
      // .get("http://localhost:5000/phone-tracker/gps")
      .get("https://phone-tracker-backendtest.onrender.com/gpsdata")
      .then((response) => {
        setSavedRecordsGPS(response.data);
        console.log("Data v savedRecordsGPS", savedRecordsGPS);        
      })
      .catch((error) => {
        console.error("chyba nacitani zaznamu GPS:", error);
      });
   };
  const handleDelete = (id, type) => {
  if (type === "bts") {
    // delete BTS záznam
    if (window.confirm("Are you sure you want to delete the record?")) {
      axios
        // .delete(`http://localhost:5000/phone-tracker/bts/${id}`)
        .delete(`https://phone-tracker-backendtest.onrender.com/btsdata/${id}`)
        .then(() => {
          loadBtsRecords();
        })
        .catch((error) => {
          console.error("chyba nacitani zaznamu BTS:", error);
        });
    }
  } else if (type === "gps") {
    // delete GPS záznam
    if (window.confirm("Are you sure you want to delete the record?")) {
      axios
        // .delete(`http://localhost:5000/phone-tracker/gps/${id}`)
        .delete(`https://phone-tracker-backendtest.onrender.com/gpsdata/${id}`)
        .then(() => {
          loadGpsRecords();
        })
        .catch((error) => {
          console.error("chyba nacitani zaznamu GPS:", error);
        });
    }
  }
  };
  const loadBtsData = (recordIdBTS) => {
    axios
      // .get(`http://localhost:5000/phone-tracker/bts/${recordIdBTS}`)
      .get(`https://phone-tracker-backendtest.onrender.com/recordsBTS/${recordIdBTS}`)
      .then((response) => {
        setBtsData(response.data);
        console.log("Data v btsData:", btsData);
        alert("Data in selected record were successfyly loaded.")
      })
      .catch((error) => {
        console.error("chyba pri nacitani jednoho zaznamu BTS:", error);
      });
  };
  const loadGpsData = (recordIdGPS) => {
    axios
      // .get(`http://localhost:5000/phone-tracker/gps/${recordIdGPS}`)
      .get(`https://phone-tracker-backendtest.onrender.com/recordsGPS/${recordIdGPS}`)
      .then((response) => {
        setGpsData(response.data);
        console.log("Data v GpsData:", gpsData);  
        alert("Data in selected record were successfyly loaded.")
      })
      .catch((error) => {
        console.error("chyba pri nacitani jednoho zaznamu GPS", error);
      });
  };
  return (
    <>
      <header className="header">TowSat</header>
      <div className="container">
        <div className="menu">
          <NavLink className="menuButton" to="/">
            <button>Home</button>
          </NavLink>
          <NavLink className="menuButton" to="/info">
            <button>How it works</button>
          </NavLink>
          <NavLink className="menuButton" to="/upload">
            <button>Upload</button>
          </NavLink>
          <NavLink className="menuButton" to="/records">
            <button onClick={handleAllRecords}>Records</button>
          </NavLink>
          <NavLink className="menuButton" to="/tables">
            <button>Data Tables</button>
          </NavLink>

          <NavLink className="menuButton" to="/map">
            <button>Map</button>
          </NavLink>
        </div>
        <div className="mainWindow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info btsDataFunc={uploadBTSdata} gpsDataFunc={uploadGPSdata} />}/>
            <Route path="/upload" element={<Upload
                  btsDataFunc={uploadBTSdata}
                  gpsDataFunc={uploadGPSdata}
                  btsData={btsData}
                  gpsData={gpsData}/>}/>
            <Route path="/records" element={<Records
                  btsRecords={savedRecordsBTS}
                  gpsRecords={savedRecordsGPS}
                  loadBtsData={loadBtsData}
                  loadGpsData={loadGpsData}
                  handleDelete={handleDelete}/>}/>
            <Route path="/tables" element={<div className="tables">
                  <BtsTable btsData={btsData} />
                  <GpsTable gpsData={gpsData} />
                </div>}/>
            <Route path="/map" element={<Map btsData={btsData} gpsData={gpsData} />}/>
          </Routes>
        </div>
      </div>
      <footer className="footer">
        <p> © D4n_b3rg 2025 </p>
      </footer>
    </>
  );
}

export default App;
