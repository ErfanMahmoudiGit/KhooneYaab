import { Field, useFormikContext , ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';
import { Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import * as Yup from 'yup';

export default function OrgInformation() {
    const { setFieldValue } = useFormikContext();
    const [buildDateValue, setBuildDateValue] = useState(1350);

    const handleSliderChange = (e) => {
        setBuildDateValue(e.target.value);
        setFieldValue('build_date', e.target.value); // update formik state
    };

    const rooms = [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
    ];
	const floors = [
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


    return (
        <>
			{/* build_date */}
            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-items-center'>
                <Form.Group as={Col} sm="6" controlId="validationFormik01" className='d-flex align-items-center'>
                    <Form.Label>سال ساخت</Form.Label>
                    <Form.Range
                        value={buildDateValue}
                        name='build_date'
                        max={1403}
                        min={1370}
                        onChange={handleSliderChange}
                        className="custom-slider"
                    />
                </Form.Group>
            </Row>
            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-items-center'>
                <Col sm={6}>
                    <p>سال ساخت انتخابی: {buildDateValue}</p>
                </Col>
			<ErrorMessage name="build_date" component="div" className="text-danger" />
            </Row>

			{/* rooms */}
            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4'>
                <Col sm="6">
                    <Form.Label className='form-label margin-left-x'>تعداد اتاق ها</Form.Label>
                    <Field as="select" name="rooms" className="form-control">
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

			{/* tabage */}

            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4'>
                <Col sm="6">
				<Form.Label className='form-label margin-left-x'>طبقه</Form.Label>
				<Field as="select" name="floors" className="form-control">
                        <option value="" label="انتخاب کنید" />
                        {floors.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </Field>
					<ErrorMessage name="floors" component="div" className="text-danger" />

                </Col>
            </Row>
            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4'>
                <Col sm="6">
				<Form.Label className='form-label margin-left-x'>کل طبقات</Form.Label>
				<Field as="select" name="all_floors" className="form-control">
                        <option value="" label="انتخاب کنید" />
                        {all_floors.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </Field>
					<ErrorMessage name="floors" component="div" className="text-danger" />

                </Col>
            </Row>
			
                
        </>
    );
}

OrgInformation.label = 'Org Information';
OrgInformation.initialValues = {
    build_date: '',
    rooms: '',
	all_floors : '' ,
	floors:''
};
OrgInformation.validationSchema = Yup.object().shape({
    build_date: Yup.number().required('Please enter your build date'),
    rooms: Yup.number().required('Please select the number of rooms'),
    all_floors: Yup.number().required('Please select all_floors'),
    floors: Yup.number().required('Please select floors'),
});
