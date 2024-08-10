import * as Yup from 'yup';
import { useState } from 'react';
import { useFormikContext, ErrorMessage, Field } from 'formik';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function HouseInformation(){
    const { setFieldValue, values } = useFormikContext();
    const [buildDateValue, setBuildDateValue] = useState(1370);

    const handleSliderChange = (e) => {
        setBuildDateValue(e.target.value);
        setFieldValue('build_date', parseInt(e.target.value));
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

    console.log("title: ", values.title);
    console.log("meterage: ", values.meterage);
    console.log("price: ", values.price);
    console.log("image: ", values.image);  // This will now contain the image src
    console.log("description: ", values.description);
    console.log("build_date: ", values.build_date);
    console.log("category: ", values.category);

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
                    <div className='d-flex flex-column'>
                        <Form.Label>سال ساخت</Form.Label>
                        <Form.Range
                            value={buildDateValue}
                            name='build_date'
                            max={1403}
                            min={1370}
                            onChange={handleSliderChange}
                            className="custom-slider"
                        />
                        <p>سال ساخت انتخابی: {buildDateValue}</p>
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
    title: Yup.string(),
    category: Yup.string(),
    meterage: Yup.string()
        .matches(/^[0-9]/, "لطفا متراژ را به عدد وارد کنید"),
    price: Yup.string()
        .matches(/^[0-9]/, "لطفا قیمت را به عدد وارد کنید"),
    image: Yup.string(),
    description: Yup.string(),
    build_date: Yup.string(),
    // title: Yup.string().required('عنوان نمیتواند خالی باشد'),
    // category: Yup.string().required('عنوان دسته بندی نمیتواند خالی باشد'),
    // meterage: Yup.string().required('متراژ نمیتواند خالی باشد')
    //     .matches(/^[0-9]/, "لطفا متراژ را به عدد وارد کنید"),
    // price: Yup.string().required('قیمت نمیتواند خالی باشد')
    //     .matches(/^[0-9]/, "لطفا قیمت را به عدد وارد کنید"),
    // image: Yup.string().required('تصویر نمیتواند خالی باشد'),
    // description: Yup.string().required('توضیحات نمیتواند خالی باشد'),
    // build_date: Yup.string().required('سال ساخت نمیتواند خالی باشد'),
});
