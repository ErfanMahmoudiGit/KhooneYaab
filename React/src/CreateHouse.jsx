// import { useState } from 'react';
// import { Form, Formik } from 'formik';
// import { Button, Step, StepLabel, Stepper } from '@material-ui/core';
// import SwipeableViews from 'react-swipeable-views';
// import ContactInformation from './ContactInformation';
// import OrgInformation from './OrgInformation';
// import MapInformation from './MapInformation';
// import { API_createHouse } from "./services/apiServices";
// import { Container } from 'react-bootstrap';
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';

// const steps = [ContactInformation, OrgInformation, MapInformation];

// export default function CreateHouse() {
//     const [activeStep, setActiveStep] = useState(0);

//     const isLastStep = () => {
//         return activeStep === steps.length - 1;
//     };

//     const handlePrev = () => {
//         setActiveStep(Math.max(activeStep - 1, 0));
//     };

//     const handleNext = () => {
//         setActiveStep(Math.min(activeStep + 1, steps.length - 1));
//     };

//     const onSubmit = (values, formikBag) => {
//         console.log(values);
//         const { setSubmitting } = formikBag;
//         if (!isLastStep()) {
//             setSubmitting(false);
//             handleNext();
//             return;
//         }

//         setTimeout(() => {
//             setSubmitting(false);
//         }, 1000);
//         // ProximityFinder/api/create_house/

//         // فقط اخرش ریکوعست بزنه
//         let data = {
//             city: "زنجان",
//             title : values.title,
//             category : "فروش آپارتمان",  // select box
//             time : "2024-01-11",   // تاریخ امروز ولی به همین فرمت
//             meterage : values.meterage,
//             price : values.price ,
//             price_per_meter : values.price_per_meter ,
//             image : "https://unsplash.com/s/photos/image/3" , 
//             description : values.description ,
//             floor : values.floors,
//             all_floors : values.all_floors,
//             build_date : values.build_date,
//             rooms : values.rooms,
//             latitude : 11.9837,
//             longitude : 24.983,
//             elevator: 0,  //  درست کردن امکانات
//             parking: 1,  // 0و1 برعکسن توی امکانات
//             warehouse: 1, 
//             direction: '',  // ضروری نکردن این 4 تا
//             document_type: 'تک برگ', 
//             status: '',
//             priorities : "[1,1,1]"  ,
//             // latitude : values.locations[0].latitude,    // ضروری
//             // longitude : values.locations[0].longitude,   // ضروری
//         } 
//         console.log("data",data)
//         let resp = API_createHouse(data)
//             resp.then((res) => {
//                 if (res.status === 200) {
//                     console.log("success");        
//                 } else {
//                     console.log("false");        

//                 }
//                 })     

        
//     };

//     const initialValues = steps.reduce(
//         (values, { initialValues }) => ({
//             ...values,
//             ...initialValues,
//         }),
//         {}
//     );
//     const ActiveStep = steps[activeStep];
//     const validationSchema = ActiveStep.validationSchema;
//     const theme = createTheme({
//         direction: 'rtl',
//     })

//     return (
//         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
//             {({ isSubmitting }) => (
//                 <Container>
//                      <Form className="form-content">
//                         <Stepper alternativeLabel activeStep={activeStep}>
//                             {steps.map((step, index) => (
//                                 <Step key={index}>
//                                     <StepLabel>{steps[index].label}</StepLabel>
//                                 </Step>
//                             ))}
//                         </Stepper>
//                         <SwipeableViews index={activeStep}>
//                             {steps.map((step, index) => {
//                                 const Component = steps[index];
//                                 return <Component key={index} />;
//                             })}
//                         </SwipeableViews>
//                         <div className="button-container">
//                             <Button disabled={activeStep === 0 || isSubmitting} onClick={handlePrev}>
//                                 prev
//                             </Button>
//                             <Button disabled={isSubmitting} type="submit">
//                                 {isLastStep() ? 'submit' : 'next'}
//                             </Button>
//                         </div>
//                     </Form>

//                 </Container>
//                 // <div className="form-container">
                   
//                 // </div>
//             )}
//         </Formik>
//     );
// }

