/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker , useMap } from "react-leaflet";
import useGeoLocation from "../../hooks/useGeoLocation";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

export default function RecommenderMap({ houses ,mapCenterprops}) {
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState(16); // New state for zoom level

  console.log('mapCenterprops',mapCenterprops);
  
  const [mapCenter, setMapCenter] = useState(mapCenterprops);
  const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeoLocation();
  console.log(geoLocationPosition);
  
    function MapUpdater({ center, zoom }) {
        const map = useMap();
        
        useEffect(() => {
        if (center && zoom) {
            map.setView(center, zoom);
        }
        }, [center, zoom, map]);
    
        return null;
    }

  // Store the map instance
  const mapRef = useRef();

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng) {
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
      setZoomLevel(16); // Set zoom level to 13 when location is updated

      console.log("here",geoLocationPosition);
      
      // Pan map to the new center
      if (mapRef.current) {
        mapRef.current.setView([geoLocationPosition.lat, geoLocationPosition.lng], 13);
      }
    }
  }, [geoLocationPosition]);

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  return (
    <section>
      
      <div className="appLayout w-100 mt-0">
        <div className="mapContainer">
          <MapContainer
            className="map"
            // zoom={5}
            zoom={zoomLevel}

            scrollWheelZoom={true}
            center={mapCenter}
            whenCreated={(mapInstance) => (mapRef.current = mapInstance)} // Capture the map instance
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            <MapUpdater center={mapCenter} zoom={zoomLevel} />

            <button onClick={getPosition} className="getLocation">
              {isLoadingPosition ? "در حال بروزرسانی..." : "استفاده از موقعیت من"}
            </button>

            {/* Add Circle to show the user's location with a radius of 20 meters */}
            {geoLocationPosition?.lat && geoLocationPosition?.lng && (
              <CircleMarker
                center={[geoLocationPosition.lat, geoLocationPosition.lng]}
                radius={20}  // Radius in meters
                
                pathOptions={{ color: 'red', fillColor: 'red',fillOpacity: 0.8}}
              />
            )}

            {houses.map((item) => (
              <Marker
                key={item.id}
                position={[item.latitude, item.longitude]}
                
              >
                <Popup>
                  <div className="d-flex flex-column justify-content-center align-items-center text-right">
                    <p>{item.title}</p>
                    <p>{formatNumber(item.price)} تومان</p>
                    <button onClick={() => navigate(`/house/${item.id}`)} className="smsButton">
                      جزئیات بیشتر
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
            {markers.map((marker) => (
              <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
                <Popup>
                  {marker.latitude}, {marker.longitude}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
