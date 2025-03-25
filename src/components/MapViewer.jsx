// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const MapViewer = ({ gisData }) => {
//   return (
//     <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {gisData.map((item, index) => (
//         <Marker key={index} position={item.coordinates}>
//           <Popup>{item.name} - {item.type}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default MapViewer;

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import pointing_img from "../assets/location-pin.png";

const MapViewer = () => {
  const demoGISData = [
    { id: 1, name: "Farm Land", coordinates: [22.5726, 88.3639], type: "agriculture" },
    { id: 2, name: "Road Network", coordinates: [28.7041, 77.1025], type: "infrastructure" }
  ];

  return (
    <div>
    <h1>GIS Map Viewer</h1>
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {demoGISData.map((item) => (
        <Marker key={item.id} position={item.coordinates} icon={L.icon({
          iconUrl: pointing_img,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [0, -41]
        })}>
          <Popup>{item.name} - {item.type}</Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
  );
};

export default MapViewer;