// import React, { useState } from 'react';
// import { Form, Formik } from 'formik';
// import { Button, Step, StepLabel, Stepper } from '@material-ui/core';
// import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
// import SwipeableViews from 'react-swipeable-views';
// import ContactInformation from './ContactInformation';
// import OrgInformation from './OrgInformation';
// import MapInformation from './MapInformation';
// import { API_createHouse } from "./services/apiServices";
// import { Container } from 'react-bootstrap';

// // Custom styles for RTL Stepper
// const useStyles = makeStyles((theme) => ({
//   root: {
//     direction: 'rtl',
//   },
//   stepLabel: {
//     '& .MuiStepLabel-label': {
//       direction: 'rtl',
//       textAlign: 'right',
//     },
//     '& .MuiStepLabel-iconContainer': {
//       transform: 'scale(-1, 1)', // Flip the icon for RTL
//     },
//   },
//   stepper: {
//     direction: 'ltr', // Prevent Stepper from reversing in RTL mode
//   },
// }));

// // Steps components
// const steps = [ContactInformation, OrgInformation, MapInformation];

// export default function CreateHouse() {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = useState(0);

//   const isLastStep = () => activeStep === steps.length - 1;

//   const handlePrev = () => setActiveStep(Math.max(activeStep - 1, 0));

//   const handleNext = () => setActiveStep(Math.min(activeStep + 1, steps.length - 1));

//   const onSubmit = (values, formikBag) => {
//     console.log(values);
//     const { setSubmitting } = formikBag;
//     if (!isLastStep()) {
//       setSubmitting(false);
//       handleNext();
//       return;
//     }

//     setTimeout(() => {
//       setSubmitting(false);
//     }, 1000);

//     let data = {
//       city: "زنجان",
//       title: values.title,
//       category: "فروش آپارتمان",
//       time: "2024-01-11",
//       meterage: values.meterage,
//       price: values.price,
//       price_per_meter: values.price_per_meter,
//       image: "https://unsplash.com/s/photos/image/3",
//       description: values.description,
//       floor: values.floors,
//       all_floors: values.all_floors,
//       build_date: values.build_date,
//       rooms: values.rooms,
//       latitude: 11.9837,
//       longitude: 24.983,
//       elevator: 0,
//       parking: 1,
//       warehouse: 1,
//       direction: '',
//       document_type: 'تک برگ',
//       status: '',
//       priorities: "[1,1,1]",
//     }
//     console.log("data", data)
//     let resp = API_createHouse(data)
//     resp.then((res) => {
//       if (res.status === 200) {
//         console.log("success");
//       } else {
//         console.log("false");
//       }
//     });
//   };

//   const initialValues = steps.reduce(
//     (values, { initialValues }) => ({
//       ...values,
//       ...initialValues,
//     }),
//     {}
//   );
//   const ActiveStep = steps[activeStep];
//   const validationSchema = ActiveStep.validationSchema;

//   // Material-UI theme for RTL
//   const theme = createTheme({
//     direction: 'rtl',
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Container style={{ direction: 'rtl', textAlign: 'right' }}>
//         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
//           {({ isSubmitting }) => (
//             <Form className={classes.root}>
//               <Stepper alternativeLabel activeStep={activeStep} className={classes.stepper}>
//                 {steps.map((step, index) => (
//                   <Step key={index}>
//                     <StepLabel className={classes.stepLabel}>{steps[index].label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//               <SwipeableViews index={activeStep} style={{ direction: 'ltr' }}>
//                 {steps.map((step, index) => {
//                   const Component = steps[index];
//                   return <Component key={index} />;
//                 })}
//               </SwipeableViews>
//               <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button disabled={activeStep === 0 || isSubmitting} onClick={handlePrev}>
//                   قبلی
//                 </Button>
//                 <Button disabled={isSubmitting} type="submit">
//                   {isLastStep() ? 'ارسال' : 'بعدی'}
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </Container>
//     </ThemeProvider>
//   );
// }


// import React, { useState } from 'react';
// import { Form, Input, Button, Steps, Layout, ConfigProvider } from 'antd';
// import { RightOutlined, LeftOutlined } from '@ant-design/icons';
// import ContactInformation from './ContactInformation';
// import OrgInformation from './OrgInformation';
// import MapInformation from './MapInformation';
// import faIR from 'antd/lib/locale/fa_IR';

