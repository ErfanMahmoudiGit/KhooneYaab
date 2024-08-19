// import {DefaultDropDown} from './DefaultDropDown'
// import {API_GET_BY_STATE } from '../services/apiServices'
// import { useNavigate } from 'react-router-dom';
// import { authState, handle_variables } from "../pages/login/Redux/authSlice"; // Update with the correct path
// import { useSelector, useDispatch } from "react-redux";


// const STATE_DATA = [
//     { "name": "آذربايجان شرقی", "center": "تبریز", "latitude": "38.50", "longitude": "46.180", "id": 1 },
//     { "name": "آذربايجان غربی", "center": "ارومیه", "latitude": "37.320", "longitude": "45.40", "id": 2 },
//     { "name": "اردبيل", "center": "اردبیل", "latitude": "38.140", "longitude": "48.170", "id": 3 },
//     { "name": "اصفهان", "center": "اصفهان", "latitude": "32.390", "longitude": "51.400", "id": 4 },
//     { "name": "ايلام", "center": "ايلام", "latitude": "33.380", "longitude": "46.250", "id": 5 },
//     { "name": "بوشهر", "center": "بوشهر", "latitude": "28.590", "longitude": "50.500", "id": 6 },
//     { "name": "تهران", "center": "تهران", "latitude": "35.410", "longitude": "51.240", "id": 7 },
//     { "name": "چهارمحال بختیاری", "center": "شهركرد", "latitude": "32.190", "longitude": "50.510", "id": 8 },
//     { "name": "خراسان جنوبی", "center": "بيرجند", "latitude": "32.5216", "longitude": "59.1315", "id": 9 },
//     { "name": "خراسان رضوی", "center": "مشهد", "latitude": "36.170", "longitude": "59.350", "id": 10 },
//     { "name": "خراسان شمالی", "center": "بجنورد", "latitude": "37.2835", "longitude": "57.1954", "id": 11 },
//     { "name": "خوزستان", "center": "اهواز", "latitude": "31.190", "longitude": "48.410", "id": 12 },
//     { "name": "زنجان", "center": "زنجان", "latitude": "36.400", "longitude": "48.290", "id": 13 },
//     { "name": "سمنان", "center": "سمنان", "latitude": "35.340", "longitude": "53.230", "id": 14 },
//     { "name": "سيستان و بلوچستان", "center": "زاهدان", "latitude": "29.320", "longitude": "60.540", "id": 15 },
//     { "name": "فارس", "center": "شيراز", "latitude": "29.360", "longitude": "52.310", "id": 16 },
//     { "name": "قزوين", "center": "قزوين", "latitude": "36.167", "longitude": "50.010", "id": 17 },
//     { "name": "قم", "center": "قم", "latitude": "34.380", "longitude": "50.530", "id": 18 },
//     { "name": "البرز", "center": "کرج", "latitude": "35.8400", "longitude": "50.9391", "id": 19 },
//     { "name": "كردستان", "center": "سنندج", "latitude": "35.180", "longitude": "47.10", "id": 20 },
//     { "name": "کرمان", "center": "کرمان", "latitude": "30.160", "longitude": "57.40", "id": 21 },
//     { "name": "كرمانشاه", "center": "كرمانشاه", "latitude": "34.180", "longitude": "47.30", "id": 22 },
//     { "name": "كهكيلويه و بويراحمد", "center": "ياسوج", "latitude": "30.390", "longitude": "51.350", "id": 23 },
//     { "name": "گلستان", "center": "گرگان", "latitude": "36.500", "longitude": "54.250", "id": 24 },
//     { "name": "گيلان", "center": "رشت", "latitude": "37.160", "longitude": "49.350", "id": 25 },
//     { "name": "لرستان", "center": "خرم آباد", "latitude": "33.290", "longitude": "48.210", "id": 26 },
//     { "name": "مازندران", "center": "ساري", "latitude": "36.330", "longitude": "53.30", "id": 27 },
//     { "name": "مرکزی", "center": "اراک", "latitude": "34.50", "longitude": "49.410", "id": 28 },
//     { "name": "هرمزگان", "center": "بندرعباس", "latitude": "56.266", "longitude": "27.18", "id": 29 },
//     { "name": "همدان", "center": "همدان", "latitude": "34.470", "longitude": "48.300", "id": 30 },
//     { "name": "يزد", "center": "يزد", "latitude": "31.530", "longitude": "54.210", "id": 31 },
// ];
// const STATE_OPTIONS = [
//     { "label": "آذربايجان شرقی","value": 1 },
//     { "label": "آذربايجان غربی","value": 2 },
//     { "label": "اردبيل","value": 3 },
//     { "label": "اصفهان","value": 4 },
//     { "label": "ايلام","value": 5 },
//     { "label": "بوشهر","value": 6 },
//     { "label": "تهران","value": 7 },
//     { "label": "چهارمحال بختیاری", "value": 8 },
//     { "label": "خراسان جنوبی", "value": 9 },
//     { "label": "خراسان رضوی","value": 10 },
//     { "label": "خراسان شمالی", "value": 11 },
//     { "label": "خوزستان","value": 12 },
//     { "label": "زنجان", "value": 13 },
//     { "label": "سمنان","value": 14 },
//     { "label": "سيستان و بلوچستان", "value": 15 },
//     { "label": "فارس", "value": 16 },
//     { "label": "قزوين", "value": 17 },
//     { "label": "قم", "value": 18 },
//     { "label": "البرز", "value": 19 },
//     { "label": "كردستان", "value": 20 },
//     { "label": "کرمان", "value": 21 },
//     { "label": "كرمانشاه", "value": 22 },
//     { "label": "كهكيلويه و بويراحمد","value": 23 },
//     { "label": "گلستان","value": 24 },
//     { "label": "گيلان"," value": 25 },
//     { "label": "لرستان","value": 26 },
//     { "label": "مازندران", "value": 27 },
//     { "label": "مرکزی","value": 28 },
//     { "label": "هرمزگان","value": 29 },
//     { "label": "همدان", "value": 30 },
//     { "label": "يزد", "value": 31 },
// ];

