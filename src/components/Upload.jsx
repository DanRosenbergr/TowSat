import React, { useState } from "react";
import axios from "axios";


function Upload({ btsDataFunc, gpsDataFunc }) {
  const [localBtsData, setLocalBtsData] = useState([])
  const [localGpsData, setLocalGpsData] = useState([])
  
  const handleFileUploadBTS = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csv = e.target.result;
      const rows = csv.split("\n");

      const uniqueCells = new Set([]); // pole unikatnich hodnot
      const processedBTSData = [];

      //smycka pro vyhledani unikatnich BTS vezi a nasledne ulozeni adekvatnich dat do pole
      rows.slice(1).forEach((row) => {
        const columns = row.split(";");
        const cid = columns[21];
        if (!cid || uniqueCells.has(cid)) return;

        uniqueCells.add(cid);

        processedBTSData.push({
          sys_time: columns[1], // systémový čas
          cid: cid, // ID buňky
          rssi: columns[23], // síla signálu
          tech: columns[16], // technologie
          arfcn: columns[32], // číslo kanálu
          lat: columns[29],
          long: columns[30],
        });
      });

      //volani funkce rodice App.jsx pro prirazeni dat
      if (btsDataFunc) {
        btsDataFunc(processedBTSData);
      }
      setLocalBtsData(processedBTSData)
    };  
    reader.readAsText(file);
  };   
  const handleFileUploadGPS = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(e.target.result, "text/xml");

      const trackPoints = xmlDoc.getElementsByTagName("trkpt");
      const processedGPSdata = [];

      for (let i = 0; i < trackPoints.length; i++) {
        const trkpt = trackPoints[i];
        const latitude = trkpt.getAttribute("lat");
        const longitude = trkpt.getAttribute("lon");
        const elevation = trkpt.getElementsByTagName("ele")[0]?.textContent;
        const time = trkpt.getElementsByTagName("time")[0]?.textContent;

        //do dat se uklada kazda 10 sekunda
        if (time.slice(-2, -1) === "0") {
          processedGPSdata.push({
            latitude,
            longitude,
            elevation,
            time,
          });
        }
      }
      if (gpsDataFunc) {
        gpsDataFunc(processedGPSdata);
      }
      setLocalGpsData(processedGPSdata);
    };
    reader.readAsText(file);
  };
  const saveBtsData = () => {
    if (!localBtsData.length) {
      console.error("Neco spatne s BTS daty");
      return;
    }
    const nameBts = prompt("Zadejte nazev zaznamu:");
    axios
      .post("http://localhost:5000/phone-tracker/btsdata", {
      // .post("https://phone-tracker-backendtest.onrender.com/btsdata", {
        data: localBtsData,
        nameBts,
      })
      .then((response) => {
        console.log("Data uspesne odeslana:", response.data);
        alert("Data byla úspěšně uložena!"); // Pop-up okno
      })
      .catch((error) => {
        console.error("Chyba pri odesilani dat:", error);
      });
    };
  const saveGpsData = () => {
    if (!localGpsData.length) {
      console.error("Neco spatne s GPS daty");
      return;
    }
    const nameGps = prompt("Zadejte nazev zaznamu:");
    axios
      .post("http://localhost:5000/phone-tracker/gpsdata", {
      // .post("https://phone-tracker-backendtest.onrender.com/gpsdata", {
        data: localGpsData,
        nameGps,
      })
      .then((response) => {
        console.log("Data spesne odeslana:", response.data);
      })
      .catch((error) => {
        console.error("Chyba pri odesilani dat:", error);
      });
  }
  return (
    <>
      <div className="upload">
        <h3>Upload</h3>
        <div className="btsUpload">
          <label htmlFor="btsFile" className="myButton d-flex align-items-center justify-content-center">
            upload BTS data here...
          </label>
          <input
            type="file"
            id="btsFile"
            accept=".csv"
            onChange={handleFileUploadBTS}
            style={{ display: "none" }}
          />
        </div>
        <br/>
        <div className="gpsUpload">
          <label htmlFor="gpsFile" className="myButton d-flex align-items-center justify-content-center">
            upload GPS data here...
          </label>
          <input
            type="file"
            id="gpsFile"
            accept=".gpx"
            onChange={handleFileUploadGPS}
            style={{ display: "none" }}
          />
        </div>
        <h3>Do you want to keep the data?</h3>
        <div className="saveWindow">
          <button className="myButton" onClick={saveBtsData}>Save BTS data</button>
          <button className="myButton" onClick={saveGpsData}>Save GPS data</button>
        </div>
      </div>
    </>
  );
}
export default Upload;
