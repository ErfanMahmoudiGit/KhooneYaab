import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handle_variables, authState } from './Redux/authSlice';
import { Formik } from "formik";
import * as yup from "yup"; // Ensure you import Yup
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { API_LOGIN_USER } from "../../services/apiServices";
import {  toast } from 'react-toastify';

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(2,'نام باید حداقل 2 رقم باشد')
        .required('نام الزامی است'),
    email: yup.string()
        .required('ایمیل الزامی است')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "ایمیل نامعتبر است") 
});

export default function LoginStep3(){
    const { loginModalStep2 , loginModalStep3 , isSendCode, phoneNumber , name , email ,welcome_message} = useSelector(authState);
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
            <Modal.Body>
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
                            console.log(res);
                            
                            if (res.status === 200) {
                               
                                dispatch(handle_variables({
                                    loginModalStep3 : false,
                                    loginModalStep1 : false,
                                    loginModalStep2 : false,
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
                        <Row className="d-flex justify-content-center mt-3">
                            <h2>{welcome_message}</h2>
                            <Col className="ci-div" xs={12} md={9}>
                                <label htmlFor="">نام</label>
                                <input
                                    type="text"
                                    onKeyUp={(e) => {
                                        const value = e.target.value;
                                        if (isNaN(+value)) {
                                            e.target.value = e.target.value.slice(
                                                0, e.target.value.length - 1
                                            );
                                        }
                                    }}
                                    onChange={(e) => {
                                        props.setFieldValue("name",e.target.value );
                                    }}
                                    placeholder={"نام"}
                                    className="form-control login-input"
                                    name="name"
                                />
                                {props.errors.name ? (
                                <div className="text-danger mt-1" id="feedback">
                                    {props.errors.name}
                                </div>
                                ) : null}{" "}          
                            </Col>
                            <Col className="ci-div" xs={12} md={9}>
                                <label htmlFor="">ایمیل</label>
                                <input
                                    type="text"
                                    onKeyUp={(e) => {
                                        const value = e.target.value;
                                        if (isNaN(+value)) {
                                            e.target.value = e.target.value.slice(
                                                0, e.target.value.length - 1
                                            );
                                        }
                                    }}
                                    onChange={(e) => {
                                        props.setFieldValue("email",e.target.value );
                                    }}
                                    placeholder={"email"}
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
                                {!isLoading ? (
                                    <Button type="submit" className="btn btn-primary login-btn">
                                        ورود 
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
                                        // dispatch(handle_variables({
                                        //     isSendCode: false,
                                        //     loginModalStep2: false,
                                        //     loginModalStep1: true,
                                        // }));
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

// import { Button, Col, Modal, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import {handle_variables, authState } from './Redux/authSlice';
// import { Formik } from "formik";
// import * as yup from "yup";
// import { useState } from "react";

// let schema = yup.object().shape({
//     user_name: yup
//       .string()
//     //   .matches(/^[0-9]{11}$/, "لطفا به صورت کامل وارد کنید")
//       .required("این فیلد نمیتواند خالی باشد"),
  
//   });
// export default function LoginStep3(props){
//     const { loginModalStep3 ,isSendCode , phone , captcha_string , captcha_image , user_string , name} = useSelector(authState);
//     const dispatch = useDispatch();
//     const [isLoadinging, setIsLoadinging] = useState(false);
//     console.log(loginModalStep3);
    
    
//     return(
//         <>
//         <Modal
//             className={"Auth-modal"}
//             show={loginModalStep3}
//             onHide={() =>
//               dispatch(handle_variables({ loginModalStep3: false }))
//             }
//             size={"lg"}
//             centered
//         >
//             <Modal.Body >
//                 <Formik
//                     initialValues={{ user_name : name }}
//                     validationSchema={ schema }
//                     onSubmit={(values) => {   
//                         setIsLoadinging(true);
//                         // toast.success(" cv ", {
//                         //     position: toast.POSITION.TOP_RIGHT,
//                         // });
//                         const data = {
//                             user_name : values.user_name,
                           
//                         };
//                         console.log("data login step 3: " ,data);
//                         // 
//                                     setIsLoadinging(false);

//                         // let resp = API_GETOTP(data)
//                         // resp.then((res) => {
//                         //     if (res.data.status === 200) {
//                         //         dispatch(handle_variables({
//                         //             isSendCode: true,
//                         //             loginModalStep2 : true,
//                         //             phone: data.phone,
//                         //         }));
//                         //         setIsLoadinging(false);
//                         //     } else {
//                         //         toast.error(res.data.message, {
//                         //             position: toast.POSITION.TOP_RIGHT,
//                         //         });
//                         //         setIsLoadinging(false);
//                         //     }
//                         // })
//                         // .catch((err) => {
//                         //     console.log(err);
//                         //     dispatch(loadCaptchaImage());
//                         //     toast.error(err.response.data.message);
//                         //     setIsLoadinging(false);
//                         // });

//                     }}
//                 >
//                 {(props) => (
//                     <form onSubmit={props.handleSubmit}>
//                         <Row className={"text-center"}>
//                             <Col xs={12}>
//                                 <h5>user_name</h5>
//                             </Col>
//                         </Row>
//                         <Row className="d-flex justify-content-center mt-3">
//                             <Col className="ci-div" xs={12} md={9}>
//                                 <label htmlFor="">user_name </label>
//                                 <input
//                                     type="text"
//                                     onKeyUp={(e) => {
//                                         const value = e.target.value;
//                                         if (isNaN(+value)) {
//                                             e.target.value = e.target.value.slice(
//                                                 0, e.target.value.length - 1
//                                             );
//                                         }
//                                     }}
//                                     onChange={(e) => {
//                                         props.setFieldValue("user_name",e.target.value );
//                                     }}
//                                     placeholder={"شماره همراه وارد شده باید به نام شخص باشد"}
//                                     className="form-control login-input"
//                                     name="user_name"
//                                 />
//                                 {props.errors.user_name ? (
//                                 <div className="text-danger mt-1" id="feedback">
//                                     {props.errors.user_name}
//                                 </div>
//                                 ) : null}{" "}          
//                             </Col>
//                         </Row>
//                         {/* <Row className="d-flex justify-content-center mt-3">
//                         <Col xs={12} md={9}>
//                             <CaptchaComponent /> 
//                         </Col>
//                         </Row>

//                         <Row className="d-flex justify-content-center mt-3">
//                             <Col xs={6} md={4}>
//                                 {!isLoadinging ? (
//                                     <Button
//                                         type="submit"
//                                         className="btn btn-primary login-btn"
//                                     >
//                                         ارسال کد فعالسازی
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
//                         </Row> */}
//                     </form>
//                     )}
//                 </Formik>
//             </Modal.Body>
//         </Modal>
        
//         </>
//     )
// }