import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { RiFilterOffFill } from "react-icons/ri";
import { ImArrowUp2 } from "react-icons/im";
import { useSelector } from 'react-redux';
import { authState } from '../login/Redux/authSlice'; 

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

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle key press event
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilterSearch(e); // Trigger search on Enter key
    }
  };

  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showMeterageFilter, setShowMeterageFilter] = useState(false);
  const [showRoomFilter, setShowRoomFilter] = useState(false);
  const { loginModalStep1  , searchResults , seachedValue} = useSelector(authState);

  console.log("searchResults:",searchResults);
  

  return (
    <div className="d-none d-lg-flex flex-column p-3 rounded w-full">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* <h5>فیلتر ها</h5> */}
        <Button className="filterBtn d-flex align-items-center gap-2" 
        onClick={() => {
          let filters ={ min_price: '', max_price: '', min_meterage: '', max_meterage: '', room_count: '' }
          setFilters(filters)
          onSearch(filters)
        }}>
          حذف فیلتر ها <RiFilterOffFill />
        </Button>
      </div>

      <Form onSubmit={handleFilterSearch}>
        {/* Price Filter */}
        <div className="bg-white border rounded-2 mb-3">
          <div className="d-flex justify-content-between align-items-center p-2 cursor-pointer" onClick={() => setShowPriceFilter(!showPriceFilter)}>
            <p className={`m-0 ${showPriceFilter ? "filter-color fw-bold" : "text-dark"}`}>قیمت</p>
            <ImArrowUp2 className={`${showPriceFilter ? "rotate-180 filter-color" : ""}`} />
          </div>
          <div className={`px-3 pb-3 ${showPriceFilter ? "d-block" : "d-none"}`}>
            <Form.Group className="mb-2">
              <Form.Control
                type="number"
                name="min_price"
                value={filters.min_price}
                onChange={handleChange}
                onKeyPress={handleKeyPress} // Call onKeyPress for each input
                placeholder="حداقل قیمت"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                name="max_price"
                value={filters.max_price}
                onChange={handleChange}
                onKeyPress={handleKeyPress} // Call onKeyPress for each input
                placeholder="حداکثر قیمت"
              />
            </Form.Group>
          </div>
        </div>

        {/* Meterage Filters */}
        <div className="bg-white border rounded-2 mb-3">
          <div className="d-flex justify-content-between align-items-center p-2 cursor-pointer" onClick={() => setShowMeterageFilter(!showMeterageFilter)}>
            <p className={`m-0 ${showMeterageFilter ? "filter-color fw-bold" : "text-dark"}`}>متراژ</p>
            <ImArrowUp2 className={`${showMeterageFilter ? "rotate-180 filter-color" : ""}`} />
          </div>
          <div className={`px-3 pb-3 ${showMeterageFilter ? "d-block" : "d-none"}`}>
            <Form.Group className="mb-2">
              <Form.Control
                type="number"
                name="min_meterage"
                value={filters.min_meterage}
                onChange={handleChange}
                onKeyPress={handleKeyPress} // Call onKeyPress for each input
                placeholder="حداقل متراژ"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                name="max_meterage"
                value={filters.max_meterage}
                onChange={handleChange}
                onKeyPress={handleKeyPress} // Call onKeyPress for each input
                placeholder="حداکثر متراژ"
              />
            </Form.Group>
          </div>
        </div>

        {/* Room Count Filter */}
        <div className="bg-white border rounded-2 mb-3">
          <div className="d-flex justify-content-between align-items-center p-2 cursor-pointer" onClick={() => setShowRoomFilter(!showRoomFilter)}>
            <p className={`m-0 ${showRoomFilter ? "filter-color fw-bold" : "text-dark"}`}>تعداد اتاق</p>
            <ImArrowUp2 className={`${showRoomFilter ? "rotate-180 filter-color" : ""}`} />
          </div>
          <div className={`px-3 pb-3 ${showRoomFilter ? "d-block" : "d-none"}`}>
            <Form.Group className="mb-2">
              <Form.Control
                type="number"
                name="room_count"
                value={filters.room_count}
                onChange={handleChange}
                onKeyPress={handleKeyPress} // Call onKeyPress for each input
                placeholder="تعداد اتاق"
              />
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default NewFilters;

