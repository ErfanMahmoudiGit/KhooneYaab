/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import { useEffect, useState } from "react"
import { MapContainer ,TileLayer, Marker,Popup, useMapEvent, useMap} from 'react-leaflet'
import { useFormikContext , ErrorMessage } from 'formik';
import { Row, Col, Form } from 'react-bootstrap';
import { DefaultDropDown } from '../../ui/DefaultDropDown';

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
    const STATE_OPTIONS = [
        { "label": "آذربايجان شرقی","value": 1 },
        { "label": "آذربايجان غربی","value": 2 },
        { "label": "اردبيل","value": 3 },
        { "label": "اصفهان","value": 4 },
        { "label": "ايلام","value": 5 },
        { "label": "بوشهر","value": 6 },
        { "label": "تهران","value": 7 },
        { "label": "چهارمحال بختیاری", "value": 8 },
        { "label": "خراسان جنوبی", "value": 9 },
        { "label": "خراسان رضوی","value": 10 },
        { "label": "خراسان شمالی", "value": 11 },
        { "label": "خوزستان","value": 12 },
        { "label": "زنجان", "value": 13 },
        { "label": "سمنان","value": 14 },
        { "label": "سيستان و بلوچستان", "value": 15 },
        { "label": "فارس", "value": 16 },
        { "label": "قزوين", "value": 17 },
        { "label": "قم", "value": 18 },
        { "label": "البرز", "value": 19 },
        { "label": "كردستان", "value": 20 },
        { "label": "کرمان", "value": 21 },
        { "label": "كرمانشاه", "value": 22 },
        { "label": "كهكيلويه و بويراحمد","value": 23 },
        { "label": "گلستان","value": 24 },
        { "label": "گيلان"," value": 25 },
        { "label": "لرستان","value": 26 },
        { "label": "مازندران", "value": 27 },
        { "label": "مرکزی","value": 28 },
        { "label": "هرمزگان","value": 29 },
        { "label": "همدان", "value": 30 },
        { "label": "يزد", "value": 31 },
    ];
    
	const[mapCenter,setMapCenter] = useState([32.85971234321241, 53.97240877523566])   
    const [zoomLevel, setZoomLevel] = useState(6); // New state for zoom level


    const addMarker = (newMarker) => {
        console.log(newMarker.latitude);  
        setMarkers([newMarker]);
    };


    const handleSelectionChange = (event) => {
        let selectedCity = event.label;
        setFieldValue( "city", event.label );
        const filtered = STATE_DATA.find((state) => state.name === selectedCity);
        if (filtered) {
            const { latitude, longitude } = filtered;
            setMapCenter([parseFloat(latitude), parseFloat(longitude)]);
            setFieldValue("latitude", parseFloat(latitude));
            setFieldValue("longitude", parseFloat(longitude));
            setZoomLevel(9)
        }

    }

    function MapUpdater({ center , zoom }) {
        const map = useMap();
        useEffect(() => {
            map.setView(center , zoom);
        }, [center, map, zoom]);

        return null;
    }

    return (
		<section >
            <Row className='gx-4 d-flex justify-content-center align-items-center mx-5 m-4 align-right'>

                <Col sm={3}>
                    {/* <span className={"detail-info-text"}> استان</span> */}
                    <DefaultDropDown
                        label={"استان"}
                        options={STATE_OPTIONS}
                        onChange={(event) => handleSelectionChange(event)}
                    />
                    <ErrorMessage name="city" component="div" className="text-danger" />   
                </Col>
                <Col sm="9" className='mt-2'>
                    <Form.Label className='form-label'>به کدام یک از این مکان ها نزدیک است؟</Form.Label>
                    <Form.Check
                        inline
                        label="مدرسه"
                        name="school"
                        defaultChecked={true}
                        checked={values.school === 1} 
                        onChange={(e) => 
                            setFieldValue('school', e.target.checked ? 1 : 0)
                        }
                    />
                    <Form.Check
                        inline
                        label="پارک"
                        name="park"
                        checked={values.park === 1} 
                        onChange={(e) => 
                            setFieldValue('park', e.target.checked ? 1 : 0)
                        }
                    />
                    <Form.Check
                        inline
                        name="hospital"
                        label="بیمارستان"
                        checked={values.hospital === 1} 
                        onChange={(e) => 
                            setFieldValue('hospital', e.target.checked ? 1 : 0)
                        }
                    />
                </Col>
            
        <Row className='gx-4 d-flex justify-content-center mx-5 mt-4'>
            <Col>
                <div className="appLayout">
                <div className="mapContainer" >
                <MapContainer className="map" 
                // zoom={6} 
                zoom={zoomLevel} 
                
                scrollWheelZoom={true} center={mapCenter} >
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />
                     <MapUpdater center={mapCenter} zoom={zoomLevel} />
                    
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

		<ErrorMessage name="latitude" component="div" className="text-danger" />
            </div>		   
                </div>
            </Col>
            </Row>

            </Row>


		</section>
	);
}


HouseLocationInformation.label = 'موقعیت مکانی';
HouseLocationInformation.initialValues = {
    city: '',
    latitude : 0,
    longitude : 0,
    hospital: 0,  
    school: 1,  
    park: 0, 
};
HouseLocationInformation.validationSchema = Yup.object().shape({
    city: Yup.string().required('استان را انتخاب کنید'),
    latitude :  Yup.string().required('موقعیت جغرافیایی را انتخاب کنید'),
    longitude :  Yup.string().required('موقعیت جغرافیایی را انتخاب کنید'),
    hospital: Yup.string(),
    school :  Yup.string(),
    park :  Yup.string(),

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