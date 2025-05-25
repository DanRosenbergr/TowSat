import React from "react";
import "../scss/DataTable.css";

function GpsTable({ gpsData }) {
  // fuknce na prevedeni formatu cas
  function formatGPXTime(gpxTime) {
    if (!gpxTime || gpxTime.length < 19) return gpxTime;

    const year = gpxTime.slice(0, 4);
    const month = gpxTime.slice(5, 7);
    const day = gpxTime.slice(8, 10);
    const hour = gpxTime.slice(11, 13);
    const minute = gpxTime.slice(14, 16);

    return `${day}.${month}.${year} ${hour}:${minute}`;
  }
  return (
    <>
      <div className="tableWindow">
        <h4 className="tableTitle">GPS data</h4>
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Altitude</th>
                <th>Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {gpsData.length ===0 ?(<tr><td colspan="5" className="noData">! no data yet !</td></tr>):(
                gpsData.map((point, index) => (
                  <tr key={index}>
                  <td>{point.latitude}</td>
                  <td>{point.longitude}</td>
                  <td>{point.elevation}</td>
                  <td>{formatGPXTime(point.time)}</td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default GpsTable;
