import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { RiFilterOffFill } from "react-icons/ri";
import { ImArrowUp2 } from "react-icons/im";

const NewFilters = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    min_price: '',
    max_price: '',
    min_meterage: '',
    max_meterage: '',
    room_count: '',
  });

 
  const handleFilterSearch = (e) => {
    e.preventDefault();
    onSearch(filters); // Pass filters to parent component search function
  };
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showMeterageFilter, setShowMeterageFilter] = useState(false);
  const [showRoomFilter, setShowRoomFilter] = useState(false);
  console.log(showPriceFilter);
  

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShowPriceFilter = () => {
    setShowPriceFilter((prevShowPriceFilter) => !prevShowPriceFilter);
  };
  const toggleShowMeterageFilter = () => {
    setShowMeterageFilter((prevShowMeterageFilter) => !prevShowMeterageFilter);
  };
  const toggleShowRoomFilter = () => {
    setShowRoomFilter((prevShowRoomFilter) => !prevShowRoomFilter);
  };
  return (
    <div className="d-none d-lg-flex flex-column bg-light p-3 rounded w-full">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="h5 text-muted">فیلتر ها</p>
        <Button variant="danger" onClick={() => setFilters({ min_price: '', max_price: '', min_meterage: '', max_meterage: '', room_count: '' })}>
          حذف فیلتر ها 
        </Button>
      </div>

      <Form onSubmit={handleFilterSearch}>
        {/* Price Filter */}
        <div className="bg-white border rounded-2 mb-3">
          <div className="d-flex justify-content-between align-items-center p-2 cursor-pointer" onClick={toggleShowPriceFilter}>
            <p className={`m-0 ${showPriceFilter ? "text-primary fw-bold" : "text-dark"}`}>قیمت</p>
            <ImArrowUp2 className={`${showPriceFilter ? "rotate-180" : ""}`} />
          </div>
          {/* Toggle visibility of the price filter section */}
          <div className={`px-3 pb-3 ${showPriceFilter ? "d-block" : "d-none"}`}>
            <Form.Group className="mb-2">
              <Form.Control
                type="number"
                name="min_price"
                value={filters.min_price}
                onChange={handleChange}
                placeholder="حداقل قیمت"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                name="max_price"
                value={filters.max_price}
                onChange={handleChange}
                placeholder="حداکثر قیمت"
              />
            </Form.Group>
          </div>
        </div>
        {/* meterage filters */}
        <div className="bg-white border rounded-2 mb-3">
          <div className="d-flex justify-content-between align-items-center p-2 cursor-pointer" onClick={toggleShowMeterageFilter}>
            <p className={`m-0 ${showMeterageFilter ? "text-primary fw-bold" : "text-dark"}`}>متراژ</p>
            <ImArrowUp2 className={`${showMeterageFilter ? "rotate-180" : ""}`} />
          </div>
          {/* Toggle visibility of the price filter section */}
          <div className={`px-3 pb-3 ${showMeterageFilter ? "d-block" : "d-none"}`}>
          <div className="px-3 pb-3 d-block">

            <Form.Group className="mb-2">
              <Form.Control
                type="number"
                name="min_meterage"
                value={filters.min_meterage}
                onChange={handleChange}
                placeholder="حداقل متراژ"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                name="max_meterage"
                value={filters.max_meterage}
                onChange={handleChange}
                placeholder="حداکثر متراژ"
              />
            </Form.Group>
          </div>
        </div>
        </div>

        <div className="bg-white border rounded-2 mb-3">
          <div className="d-flex justify-content-between align-items-center p-2 cursor-pointer" onClick={toggleShowRoomFilter}>
            <p className={`m-0 ${showRoomFilter ? "text-primary fw-bold" : "text-dark"}`}>تعداد اتاق</p>
            <ImArrowUp2 className={`${showRoomFilter ? "rotate-180" : ""}`} />
          </div>
          {/* Toggle visibility of the price filter section */}
          <div className={`px-3 pb-3 ${showRoomFilter ? "d-block" : "d-none"}`}>
            <Form.Group className="mb-2">
              <Form.Control
                type="number"
                name="room_count"
                value={filters.room_count}
                onChange={handleChange}
                placeholder="تعداد اتاق"
              />
            </Form.Group>
           
          </div>
        </div>

        {/* Other filters like Meterage, Room Count, etc., would go here */}

        <Button type="submit" className="smsButton">
            جستجو
        </Button>
      </Form>
    </div>
  );

