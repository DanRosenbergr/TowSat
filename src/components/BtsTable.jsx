import React from "react";
import "../scss/DataTable.css";

function BtsTable({ btsData }) {
  // fuknce na prevedeni formatu cas
  function formatBTSTime(sysTime) {
    if (!sysTime || sysTime.length !== 14) return sysTime;

    const year = sysTime.slice(0, 4);
    const month = sysTime.slice(4, 6);
    const day = sysTime.slice(6, 8);
    const hour = sysTime.slice(8, 10);
    const minute = sysTime.slice(10, 12);

    return `${day}.${month}.${year} ${hour}:${minute}`;
  }
  return (
    <>
      <div className="tableWindow">
        <h4 className="tableTitle">BTS data</h4>
        <div className="tableContainer">          
            <table className="table">
            <thead>
              <tr>
                <th>Date/Time</th>
                <th>Tower Id</th>
                <th>rssi</th>
                <th>Technologie</th>
                <th>ARFCN</th>
              </tr>
            </thead>
              <tbody>
                {btsData.length === 0 ? (<tr>
                  <td colSpan="5" className="noData">! no data yet !</td>
                </tr>) : (
                  btsData.map((row, index) => (
                    <tr key={index}>
                      <td>{formatBTSTime(row.sys_time)}</td>
                      <td>{row.cid}</td>
                      <td>{row.rssi}</td>
                      <td>{row.tech}</td>
                      <td>{row.arfcn}</td>
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

export default BtsTable;
