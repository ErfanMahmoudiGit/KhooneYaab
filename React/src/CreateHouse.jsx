import { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button, Step, StepLabel, Stepper } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import ContactInformation from './ContactInformation';
import OrgInformation from './OrgInformation';
import MapInformation from './MapInformation';

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

        if (!isLastStep()) {
            setSubmitting(false);
            handleNext();
            return;
        }

        console.log(values);

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
