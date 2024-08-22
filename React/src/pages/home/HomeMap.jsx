// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
// import useGeoLocation from "../../hooks/useGeoLocation";
// import { useNavigate } from "react-router-dom";
// import 'leaflet/dist/leaflet.css';

// export default function HomeMap({houses}){
// 	const [markers, setMarkers] = useState([]);
//     console.log(houses);
//     const navigate = useNavigate()
// 	const[mapCenter,setMapCenter] = useState([32.85971234321241,53.97240877523566])
//     const {isLoading:isLoadingPosition , position:geoLocationPosition , getPosition } =useGeoLocation()
//     const[lat,lng] = [32.85971234321241,53.97240877523566]

//     useEffect(()=>{
//         if(lat && lng ) setMapCenter([lat,lng])
//     },[lat,lng])

//     useEffect(()=>{
//         if(geoLocationPosition?.lat && geoLocationPosition?.lng)
//             setMapCenter([geoLocationPosition.lat , geoLocationPosition.lng])
//     },[geoLocationPosition])

//     function formatNumber(number) {
//         return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     }

//     var blueIcon = new L.Icon({
//         iconUrl: 'marker-icon-blue.png',
//         shadowUrl: 'marker-shadow.png',
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//         popupAnchor: [1, -34],
//         shadowSize: [41, 41]
//     });

//     var redIcon = new L.Icon({
//         iconUrl: 'marker-icon-red.png',
//         shadowUrl: 'marker-shadow.png',
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//         popupAnchor: [1, -34],
//         shadowSize: [41, 41]
//     });


//     var greyIcon = new L.Icon({
//         iconUrl: 'marker-icon-grey.png',
//         shadowUrl: 'marker-shadow.png',
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//         popupAnchor: [1, -34],
//         shadowSize: [41, 41]
//     });

//     var blackIcon = new L.Icon({
//         iconUrl: 'marker-icon-black.png',
//         shadowUrl: 'marker-shadow.png',
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//         popupAnchor: [1, -34],
//         shadowSize: [41, 41]
//     });

//     return (
// 		<section>
// 			<div className="appLayout w-100">
// 			<div className="mapContainer" >
//             <MapContainer className="map" zoom={5} scrollWheelZoom={true} center={mapCenter} >
//                 <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//                 />
//                 <button onClick={getPosition} className="getLocation">
//                     {isLoadingPosition ? "Loading ..." : "use my location"}
//                 </button>
//                 {houses.map((item)=>(
//                     <Marker key={item.id} position={[item.latitude,item.longitude]} 
//                     icon={item.category == "فروش آپارتمان" ? blueIcon : item.category == "فروش خانه و ویلا" ? greyIcon : redIcon}
//                     > 
//                        <Popup>
//                             <div className="d-flex flex-column justify-content-center align-items-center text-right">
                           
//                                 <p>{item.title}</p>
//                                 <p>{formatNumber(item.price)} تومان</p>
//                                 {/* <Button variant="primary" onClick={() => handleMarkerClick(item)}>
                                    
//                                 </Button> */}
//                                 <button onClick={() => navigate(`/house/${item.id}`)} className="smsButton">جزئیات بیشتر</button>

//                             </div>
//                         </Popup>
//                     </Marker>
//                 ))}
//                 <DetectClick />
//             {
//                 markers?.map((marker) => (
//                     <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
//                         <Popup>
//                             {marker.latitude}, {marker.longitude}
//                         </Popup>
//                     </Marker>
//                 ))
//             }
//             </MapContainer>
//         </div>		   
// 		</div>
// 		</section>
// 	);
// }

// export function DetectClick(){
//     const [clickedPosition, setClickedPosition] = useState(null);
//     const [markerId, setMarkerId] = useState(1);
//     console.log(clickedPosition);

//     useMapEvent({   
        
//         click(e) {
//             const { lat, lng } = e.latlng;
//             setClickedPosition([lat, lng]);
//             onMarkerAdd({ id: `new-marker-${markerId}`, latitude: lat, longitude: lng });
//             setMarkerId(prevId => prevId + 1);
//         }
        
//     })
//     return null 
// }


import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import useGeoLocation from "../../hooks/useGeoLocation";
import { useNavigate } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import { Select } from 'antd';
import { FormLabel } from "react-bootstrap";

const { Option } = Select;
export default function HomeMap({ houses }) {
    const [markers, setMarkers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All"); // State to manage the selected category
    const navigate = useNavigate();
    const [mapCenter, setMapCenter] = useState([32.85971234321241, 53.97240877523566]);
    const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeoLocation();
    const [lat, lng] = [32.85971234321241, 53.97240877523566];
    const [modalShow, setModalShow] = useState(false);  // Manage modal visibility

    useEffect(() => {
        if (lat && lng) setMapCenter([lat, lng]);
    }, [lat, lng]);

    useEffect(() => {
        if (geoLocationPosition?.lat && geoLocationPosition?.lng)
            setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }, [geoLocationPosition]);

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    var blueIcon = new L.Icon({
        iconUrl: 'marker-icon-blue.png',
        shadowUrl: 'marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var redIcon = new L.Icon({
        iconUrl: 'marker-icon-red.png',
        shadowUrl: 'marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var goldIcon = new L.Icon({
        iconUrl: 'marker-icon-gold.png',
        shadowUrl: 'marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var blackIcon = new L.Icon({
        iconUrl: 'marker-icon-black.png',
        shadowUrl: 'marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Filter houses based on selected category
    const filteredHouses = selectedCategory === "All" ? houses : houses.filter(item => item.category === selectedCategory);

    return (
        <section>
            <div className="dropdownContainer mb-2 mt-2" style={{textAlign: 'center' ,display:"flex",alignItems:"center" , gap:"10px" }}>
                <FormLabel className="mt-2">انتخاب دسته بندی برای نمایش روی نقشه:</FormLabel>
                <Select
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    style={{
                        cursor: 'pointer',
                        width: '150px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        textAlign: 'right',
                    }}
                    dropdownRender={(menu) => (
                        <>
                        {menu}
                        </>
                    )}
                >
                    <Option value="All">همه</Option>
                    <Option value="فروش آپارتمان">فروش آپارتمان</Option>
                    <Option value="فروش خانه و ویلا">فروش خانه و ویلا</Option>
                    <Option value="اجارهٔ آپارتمان">اجاره آپارتمان</Option>
                    <Option value="اجارهٔ خانه و ویلا">اجاره خانه و ویلا</Option>
                </Select>
            </div>
            <div className="appLayout w-100 mt-0">
                <div className="mapContainer ">
                    <MapContainer className="map" zoom={5} scrollWheelZoom={true} center={mapCenter}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                        />
                        <button onClick={getPosition} className="getLocation">
                            {isLoadingPosition ? "Loading ..." : "use my location"}
                        </button>
                        {filteredHouses.map((item) => (
                            <Marker
                                key={item.id}
                                position={[item.latitude, item.longitude]}
                                icon={
                                    item.category === "فروش آپارتمان"
                                        ? blueIcon
                                        : item.category === "فروش خانه و ویلا"
                                            ? goldIcon 
                                            : item.category === "اجارهٔ آپارتمان" ?
                                                redIcon : blackIcon
                                }
                            >
                                <Popup>
                                    <div className="d-flex flex-column justify-content-center align-items-center text-right">
                                        <p>{item.title}</p>
                                        <p>{formatNumber(item.price)} تومان</p>
                                        <button onClick={() => navigate(`/house/${item.id}`)} className="smsButton">جزئیات بیشتر</button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                        {markers?.map((marker) => (
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

