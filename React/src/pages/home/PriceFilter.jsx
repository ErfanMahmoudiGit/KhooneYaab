//  import React, { useState } from 'react';
//  import Range  from 'rc-slider'; // You can install rc-slider for better UI
//  import 'rc-slider/assets/index.css'; // Import default styles

//  const PriceFilter = ({ value, onChange }) => {
//      const [priceRange, setPriceRange] = useState(value || [0, 100000000000]); // Default price range

//      const handleSliderChange = (range) => {
//          setPriceRange(range);
//      };

//      const handleApplyFilter = () => {
//          onChange(priceRange); // Notify parent component with the new range
//      };

//      return (
//          <div className="price-filter-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
//              <h5>Filter by Price</h5>
//              <Range
//                  min={0}
//                  max={10000000}
//                  value={priceRange}
//                  onChange={handleSliderChange}
//                  allowCross={false}
//                  railStyle={{ backgroundColor: '#ddd' }}
//                  trackStyle={[{ backgroundColor: '#3b82f6' }, { backgroundColor: '#3b82f6' }]}
//                  handleStyle={[{ borderColor: '#3b82f6' }, { borderColor: '#3b82f6' }]}
//              />
//              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
//                  <span>0 تومان</span>
//                  <span>{priceRange[1]} تومان</span>
//              </div>
//              <button onClick={handleApplyFilter} className="apply-filter-button" style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
//                  Apply
//              </button>
//          </div>
//      );
//  };

//  export default PriceFilter;


// import React, { useEffect, useState } from 'react';
// import Slider from 'rc-slider'; // Import the default Slider component
// import 'rc-slider/assets/index.css'; // Import default styles

// const { Range } = Slider; // Destructure Range from the default Slider

// const PriceFilter = ({ value, onChange }) => {
//     // Initialize state with value from props, ensuring it's correctly set up
//     const [priceRange, setPriceRange] = useState(value || [0, 10000000]);

//     // Synchronize internal state with props changes
//     useEffect(() => {
//         setPriceRange(value);
//     }, [value]);

//     // Handle slider change and immediately notify parent
//     const handleSliderChange = (range) => {
//         setPriceRange(range);
//         onChange(range); // Update parent component with new range
//     };

//     return (
//         <div className="price-filter-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
//             <h5>Filter by Price</h5>
//             <Range
//                 min={0}
//                 max={10000000}
//                 value={priceRange}
//                 onChange={handleSliderChange}
//                 allowCross={false}
//                 railStyle={{ backgroundColor: '#ddd' }}
//                 trackStyle={[{ backgroundColor: '#3b82f6' }, { backgroundColor: '#3b82f6' }]}
//                 handleStyle={[{ borderColor: '#3b82f6' }, { borderColor: '#3b82f6' }]}
//             />
//             <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
//                 <span>0 تومان</span>
//                 <span>{priceRange[1]} تومان</span>
//             </div>
//         </div>
//     );
// };

// export default PriceFilter;
// import React, { useEffect, useState } from 'react';
// import Slider from 'rc-slider'; // Import the default Slider component
// import 'rc-slider/assets/index.css'; // Import default styles

// const { Range } = Slider; // Destructure Range from the default Slider

// const PriceFilter = ({ value, onChange }) => {
//     const [priceRange, setPriceRange] = useState(value || [0, 10000000]);

//     // Update the local state when the prop changes
//     useEffect(() => {
//         setPriceRange(value);
//     }, [value]);

//     const handleSliderChange = (range) => {
//         setPriceRange(range);
//         onChange(range); // Notify parent component of the change
//     };

//     return (
//         <div className="price-filter-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
//             <h5>Filter by Price</h5>
//             <Range
//                 min={0}
//                 max={10000000}
//                 value={priceRange}
//                 onChange={handleSliderChange}
//                 allowCross={false}
//                 railStyle={{ backgroundColor: '#ddd' }}
//                 trackStyle={[{ backgroundColor: '#3b82f6' }, { backgroundColor: '#3b82f6' }]}
//                 handleStyle={[{ borderColor: '#3b82f6' }, { borderColor: '#3b82f6' }]}
//             />
//             <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
//                 <span>0 تومان</span>
//                 <span>{priceRange[1]} تومان</span>
//             </div>
//         </div>
//     );
// };

// export default PriceFilter;

import React, { useEffect, useState } from 'react';
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

