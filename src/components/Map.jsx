import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../scss/Map.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import MapSetter from "./MapSetter";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function Map({ btsData, gpsData }) {    
const [showBTS, setShowBTS] = useState(true);
const [showGPS, setShowGPS] = useState(true);
    
  //vychozi stred a zoom
const defaultCenter = [50.0755, 14.4378]; // Praha
const defaultZoom = 10;

const firstPoint =
    (showGPS && gpsData.length && gpsData[0]) ||
    (showBTS && btsData.length && btsData[0]);

  const center = firstPoint
    ? [
        parseFloat(firstPoint.latitude || firstPoint.lat),
        parseFloat(firstPoint.longitude || firstPoint.long),
      ]
    : defaultCenter;

const gpsCoords = gpsData
    .filter((item) => item.latitude && item.longitude)
    .map((item) => [parseFloat(item.latitude), parseFloat(item.longitude)]);

const validBts = btsData.filter(
    (item) =>
    item.lat &&
    item.long &&
    !isNaN(parseFloat(item.lat)) &&
    !isNaN(parseFloat(item.long))
  );

    return (
    <div className="map">
      <div className="mapContainer">
        <div className="mapButtons">
          <button className="myButton" onClick={() => setShowGPS(!showGPS)}>
            {showGPS ? "Hide GPS" : "Show GPS"}
          </button>
          <button className="myButton" onClick={() => setShowBTS(!showBTS)} >
            {showBTS ? "Hide BTS" : "Show BTS"}
          </button>
        </div>
        <div className="mapArea">
          <MapContainer
            center={center}
            zoom={defaultZoom}
            className="mapleaflet"
          >
          <MapSetter center={center} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
              />
              {showGPS && gpsCoords.length > 0 && (
              <Polyline positions={gpsCoords} color="blue" weight={3} />
              )}
      
          {showBTS && validBts.map((item, index) => {
                const lat = parseFloat(item.lat);
                const lng = parseFloat(item.long);
                return (
                  <Marker key={index} position={[lat, lng]} icon={customIcon}>
                    <Popup>
                      <strong>BTS {item.cid}</strong>
                      <br />
                      Čas: {item.sys_time}
                      <br />
                      RSSI: {item.rssi}
                      <br />
                      Technologie: {item.tech}
                      <br />
                      ARFCN: {item.arfcn}
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Map;

