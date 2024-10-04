
import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';  // Import Slider from Ant Design
import 'antd/dist/reset.css'; // Import Ant Design styles

const MeterageFilter = ({ value, onChange }) => {
    const [priceRange, setPriceRange] = useState(value || [0, 500]);

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
            <p className='fw-bold'>فیلتر بر اساس متراژ</p>
            <Slider
                range
                min={0}
                max={500}
                step={20}
                value={priceRange}
                onChange={handleSliderChange}
                onChangeComplete={handleAfterChange}
                style={{ marginBottom: '20px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{priceRange[1]} متر</span>
                <span>{priceRange[0]} متر</span>
            </div>
        </div>
    );
};

export default MeterageFilter;

