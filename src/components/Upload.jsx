import axios from "axios";
import "../scss/Upload.css"

function Upload({ btsDataFunc, gpsDataFunc, btsData, gpsData }) {
    
  function validateCSV(text) {
  const rows = text.trim().split("\n");
  if (rows.length < 2) return false;

  const header = rows[0].split(";").map(h => h.trim().toLowerCase());
  const requiredColumns = ["sys_time", "cid", "rssi", "tech", "arfcn", "lat", "long"];

  const isHeaderValid = requiredColumns.every(col => header.includes(col));
  return isHeaderValid;
  }  
  function validateGPX(gpxText) {
  // obsahuje text tyto tagy?
  const hasTrkpt = gpxText.includes("<trkpt");
  const hasLat = gpxText.match(/<trkpt[^>]*lat="[^"]+"/);
  const hasLon = gpxText.match(/<trkpt[^>]*lon="[^"]+"/);
  const hasTime = gpxText.includes("<time>");
  return hasTrkpt && hasLat && hasLon && hasTime;
  }
  
  const handleFileUploadBTS = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csv = e.target.result;

       // VALIDACE CSV
      if (!validateCSV(csv)) {
        alert("Invalid CSV format. Please upload a file exported from the correct BTS tracking app.");
      return;
      }
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
    };  
    reader.readAsText(file);
  };   
  const handleFileUploadGPS = (e) => {
    const file = e.target.files[0];

    if (!validateGPX(file)) {
      alert("Invalid GPX format. Please upload a file exported from the recommended GPS tracking app.");
      return;
    }
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
    };
    reader.readAsText(file);
  };

  const saveBtsData = () => {
    if (!btsData.length || !btsData) {
      console.error("Neco spatne s BTS daty");
      alert("No BTS data to save!");
      return;
    }
    const nameBts = prompt("Choose the name of your recording:");
    axios
      // .post("http://localhost:5000/phone-tracker/bts", {
      .post("https://phone-tracker-backendtest.onrender.com/btsdata", {
        data: btsData,
        nameBts,
      })
      .then((response) => {
        console.log("Data uspesne odeslana:", response.data);
        alert("Data were successfully saved in the database."); // Pop-up okno
      })
      .catch((error) => {
        console.error("Chyba pri odesilani dat:", error);
      });
  };  
  const saveGpsData = () => {
    if (!gpsData.length || !gpsData) {
      console.error("Neco spatne s GPS daty");
      alert("No GPS data to save!");
      return;
    }
    const nameGps = prompt("Choose the name of your recording:");
    axios
      // .post("http://localhost:5000/phone-tracker/gps", {
      .post("https://phone-tracker-backendtest.onrender.com/gpsdata", {
        data: gpsData,
        nameGps,
      })
      .then((response) => {
        console.log("Data spesne odeslana:", response.data);
        alert("Data were successfully saved in the database.")
      })
      .catch((error) => {
        console.error("Chyba pri odesilani dat:", error);
      });
    }
  return (
    <>
      <div className="upload">
        <h4>Upload</h4>
        <div className="uploadWindow">
          <p>
            Upload a CSV file containing BTS (Base Transceiver Station) data.
            This file must be exported from the <strong>Net Monitor</strong> app.
          </p>
          <div className="UploadButton">
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
          <img src="/signal-tower.png" alt="tower icon" className="infoIcon ms-2" />
        </div>        
        <div className="uploadWindow">
          <p>
            Upload a GPX file containing GPS track data, that must be from the <strong>GPS Logger</strong> app.
            This file contains your recorded route and positions.
          </p>
          <div className="UploadButton">
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
          <img src="/pin-mark.png" alt="gps icon" className="infoIcon ms-2" />
        </div>
        <h4>Do you want to keep the data?</h4>
        <div className="uploadWindow">          
            <p>
            Once you've uploaded your data, you can choose to save it into the application's database.
            This allows you to access and work with the same data later without needing to re-upload the files.
          </p>
        </div>
        <div className="saveWindow">
          <img src="/public/signal-tower.png" alt="tower icon" className="infoIcon" />
          <button className="myButton" onClick={saveBtsData}>Save BTS data</button>
          <button className="myButton" onClick={saveGpsData}>Save GPS data</button>
          <img src="/public/pin-mark.png" alt="gps icon" className="infoIcon" />
        </div>
      </div>
    </>
  );
}
export default Upload;