// const { Step } = Steps;
// const { Content } = Layout;

// // Steps components
// const steps = [
//   { title: 'Contact Information', content: <ContactInformation /> },
//   { title: 'Organization Information', content: <OrgInformation /> },
//   { title: 'Map Information', content: <MapInformation /> },
// ];

// const CreateHouse = () => {
//   const [current, setCurrent] = useState(0);

//   const next = () => {
//     setCurrent(current + 1);
//   };

//   const prev = () => {
//     setCurrent(current - 1);
//   };

//   const onFinish = (values) => {
//     console.log('Form values:', values);
//     // Submit your data here
//   };

//   return (
//     <ConfigProvider locale={faIR} direction="rtl">
//       <Layout style={{ minHeight: '100vh' }}>
//         <Content style={{ padding: '50px' }}>
//           <Steps current={current} direction="horizontal" style={{ marginBottom: '50px' }}>
//             {steps.map((step, index) => (
//               <Step key={index} title={step.title} />
//             ))}
//           </Steps>

//           <Form onFinish={onFinish} layout="vertical">
//             <div style={{ marginBottom: '24px' }}>
//               {steps[current].content}
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Button
//                 onClick={prev}
//                 disabled={current === 0}
//                 icon={<LeftOutlined />}
//               >
//                 قبلی
//               </Button>
//               {current < steps.length - 1 && (
//                 <Button type="primary" onClick={next} icon={<RightOutlined />}>
//                   بعدی
//                 </Button>
//               )}
//               {current === steps.length - 1 && (
//                 <Button type="primary" htmlType="submit">
//                   ارسال
//                 </Button>
//               )}
//             </div>
//           </Form>
//         </Content>
//       </Layout>
//     </ConfigProvider>
//   );
// };

// export default CreateHouse;
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Steps, Layout, ConfigProvider } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import faIR from 'antd/lib/locale/fa_IR';
import OrgInformation from './OrgInformation';
import MapInformation from './MapInformation';
import { API_createHouse } from "./services/apiServices";
import { Container } from 'react-bootstrap';
import HouseInformation from './pages/register_announcement/HouseInformation';
import HouseDetailInformation from './pages/register_announcement/HouseDetailInformation';
import HouseLocationInformation from './pages/register_announcement/HouseLocationInformation';

const { Step } = Steps;
const { Content } = Layout;

// Steps components
const steps = [
  { title: 'اطلاعات ملک', component: HouseInformation },
  { title: 'جزییات ملک', component: HouseDetailInformation },
  { title: 'موقعیت مکانی', component: HouseLocationInformation },
];

const CreateHouse = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  console.log(current);
  

  const prev = () => {
    setCurrent(current - 1);
  };

  const validationSchema = steps[current].component.validationSchema;

  const initialValues = steps.reduce(
    (values, step) => ({
      ...values,
      ...step.component.initialValues,
    }),
    {}
  );

  const onSubmit = (values, actions) => {
    console.log("here");
    console.log("outside",values);

    
    if (current === steps.length - 1) {
      console.log('Final Submit:', values);
      // Handle form submission (e.g., API call)

      console.log(values);
      

      
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

        

    } else {
      actions.setTouched({});
      next();
      actions.setSubmitting(false);
    }
  };

  return (
    <ConfigProvider locale={faIR} direction="rtl">
        <Container>
        <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: '50px' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <h3 className='mb-4 text-center'>ثبت آگهی</h3>
                <Steps current={current} direction="horizontal" style={{ marginBottom: '50px' }}>
                  {steps.map((step, index) => (
                    <Step key={index} title={step.title} />
                  ))}
                </Steps>

                <div style={{ marginBottom: '24px' }}>
                  {React.createElement(steps[current].component)}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    onClick={prev}
                    disabled={current === 0}
                     icon={<RightOutlined />}

                  >
                    قبلی
                  </Button>
                  {current < steps.length - 1 && (
                    <Button
                      type="primary"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      icon={<LeftOutlined />}

                    >
                      بعدی
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                      ارسال
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </Content>
      </Layout>

        </Container>
      
    </ConfigProvider>
  );
};

export default CreateHouse;
