/* eslint-disable react/prop-types */
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handle_variables, authState } from './Redux/authSlice';
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { API_LOGIN_USER } from "../../services/apiServices";
import {  toast } from 'react-toastify';
import cookieService from "../cookieService";

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(2,'نام باید حداقل 2 رقم باشد')
        .required('نام الزامی است'),
    email: yup.string()
        .required('ایمیل الزامی است')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "ایمیل نامعتبر است") 
});

export default function LoginStep3(){
    const { loginModalStep3 , phoneNumber , name , email ,welcome_message} = useSelector(authState);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    console.log("loginModalStep3",loginModalStep3);
    
   
    return (
        <Modal
            className={"Auth-modal"}
            show={loginModalStep3}
            onHide={() => dispatch(handle_variables({ loginModalStep3: false }))}
            size={"lg"}
            centered
        >
            <Modal.Body className="custom-modal-body3">
                <Formik
                    initialValues={{ name: name , email : email }} 
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        setIsLoading(true);
                        const data = {
                            name: values.name,
                            email: values.email,
                            phoneNumber : phoneNumber
                        };
                        console.log("data: ", data);
                        
                        let resp = API_LOGIN_USER(data)
                        resp.then((res) => {
                            console.log("res login3:",res);
                            
                            if (res.status === 200) {
                               
                                dispatch(handle_variables({
                                    loginModalStep3 : false,
                                    loginModalStep1 : false,
                                    loginModalStep2 : false,
                                    name : res.data.data.user.name , 
                                    email : res.data.data.user.email,
                                    is_verified_user: true,
                                    // owner_id : res.data.data.user.user_id,
                                    // login_expires_in : res.data.data.user.login_expires_in,
                                }));
                                cookieService.setCookie('NAME', res.data.data.user.name, { expires: 7 }); // Expires in 7 days
                                
                              
                                toast.success("ورود شما با موفقیت انجام شد")

                                setIsLoading(false);
                            } else {
                                toast.error(res.error);
                                setIsLoading(false);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            // toast.error(err.response.data.message);
                            setIsLoading(false);
                        });
                        
               
                    }}
                >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <Row className="d-flex justify-content-center mt-3">
                            <h3 className="filter-colo text-center">{welcome_message}</h3>
                            <Col className="ci-div" xs={12} md={9}>
                                <label htmlFor="">نام</label>
                                <input
                                    type="text"           
                                    onChange={(e) => {
                                        props.setFieldValue("name",e.target.value );
                                    }}
                                    placeholder={"نام خود را به طور کامل وارد نمایید"}
                                    className="form-control login-input"
                                    name="name"
                                />
                                {props.errors.name ? (
                                <div className="text-danger mt-1" id="feedback">
                                    {props.errors.name}
                                </div>
                                ) : null}{" "}          
                            </Col>
                            <Col className="ci-div mt-3" xs={12} md={9}>
                                <label htmlFor="">ایمیل</label>
                                <input
                                    type="text"            
                                    onChange={(e) => {
                                        props.setFieldValue("email",e.target.value );
                                    }}
                                    placeholder={"ایمیل خود را به طور کامل وارد نمایید"}
                                    className="form-control login-input"
                                    name="email"
                                />
                                {props.errors.email ? (
                                <div className="text-danger mt-1" id="feedback">
                                    {props.errors.email}
                                </div>
                                ) : null}{" "}          
                            </Col>
                        </Row>

                        <Row className="d-flex justify-content-center mt-3">
                            <Col xs={6} md={4}>
                                <Button type="submit" className="sendcodeBtn">
                                    {isLoading ? <BeatLoader size={9} color={"black"} /> : "تایید"} 
                                </Button> 
                            </Col>
                        </Row>
                    </form>
                )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}