// function StateDropdown() {
//     let navigate = useNavigate()
//     const { cityResults , selectedCity } = useSelector(authState);
//     const dispatch = useDispatch();
//     console.log("selectedCity " , selectedCity);


//     const handleSelectionChange = (event) => {
//         let selectedCitylabel = event.label;
//         let selectedCity = event.value;
//         dispatch(handle_variables({ selectedCity: selectedCitylabel }))

//         let data = {state : selectedCity}
//         let resp = API_GET_BY_STATE(data)
//         resp.then((res) => {
//             console.log(res);
//             if (res.status === 200) {
//                 console.log("res",res.data);   
                
//                 dispatch(handle_variables({ cityResults: res.data }))

//                 navigate(`${selectedCitylabel}`)  
                
                  
//             } else {
//                 console.log("not sent");        

//             }
//         })
        
    

//     }

//     return (
//         <DefaultDropDown
//             label={"استان را انتخاب کنید"}
//             options={STATE_OPTIONS}
//             onChange={(event) => handleSelectionChange(event)}
//         />
//     );
// }

// export default StateDropdown;

import React, { useState } from 'react';
import { DefaultDropDown } from './DefaultDropDown';
import { API_GET_BY_STATE } from '../services/apiServices';
import { useNavigate } from 'react-router-dom';
import { authState, handle_variables } from "../pages/login/Redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from 'react-icons/fa'; // Import close icon

const STATE_OPTIONS = [
    { "label": "آذربايجان شرقی","value": 1 },
    { "label": "آذربايجان غربی","value": 2 },
    { "label": "اردبيل","value": 3 },
    { "label": "اصفهان","value": 4 },
    { "label": "ايلام","value": 5 },
    { "label": "بوشهر","value": 6 },
    { "label": "تهران","value": 7 },
    { "label": "چهارمحال بختیاری", "value": 8 },
    { "label": "خراسان جنوبی", "value": 9 },
    { "label": "خراسان رضوی","value": 10 },
    { "label": "خراسان شمالی", "value": 11 },
    { "label": "خوزستان","value": 12 },
    { "label": "زنجان", "value": 13 },
    { "label": "سمنان","value": 14 },
    { "label": "سيستان و بلوچستان", "value": 15 },
    { "label": "فارس", "value": 16 },
    { "label": "قزوين", "value": 17 },
    { "label": "قم", "value": 18 },
    { "label": "البرز", "value": 19 },
    { "label": "كردستان", "value": 20 },
    { "label": "کرمان", "value": 21 },
    { "label": "كرمانشاه", "value": 22 },
    { "label": "كهكيلويه و بويراحمد","value": 23 },
    { "label": "گلستان","value": 24 },
    { "label": "گيلان"," value": 25 },
    { "label": "لرستان","value": 26 },
    { "label": "مازندران", "value": 27 },
    { "label": "مرکزی","value": 28 },
    { "label": "هرمزگان","value": 29 },
    { "label": "همدان", "value": 30 },
    { "label": "يزد", "value": 31 },
];

function StateDropdown() {
    const navigate = useNavigate();
    const { cityResults, selectedCity } = useSelector(authState);
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState(null); // Local state for selected value

    const handleSelectionChange = (event) => {
        let selectedCitylabel = event ? event.label : null;
        let selectedCityValue = event ? event.value : null;
        setSelectedValue(selectedCityValue); // Update local state
        dispatch(handle_variables({ selectedCity: selectedCitylabel }));

        if (selectedCityValue) {
            let data = { state: selectedCityValue };
            let resp = API_GET_BY_STATE(data);
            resp.then((res) => {
                if (res.status === 200) {
                    dispatch(handle_variables({ cityResults: res.data }));
                    navigate(`${selectedCitylabel}`);
                } else {
                    console.log("not sent");
                }
            });
        } else {
            // Clear city results if no selection
            dispatch(handle_variables({ cityResults: [] }));
            navigate('/');
        }
    };

    const handleClearSelection = () => {
        setSelectedValue(null); // Clear local state
        dispatch(handle_variables({ selectedCity: "" })); // Reset selectedCity in Redux if needed
        dispatch(handle_variables({ cityResults: [] })); // Clear city results
        navigate('/'); // Optionally, navigate to a default route
    };

    return (
        <div style={{ position: 'relative' }}>
            <DefaultDropDown
                label={"استان را انتخاب کنید"}
                options={STATE_OPTIONS}
                onChange={(event) => handleSelectionChange(event)}
                value={STATE_OPTIONS.find(option => option.value === selectedValue)} // Set dropdown value
            />
            {selectedValue && (
                <FaTimes
                    onClick={handleClearSelection}
                    size={20}
                    style={{
                        position: 'absolute',
                        top: '10px', // Adjust based on your dropdown's position
                        right: '10px', // Adjust based on your dropdown's position
                        cursor: 'pointer',
                        color: 'red',
                    }}
                />
            )}
        </div>
    );
}

export default StateDropdown;
