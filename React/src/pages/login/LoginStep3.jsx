import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handle_variables, authState } from './Redux/authSlice';
import { Formik } from "formik";
import * as yup from "yup"; // Ensure you import Yup
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import OTPInput from 'react-otp-input';
import {API_CHECKOTP} from '../../services/apiServices'

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(2,'نام باید حداقل 2 رقم باشد')
        .required('نام الزامی است'),
    email: yup.string()
        .required('ایمیل الزامی است')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "ایمیل نامعتبر است") 
});

export default function LoginStep3(){
    const { loginModalStep2 , loginModalStep3 , isSendCode, phoneNumber } = useSelector(authState);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const RESEND_TIME = 90;
    const [otp, setOtp] = useState("");
    const [time, setTime] = useState(RESEND_TIME);

    useEffect(() => {
        const timer = time > 0 && setInterval(() => {
            setTime((t) => t - 1);
        }, 1000);
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [time]);
    
    return (
        <Modal
            className={"Auth-modal"}
            show={loginModalStep3}
            onHide={() => dispatch(handle_variables({ loginModalStep3: false }))}
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
                        console.log("data: ", data);
                        // let resp = API_CHECKOTP(data)
                        // resp.then((res) => {
                        //     if (res.data.status === 200) {
                        //         dispatch(handle_variables({
                        //             isSendCode: true,
                        //             loginModalStep2 : true,
                        //             phone: data.phone,
                        //         }));
                        //         setIsLoadinging(false);
                        //     } else {
                        //         toast.error(res.data.message, {
                        //             position: toast.POSITION.TOP_RIGHT,
                        //         });
                        //         setIsLoadinging(false);
                        //     }
                        // })
                        // .catch((err) => {
                        //     console.log(err);
                        //     dispatch(loadCaptchaImage());
                        //     toast.error(err.response.data.message);
                        //     setIsLoadinging(false);
                        // });
                    }}
                >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
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
                            <Col xs={6} md={4}>
                                {!isLoading ? (
                                    <Button type="submit" className="btn btn-primary login-btn">
                                        تایید 
                                    </Button>
                                ) : (
                                    <div style={{ borderRadius: "15px", padding: "2px" }} className="btn btn-primary login-btn">
                                        <BeatLoader size={9} color={"black"} />
                                    </div>
                                )}
                            </Col>
                            <Col xs={6} md={4}>
                                <Button
                                    type="button"
                                    className="btn login-btn btn-danger btn-red"
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
    );
}