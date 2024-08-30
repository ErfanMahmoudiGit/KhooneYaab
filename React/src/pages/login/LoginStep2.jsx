import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handle_variables, authState } from './Redux/authSlice';
import { Formik } from "formik";
import * as yup from "yup"; // Ensure you import Yup
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import OTPInput from 'react-otp-input';
import {API_CHECKOTP} from '../../services/apiServices'
import LoginStep3 from "./LoginStep3";
import {  toast } from 'react-toastify';
import Timer from "./Timer";

// Validation schema
const validationSchema = yup.object().shape({
    code: yup.string()
        .length(6, 'کد تایید باید 6 رقم باشد')
        .required('کد تایید الزامی است'),
});

export default function LoginStep2() {
    const { loginModalStep2, isSendCode, phoneNumber ,loginModalStep3 , is_verified_user , welcome_message} = useSelector(authState);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState("");

    console.log("loginModalStep3",loginModalStep3);
    
    return (
        <>
        <Modal
            className={"Auth-modal"}
            show={loginModalStep2}
            onHide={() => dispatch(handle_variables({ loginModalStep2: false }))}
            size={"lg"}
            centered
        >
            <Modal.Body>
                <Formik
                    initialValues={{ phoneNumber: phoneNumber, code: '' }} // Add `code` here
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        setIsLoading(true);
                        const data = {
                            phoneNumber: phoneNumber,
                            otp: values.code,
                        };

                        let resp = API_CHECKOTP(data)
                        resp.then((res) => {
                            console.log(res);
                            
                            if (res.status === 200) {
                                console.log(res.data.data.message);
                                console.log(res.data.data.user.is_verified_user);
                                
                                dispatch(handle_variables({
                                    // isSendCode: true,
                                    welcome_message  : res.data.data.message,
                                    is_verified_user : res.data.data.user.is_verified_user,
                                    loginModalStep2 : false,
                                    loginModalStep3 : true,
                                    phoneNumber: data.phoneNumber,
                                }));
                                setIsLoading(false);
                            } else {
                                toast.error(res.error);
                                setIsLoading(false);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            // dispatch(loadCaptchaImage());
                            // toast.error(err.response.data.message);
                            setIsLoading(false);
                        });
                    }}
                >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <Row className={"text-center"}>
                            <Col xs={12}>
                                <h5>کد فعالسازی 6 رقمی به شماره همراه {phoneNumber} ارسال گردید</h5>
                            </Col>
                        </Row>
                        <p className="font-weight-bold text-secondary text-center d-flex justify-content-center">کد تایید را وارد کنید</p>
                        <Row className="d-flex justify-content-center mt-3">

                            <Col className="ci-div" xs={12} md={9}>
                                <OTPInput 
                                    numInputs={6}
                                    value={otp} 
                                    onChange={(value) => {
                                        setOtp(value);
                                        props.setFieldValue('code', value); // Sync to Formik
                                    }} 
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => (
                                        <input 
                                            type="number" 
                                            {...props} 
                                            style={{
                                                width: "2.5rem",
                                                padding: "0.5rem 0.2rem",
                                                border: "1px solid rgb(183, 197, 255)",
                                                borderRadius: "0.5rem",
                                                textAlign: "center",
                                                fontSize:"18px"
                                            }} 
                                        />
                                    )}
                                    containerStyle="d-flex flex-row-reverse gap-2 justify-content-center"
                                />
                                {props.touched.code && props.errors.code && (
                                    <div style={{ color: 'red' }}>{props.errors.code}</div>
                                )}
                                <Row className="d-flex justify-content-center mt-3">
                                    <Col xs={12} md={9}>
                                        <Timer />
                                    </Col>
                                </Row>
                                <div className="mb-4 text-secondary">
                                </div>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-3">
                            <Col xs={6} md={4}>
                                {/* {!isLoading ? (
                                    <Button type="submit" className="btn-login">
                                        تایید 
                                    </Button>
                                ) : (
                                    <div className="btn-login">
                                        <BeatLoader size={9} color={"black"} />
                                    </div>
                                )} */}
                                 <Button type="submit" className="btn-login">
                                        {isLoading ? <BeatLoader size={9} color={"black"} /> : "تایید"} 
                                    </Button>
                            </Col>
                            <Col xs={6} md={4}>
                                <Button
                                    type="button"
                                    className="btn-login-back"
                                    onClick={() => {
                                        dispatch(handle_variables({
                                            isSendCode: false,
                                            loginModalStep2: false,
                                            loginModalStep1: true,
                                        }));
                                    }}
                                >
                                    بازگشت 
                                </Button>  
                            </Col>
                        </Row>
                    </form>
                )}
                </Formik>
            </Modal.Body>
        </Modal>
        { loginModalStep3 && <LoginStep3 /> }
        </>
    );
}
