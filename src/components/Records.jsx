import { useState } from "react";
import "../scss/RecordsTable.css";

function Records({ btsRecords, gpsRecords, loadBtsData, loadGpsData, handleDelete }) {
  const [selectedBtsId, setSelectedBtsId] = useState(null); 
  const [selectedGpsId, setSelectedGpsId] = useState(null); 
  // console.log("Datav btsRecords z App.jsx(databaze):", btsRecords);

  return (
    <>
      <div className="records">
        <h4 className="text-center">Records</h4>
        <div className="recordsWindow">
          <div className="btsWindow">
            <div className="btsList">
              <p className="text-center fw-bold p-2">Saved BTS Records</p>
              {btsRecords.map((item) => (
                <div
                  className={`ms-3 me-3 datarow d-flex justify-content-between ${selectedBtsId === item.id ? "selected" : ""}`}
                  key={item.id}
                  onClick={() => setSelectedBtsId(item.id)}>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <div className="recordsButtons">
              <button
                onClick={() => loadBtsData(selectedBtsId)}
                disabled={!selectedBtsId}
                className={`btn me-3 ${selectedBtsId ? "myButton" : "btn-secondary"} btnDel`}>Load
              </button>
              <button
                onClick={() => handleDelete(selectedBtsId, "bts")}
                disabled={!selectedBtsId}
                className={`btn ${selectedBtsId ? "" : "btn-secondary"} btnDel`}>Delete
              </button>
            </div>
          </div>
        
          <div className="gpsWindow">
            <div className="gpsList">
              <p className="text-center fw-bold p-2">Saved GPS Records</p>
              {gpsRecords.map((item) => (
                <div
                  className={`ms-3 me-3 datarow d-flex justify-content-between ${selectedGpsId === item.id ? "selected" : ""}`}
                  key={item.id}
                  onClick={() => setSelectedGpsId(item.id)}>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <div className="recordsButtons">
              <button
                onClick={() => loadGpsData(selectedGpsId)}
                disabled={!selectedGpsId}
                className={`btn me-3 ${selectedGpsId ? "btn-success" : "btn-secondary"} btnDel`}>Load
              </button>
              <button
                onClick={() => handleDelete(selectedGpsId, "bts")}
                disabled={!selectedGpsId}
                className={`btn ${selectedGpsId ? "btn-danger" : "btn-secondary"} btnDel`}>Delete
              </button>
            </div>
          </div>
        </div>
      </div>      
    </>
  );
}
export default Records;
