// // /* eslint-disable react/prop-types */
// // import { Button, Col, Modal, Row } from "react-bootstrap";
// // import { Formik } from "formik";
// // import * as yup from "yup";
// // import { useState } from "react";
// // import {  toast } from 'react-toastify';
// // import { BeatLoader } from "react-spinners";

// // let schema = yup.object().shape({
// //     postalcode: yup
// //       .string()
// //       .required("این فیلد نمیتواند خالی باشد"),
  
// //   });
// // export default function NewModal(props){
   
// //     const [isLoadinging, setIsLoadinging] = useState(false);

// //     let mojavez = [
// //         {request_number : "23" , title:"عنوان"}
// //     ]
// //     return(
// //         <>
// //         <Modal
// //             className={"Auth-modal"}
// //             show={loginModalStep1}
// //             onHide={() =>
// //             }
// //             size={"lg"}
// //             centered
// //         >
// //             <Modal.Body >
// //                 <Formik
// //                     initialValues={{postalcode : ""}}
// //                     validationSchema={ schema }
// //                     onSubmit={(values) => {   
// //                         setIsLoadinging(true);
                                               
                        

// //                     }}
// //                 >
// //                 {(props) => (
// //                     <form onSubmit={props.handleSubmit}>
// //                         <Row className={"text-center"}>
// //                             <Col xs={12}>
// //                                 <h5>ورود به چارخونه</h5>
// //                             </Col>
// //                         </Row>
// //                         <Row className="d-flex justify-content-center mt-3">
// //                             <Col className="ci-div" xs={12} md={9}>
// //                                 <label htmlFor="">شماره همراه </label>
// //                                 <input
// //                                     type="text"
// //                                     maxLength={11}
// //                                     onKeyUp={(e) => {
// //                                         const value = e.target.value;
// //                                         if (isNaN(+value)) {
// //                                             e.target.value = e.target.value.slice(
// //                                                 0, e.target.value.length - 1
// //                                             );
// //                                         }
// //                                     }}
// //                                     onChange={(e) => {
// //                                         props.setFieldValue("phone",e.target.value );
// //                                     }}
// //                                     placeholder={"شماره همراه وارد شده باید به نام شخص باشد"}
// //                                     className="form-control login-input"
// //                                     name="phone"
// //                                 />
// //                                 {props.errors.phone ? (
// //                                 <div className="text-danger mt-1" id="feedback">
// //                                     {props.errors.phone}
// //                                 </div>
// //                                 ) : null}{" "}          
// //                             </Col>
// //                         </Row>
// //                         <Row className="d-flex justify-content-center mt-3">
// //                         <Col xs={12} md={9}>
// //                             <CaptchaComponent /> 
// //                         </Col>
// //                         </Row>

// //                         <Row className="d-flex justify-content-center mt-3">
// //                             <Col xs={6} md={4}>
// //                                 {!isLoadinging ? (
// //                                     <Button
// //                                         type="submit"
// //                                         className="btn btn-primary login-btn"
// //                                     >
// //                                         ارسال کد فعالسازی
// //                                     </Button>
// //                                     ) : (
// //                                     <div
// //                                         style={{ borderRadius: "15px", padding: "2px" }}
// //                                         className="btn btn-primary login-btn"
// //                                     >
// //                                         <BeatLoader size={9} color={"black"} />
// //                                     </div>
// //                                 )}
// //                             </Col>
// //                         </Row>
// //                     </form>
// //                     )}
// //                 </Formik>
// //             </Modal.Body>
// //         </Modal>

// //         </>
// //     )
// // }
// /* eslint-disable react/prop-types */
// import { Button, Col, Modal, Row } from "react-bootstrap";
// import { Formik } from "formik";
// import * as yup from "yup";
// import { useState } from "react";
// import { toast } from 'react-toastify';
// import { BeatLoader } from "react-spinners";

// // Dynamic validation schema based on mojavez length
// const generateValidationSchema = (mojavez) => {
//   let shape = {
//     postalcode: yup
//       .string()
//       .required("این فیلد نمیتواند خالی باشد"),
//   };

//   mojavez.forEach((_, index) => {
//     shape[`request_${index}`] = yup
//       .string()
//       .required(`فیلد ${index + 1} نمیتواند خالی باشد`);
//   });

//   return yup.object().shape(shape);
// };

// export default function NewModal(props) {
//   const [isLoadinging, setIsLoadinging] = useState(false);

//   // Dynamic mojavez data
//   let mojavez = [
//     { request_number: "23", title: "عنوان 1" },
//     { request_number: "45", title: "عنوان 2" },
//     { request_number: "67", title: "عنوان 3" }
//   ];

//   const validationSchema = generateValidationSchema(mojavez);

//   return (
//     <Modal
//       className={"Auth-modal"}
//       show={props.show} // Assuming you have a prop `show` to control the modal visibility
//       onHide={props.onHide} // Assuming you have a prop `onHide` to handle closing the modal
//       size={"lg"}
//       centered
//     >
//       <Modal.Body>
//         <Formik
//           initialValues={{
//             postalcode: "",
//             ...mojavez.reduce((acc, _, index) => {
//               acc[`request_${index}`] = "";
//               return acc;
//             }, {}),
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             setIsLoadinging(true);
//             // Handle the submission logic here
//             console.log(values);
//             setIsLoadinging(false);
//           }}
//         >
//           {(props) => (
//             <form onSubmit={props.handleSubmit}>
//               <Row className={"text-center"}>
//                 <Col xs={12}>
//                   <h5>ورود به چارخونه</h5>
//                 </Col>
//               </Row>

