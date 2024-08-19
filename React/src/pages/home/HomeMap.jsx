import { useEffect, useState } from "react"
import { MapContainer ,TileLayer, Marker,Popup, useMapEvent} from 'react-leaflet'
import useGeoLocation from "../../hooks/useGeoLocation"
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function HomeMap({houses}){
	const [markers, setMarkers] = useState([]);
    console.log(houses);
    const navigate = useNavigate()
	const[mapCenter,setMapCenter] = useState([32.85971234321241,53.97240877523566])
    const {isLoading:isLoadingPosition , position:geoLocationPosition , getPosition } =useGeoLocation()
    const[lat,lng] = [32.85971234321241,53.97240877523566]

    useEffect(()=>{
        if(lat && lng ) setMapCenter([lat,lng])
    },[lat,lng])


    useEffect(()=>{
        if(geoLocationPosition?.lat && geoLocationPosition?.lng)
            setMapCenter([geoLocationPosition.lat , geoLocationPosition.lng])
    },[geoLocationPosition])

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }


    return (
		<section>
			<div className="appLayout w-100">
			<div className="mapContainer" >
            <MapContainer className="map" zoom={5} scrollWheelZoom={true} center={mapCenter} >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <button onClick={getPosition} className="getLocation">
                    {isLoadingPosition ? "Loading ..." : "use my location"}
                </button>
                {/* <DetectClick /> */}
                {/* <ChangeCenter position={mapCenter}/> */}
                {houses.map((item)=>(
                    <Marker key={item.id} position={[item.latitude,item.longitude]} > 
                       <Popup>
                            <div className="d-flex flex-column justify-content-center align-items-center text-right">
                           
                                <p>{item.title}</p>
                                <p>{formatNumber(item.price)} تومان</p>
                                {/* <Button variant="primary" onClick={() => handleMarkerClick(item)}>
                                    
                                </Button> */}
                                <button onClick={() => navigate(`/house/${item.id}`)} className="smsButton">جزئیات بیشتر</button>

                            </div>
                        </Popup>
                    </Marker>
                ))}
                <DetectClick />
            {
                markers?.map((marker) => (
                    <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
                        <Popup>
                            {marker.latitude}, {marker.longitude}
                        </Popup>
                    </Marker>
                ))
            }
            </MapContainer>

        </div>		   
		</div>


		</section>
	);
}

export function DetectClick(){
    const [clickedPosition, setClickedPosition] = useState(null);
    const [markerId, setMarkerId] = useState(1);
    console.log(clickedPosition);
    


    useMapEvent({   
        
        click(e) {
            const { lat, lng } = e.latlng;
            setClickedPosition([lat, lng]);
            // onMarkerAdd({ id: "new-marker", latitude: lat, longitude: lng }); // Callback to add marker
            onMarkerAdd({ id: `new-marker-${markerId}`, latitude: lat, longitude: lng });
            setMarkerId(prevId => prevId + 1);
        }
        //   locationfound(e) {
        //     // setPositionn(e.latlng)
        //     console.log(e.latlng);
        //     mappp.flyTo(e.latlng, mappp.getZoom())
        //   },
        
        // click : (e) => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
    return null 
}