//   return (
//     <div className="d-none d-lg-flex flex-column bg-light p-3 rounded w-full">
//   <div className="d-flex justify-content-between align-items-center mb-3">
//     <p className="h5 text-muted">فیلتر ها</p>
//     <Button className='d-flex align-items-center' variant="danger" onClick={() => setFilters({ min_price: '', max_price: '', min_meterage: '', max_meterage: '', room_count: '' })}>
//       حذف فیلتر ها <RiFilterOffFill />
//     </Button>
//   </div>

//   <Form onSubmit={handleFilterSearch}>
//     {/* Price Filter */}
//     <div className="bg-white border rounded-2 mb-3">
//       <div className="d-flex justify-content-between align-items-center p-2 cursor-pointer">
//         <p className="m-0 text-dark">قیمت</p>
//       </div>
//       <div className="px-3 pb-3 d-block">
//         <Form.Group className="mb-2">
//           <Form.Label>Min Price</Form.Label>
//           <Form.Control
//             type="number"
//             name="min_price"
//             value={filters.min_price}
//             onChange={handleChange}
//             placeholder="حداقل قیمت"
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Max Price</Form.Label>
//           <Form.Control
//             type="number"
//             name="max_price"
//             value={filters.max_price}
//             onChange={handleChange}
//             placeholder="حداکثر قیمت"
//           />
//         </Form.Group>
//       </div>
//     </div>

//     {/* Meterage Filter */}
//     <div className="bg-white border rounded-2 mb-3">
//       <div className="d-flex justify-content-between align-items-center p-2 cursor-pointer">
//         <p className="m-0 text-dark">متراژ</p>
//       </div>
//       <div className="px-3 pb-3 d-block">
//         <Form.Group className="mb-2">
//           <Form.Label>Min Meterage</Form.Label>
//           <Form.Control
//             type="number"
//             name="min_meterage"
//             value={filters.min_meterage}
//             onChange={handleChange}
//             placeholder="حداقل متراژ"
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Max Meterage</Form.Label>
//           <Form.Control
//             type="number"
//             name="max_meterage"
//             value={filters.max_meterage}
//             onChange={handleChange}
//             placeholder="حداکثر متراژ"
//           />
//         </Form.Group>
//       </div>
//     </div>

//     {/* Room Count Filter */}
//     <Form.Group className="mb-3">
//       <Form.Label>Room Count</Form.Label>
//       <Form.Control
//         type="number"
//         name="room_count"
//         value={filters.room_count}
//         onChange={handleChange}
//         placeholder="Room Count"
//       />
//     </Form.Group>

//     <Button variant="primary" type="submit">
//       Apply Filters
//     </Button>
//   </Form>
// </div>

//     // <div style={{ padding: '20px' }}>
//     //   <Form onSubmit={handleFilterSearch}>
//     //     <Form.Group className="mb-3">
//     //       <Form.Label>Min Price</Form.Label>
//     //       <Form.Control
//     //         type="number"
//     //         name="min_price"
//     //         value={filters.min_price}
//     //         onChange={handleChange}
//     //         placeholder="Min Price"
//     //       />
//     //     </Form.Group>
//     //     <Form.Group className="mb-3">
//     //       <Form.Label>Max Price</Form.Label>
//     //       <Form.Control
//     //         type="number"
//     //         name="max_price"
//     //         value={filters.max_price}
//     //         onChange={handleChange}
//     //         placeholder="Max Price"
//     //       />
//     //     </Form.Group>
//     //     <Form.Group className="mb-3">
//     //       <Form.Label>Min Meterage</Form.Label>
//     //       <Form.Control
//     //         type="number"
//     //         name="min_meterage"
//     //         value={filters.min_meterage}
//     //         onChange={handleChange}
//     //         placeholder="Min Meterage"
//     //       />
//     //     </Form.Group>
//     //     <Form.Group className="mb-3">
//     //       <Form.Label>Max Meterage</Form.Label>
//     //       <Form.Control
//     //         type="number"
//     //         name="max_meterage"
//     //         value={filters.max_meterage}
//     //         onChange={handleChange}
//     //         placeholder="Max Meterage"
//     //       />
//     //     </Form.Group>
//     //     <Form.Group className="mb-3">
//     //       <Form.Label>Room Count</Form.Label>
//     //       <Form.Control
//     //         type="number"
//     //         name="room_count"
//     //         value={filters.room_count}
//     //         onChange={handleChange}
//     //         placeholder="Room Count"
//     //       />
//     //     </Form.Group>
//     //     <Button variant="primary" type="submit">
//     //       Apply Filters
//     //     </Button>
//     //   </Form>
//     // </div>
//   );
};

export default NewFilters;