//               {mojavez.map((item, index) => (
//                 <Row className="d-flex justify-content-center mt-3" key={index}>
//                   <Col className="ci-div" xs={12} md={9}>
//                     <label>{item.title} - درخواست {item.request_number}</label>
//                     <input
//                       type="text"
//                       onChange={props.handleChange}
//                       onBlur={props.handleBlur}
//                       value={props.values[`request_${index}`]}
//                       className="form-control login-input"
//                       name={`request_${index}`}
//                     />
//                     {props.errors[`request_${index}`] && props.touched[`request_${index}`] ? (
//                       <div className="text-danger mt-1" id="feedback">
//                         {props.errors[`request_${index}`]}
//                       </div>
//                     ) : null}
//                   </Col>
//                 </Row>
//               ))}

//               <Row className="d-flex justify-content-center mt-3">
//                 <Col className="ci-div" xs={12} md={9}>
//                   <label htmlFor="postalcode">کد پستی</label>
//                   <input
//                     type="text"
//                     onChange={props.handleChange}
//                     onBlur={props.handleBlur}
//                     value={props.values.postalcode}
//                     className="form-control login-input"
//                     name="postalcode"
//                   />
//                   {props.errors.postalcode && props.touched.postalcode ? (
//                     <div className="text-danger mt-1" id="feedback">
//                       {props.errors.postalcode}
//                     </div>
//                   ) : null}
//                 </Col>
//               </Row>

//               <Row className="d-flex justify-content-center mt-3">
//                 <Col xs={6} md={4}>
//                   {!isLoadinging ? (
//                     <Button
//                       type="submit"
//                       className="btn btn-primary login-btn"
//                     >
//                       ارسال
//                     </Button>
//                   ) : (
//                     <div
//                       style={{ borderRadius: "15px", padding: "2px" }}
//                       className="btn btn-primary login-btn"
//                     >
//                       <BeatLoader size={9} color={"black"} />
//                     </div>
//                   )}
//                 </Col>
//               </Row>
//             </form>
//           )}
//         </Formik>
//       </Modal.Body>
//     </Modal>
//   );
// }

/* eslint-disable react/prop-types */
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

// Dynamic validation schema based on mojavez length
const generateValidationSchema = (mojavez) => {
  let shape = {
    // postalcode: yup
    //   .string()
    //   .required("این فیلد نمیتواند خالی باشد"),
  };

  mojavez.forEach((_, index) => {
    shape[`request_${index}`] = yup
      .string()
      .required(`فیلد ${index + 1} نمیتواند خالی باشد`);
  });

  return yup.object().shape(shape);
};

export default function NewModal({ show, onHide }) {
  const [isLoadinging, setIsLoadinging] = useState(false);

  // Dynamic mojavez data
  let mojavez = [
    { request_number: "23", title: "عنوان 1" },
    { request_number: "45", title: "عنوان 2" },
    { request_number: "67", title: "عنوان 3" }
  ];

  const validationSchema = generateValidationSchema(mojavez);

  return (
    <Modal
      className={"Auth-modal"}
      show={show}
      onHide={onHide}
      size={"lg"}
      centered
    >
      <Modal.Body>
        <Formik
          initialValues={{
            // postalcode: "",
            ...mojavez.reduce((acc, _, index) => {
              acc[`request_${index}`] = "";
              return acc;
            }, {}),
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setIsLoadinging(true);
            // Handle the submission logic here
            console.log(values);
            setIsLoadinging(false);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Row className={"text-center"}>
                <Col xs={12}>
                  <h5>ورود به چارخونه</h5>
                </Col>
              </Row>

              {mojavez.map((item, index) => (
                <Row className="d-flex justify-content-center mt-3" key={index}>
                  <Col className="ci-div" xs={12} md={9}>
                    <label>{item.title} - درخواست {item.request_number}</label>
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values[`request_${index}`]}
                      className="form-control login-input"
                      name={`request_${index}`}
                    />
                    {props.errors[`request_${index}`] && props.touched[`request_${index}`] ? (
                      <div className="text-danger mt-1" id="feedback">
                        {props.errors[`request_${index}`]}
                      </div>
                    ) : null}
                  </Col>
                </Row>
              ))}

              {/* <Row className="d-flex justify-content-center mt-3">
                <Col className="ci-div" xs={12} md={9}>
                  <label htmlFor="postalcode">کد پستی</label>
                  <input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.postalcode}
                    className="form-control login-input"
                    name="postalcode"
                  />
                  {props.errors.postalcode && props.touched.postalcode ? (
                    <div className="text-danger mt-1" id="feedback">
                      {props.errors.postalcode}
                    </div>
                  ) : null}
                </Col>
              </Row> */}

              <Row className="d-flex justify-content-center mt-3">
                <Col xs={6} md={4}>
                  {!isLoadinging ? (
                    <Button
                      type="submit"
                      className="btn btn-primary login-btn"
                    >
                      ارسال
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
  );
}

