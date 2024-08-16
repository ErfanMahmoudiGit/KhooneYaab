/* eslint-disable react/prop-types */
// import { Button, Col, Modal, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import {handle_variables, authState } from './Redux/authSlice';
// import { Formik } from "formik";
// import * as yup from "yup";
// import { useEffect, useState } from "react";
// // import {  toast } from 'react-toastify';
// import { BeatLoader } from "react-spinners";
// // import {CaptchaComponent} from './CaptchaComponent'
// import OTPInput from 'react-otp-input'


// export default function LoginStep2(){
//     const { loginModalStep2 ,isSendCode , phone} = useSelector(authState);
//     const dispatch = useDispatch();
//     const [isLoadinging, setIsLoadinging] = useState(false);
//     const RESEND_TIME = 90
//     const[otp,setOtp] = useState("")
//     const[time,setTime] = useState(RESEND_TIME)

//     useEffect(()=>{
//         const timer = time > 0 && setInterval(()=>{
//             setTime((t)=> t - 1)
//         },1000)
//         return ()=>{
//             if(timer) clearInterval(timer)
//         }
//     },[time])
   
//     return(
//         <Modal
//             className={"Auth-modal"}
//             show={loginModalStep2}
//             onHide={() =>
//               dispatch(handle_variables({ loginModalStep2: false }))
//             }
//             size={"lg"}
//             centered
//         >
//             <Modal.Body >
//                 <Formik
//                     initialValues={{ phone: phone }}
//                     // validationSchema={ schema }
//                     onSubmit={(values) => {   
//                         setIsLoadinging(true);
//                        console.log(otp);
                       
//                         const data = {
//                             phoneNumber: phone,
//                             code : otp
//                         //   captcha_text,
//                         //   captcha_ref,
//                         };
//                         console.log("data: " ,data);
//                     }}
//                 >
//                 {(props) => (
//                     <form onSubmit={props.handleSubmit}>
//                          <Row className={"text-center"}>
//                             <Col xs={12}>
//                                 <h5>کد فعالسازی 6 رقمی به شماره همراه {phone} ارسال گردید</h5>
//                             </Col>
//                         </Row>
//                         <Row className="d-flex justify-content-center mt-3">
//                             <Col className="ci-div" xs={12} md={9}>
//                                 <p className="font-weight-bold text-secondary">کد تایید را وارد کنید</p>
//                                 <OTPInput 
//                                     numInputs={6}
//                                     value={otp} 
//                                     onChange={setOtp} 
//                                     renderSeparator={<span>-</span>}
//                                     renderInput={(props) => <input type="number" {...props} className="form-control" style={{
//                                         width: "2.5rem",
//                                         padding: "0.5rem 0.2rem",
//                                         border: "1px solid rgb(183, 197, 255)",
//                                         borderRadius: "0.5rem",
//                                         textAlign:"center"
//                                     }} />}
                                    
//                                     containerStyle="d-flex flex-row-reverse gap-2 justify-content-center"
//                                 />
//                                 <div className="mb-4 text-secondary">
//                                     {time > 0 ? (
//                                         <p>{time} ثانیه تا ارسال مجدد کد</p>
//                                     ) : (
//                                         <button className="text-primary">ارسال مجدد کد تایید</button>
//                                     )}
//                                 </div>
//                             </Col>
//                         </Row>
//                         <Row className="d-flex justify-content-center mt-3">
//                             <Col xs={6} md={4}>
//                                 {!isLoadinging ? (
//                                     <Button
//                                         type="submit"
//                                         className="btn btn-primary login-btn"
//                                     >
//                                          تایید 
//                                     </Button>
//                                     ) : (
//                                     <div
//                                         style={{ borderRadius: "15px", padding: "2px" }}
//                                         className="btn btn-primary login-btn"
//                                     >
//                                         <BeatLoader size={9} color={"black"} />
//                                     </div>
//                                 )}
//                             </Col>
//                             <Col xs={6} md={4}>
//                                 <Button
//                                     type="submit"
//                                     className="btn login-btn btn-danger btn-red"
//                                     onClick={()=>{
//                                         dispatch(handle_variables({
//                                             isSendCode: false,
//                                             loginModalStep2 : false,
//                                             loginModalStep1 : true,
                                            
//                                         }));
//                                     }}
//                                 >
//                                      بازگشت 
//                                 </Button>  
//                             </Col>
//                         </Row>
//                     </form>
//                     )}
//                 </Formik>
//             </Modal.Body>
//         </Modal>
//     )
// }


import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handle_variables, authState } from './Redux/authSlice';
import { Formik } from "formik";
import * as yup from "yup"; // Ensure you import Yup
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import OTPInput from 'react-otp-input';
import {API_CHECKOTP} from '../../services/apiServices'

// Validation schema
const validationSchema = yup.object().shape({
    code: yup.string()
        .length(6, 'کد تایید باید 6 رقم باشد')
        .required('کد تایید الزامی است'),
});

export default function LoginStep2() {
    const { loginModalStep2, isSendCode, phoneNumber } = useSelector(authState);
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
                        <Row className={"text-center"}>
                            <Col xs={12}>
                                <h5>کد فعالسازی 6 رقمی به شماره همراه {phoneNumber} ارسال گردید</h5>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-3">
                            <Col className="ci-div" xs={12} md={9}>
                                <p className="font-weight-bold text-secondary">کد تایید را وارد کنید</p>
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
                                                textAlign: "center"
                                            }} 
                                        />
                                    )}
                                    containerStyle="d-flex flex-row-reverse gap-2 justify-content-center"
                                />
                                {props.touched.code && props.errors.code && (
                                    <div style={{ color: 'red' }}>{props.errors.code}</div>
                                )}
                                <div className="mb-4 text-secondary">
                                    {time > 0 ? (
                                        <p>{time} ثانیه تا ارسال مجدد کد</p>
                                    ) : (
                                        <button className="text-primary">ارسال مجدد کد تایید</button>
                                    )}
                                </div>
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
