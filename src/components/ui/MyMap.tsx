import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

        
export default function MyMap() {
    const position: [number, number] = [41.3851, 2.1734]

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
            
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty location <br /> You can customize this popup.
          </Popup>
        </Marker>
        
        </MapContainer>
    )

}