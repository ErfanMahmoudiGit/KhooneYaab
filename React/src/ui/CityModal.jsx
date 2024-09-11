/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authState, handle_variables } from '../pages/login/Redux/authSlice';
import { useDispatch, useSelector } from "react-redux";

const STATE_OPTIONS = [
    { label: "آذربايجان شرقی", value: 1 },
    { label: "آذربايجان غربی", value: 2 },
    { label: "اردبيل", value: 3 },
    { label: "اصفهان", value: 4 },
    { label: "ايلام", value: 5 },
    { label: "بوشهر", value: 6 },
    { label: "تهران", value: 7 },
    { label: "چهارمحال بختیاری", value: 8 },
    { label: "خراسان جنوبی", value: 9 },
    { label: "خراسان رضوی", value: 10 },
    { label: "خراسان شمالی", value: 11 },
    { label: "خوزستان", value: 12 },
    { label: "زنجان", value: 13 },
    { label: "سمنان", value: 14 },
    { label: "سيستان و بلوچستان", value: 15 },
    { label: "فارس", value: 16 },
    { label: "قزوين", value: 17 },
    { label: "قم", value: 18 },
    { label: "البرز", value: 19 },
    { label: "كردستان", value: 20 },
    { label: "کرمان", value: 21 },
    { label: "كرمانشاه", value: 22 },
    { label: "كهكيلويه و بويراحمد", value: 23 },
    { label: "گلستان", value: 24 },
    { label: "گيلان", value: 25 },
    { label: "لرستان", value: 26 },
    { label: "مازندران", value: 27 },
    { label: "مرکزی", value: 28 },
    { label: "هرمزگان", value: 29 },
    { label: "همدان", value: 30 },
    { label: "يزد", value: 31 },
];

export default function CityModal({ setCityModal }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const { selectedCityId, selectedCity } = useSelector(authState);
    console.log(selectedCityId, selectedCity);
    
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSelectionChange = (value) => {
        const selectedState = STATE_OPTIONS.find(option => option.value === value);
        if (selectedState) {
            setSelectedValue(value);
            dispatch(handle_variables({ selectedCity: selectedState.label, selectedCityId: selectedState.value }));
            localStorage.setItem('CITY', JSON.stringify(selectedState.value));
            console.log(value);
            setCityModal(false);
        } else {
            dispatch(handle_variables({ cityResults: [] }));
            navigate('/');
        }
    };

    const filteredOptions = STATE_OPTIONS.filter(option => 
        option.label.includes(searchInput)
    );

    return (
        <div style={{ position: 'relative', height: "100%" }}>
            <input
                value={searchInput}
                onChange={handleSearchChange}
                type="text"
                placeholder={"جستجو در شهرها"}
                className="form-control login-input mb-3"
            />
            {filteredOptions.length > 0 ? filteredOptions.map((option,index) => (
                <>
               
                <div key={option.value} onClick={() => handleSelectionChange(option.value)} style={{ cursor: "pointer" }}>
                    {option.label}
                </div>
                {index < filteredOptions.length - 1 && <hr />}
                </>
            )) : (
                <div>شهر مورد نظر یافت نشد</div>
            )}
            <hr />
        </div>
    );
}
