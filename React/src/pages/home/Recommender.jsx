import { Row, Col, Form, Button , Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {handle_variables, authState } from '../login/Redux/authSlice';
import { Formik,useFormikContext, ErrorMessage, Field } from 'formik';
import { DefaultDropDown } from '../../ui/DefaultDropDown';

import * as Yup from "yup";
import { useState } from "react";
import { API_RECOMMENDER} from "../../services/apiServices";
import {  toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";

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
        location_1: Yup.string().required('انتخاب کنید'),
        location_2: Yup.string().required('انتخاب کنید'),

  
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
    city : 2,
    location_1: [35.6892, 51.3890],
    location_2: [35.6892, 51.3890]
    
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
export default function Recommender(){
    const [buildDateValue, setBuildDateValue] = useState(1370);

    const rooms = [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
    ];

    return(
        <>
         <Formik
                    initialValues={initialValues}
                    validationSchema={ schema }
                    onSubmit={(values) => {   
                        // setIsLoadinging(true);
                        let data = {
                            "meterage": 100,
                            "price": 500000,
                            "build_date": 2015,
                            "rooms": 3,
                            "elevator": 1,
                            "parking": 1,
                            "warehouse": 1,
                            "hospital": 1,
                            "park": 1,
                            "school": 1,
                            "city":1,   // id of city
                            "location_1": [35.6892, 51.3890],
                            "location_2": [35.6892, 51.3890],
                            "priorities": [1, 1, 0]
                        }
                        console.log(data);
                        
                        let resp = API_RECOMMENDER(data)
                        console.log(resp);
                        
                        resp.then((res) => {
                            console.log(res);
                            
                            if (res.status == 200) {
                                console.log(res);
                                
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
                  <Container fluid>

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
                <Col sm={6}>
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
                </Col>
                
                <Col sm="6">
                    <Form.Label className='form-label margin-left-x'>تعداد اتاق ها</Form.Label>
                    <Field as="select" name="rooms" className="form-control"
                        onChange={(e) => {setFieldValue("rooms", parseInt(e.target.value))}}
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
                        checked={props.elevator === 1} 
                        onChange={(e) => 
                            props.setFieldValue('elevator', e.target.checked ? 1 : 0)
                        }
                    />
                    <Form.Check
                        inline
                        label="پارکینگ"
                        name="parking"
                        checked={props.parking === 1} 
                        onChange={(e) => 
                            props.setFieldValue('parking', e.target.checked ? 1 : 0)
                        }
                    />
                    <Form.Check
                        inline
                        name="warehouse"
                        label="انباری"
                        checked={props.warehouse === 1} 
                        onChange={(e) => 
                            props.setFieldValue('warehouse', e.target.checked ? 1 : 0)
                        }
                    />
                </Col>
                <Col sm="6"></Col>
            </Row>
            <Row className='gx-4 d-flex justify-content-center align-items-center mx-5 m-4 align-right'>

<Col sm={3}>
    {/* <span className={"detail-info-text"}> استان</span> */}
    <DefaultDropDown
        label={"استان"}
        options={STATE_OPTIONS}
        onChange={(event) => {
            props.setFieldValue( "city", event.value );

        }}
    />
    <ErrorMessage name="city" component="div" className="text-danger" />   
</Col>
<Col sm="9" className='mt-2'>
    <Form.Label className='form-label'>به کدام یک از این مکان ها نزدیک است؟</Form.Label>
    <Form.Check
        inline
        label="مدرسه"
        name="school"
        checked={props.school === 1} 
        onChange={(e) => 
            props.setFieldValue('school', e.target.checked ? 1 : 0)
        }
    />
    <Form.Check
        inline
        label="پارک"
        name="park"
        checked={props.park === 1} 
        onChange={(e) => 
            props.setFieldValue('park', e.target.checked ? 1 : 0)
        }
    />
    <Form.Check
        inline
        name="hospital"
        label="بیمارستان"
        checked={props.hospital === 1} 
        onChange={(e) => 
            props.setFieldValue('hospital', e.target.checked ? 1 : 0)
        }
    />
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
                    </Container>
                    )}
                </Formik>
        </>
    )
}