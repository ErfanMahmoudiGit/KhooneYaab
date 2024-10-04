import { useEffect, useState } from 'react';
import { Slider } from 'antd';  // Import Slider from Ant Design
import 'antd/dist/reset.css'; // Import Ant Design styles

const PriceFilter = ({ value, onChange }) => {
    const [priceRange, setPriceRange] = useState(value || [0, 100000000000]);

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
            <p className='fw-bold'>فیلتر بر اساس قیمت</p>
            <Slider
                range
                min={0}
                max={1000000000}
                step={100000}
                value={priceRange}
                onChange={handleSliderChange}
                onChangeComplete={handleAfterChange}
                style={{ marginBottom: '20px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* <span> تومان</span> */}
                <span>{formatNumber(priceRange[1])} تومان</span>
                <span>{formatNumber(priceRange[0])} تومان</span>
                {/* <span>{priceRange[0]} تومان</span> */}
            </div>
        </div>
    );
};

export default PriceFilter;

