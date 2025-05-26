import { useState, useEffect } from "react";
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
  const [showBTS, setShowBTS] = useState(false);
  const [showGPS, setShowGPS] = useState(false);

  //prepinani show buttons dle exitence dat
  useEffect(() => {
    if (btsData && btsData.length > 0) setShowBTS(true);
    else setShowBTS(false);
    if (gpsData && gpsData.length > 0) setShowGPS(true);
    else setShowGPS(false);
  }, [gpsData, btsData]);

  //vychozi stred a zoom
  const defaultCenter = [49.8209, 18.2625]; // Ostrava
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
        <div className="mapControls">
          <div className="mapButtons">
            <button
              className={
                showGPS
                  ? gpsData && gpsData.length > 0
                    ? "myButton"
                    : "myButtonOff"
                  : "myButtonOff"
              }
              onClick={() => setShowGPS(!showGPS)}
            >
              {showGPS && gpsData && gpsData.length > 0
                ? "Hide GPS line"
                : "Show GPS line"}
            </button>
            <button
              className={
                showBTS
                  ? btsData && btsData.length > 0
                    ? "myButton"
                    : "myButtonOff"
                  : "myButtonOff"
              }
              onClick={() => setShowBTS(!showBTS)}
            >
              {showBTS && btsData && btsData.length > 0
                ? "Hide BTS towers"
                : "Show BTS towers"}
            </button>
          </div>

          <div className="mapWarnings">
            {showBTS && (!btsData || btsData.length === 0) && (
              <p className="noDataMessage">No BTS data to show!</p>
            )}
            {showGPS && (!gpsData || gpsData.length === 0) && (
              <p className="noDataMessage">No GPS data to show!</p>
            )}
          </div>
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

            {showBTS &&
              validBts.map((item, index) => {
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
