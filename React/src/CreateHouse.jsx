import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Steps, Layout, ConfigProvider } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import faIR from 'antd/lib/locale/fa_IR';
import { API_createHouse } from "./services/apiServices";
import { Container } from 'react-bootstrap';
import HouseInformation from './pages/register_announcement/HouseInformation';
import HouseDetailInformation from './pages/register_announcement/HouseDetailInformation';
import HouseLocationInformation from './pages/register_announcement/HouseLocationInformation';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()

  const next = () => {
    setCurrent(current + 1);
  };
  
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

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-11
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

console.log(getCurrentDate());

  const onSubmit = (values, actions) => {
    console.log("here");
    console.log("outside",values);

    
    if (current === steps.length - 1) {
      console.log('Final Submit:', values);
      // Handle form submission (e.g., API call)

      console.log(values);


      
        // فقط اخرش ریکوعست بزنه
        let data = {
          title: values.title,
          category : values.category,
          meterage : values.meterage,
          price : values.price ,
          image: values.image,
          description: values.description,
          build_date : values.build_date,
          rooms: values.rooms,
          floor : values.floor,
          all_floors : values.all_floors,
          elevator: values.elevator,  
          parking: values.parking,  
          warehouse: values.warehouse, 
          direction: values.direction,  
          document_type: values.document_type, 
          status: values.status,
          city: values.city,
          latitude : values.latitude,
          longitude : values.longitude,
          hospital: values.hospital,  
          school: values.school,  
          park: values.park, 

          time:getCurrentDate(),
          price_per_meter : values.price / values.meterage ,
          owner_id : 1
        } 
        console.log("data",data)
        let resp = API_createHouse(data)
        // setLoading(true)

          resp.then((res) => {
            console.log(res);
            
            if (res.status === 201) {
                console.log("success"); 
                toast.success('اطلاعات آگهی شما با موفقیت ثبت گردید')
                navigate('/my_registered')
                // setLoading(false)
            } else {
                console.log("false");   
                // setLoading(false)
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
                    className='smsButton'
                    onClick={prev}
                    disabled={current === 0}
                     icon={<RightOutlined />}

                  >
                    قبلی
                  </Button>
                  {current < steps.length - 1 && (
                    <Button
                      className='smsButton'
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      icon={<LeftOutlined />}

                    >
                      بعدی
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                 
                    <Button htmlType="submit" disabled={isSubmitting} className='smsButton'>
                        ثبت
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
