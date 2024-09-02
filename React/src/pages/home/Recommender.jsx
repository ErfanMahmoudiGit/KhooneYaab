/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Row, Col, Form, Button , Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {handle_variables, authState } from '../login/Redux/authSlice';
import { Formik,useFormikContext, ErrorMessage, Field } from 'formik';
import { DefaultDropDown } from '../../ui/DefaultDropDown';
import { MapContainer ,TileLayer, Marker,Popup, CircleMarker , useMap ,useMapEvents} from 'react-leaflet'
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { API_RECOMMENDER} from "../../services/apiServices";
import {  toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";
import useGeoLocation from '../../hooks/useGeoLocation';
import RecommenderMap from '../recommender/RecommenderMap';
import { NavLink, useNavigate } from 'react-router-dom';



let schema = Yup.object().shape({
      meterage: Yup.number().required('متراژ نمیتواند خالی باشد')
      .min(0, 'متراژ نمی‌تواند منفی باشد') // Add this line
      .typeError("لطفا متراژ را به عدد وارد کنید"), // H
        //   .matches(/^[0-9]/, "لطفا متراژ را به عدد وارد کنید"),
      price: Yup.number().required('قیمت نمیتواند خالی باشد')
            .min(0, 'قیمت نمی‌تواند منفی باشد') // Add this line
            .typeError("لطفا قیمت را به عدد وارد کنید"), // H

        //   .matches(/^[0-9]/, "لطفا قیمت را به عدد وارد کنید"),
      build_date: Yup.string().required('انتخاب سال ساخت الزامی است'),
        rooms: Yup.string().required('انتخاب تعداد اتاق الزامی است'),
        elevator: Yup.string().required('انتخاب امکانات الزامی است'),
        parking: Yup.string().required('انتخاب امکانات الزامی است'),
        warehouse: Yup.string().required('انتخاب امکانات الزامی است'),
        hospital:  Yup.string().required('انتخاب امکانات الزامی است'),
        park:  Yup.string().required('انتخاب امکانات الزامی است'),
        school:  Yup.string().required('انتخاب امکانات الزامی است'),
         city: Yup.string().required('انتخاب استان الزامی است'),   // id of city
        location_1: Yup.array()
        .of(Yup.number().required('Latitude and longitude are required'))
        .length(2, 'انتخاب لوکیشن اول الزامی است'),
    location_2: Yup.array()
        .of(Yup.number().required('Latitude and longitude are required'))
        .length(2, 'انتخاب لوکیشن دوم الزامی است'),

  
  });
let initialValues = {
    meterage: '',
    price: '',
    build_date: '',
    rooms: '',
    elevator: 1,  
    parking: 1,  
    warehouse: 0, 
    school : 0 , 
    hospital : 0,
    park : 1,
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
    const [markers, setMarkers] = useState([]);
    const [recommended_homes, setRecommended_homes] = useState([]);
    const[mapCenter,setMapCenter] = useState([32.85971234321241, 53.97240877523566])   
    const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeoLocation();
    const [zoomLevel, setZoomLevel] = useState(5); // New state for zoom level
    const mapRef = useRef();
    const [isHoveringButton, setIsHoveringButton] = useState(false); // Step 1: State for hover
    const [isButtonClicked, setIsButtonClicked] = useState(false); // New state to track button click
    const navigate = useNavigate()

    useEffect(() => {
        getPosition(); // Fetch the location
    }, []);
    console.log('recommended_homes[0]',recommended_homes[0]);
    
    const getCityFromCoordinates = async (lat, lon) => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const data = await response.json();
        const address = data.address || {};
        return address.city || address.town || address.village || 'Unknown';
    };
 
    useEffect(() => {
      if (geoLocationPosition?.lat && geoLocationPosition?.lng) {
        setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
        setZoomLevel(16); // Set zoom level to 13 when location is updated
  
        console.log("here",geoLocationPosition);
        
        // Pan map to the new center
        if (mapRef.current) {
          mapRef.current.setView([geoLocationPosition.lat, geoLocationPosition.lng], 16);
        }
      }
    }, [geoLocationPosition]);


    function MapUpdater({ center, zoom }) {
        const map = useMap();
        
        useEffect(() => {
          if (center && zoom) {
            map.setView(center, zoom);
          }
        }, [center, zoom, map]);

        useEffect(() => {
            // Step 2: Enable or disable map interaction based on hover state
            if (isHoveringButton) {
              map.dragging.disable();
              map.scrollWheelZoom.disable();
            } else {
              map.dragging.enable();
              map.scrollWheelZoom.enable();
            }
          }, [isHoveringButton, map]);

      
        return null;
        
      }

    //   const handleUseMyLocationClick = () => {
    //     setIsButtonClicked(true); // Set button clicked state to true
    //     getPosition(); // Fetch the location
    //     setTimeout(() => setIsButtonClicked(false), 2000); // Reset the button state after 1 second
    // };     
    
    //   const handleMouseEnter = () => {
    //     setIsHoveringButton(true); // Step 3: Set hover state to true
    //   };
    
    //   const handleMouseLeave = () => {
    //     setIsHoveringButton(false); // Step 3: Set hover state to false
    //   };
      const addMarker = (newMarker, setFieldValue) => {
        console.log(newMarker);
        console.log(isButtonClicked);
        if (isButtonClicked) {
            console.log('Button not clicked, not adding marker');
            return; // Exit early if button hasn't been clicked
        }
        
        
        if (markers.length < 2) {
            setMarkers([...markers, newMarker]);
    
            // Trigger the toast inside the addMarker function
            getCityFromCoordinates(newMarker.latitude, newMarker.longitude).then(city => {
                toast.success(`منطقه انتخاب شده شما: ${city}`);
            });
    
            if (markers.length === 0) {
                setFieldValue('location_1', [newMarker.latitude, newMarker.longitude]);
            } else if (markers.length === 1) {
                setFieldValue('location_2', [newMarker.latitude, newMarker.longitude]);
            }
        } else {
            toast.error("فقط دو لوکیشن باید انتخاب شود");
        }
    };
    
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
            <Container >
                <div className="d-flex flex-row justify-content-between m-3 align-items-center">
                    <h4>پیشنهاد ملک</h4>
                    <Button className="backprimaryButton" onClick={()=> navigate('/')}>بازگشت به صفحه اصلی</Button>
                </div>
                <form onSubmit={props.handleSubmit}>
                    <Row>
                        <Col sm={5}>
                            <div className='mt-3'>
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
                            </div>
                            <div className='mt-3'>
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
                            </div>
                            <div className='mt-3'>
                                <Form.Label className='form-label margin-left-x'>سال ساخت</Form.Label>
                                <Field as="select" name="build_date" className="form-control p-2" 
                                    style={{borderRadius:"13px" , borderColor:"#ced4da"}}
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
                            </div>
                            <div className='mt-3'>
                                <div className='d-flex flex-column'>
                                    <Form.Label>استان</Form.Label>
                                    <DefaultDropDown
                                        label={"انتخاب کنید"}
                                        options={STATE_OPTIONS}
                                        onChange={(event) => {
                                            props.setFieldValue( "city", event.value );
                                        }}
                                    />
                                </div>
                                <ErrorMessage name="city" component="div" className="text-danger" />   
                            </div>
                            <div className='mt-3'>
                                <Form.Label className='form-label margin-left-x'>تعداد اتاق ها</Form.Label>
                                <Field as="select" name="rooms" className="form-control p-2"
                                    style={{borderRadius:"13px" , borderColor:"#ced4da"}}                  
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
                            </div>
                            <div className='mt-3'>
                                <Form.Label className='form-label'>دارای امکانات</Form.Label>
                                <Form.Check
                                    inline
                                    label="آسانسور"
                                    name="elevator"
                                    defaultChecked={true}
                                    checked={props.values.elevator === 1} 
                                    onChange={(e) => 
                                        props.setFieldValue('elevator', e.target.checked ? 1 : 0)                   
                                    }
                                />
                                <Form.Check
                                    inline
                                    label="پارکینگ"
                                    name="parking"
                                    defaultChecked={true}
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
                            </div>
                            <div className='mt-3'>
                                <Form.Label className='form-label'>به کدام یک از این مکان ها نزدیک است؟</Form.Label>
                                <Row className="mt-2">
                                    <Col sm={2}>
                                        <Form.Check
                                            inline
                                            label="مدرسه"
                                            name="school"
                                            checked={props.values.school === 1} 
                                            onChange={(e) => 
                                                props.setFieldValue('school', e.target.checked ? 1 : 0)
                                            }
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <Form.Check
                                            inline
                                            label="پارک"
                                            name="park"
                                            defaultChecked={true}
                                            checked={props.values.park === 1} 
                                            onChange={(e) => 
                                                props.setFieldValue('park', e.target.checked ? 1 : 0)
                                            }
                                        />
                                    </Col>
                                    <Col sm={2}>
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
                            </div>

                            <Button type="submit" className="backprimaryButton mt-4 mb-4">
                                ثبت
                            </Button>
                        </Col>
                        <Col sm={7}>
                            <div className="appLayout" style={{height:"620px"}}>
                                <div className="mapContainer" >
                                    {/* <button 
                                        className="getLocation" 
                                        onClick={handleUseMyLocationClick} 
                                        onMouseOver={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {isLoadingPosition ? "در حال بروزرسانی..." : "استفاده از موقعیت من"}
                                    </button> */}
                                    <MapContainer className="map"  zoom={zoomLevel}
                                    whenCreated={(mapInstance) => (mapRef.current = mapInstance)} // Capture the map instance
                                    scrollWheelZoom={true} center={mapCenter} >
                                        <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                                        />      
                                        <MapUpdater center={mapCenter} zoom={zoomLevel} />
                
        
                                        {geoLocationPosition?.lat && geoLocationPosition?.lng && (
                                            <CircleMarker
                                            center={[geoLocationPosition.lat, geoLocationPosition.lng]}
                                            radius={6}  // Radius in meters
                                            
                                            pathOptions={{ color: 'red', fillColor: 'red',fillOpacity: 0.8}}
                                            />
                                        )}
                                    <DetectClick onMarkerAdd={addMarker} setFieldValue={props.setFieldValue} isButtonClicked={isButtonClicked}/>
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
                    
                    
                   
                   
        
                </form>
            
            {recommended_homes?.length > 0 && (
                <>
                    <Row className='gx-4 d-flex justify-content-center alihn-items-center mx-5 mb-4 '>
                    <h3 className='mt-3'>پیشنهاد ما : </h3>
                    
                    </Row>

                    <Row className='d-flex justify-content-center align-items-start mx-5'>
                        <Col sm={4} className='d-flex flex-column gap-2'>
                            
                                {recommended_homes?.map((home)=>{
                                    return(
                                        <NavLink to={`/house/${home.id}`} key={home.id}>
                                            <Card key={home.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                            <div > استان : {home.city}</div>
                                            <div >عنوان : {home.title}</div>
                                            <div >قیمت : {home.price}</div>
                                            <div >متراژ : {home.meterage}</div>
                                            <div >سال ساخت : {home.build_date}</div>
                                            <div >اتاق : {home.rooms}</div>
                                            {/* <button onClick={() => navigate(`/house/${home.id}`)} className="smsButton"> مشاهده جزییات آگهی</button> */}

                                        </Card>
                                        </NavLink>
                                        // <Card key={home.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                        //     <div > استان : {home.city}</div>
                                        //     <div >عنوان : {home.title}</div>
                                        //     <div >قیمت : {home.price}</div>
                                        //     <div >متراژ : {home.meterage}</div>
                                        //     <div >سال ساخت : {home.build_date}</div>
                                        //     <div >اتاق : {home.rooms}</div>
                                        //     {/* <button onClick={() => navigate(`/house/${home.id}`)} className="smsButton"> مشاهده جزییات آگهی</button> */}

                                        // </Card>
                                    )
                                }
                                    
                                )}
                            
                        </Col>
                        <Col sm={8} >
                        {recommended_homes[0] && (
                            <RecommenderMap houses={recommended_homes} 
                            mapCenterprops={[
                            recommended_homes[0]?.latitude,  
                            recommended_homes[0]?.longitude, 
                            ]}/>
                                                        )}
                                                    
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




export function DetectClick({ onMarkerAdd, setFieldValue ,isButtonClicked}) {
    useMapEvents({
        click(e) {
            
            if (isButtonClicked) {
                console.log('Button clicked, not adding marker');
              return null
            }else{
                const { lat, lng } = e.latlng;
                onMarkerAdd({ latitude: lat, longitude: lng }, setFieldValue);
            }
        }
    });

    return null;
}