import * as Yup from 'yup';
import { useEffect, useState } from "react"
// import { useHotel } from "../context/HotelProvider"
import { MapContainer ,TileLayer, Marker,Popup, useMapEvent} from 'react-leaflet'
import useGeoLocation from "../src/hooks/useGeoLocation"
// import useUrlLocation from "../src/hooks/useUrlLocation"


import { useFormikContext , ErrorMessage } from 'formik';


export default function MapInformation(){
	const [markers, setMarkers] = useState([]);
	const { setFieldValue } = useFormikContext();

	// console.log('markers:',markers);
	const[mapCenter,setMapCenter] = useState([32.85971234321241,53.97240877523566])
    const {isLoading:isLoadingPosition , position:geoLocationPosition , getPosition } =useGeoLocation()
   
    const[lat,lng] = [11.9837 , 24.983]
    // const[lat,lng] = useUrlLocation()
    
    // const [markers, setMarkers] = useState([]);


    const addMarker = (newMarker) => {
        setMarkers([...markers, newMarker]);
		setFieldValue('locations', [...markers, newMarker]); // update formik state

    };

    useEffect(()=>{
        if(lat && lng ) setMapCenter([lat,lng])
    },[lat,lng])

    useEffect(()=>{
        if(geoLocationPosition?.lat && geoLocationPosition?.lng)
            setMapCenter([geoLocationPosition.lat , geoLocationPosition.lng])
    },[geoLocationPosition])


    return (
		<section>
			<div className="appLayout w-100">
			<div className="mapContainer" >
            <MapContainer className="map" zoom={9} scrollWheelZoom={true} center={mapCenter} >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <button onClick={getPosition} className="getLocation">
                    {isLoadingPosition ? "Loading ..." : "use my location"}
                </button>
                {/* <DetectClick /> */}
                {/* <ChangeCenter position={mapCenter}/> */}
                {/* {hotels.map((item)=>(
                    <Marker key={item.id} position={[item.latitude,item.longitude]} > 
                        <Popup>
                            {item.description}
                        </Popup>
                    </Marker>
                ))} */}
                <DetectClick onMarkerAdd={addMarker} />
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
		<ErrorMessage name="locations" component="div" className="text-danger" />


		</section>
	);
}

MapInformation.label = 'map Information';
MapInformation.initialValues = {
	locations:[
		// {id: 'new-marker-1', latitude: 52.19750685699392, longitude: 4.754733348150415},
		// {id: 'new-marker-2', latitude: 52.24293795417479, longitude: 4.21714332317158}
	],
};
MapInformation.validationSchema = Yup.object().shape({
	locations: Yup.array().required('Please select location'),
});

export function DetectClick({ onMarkerAdd }){
    const [clickedPosition, setClickedPosition] = useState(null);
    const [markerId, setMarkerId] = useState(1);


    // const navigate = useNavigate()
    useMapEvent({   // useMapEvent bara ine k age rooye map click krd che kone
        // click : (e) => console.log(e)
        
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
