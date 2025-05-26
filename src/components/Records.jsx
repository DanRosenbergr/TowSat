import { useState } from "react";
import "../scss/RecordsTable.css";

function Records({ btsRecords, gpsRecords, loadBtsData, loadGpsData, handleDelete }) {
  const [selectedBtsId, setSelectedBtsId] = useState(null); 
  const [selectedGpsId, setSelectedGpsId] = useState(null); 
  // console.log("Datav btsRecords z App.jsx(databaze):", btsRecords);

  return (
    <>
      <div className="records">
        <div className="recordsFullWindow">
          <div className="recordsWindow">
            <div className="recordsTitle">
              <p>Saved BTS Records</p>
            </div>
            <div className="recordsList">
              {btsRecords.map((item) => (
                <div
                  className={selectedBtsId === item.id ? "selected" : "datarow"}
                  key={item.id}
                  onClick={() => setSelectedBtsId((prevId) => (prevId === item.id ? null : item.id))}
                >
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <div className="recordsButtons">
              <button
                onClick={() => loadBtsData(selectedBtsId)}
                disabled={!selectedBtsId}
                className={selectedBtsId ? "myButton" : "myButtonDisabled"}
              >
                Load
              </button>
              <button
                onClick={() => handleDelete(selectedBtsId, "bts")}
                disabled={!selectedBtsId}
                className={selectedBtsId ? "myButton" : "myButtonDisabled"}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="recordsWindow">
            <div className="recordsTitle">
              <p>Saved GPS Records</p>
            </div>
            <div className="recordsList">
              {gpsRecords.map((item) => (
                <div
                  className={selectedGpsId === item.id ? "selected" : "datarow"}
                  key={item.id}
                  onClick={() => setSelectedGpsId((prevId) => (prevId === item.id ? null : item.id))}
                >
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <div className="recordsButtons">
              <button
                onClick={() => loadGpsData(selectedGpsId)}
                disabled={!selectedGpsId}
                className={selectedGpsId ? "myButton" : "myButtonDisabled"}
              >
                Load
              </button>
              <button
                onClick={() => handleDelete(selectedGpsId, "gps")}
                disabled={!selectedGpsId}
                className={selectedGpsId ? "myButton" : "myButtonDisabled"}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Records;
