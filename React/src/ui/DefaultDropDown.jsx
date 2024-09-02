// import zIndex from "@mui/material/styles/zIndex";
// import { React, useState } from "react";
// import { Col, InputGroup, Row } from "react-bootstrap";
// import { Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// // import {selectLicenseList, businessAndIssueAsync} from "../Redux/licenseSlice";
// import AsyncSelect from "react-select";

// const DefaultDropDown = (props) => {

//   const [searchValue, setSearchValue] = useState("");
//   // const licenseList = useSelector(selectLicenseList);
//   const dispatch = useDispatch();
//   const colourStyles = {
//     control: (styles) => ({
//       ...styles,
//       borderRadius: 11,
//       fontSize: 12,
//       padding: "0 12px",
//       zIndex:1000
      
//     }),
//     menu: (styles) => ({
//       ...styles,
//       zIndex: 1000, // Menu z-index
//     }),
//     option: (styles) => ({
//       ...styles,
//       zIndex: 1000, // Option z-index
//     }),
//   };

//   const handleSelectChange = (data, event) => {
//     if (props.onChange) {
//       props.onChange(data);
//     } else {
//       dispatch(
//         handle_variables({
//           [props.name]: data,
//         })
//       );
//     }
//   };
//   return (
//     <>
//       <AsyncSelect
//         className={"default-select-box"}
//         isClearable
//         isSearchable
//         isDisabled={props.disabled === true}
//         styles={colourStyles}
//         value={props.value}
//         name={props.name}
//         defaultValue={
//           props.defaultValue === undefined ? null : props.defaultValue
//         }
//         defaultInputValue={searchValue}
//         // value={props.value === undefined ? null : props.value}
//         cacheOptions
//         placeholder={props.label}
//         noOptionsMessage={(inputValueString) => {
//           return "نتیجه ای برای " + inputValueString.inputValue + " یافت نشد";
//         }}
//         options={props.options}
//         // isLoading={props.isLoading}
//         defaultOptions
//         onChange={handleSelectChange}
//         onInputChange={(newValue, e) => {
//           setSearchValue(newValue);
//           if (props.handleInputChange) props.handleInputChange(newValue, e);
//           // newValue, e = null, level
//           // ?props.handleInputChange:null
//         }}
//         onMenuScrollToBottom={
//           props.handleLoadMore ? props.handleLoadMore : null
//         }
//       />
//     </>
//   );
// };

// export { DefaultDropDown };


import React, { useState } from 'react';
import AsyncSelect from 'react-select';
import { useDispatch } from 'react-redux';
import { handle_variables } from '../pages/login/Redux/authSlice'; // Import the correct action

const DefaultDropDown = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      borderRadius: 15,
      fontSize: 12,
      padding: "2px 12px",
      zIndex: 1000
    }),
    menu: (styles) => ({
      ...styles,
      zIndex: 1000, // Menu z-index
    }),
    option: (styles) => ({
      ...styles,
      zIndex: 1000, // Option z-index
    }),
  };

  const handleSelectChange = (data) => {
    if (props.onChange) {
      props.onChange(data);
    } else {
      dispatch(
        handle_variables({
          [props.name]: data,
        })
      );
    }
  };

  return (
    <AsyncSelect
      className={"default-select-box"}
      isClearable
      isSearchable
      isDisabled={props.disabled === true}
      styles={colourStyles}
      value={props.value}
      name={props.name}
      defaultValue={props.defaultValue === undefined ? null : props.defaultValue}
      defaultInputValue={searchValue}
      cacheOptions
      placeholder={props.label}
      noOptionsMessage={(inputValueString) => `نتیجه ای برای ${inputValueString.inputValue} یافت نشد`}
      options={props.options}
      defaultOptions
      onChange={handleSelectChange}
      onInputChange={(newValue, e) => {
        setSearchValue(newValue);
        if (props.handleInputChange) props.handleInputChange(newValue, e);
      }}
      onMenuScrollToBottom={props.handleLoadMore ? props.handleLoadMore : null}
    />
  );
};

export { DefaultDropDown };
