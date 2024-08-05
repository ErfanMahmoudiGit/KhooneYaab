import { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button, Step, StepLabel, Stepper } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import ContactInformation from './ContactInformation';
import OrgInformation from './OrgInformation';
import MapInformation from './MapInformation';
// import { createHouse } from "./services/createHouseService";
import { API_createHouse } from "./services/apiServices";

const steps = [ContactInformation, OrgInformation, MapInformation];

export default function CreateHouse() {
    const [activeStep, setActiveStep] = useState(0);

    const isLastStep = () => {
        return activeStep === steps.length - 1;
    };

    const handlePrev = () => {
        setActiveStep(Math.max(activeStep - 1, 0));
    };

    const handleNext = () => {
        setActiveStep(Math.min(activeStep + 1, steps.length - 1));
    };

    const onSubmit = (values, formikBag) => {
        console.log(values);
        const { setSubmitting } = formikBag;
        // ProximityFinder/api/create_house/

        // فقط اخرش ریکوعست بزنه
        let data = {
            city: "زنجان",
            title : values.title,
            category : "فروش آپارتمان",  // select box
            time : "2024-01-11",   // تاریخ امروز ولی به همین فرمت
            meterage : values.meterage,
            price : values.price ,
            price_per_meter : values.price_per_meter ,
            image : "https://unsplash.com/s/photos/image/3" , 
            description : values.description ,
            floor : values.floors,
            all_floors : values.all_floors,
            build_date : values.build_date,
            rooms : values.rooms,
            latitude : 11.9837,
            longitude : 24.983,
            elevator: 0,  //  درست کردن امکانات
            parking: 1,  // 0و1 برعکسن توی امکانات
            warehouse: 1, 
            direction: '',  // ضروری نکردن این 4 تا
            document_type: 'تک برگ', 
            status: '',
            priorities : "[1,1,1]"  ,
            // latitude : values.locations[0].latitude,    // ضروری
            // longitude : values.locations[0].longitude,   // ضروری
        } 
        console.log("data",data)
        let resp = API_createHouse(data)
            resp.then((res) => {
                if (res.status === 200) {
                    console.log("success");        
                } else {
                    console.log("false");        

                }
                })
        // createHouse(data)
        //     .then((res) => {
        //         console.log(res)
        //         console.log("successfully posted")
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     });
                

        if (!isLastStep()) {
            setSubmitting(false);
            handleNext();
            return;
        }

        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
    };

    const initialValues = steps.reduce(
        (values, { initialValues }) => ({
            ...values,
            ...initialValues,
        }),
        {}
    );
    const ActiveStep = steps[activeStep];
    const validationSchema = ActiveStep.validationSchema;

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ isSubmitting }) => (
                <div className="form-container">
                    <Form className="form-content">
                        <Stepper alternativeLabel activeStep={activeStep}>
                            {steps.map((step, index) => (
                                <Step key={index}>
                                    <StepLabel>{steps[index].label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <SwipeableViews index={activeStep}>
                            {steps.map((step, index) => {
                                const Component = steps[index];
                                return <Component key={index} />;
                            })}
                        </SwipeableViews>
                        <div className="button-container">
                            <Button disabled={activeStep === 0 || isSubmitting} onClick={handlePrev}>
                                prev
                            </Button>
                            <Button disabled={isSubmitting} type="submit">
                                {isLastStep() ? 'submit' : 'next'}
                            </Button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
}
