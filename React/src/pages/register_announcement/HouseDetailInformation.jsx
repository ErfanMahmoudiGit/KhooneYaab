import * as Yup from 'yup';
import { useFormikContext, ErrorMessage, Field } from 'formik';
import { Row, Col, Form } from 'react-bootstrap';

export default function HouseDetailInformation(){
    const { setFieldValue, values } = useFormikContext();

    const rooms = [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
    ];
	const floor = [
        {label:1 , value:1},
        {label:2 , value:2},
        {label:3 , value:3},
        {label:4 , value:4},
        {label:5 , value:5},
    ]
    const all_floors = [
        {label:1 , value:1},
        {label:2 , value:2},
        {label:3 , value:3},
        {label:4 , value:4},
        {label:5 , value:5},
    ]
    
    return(
        <>	
            {values.category == "فروش آپارتمان" || values.category == "فروش خانه و ویلا" ? (
                <Row className='gx-4 d-flex justify-content-center mx-5 mb-4'>
                    <Col sm="6">
                        <Form.Label className='form-label margin-left-x'>طبقه</Form.Label>
                        <Field as="select" name="floor" className="form-control"  
                            onChange={(e) => {setFieldValue("floor", parseInt(e.target.value))}}
                        >
                            <option value="" label="انتخاب کنید" />
                            {floor.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="floor" component="div" className="text-danger" />
                    </Col>
                    <Col sm="6">
                        <Form.Label className='form-label margin-left-x'>کل طبقات</Form.Label>
                        <Field as="select" name="all_floors" className="form-control"
                            onChange={(e) => {setFieldValue("all_floors", parseInt(e.target.value))}}
                        >
                            <option value="" label="انتخاب کنید" />
                            {all_floors.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="all_floors" component="div" className="text-danger" />
                    </Col>
                </Row>
            ) : null}
           

            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4'>
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
                <Col sm="6">
                    <Form.Label className='form-label margin-left-x'>نوع سند</Form.Label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setFieldValue("document_type", e.target.value);
                        }}
                        placeholder={"قولنامه ای یا تک برگ"}
                        className="form-control login-input"
                        name={"document_type"}
                    />
                    <ErrorMessage name="document_type" component="div" className="text-danger" />
                </Col>
                
            </Row>
            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4'>
            <Col sm="6">
                    <Form.Label className='form-label margin-left-x'>جهت ساختمان</Form.Label>
                    <div role="group" aria-labelledby="my-radio-group">
                        <label>
                            <Field type="radio" name="direction" value="شمالی" className="mx-2" checked={true}/>
                            شمالی
                        </label>
                        <label style={{ marginRight: '20px' }}>
                            <Field type="radio" name="direction" value="جنوبی" className="mx-2"/>
                            جنوبی
                        </label>
                    </div>
                    <ErrorMessage name="direction" component="div" className="text-danger" />
                </Col>
               
                <Col sm="6">
                    <Form.Label className='form-label margin-left-x'>وضعیت ساختمان</Form.Label>
                    <div role="group" aria-labelledby="my-radio-group">
                        <label>
                            <Field type="radio" name="status" value="بازسازی شده" className="mx-2" checked={true}/>
                            بازسازی شده
                        </label>
                        <label style={{ marginRight: '20px' }}>
                            <Field type="radio" name="status" value="بازسازی نشده" className="mx-2"/>
                            بازسازی نشده
                        </label>
                    </div>
                    <ErrorMessage name="status" component="div" className="text-danger" />
                </Col>
            </Row>
            <Row className='gx-4 d-flex justify-content-center mx-5 mt-4'>
                <Col sm="6" className='mt-2'>
                    <Form.Label className='form-label'>دارای امکانات</Form.Label>
                    <Form.Check
                        inline
                        label="آسانسور"
                        name="elevator"
                        defaultChecked={true}
                        checked={values.elevator === 1} 
                        onChange={(e) => 
                            setFieldValue('elevator', e.target.checked ? 1 : 0)
                        }
                    />
                    <Form.Check
                        inline
                        label="پارکینگ"
                        name="parking"
                        defaultChecked={true}
                        checked={values.parking === 1} 
                        onChange={(e) => 
                            setFieldValue('parking', e.target.checked ? 1 : 0)
                        }
                    />
                    <Form.Check
                        inline
                        name="warehouse"
                        label="انباری"
                        checked={values.warehouse === 1} 
                        onChange={(e) => 
                            setFieldValue('warehouse', e.target.checked ? 1 : 0)
                        }
                    />
                </Col>
                <Col sm="6"></Col>
            </Row>
          

        </>
    )
}


HouseDetailInformation.label = 'جزییات ملک';
HouseDetailInformation.initialValues = {
    rooms: '',
    floor : '',
    all_floors : '',
    elevator: 1,  
    parking: 1,  
    warehouse: 0, 
    direction: 'شمالی',  
    document_type: '', 
    status: 'بازسازی شده',
};

HouseDetailInformation.validationSchema = Yup.object().shape({
    rooms: Yup.string().required('انتخاب تعداد اتاق الزامی است'),
    floor : Yup.string().when('category', {
        is: (value) => value === 'فروش آپارتمان' || value === 'فروش خانه و ویلا',
        then: (validationSchema) => validationSchema
            .required("این فیلد نمیتواند خالی باشد"),
        otherwise: (validationSchema) => validationSchema,
    }),
    all_floors : Yup.string().when('category', {
        is: (value) => value === 'فروش آپارتمان' || value === 'فروش خانه و ویلا',
        then: (validationSchema) => validationSchema
            .required("این فیلد نمیتواند خالی باشد"),
        otherwise: (validationSchema) => validationSchema,
    }),
    elevator: Yup.string(),
    parking: Yup.string(),
    warehouse: Yup.string(),
    direction: Yup.string(),
    document_type: Yup.string(),
    status: Yup.string(),
});
