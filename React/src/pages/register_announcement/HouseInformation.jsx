import * as Yup from 'yup';
import { useState } from 'react';
import { useFormikContext, ErrorMessage, Field } from 'formik';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Upload , Tooltip} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Slider } from 'antd';

export default function HouseInformation(){
    const { setFieldValue, values } = useFormikContext();
    const [buildDateValue, setBuildDateValue] = useState();

    const handleSliderChange = (e) => {
        setBuildDateValue(e);        
        setFieldValue('build_date', parseInt(e));
    };
    const categories = [
        {label : "فروش آپارتمان" , value : "فروش آپارتمان"},
        {label : "اجاره آپارتمان" , value : "اجاره آپارتمان"},
        {label : "فروش خانه و ویلا" , value : "فروش خانه و ویلا"},
        {label : "اجاره خانه و ویلا" , value : "اجاره خانه و ویلا"}
    ]

    const uploadImageHandler = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Set the image src URL as the value of the 'image' field
            setFieldValue('image', reader.result);
        };
        reader.readAsDataURL(file);  // Correctly pass the file object to readAsDataURL
        return false;  // Prevent default behavior
    };

    const tipFormatter = (value) => {
        return `سال ساخت: ${value}`;
    };

    return (
        <section>
            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>
                <Col sm={6}>
                    <Form.Label>عنوان آگهی</Form.Label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setFieldValue("title", e.target.value);
                        }}
                        placeholder={"عنوان"}
                        className="form-control login-input"
                        name={"title"}
                    />
                    <ErrorMessage name="title" component="div" className="text-danger" />
                </Col>
                <Col sm={6}>
                    <Form.Label className='form-label margin-left-x'>دسته بندی آگهی</Form.Label>
                    <Field as="select" name="category" className="form-control">
                        <option value="" label="انتخاب کنید" />
                        {categories.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </Field>
					<ErrorMessage name="category" component="div" className="text-danger" />

                </Col>
               
            </Row>
            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>
                <Col sm={6}>
                    <Form.Label>متراژ ملک</Form.Label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setFieldValue("meterage", parseInt(e.target.value));
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
                            setFieldValue("price", parseInt(e.target.value));
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
                    <div className='d-flex flex-column p-3'>
                        <Form.Label>سال ساخت</Form.Label>
                        <Slider
                            value={buildDateValue}
                            min={1370}
                            max={1403}
                            name='build_date'
                            onChange={handleSliderChange}
                            tooltip={{ formatter: tipFormatter }}
                            className="custom-slider"
                        />
                        <ErrorMessage name="build_date" component="div" className="text-danger" />
                        {buildDateValue ? <p>{1403 - buildDateValue} سال ساخت</p> : ''}
                       

                    </div>   
                </Col>
                <Col sm={6}>
                    <Form.Label>توضیحات</Form.Label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setFieldValue("description", e.target.value);
                        }}
                        placeholder={"توضیحات"}
                        // placeholder={"توضیحات آگهی خود را در این قسمت بنویسید"}
                        className="form-control login-input"
                        name={"description"}
                    />
                    <ErrorMessage name="description" component="div" className="text-danger" />
                </Col>
               
            </Row>
            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>

                <Col sm={6}>
                    <Form.Label>آپلود تصویر ملک</Form.Label>
                    <div
                        className="upload-license-image"
                        style={{ width: "100% !important" }}
                    >
                        <Upload
                            accept="image/png, image/jpeg"
                            maxCount={1}
                            beforeUpload={uploadImageHandler}
                            // showUploadList={false}
                        >
                            <Button
                                style={{ width: "100% !important" }}
                                // className='login-button'
                                icon={<UploadOutlined />}
                            >
                                آپلود تصویر
                            </Button>
                        </Upload>
                    </div>
                    <ErrorMessage name="image" component="div" className="text-danger" />

                </Col>
                <Col sm={6}>
                </Col>
            </Row>
        </section>
    );
    
}


HouseInformation.label = 'اطلاعات ملک';
HouseInformation.initialValues = {
    title: '',
    category : '',
    meterage: '',
    price: '',
    image: '',
    description: '',
    build_date: ''
};

HouseInformation.validationSchema = Yup.object().shape({
    title: Yup.string().required('عنوان نمیتواند خالی باشد'),
    category: Yup.string().required('عنوان دسته بندی نمیتواند خالی باشد'),
    meterage: Yup.string().required('متراژ نمیتواند خالی باشد')
        .matches(/^[0-9]/, "لطفا متراژ را به عدد وارد کنید"),
    price: Yup.string().required('قیمت نمیتواند خالی باشد')
        .matches(/^[0-9]/, "لطفا قیمت را به عدد وارد کنید"),
    image: Yup.string().required('تصویر نمیتواند خالی باشد'),
    description: Yup.string().required('توضیحات نمیتواند خالی باشد'),
    build_date: Yup.string().required('سال ساخت نمیتواند خالی باشد'),
});
