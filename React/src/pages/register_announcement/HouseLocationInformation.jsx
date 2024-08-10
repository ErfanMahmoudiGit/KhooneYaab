import * as Yup from 'yup';
import { useEffect, useState } from "react"
import { MapContainer ,TileLayer, Marker,Popup, useMapEvent} from 'react-leaflet'
import { useFormikContext , ErrorMessage } from 'formik';
import StateDropdown from '../../ui/StateDropdown';
import { Col, Row } from 'react-bootstrap';

export default function HouseLocationInformation(){
    const [markers, setMarkers] = useState([]);
	const { setFieldValue , values } = useFormikContext();
    const STATE_DATA = [
        { "name": "آذربايجان شرقی", "center": "تبریز", "latitude": "38.50", "longitude": "46.180", "id": 1 },
        { "name": "آذربايجان غربی", "center": "ارومیه", "latitude": "37.320", "longitude": "45.40", "id": 2 },
        { "name": "اردبيل", "center": "اردبیل", "latitude": "38.140", "longitude": "48.170", "id": 3 },
        { "name": "اصفهان", "center": "اصفهان", "latitude": "32.390", "longitude": "51.400", "id": 4 },
        { "name": "ايلام", "center": "ايلام", "latitude": "33.380", "longitude": "46.250", "id": 5 },
        { "name": "بوشهر", "center": "بوشهر", "latitude": "28.590", "longitude": "50.500", "id": 6 },
        { "name": "تهران", "center": "تهران", "latitude": "35.410", "longitude": "51.240", "id": 7 },
        { "name": "چهارمحال بختیاری", "center": "شهركرد", "latitude": "32.190", "longitude": "50.510", "id": 8 },
        { "name": "خراسان جنوبی", "center": "بيرجند", "latitude": "32.5216", "longitude": "59.1315", "id": 9 },
        { "name": "خراسان رضوی", "center": "مشهد", "latitude": "36.170", "longitude": "59.350", "id": 10 },
        { "name": "خراسان شمالی", "center": "بجنورد", "latitude": "37.2835", "longitude": "57.1954", "id": 11 },
        { "name": "خوزستان", "center": "اهواز", "latitude": "31.190", "longitude": "48.410", "id": 12 },
        { "name": "زنجان", "center": "زنجان", "latitude": "36.400", "longitude": "48.290", "id": 13 },
        { "name": "سمنان", "center": "سمنان", "latitude": "35.340", "longitude": "53.230", "id": 14 },
        { "name": "سيستان و بلوچستان", "center": "زاهدان", "latitude": "29.320", "longitude": "60.540", "id": 15 },
        { "name": "فارس", "center": "شيراز", "latitude": "29.360", "longitude": "52.310", "id": 16 },
        { "name": "قزوين", "center": "قزوين", "latitude": "36.167", "longitude": "50.010", "id": 17 },
        { "name": "قم", "center": "قم", "latitude": "34.380", "longitude": "50.530", "id": 18 },
        { "name": "البرز", "center": "کرج", "latitude": "35.8400", "longitude": "50.9391", "id": 19 },
        { "name": "كردستان", "center": "سنندج", "latitude": "35.180", "longitude": "47.10", "id": 20 },
        { "name": "کرمان", "center": "کرمان", "latitude": "30.160", "longitude": "57.40", "id": 21 },
        { "name": "كرمانشاه", "center": "كرمانشاه", "latitude": "34.180", "longitude": "47.30", "id": 22 },
        { "name": "كهكيلويه و بويراحمد", "center": "ياسوج", "latitude": "30.390", "longitude": "51.350", "id": 23 },
        { "name": "گلستان", "center": "گرگان", "latitude": "36.500", "longitude": "54.250", "id": 24 },
        { "name": "گيلان", "center": "رشت", "latitude": "37.160", "longitude": "49.350", "id": 25 },
        { "name": "لرستان", "center": "خرم آباد", "latitude": "33.290", "longitude": "48.210", "id": 26 },
        { "name": "مازندران", "center": "ساري", "latitude": "36.330", "longitude": "53.30", "id": 27 },
        { "name": "مرکزی", "center": "اراک", "latitude": "34.50", "longitude": "49.410", "id": 28 },
        { "name": "هرمزگان", "center": "بندرعباس", "latitude": "56.266", "longitude": "27.18", "id": 29 },
        { "name": "همدان", "center": "همدان", "latitude": "34.470", "longitude": "48.300", "id": 30 },
        { "name": "يزد", "center": "يزد", "latitude": "31.530", "longitude": "54.210", "id": 31 },
    ];
    
	const[mapCenter,setMapCenter] = useState([32.85971234321241,53.97240877523566])   

    console.log(mapCenter);
    
    const addMarker = (newMarker) => {
        console.log(newMarker.latitude);  
        setMarkers([newMarker]);
    };
    let filtered = {}
    useEffect(()=>{

    },[mapCenter])

    const handleSelectionChange = (event) => {
        const selectedCity = event.target.value;
        console.log("selectedCity: ", selectedCity);
        setFieldValue("city", selectedCity)
        filtered = STATE_DATA.find((i) => i.name == selectedCity)
        console.log(filtered.latitude);
        setMapCenter([filtered.latitude,filtered.longitude])
        
        
    };

    return (
		<section className='bg-warning'>
            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>

            <Col sm={3}>
            <div>
            {/* <label htmlFor="state-select">Select a State: </label> */}
            <select id="state-select" onChange={handleSelectionChange}>
                <option value="">استان را انتخاب کنید</option>
                {STATE_DATA.map((state) => (
                    <option key={state.id} value={state.name}>
                        {state.name}
                    </option>
                ))}
            </select>
            <ErrorMessage name="city" component="div" className="text-danger" />

        </div>
            </Col>
            <Col sm={9}>
                <div className="appLayout">
                <div className="mapContainer" >
                <MapContainer className="map" zoom={9} scrollWheelZoom={true} center={mapCenter} >
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />
                    
                    <DetectClick onMarkerAdd={addMarker} setFieldValue={setFieldValue}/>
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
            </Col>
            </Row>
		<ErrorMessage name="latitude" component="div" className="text-danger" />
		<ErrorMessage name="longitude" component="div" className="text-danger" />


		</section>
	);
}


HouseLocationInformation.label = 'موقعیت مکانی';
HouseLocationInformation.initialValues = {
    city: '',
    latitude : 0,
    longitude : 0,
};
HouseLocationInformation.validationSchema = Yup.object().shape({
    city: Yup.string().required('انتخاب کنید'),
    latitude :  Yup.string().required('انتخاب کنید'),
    longitude :  Yup.string().required('انتخاب کنید'),
});

export function DetectClick({ onMarkerAdd , setFieldValue}){
    useMapEvent({   
        click(e) {
            const { lat, lng } = e.latlng;
            setFieldValue("latitude", lat)
            setFieldValue("longitude", lng)
            onMarkerAdd({ latitude: lat, longitude: lng });
        }
    })
    return null 
}
