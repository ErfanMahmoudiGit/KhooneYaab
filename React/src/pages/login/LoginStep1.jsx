/* eslint-disable react/prop-types */
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {handle_variables, authState } from './Redux/authSlice';
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { API_GETOTP} from "../../services/apiServices";
import {  toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";
import {CaptchaComponent} from './CaptchaComponent'
import LoginStep2 from "./LoginStep2";
import loadCaptchaImage from './Redux/authSlice'

let schema = yup.object().shape({
    phone: yup
      .string()
      .matches(/^[0-9]{11}$/, "لطفا به صورت کامل وارد کنید")
      .required("این فیلد نمیتواند خالی باشد"),
  
  });
export default function LoginStep1(props){
    const { loginModalStep1 ,isSendCode , phoneNumber , captcha_string , user_string} = useSelector(authState);
    const dispatch = useDispatch();
    const [isLoadinging, setIsLoadinging] = useState(false);

    console.log("phoneNumber",phoneNumber);
    console.log("captcha_string: ",captcha_string);
    console.log("isSendCode: ",isSendCode);
    console.log("user_string: ",user_string);
    
    
    return(
        <>
        <Modal
            className={"Auth-modal"}
            show={loginModalStep1}
            onHide={() =>
              dispatch(handle_variables({ loginModalStep1: false }))
            }
            size={"lg"}
            centered
        >
            <Modal.Body >
                <Formik
                    initialValues={{ phone: phoneNumber }}
                    validationSchema={ schema }
                    onSubmit={(values) => {   
                        setIsLoadinging(true);
                        const data = {
                            phoneNumber: values.phone,
                            user_string : user_string,
                            captcha_string : captcha_string,
                        };
                        console.log("data login step 1: " ,data);
                        
                        let resp = API_GETOTP(data)
                        console.log("resp login step 1",resp);
                        
                        resp.then((res) => {
                            console.log("res: ",res);
                            
                            if (res.status == 200) {
                                dispatch(handle_variables({
                                    isSendCode: true,
                                    loginModalStep2 : true,
                                    loginModalStep1 : false,
                                    phoneNumber: data.phoneNumber,
                                }));
                                setIsLoadinging(false);
                            } else {
                                toast.error(res.error);                                
                                setIsLoadinging(false);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            toast.error(error);                                
                            dispatch(loadCaptchaImage());
                            // toast.error(err.response.data.message);
                            setIsLoadinging(false);
                        });

                    }}
                >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <Row className={"text-center"}>
                            <Col xs={12}>
                                <h5>ورود به چارخونه</h5>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-3">
                            <Col className="ci-div" xs={12} md={9}>
                                <label htmlFor="">شماره همراه </label>
                                <input
                                    type="text"
                                    maxLength={11}
                                    onKeyUp={(e) => {
                                        const value = e.target.value;
                                        if (isNaN(+value)) {
                                            e.target.value = e.target.value.slice(
                                                0, e.target.value.length - 1
                                            );
                                        }
                                    }}
                                    onChange={(e) => {
                                        props.setFieldValue("phone",e.target.value );
                                    }}
                                    placeholder={"شماره همراه وارد شده باید به نام شخص باشد"}
                                    className="form-control login-input"
                                    name="phone"
                                />
                                {props.errors.phone ? (
                                <div className="text-danger mt-1" id="feedback">
                                    {props.errors.phone}
                                </div>
                                ) : null}{" "}          
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-3">
                        <Col xs={12} md={9}>
                            <CaptchaComponent /> 
                        </Col>
                        </Row>

                        <Row className="d-flex justify-content-center mt-3">
                            <Col xs={6} md={4}>
                                {!isLoadinging ? (
                                    <Button
                                        type="submit"
                                        className="btn btn-primary login-btn"
                                    >
                                        ارسال کد فعالسازی
                                    </Button>
                                    ) : (
                                    <div
                                        style={{ borderRadius: "15px", padding: "2px" }}
                                        className="btn btn-primary login-btn"
                                    >
                                        <BeatLoader size={9} color={"black"} />
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
        <LoginStep2 />
        </>
    )
}