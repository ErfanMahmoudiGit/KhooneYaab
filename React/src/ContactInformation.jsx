// // import { Field } from 'formik';
// // import { TextField } from 'formik-material-ui';
// // import * as Yup from 'yup';
// // import { Row, Col } from 'react-bootstrap';
// // import { FormControlLabel, Checkbox } from '@material-ui/core';


// // export default function ContactInformation () {
// // 	return (
// // 		<section>
// //             <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>
// //                 <Field name="title" label="Title" component={TextField} className="mt-2"/>
// //                 <Field name="description" label="Description" component={TextField} className="mt-4"/>
// //                 <Field name="meterage" label="meterage" component={TextField} className="mt-4"/>
// //                 <Field name="price" label="meterage" component={TextField} className="mt-4"/>
// //                 <Field name="price_per_meter" label="meterage" component={TextField} className="mt-4"/>
// //                 <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>
// //                 <Col>
// //                     <FormControlLabel
// //                         control={<Field name="elevator" type="checkbox" as={Checkbox} />}
// //                         label="Elevator"
// //                     />
// //                 </Col>
// //                 <Col>
// //                     <FormControlLabel
// //                         control={<Field name="park" type="checkbox" as={Checkbox} />}
// //                         label="Park"
// //                     />
// //                 </Col>
// //                 <Col>
// //                     <FormControlLabel
// //                         control={<Field name="mosque" type="checkbox" as={Checkbox} />}
// //                         label="Mosque"
// //                     />
// //                 </Col>
// //             </Row>
// //             </Row>
// // 		</section>
// // 	);
// // }

// // ContactInformation.label = 'Contact Information';
// // ContactInformation.initialValues = {
// // 	title: '',
// // 	description: '',
// //     meterage : '',
// //     price_per_meter : '' ,
// //     price : '',
// //     elevator: false,
// //     park: false,
// //     mosque: false,
// // };
// // ContactInformation.validationSchema = Yup.object().shape({
// //     title: Yup.string().required('Title is required'),    
// //     description: Yup.string().required('Description is required'),  
// //     meterage: Yup.string().required('meterage is required'),  
// //     price_per_meter: Yup.string().required('price_per_meter is required'),  
// //     price: Yup.string().required('price is required'),  
// // });

// import { Field, useFormikContext } from 'formik';
// import { TextField } from 'formik-material-ui';
// import * as Yup from 'yup';
// import { Row, Col } from 'react-bootstrap';
// import { FormControlLabel, Checkbox } from '@material-ui/core';
// import { useState } from 'react';

// export default function ContactInformation() {
//     const { setFieldValue, values } = useFormikContext();
//     const [priorities, setPriorities] = useState(['elevator', 'park', 'mosque']);

//     const handleCheckboxChange = (feature) => {
//         const currentIndex = priorities.indexOf(feature);
//         const newPriorities = priorities.filter(item => item !== feature);
//         newPriorities.unshift(feature);
//         setPriorities(newPriorities);
//         // Update formik field value to maintain priorities
//         setFieldValue('priorities', newPriorities);
//     };

//     return (
//         <section>
//             <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>
//                 <Field name="title" label="Title" component={TextField} className="mt-2" />
//                 <Field name="description" label="Description" component={TextField} className="mt-4" />
//                 <Field name="meterage" label="Meterage" component={TextField} className="mt-4" />
//                 <Field name="price" label="Price" component={TextField} className="mt-4" />
//                 <Field name="price_per_meter" label="Price Per Meter" component={TextField} className="mt-4" />
//             </Row>
//             <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>
//                 {priorities.map((feature, index) => (
//                     <Col key={index}>
//                         <FormControlLabel
//                             control={
//                                 <Field
//                                     name={feature}
//                                     type="checkbox"
//                                     as={Checkbox}
//                                     checked={values[feature]}
//                                     onChange={() => handleCheckboxChange(feature)}
//                                 />
//                             }
//                             label={feature.charAt(0).toUpperCase() + feature.slice(1)}
//                         />
//                     </Col>
//                 ))}
//             </Row>
//         </section>
//     );
// }

// ContactInformation.label = 'Contact Information';
// ContactInformation.initialValues = {
//     title: '',
//     description: '',
//     meterage: '',
//     price_per_meter: '',
//     price: '',
//     elevator: false,
//     park: false,
//     mosque: false,
//     priorities: ['elevator', 'park', 'mosque'],
// };
// ContactInformation.validationSchema = Yup.object().shape({
//     title: Yup.string().required('Title is required'),
//     description: Yup.string().required('Description is required'),
//     meterage: Yup.string().required('Meterage is required'),
//     price_per_meter: Yup.string().required('Price per meter is required'),
//     price: Yup.string().required('Price is required'),
// });


import { Field, useFormikContext } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import { Row, Col } from 'react-bootstrap';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { useState } from 'react';

export default function ContactInformation() {
    const { setFieldValue, values } = useFormikContext();
    const [priorities, setPriorities] = useState([]);

    const handleCheckboxChange = (feature) => {
        const currentIndex = priorities.indexOf(feature);
        let newPriorities;

        if (currentIndex === -1) {
            newPriorities = [...priorities, feature]; // Add feature if not present
        } else {
            newPriorities = priorities.filter(item => item !== feature); // Remove feature if present
        }

        setPriorities(newPriorities);
        // Update formik field value to maintain priorities
        setFieldValue('priorities', newPriorities);
    };

    const features = ['elevator', 'park', 'mosque'];

    return (
        <section>
            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>
                <Field name="title" label="Title" component={TextField} className="mt-2" />
                <Field name="description" label="Description" component={TextField} className="mt-4" />
                <Field name="meterage" label="Meterage" component={TextField} className="mt-4" />
                <Field name="price" label="Price" component={TextField} className="mt-4" />
                <Field name="price_per_meter" label="Price Per Meter" component={TextField} className="mt-4" />
            </Row>
            <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>
                {features.map((feature, index) => (
                    <Col key={index}>
                        <FormControlLabel
                            control={
                                <Field
                                    name={feature}
                                    type="checkbox"
                                    as={Checkbox}
                                    checked={values[feature]}
                                    onChange={() => handleCheckboxChange(feature)}
                                />
                            }
                            label={feature.charAt(0).toUpperCase() + feature.slice(1)}
                        />
                    </Col>
                ))}
            </Row>
            {/* <Row className='gx-4 d-flex justify-content-center mx-5 mb-4 align-right'>
                <Col>
                    <h5>Priorities:</h5>
                    <ul>
                        {priorities.map((priority, index) => (
                            <li key={index}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</li>
                        ))}
                    </ul>
                </Col>
            </Row> */}
        </section>
    );
}

ContactInformation.label = 'Contact Information';
ContactInformation.initialValues = {
    title: '',
    description: '',
    meterage: '',
    price_per_meter: '',
    price: '',
    // elevator: false,
    // park: false,
    // mosque: false,
    priorities: [],
};

ContactInformation.validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    meterage: Yup.string().required('Meterage is required'),
    price_per_meter: Yup.string().required('Price per meter is required'),
    price: Yup.string().required('Price is required'),
});

