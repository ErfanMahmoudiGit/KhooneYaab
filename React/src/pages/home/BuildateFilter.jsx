import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';  // Import Slider from Ant Design
import 'antd/dist/reset.css'; // Import Ant Design styles

const BuilddateFilter = ({ value, onChange }) => {
    const [priceRange, setPriceRange] = useState(value || [1375,1403]);

    function formatNumber(number) {
        let formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return formatted.replace(/\d/g, (digit) => persianDigits[digit]);
    }
    useEffect(() => {
        setPriceRange(value);
    }, [value]);

    const handleSliderChange = (range) => {
        setPriceRange(range);
    };

    const handleAfterChange = (range) => {
        onChange(range);
    };

    return (
        <div className="price-filter-container ps-4 mt-4">
            <p className='fw-bold'>فیلتر بر اساس سال ساخت</p>
            <Slider
                range
                min={1375}
                max={1403}
                step={5}
                value={priceRange}
                onChange={handleSliderChange}
                onChangeComplete={handleAfterChange}
                style={{ marginBottom: '20px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* <span> تومان</span> */}
                <span>{priceRange[1]} </span>
                <span>{priceRange[0]} </span>
            </div>
        </div>
    );
};

export default BuilddateFilter;

