import { Row, Col, Form, Button , Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {handle_variables, authState } from '../login/Redux/authSlice';
import { Formik,useFormikContext, ErrorMessage, Field } from 'formik';
import { DefaultDropDown } from '../../ui/DefaultDropDown';
import { MapContainer ,TileLayer, Marker,Popup, useMapEvent, useMap} from 'react-leaflet'
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { API_RECOMMENDER} from "../../services/apiServices";
import {  toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";
import HomeMap from './HomeMap';

let schema = Yup.object().shape({
      meterage: Yup.string().required('متراژ نمیتواند خالی باشد')
          .matches(/^[0-9]/, "لطفا متراژ را به عدد وارد کنید"),
      price: Yup.string().required('قیمت نمیتواند خالی باشد')
          .matches(/^[0-9]/, "لطفا قیمت را به عدد وارد کنید"),
      build_date: Yup.string().required('سال ساخت نمیتواند خالی باشد'),
        rooms: Yup.string().required('انتخاب کنید'),
        elevator: Yup.string().required('انتخاب کنید'),
        parking: Yup.string().required('انتخاب کنید'),
        warehouse: Yup.string().required('انتخاب کنید'),
        hospital:  Yup.string().required('انتخاب کنید'),
        park:  Yup.string().required('انتخاب کنید'),
        school:  Yup.string().required('انتخاب کنید'),
         city: Yup.string().required('انتخاب کنید'),   // id of city
        location_1: Yup.array()
        .of(Yup.number().required('Latitude and longitude are required'))
        .length(2, 'انتخاب لوکیشن اول ضروری است'),
    location_2: Yup.array()
        .of(Yup.number().required('Latitude and longitude are required'))
        .length(2, 'انتخاب لوکیشن دوم ضروری است'),

  
  });
let initialValues = {
    meterage: '',
    price: '',
    build_date: '',
    rooms: '',
    elevator: 0,  
    parking: 0,  
    warehouse: 0, 
    school : 0 , 
    hospital : 0,
    park : 0,
    city : '',
    location_1: [],
    location_2: []
    
}
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
const rooms = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
];
const build = [
    { label: "1398 - 1403", value: 1398 },
    { label: "1393 - 1398", value: 1393 },
    { label: "1388 - 1393", value: 1388 },
    { label: "1383 - 1388", value: 1383 },
];
export default function Recommender(){
    const [buildDateValue, setBuildDateValue] = useState(1370);
    const [markers, setMarkers] = useState([]);
    const [recommended_homes, setRecommended_homes] = useState([]);
    const[mapCenter,setMapCenter] = useState([32.85971234321241, 53.97240877523566])   

    const addMarker = (newMarker,setFieldValue) => {
        if (markers.length < 2) {
            setMarkers([...markers, newMarker]);
            if (markers.length === 0) {
                setFieldValue('location_1', [newMarker.latitude,newMarker.longitude]);
            } else if (markers.length === 1) {
                setFieldValue('location_2', [newMarker.latitude,newMarker.longitude]);
            }
        } else {
            toast.error("فقط دو لوکیشن باید انتخاب شود");
        }
    };
    // const center = [51.505, -0.09]
    // <CircleMarker center={mapCenter} pathOptions={redOptions} radius={20}>
    //                     <Popup>Popup in CircleMarker</Popup>
    //                 </CircleMarker>
    //                     const redOptions = { color: 'red' }

 
    return(
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={ schema }
                onSubmit={(values) => {   
                    const data2 = {
                        meterage: values.meterage,
                        price: values.price,
                        build_date: values.build_date,
                        rooms: values.rooms,
                        elevator: values.elevator,
                        parking: values.parking,
                        warehouse: values.warehouse,
                        hospital: values.hospital,
                        park: values.park,
                        school: values.school,
                        city: values.city,
                        location_1: values.location_1,
                        location_2: values.location_2,
                    };
                    console.log(data2);

                    
                    let resp = API_RECOMMENDER(data2)
                    console.log(resp);
                    
                    resp.then((res) => {
                        console.log(res);
                        
                        if (res.status == 200) {
                            console.log(res);
                            
                            setRecommended_homes(res.data)
                        } else {
                            console.log(res.error);
                            
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        // dispatch(loadCaptchaImage());
                        // toast.error(err.response.data.message);
                    });

                }}
            >
            {(props) => (
                <Container className='mt-5'>
                    <form onSubmit={props.handleSubmit}>
                        <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>
                            <Col sm={6}>
                                <Form.Label>متراژ ملک</Form.Label>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        props.setFieldValue("meterage", parseInt(e.target.value));
                                    }}
                                    placeholder={"متراژ"}
                                    className="form-control login-input"
                                    name={"meterage"}
                                />
                                <ErrorMessage name="meterage" component="div" className="text-danger" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label>قیمت ملک</Form.Label>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        props.setFieldValue("price", parseInt(e.target.value));
                                    }}
                                    placeholder={"قیمت"}
                                    className="form-control login-input"
                                    name={"price"}
                                />
                                <ErrorMessage name="price" component="div" className="text-danger" />
                            </Col>
                        </Row>
                        <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>
                            {/* <Col sm={3}>
                                <div className='d-flex flex-column'>
                                    <Form.Label>سال ساخت</Form.Label>
                                    <Form.Range
                                        value={buildDateValue}
                                        name='build_date'
                                        max={1403}
                                        min={1370}
                                        onChange={(e)=>{
                                            setBuildDateValue(e.target.value);
                                            props.setFieldValue('build_date', parseInt(e.target.value));
                                        }}
                                        // onChange={handleSliderChange}
                                        className="custom-slider"
                                    />
                                    <p>سال ساخت انتخابی: {buildDateValue}</p>
                                </div>
                            </Col> */}
                            <Col sm="3">
                                <Form.Label className='form-label margin-left-x'>سال ساخت</Form.Label>
                                <Field as="select" name="build_date" className="form-control"
                                    onChange={(e) => {props.setFieldValue("build_date", parseInt(e.target.value))}}
                                >
                                    <option value="" label="انتخاب کنید" />
                                    {build.map((item, index) => (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="build_date" component="div" className="text-danger" />
                            </Col>
                            <Col sm={3}>
                                <div className='d-flex flex-column'>
                                    <Form.Label>استان را انتخاب کنید</Form.Label>
                                    <DefaultDropDown
                                        label={"استان"}
                                        options={STATE_OPTIONS}
                                        onChange={(event) => {
                                            props.setFieldValue( "city", event.value );
                                        }}
                                    />
                                </div>
                            <ErrorMessage name="city" component="div" className="text-danger" />   
                            </Col>
                            <Col sm="6">
                                <Form.Label className='form-label margin-left-x'>تعداد اتاق ها</Form.Label>
                                <Field as="select" name="rooms" className="form-control"
                                    onChange={(e) => {props.setFieldValue("rooms", parseInt(e.target.value))}}
                                >
                                    <option value="" label="انتخاب کنید" />
                                    {rooms.map((item, index) => (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="rooms" component="div" className="text-danger" />
                            </Col>
                            
                        </Row>
                        <Row className='gx-4 d-flex justify-content-center mx-5 mt-4'>
                    
                            <Col sm="6" className='mt-2'>
                                <Form.Label className='form-label'>دارای امکانات</Form.Label>
                                <Form.Check
                                    inline
                                    label="آسانسور"
                                    name="elevator"
                                    checked={props.values.elevator === 1} 
                                    onChange={(e) => 
                                        props.setFieldValue('elevator', e.target.checked ? 1 : 0)
                                    }
                                />
                                <Form.Check
                                    inline
                                    label="پارکینگ"
                                    name="parking"
                                    checked={props.values.parking === 1} 
                                    onChange={(e) => 
                                        props.setFieldValue('parking', e.target.checked ? 1 : 0)
                                    }
                                />
                                <Form.Check
                                    inline
                                    name="warehouse"
                                    label="انباری"
                                    checked={props.values.warehouse === 1} 
                                    onChange={(e) => 
                                        props.setFieldValue('warehouse', e.target.checked ? 1 : 0)
                                    }
                                />
                            </Col>
                            <Col sm="6" className='mt-2'>
                <Form.Label className='form-label'>به کدام یک از این مکان ها نزدیک است؟</Form.Label>
                <Form.Check
                    inline
                    label="مدرسه"
                    name="school"
                    checked={props.values.school === 1} 
                    onChange={(e) => 
                        props.setFieldValue('school', e.target.checked ? 1 : 0)
                    }
                />
                <Form.Check
                    inline
                    label="پارک"
                    name="park"
                    checked={props.values.park === 1} 
                    onChange={(e) => 
                        props.setFieldValue('park', e.target.checked ? 1 : 0)
                    }
                />
                <Form.Check
                    inline
                    name="hospital"
                    label="بیمارستان"
                    checked={props.values.hospital === 1} 
                    onChange={(e) => 
                        props.setFieldValue('hospital', e.target.checked ? 1 : 0)
                    }
                />
            </Col>
                        </Row>
                       
                        <Row className='gx-4 d-flex justify-content-center mx-5 mt-4'>
            <Col>
                <div className="appLayout">
                <div className="mapContainer" >
                <MapContainer className="map" zoom={6} scrollWheelZoom={true} center={mapCenter} >
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />                    
                    <DetectClick onMarkerAdd={addMarker} setFieldValue={props.setFieldValue}/>
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

                <ErrorMessage name="location_1" component="div" className="text-danger" />
                 <ErrorMessage name="location_2" component="div" className="text-danger" />
                </div>		   
                </div>
            </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-3">
                            <Col xs={6} md={4}>
                            <Button
                                        type="submit"
                                        className="btn btn-primary login-btn"
                                    >
                                        ثبت
                                    </Button>
                            </Col>
                        </Row>
                    </form>
                
                {recommended_homes.length > 0 && (
                    <>
                     <Row className='gx-4 d-flex justify-content-center alihn-items-center mx-5 mb-4 '>
                        <h3 className='mt-3'>پیشنهاد ما : </h3>
                        
                     </Row>

                       <Row className='gx-4 d-flex justify-content-center alihn-items-center mx-5 mb-4 '>
                            <Col sm={3} className='mt-3'>
                               
                                    {recommended_homes.map((home)=>{
                                        return(
                                            <Card key={home.id}>
                                                <div > استان : {home.city}</div>
                                                <div >عنوان : {home.title}</div>
                                                <div >قیمت : {home.price}</div>
                                                <div >متراژ : {home.meterage}</div>
                                                <div >سال ساخت : {home.build_date}</div>
                                                <div >اتاق : {home.rooms}</div>

                                            </Card>
                                        )
                                    }
                                        
                                    )}
                                
                            </Col>
                            <Col sm={9}>
                            <HomeMap houses={recommended_homes}/>
                            </Col>
                        </Row>

                    </>
                )}
                </Container>
            )}
        </Formik>
    </>
    )
}

export function DetectClick({ onMarkerAdd , setFieldValue}){
    useMapEvent({
        click(e) {
            const { lat, lng } = e.latlng;
            onMarkerAdd({ latitude: lat, longitude: lng },setFieldValue);
        }
    });
    return null 
}
