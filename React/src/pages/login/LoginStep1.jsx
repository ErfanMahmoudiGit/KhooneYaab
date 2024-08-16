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

let schema = yup.object().shape({
    phone: yup
      .string()
      .matches(/^[0-9]{11}$/, "لطفا به صورت کامل وارد کنید")
      .required("این فیلد نمیتواند خالی باشد"),
  
  });
export default function LoginStep1(props){
    const { loginModalStep1 ,isSendCode , phone , captcha_string , captcha_image , user_string} = useSelector(authState);
    const dispatch = useDispatch();
    const [isLoadinging, setIsLoadinging] = useState(false);

    console.log(phone);
    console.log("captcha_image: ",captcha_image);
    console.log("captcha_string: ",captcha_string);
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
                    initialValues={{ phone: phone }}
                    validationSchema={ schema }
                    onSubmit={(values) => {   
                        setIsLoadinging(true);
                        // toast.success(" cv ", {
                        //     position: toast.POSITION.TOP_RIGHT,
                        // });
                        const data = {
                            phoneNumber: values.phone,
                            user_string : user_string,
                            captcha_string : captcha_string,
                            captcha_image : captcha_image
                        };
                        console.log("data login step 1: " ,data);
                        dispatch(handle_variables({
                                        isSendCode: true,
                                        loginModalStep1 : false,
                                        loginModalStep2 : true,
                                        phoneNumber: data.phoneNumber,
                                    }));
                                    setIsLoadinging(false);

                        // let resp = API_GETOTP(data)
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