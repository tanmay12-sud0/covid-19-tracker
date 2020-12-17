import React from 'react'
import './Map.css'
import {MapContainer, TileLayer} from 'react-leaflet'
function Maps({centers, zoom}) {
    const position = centers
    console.log(position)
    console.log(zoom)
    console.log([position.lat,position.lng])
    return (
        <div className="map">
     
<MapContainer center={[position.lat,position.lng]} zoom={zoom} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  

</MapContainer>

        </div>
    )
}

export default Maps
