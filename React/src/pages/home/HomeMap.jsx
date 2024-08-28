/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker , useMap } from "react-leaflet";
import L from "leaflet";
import useGeoLocation from "../../hooks/useGeoLocation";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { Select } from "antd";
import { FormLabel } from "react-bootstrap";

const { Option } = Select;

export default function HomeMap({ houses }) {
  const [markers, setMarkers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState(5); // New state for zoom level

  const [mapCenter, setMapCenter] = useState([32.85971234321241, 53.97240877523566]);
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

  // Define the icons
  const blueIcon = new L.Icon({
    iconUrl: "marker-icon-blue.png",
    shadowUrl: "marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const redIcon = new L.Icon({
    iconUrl: "marker-icon-red.png",
    shadowUrl: "marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const goldIcon = new L.Icon({
    iconUrl: "marker-icon-gold.png",
    shadowUrl: "marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const blackIcon = new L.Icon({
    iconUrl: "marker-icon-black.png",
    shadowUrl: "marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const filteredHouses =
    selectedCategory === "All" ? houses : houses.filter((item) => item.category === selectedCategory);

  return (
    <section>
      <div className="dropdownContainer mb-2 mt-2" style={{ textAlign: "center", display: "flex", alignItems: "center", gap: "10px" }}>
        <FormLabel className="mt-2">انتخاب دسته بندی برای نمایش روی نقشه:</FormLabel>
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          style={{
            cursor: "pointer",
            width: "150px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "right",
          }}
        >
          <Option value="All">همه</Option>
          <Option value="فروش آپارتمان">فروش آپارتمان</Option>
          <Option value="فروش خانه و ویلا">فروش خانه و ویلا</Option>
          <Option value="اجارهٔ آپارتمان">اجاره آپارتمان</Option>
          <Option value="اجارهٔ خانه و ویلا">اجاره خانه و ویلا</Option>
        </Select>
      </div>
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

            {filteredHouses.map((item) => (
              <Marker
                key={item.id}
                position={[item.latitude, item.longitude]}
                icon={
                  item.category === "فروش آپارتمان"
                    ? blueIcon
                    : item.category === "فروش خانه و ویلا"
                    ? goldIcon
                    : item.category === "اجارهٔ آپارتمان"
                    ? redIcon
                    : blackIcon
                }
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
