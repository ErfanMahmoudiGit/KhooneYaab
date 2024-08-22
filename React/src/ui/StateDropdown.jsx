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
        <div style={{ position: 'relative' , height:"100%"}}>
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
