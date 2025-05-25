import React from "react";
import localBtsData from "../btsdata.json"
import localGpsData from "../gpsdata.json"

function Info({ btsDataFunc, gpsDataFunc }) {

  const loadBtsLocal=() =>{
    if (btsDataFunc) {
      btsDataFunc(localBtsData)
    }
  }
  const loadGpsLocal=() =>{
    if (gpsDataFunc) {
      gpsDataFunc(localGpsData)
    }
  }
  return (
    <>
      <div className="info">
        <h3>How it Works</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo similique
          maxime quam est, dolorum quas accusantium optio aut ullam tenetur. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Facilis, aspernatur
          repudiandae tenetur ipsa voluptate vitae iure omnis officiis recusandae
          quidem inventore atque harum, necessitatibus, expedita minus fugit qui
          quaerat illum.
        </p>
        <button className="myButton" onClick={loadBtsLocal}>BTS file</button>
        <button className="myButton" onClick={loadGpsLocal}>GPS file</button>
      </div>
    </>
  );
}
export default Info;
