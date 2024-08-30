import { useState } from 'react';
import { Select } from 'antd'; // Import Ant Design Select
import { useNavigate } from 'react-router-dom';
import { authState, handle_variables } from "../pages/login/Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from 'react-icons/fa'; // Import close icon

const { Option } = Select;

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

function NewDropdown() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState(null); // Local state for selected value
    const {  selectedCityId  , selectedCity} = useSelector(authState);
    console.log(selectedCityId,selectedCity);

    const handleSelectionChange = (value) => {
        const selectedState = STATE_OPTIONS.find(option => option.value === value);
        if (selectedState) {
            setSelectedValue(value); // Update local state
            dispatch(handle_variables({ selectedCity: selectedState.label  , selectedCityId : selectedState.value}));
            localStorage.setItem('CITY', JSON.stringify(selectedState.value));
            

          
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
        <div style={{ position: 'relative', height: "100%" }}>
            <Select
                placeholder="استان را انتخاب کنید"
                style={{ width: '180px' }}
                value={selectedValue}
                onChange={handleSelectionChange}
                allowClear
                dropdownRender={menu => (
                    <>
                        {menu}
                        {selectedValue && (
                            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
                                <FaTimes
                                    onClick={handleClearSelection}
                                    size={20}
                                    style={{
                                        cursor: 'pointer',
                                        color: 'red',
                                    }}
                                />
                            </div>
                        )}
                    </>
                )}
            >
                {STATE_OPTIONS.map(option => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>
        </div>
    );
}

export default NewDropdown;
