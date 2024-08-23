import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function TestFilter(){
    const [filters, setFilters] = useState({
        min_price: '',
        max_price: '',
        min_meterage: '',
        max_meterage: '',
        room_count: '',
      });
    
      const handleChange = (e) => {
        setFilters({
          ...filters,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleFilterSearch = (e) => {
        e.preventDefault();
        onSearch(filters); // Pass filters to parent component search function
      };
      return (
        <div className="d-none d-lg-flex flex-column bg-light p-3 rounded">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="h5 text-muted">فیلتر ها</p>
                <button
                    onClick={() => setSearchParams({})}
                    className={`btn btn-sm ${searchParams.toString().length === 0 ? "btn-secondary" : "btn-danger"}`}
                >
                    حذف فیلتر ها <RiFilterOffFill />
                </button>
            </div>

            {/* Meterage Filter */}
            <div className="bg-white w-100 border rounded-2  mb-3">
                <div
                    className="d-flex justify-content-between align-items-center p-2 cursor-pointer "
                    onClick={() => toggleShowFilterOptionHandler("meterage")}
                >
                    <p className={`m-0 ${showFilters.meterage ? "text-primary fw-bold" : "text-dark"}`}>
                        متراژ
                    </p>
                    <ImArrowUp2 className={`${showFilters.meterage ? "rotate-180" : ""}`} />
                </div>

                <div className={`px-3 pb-3 ${showFilters.meterage ? "d-block" : "d-none"}`}>
                    <div className="mb-2">
                        <label className="form-label">از:</label>
                        <input
                            type="number"
                            name="meterage_min"
                            placeholder="حداقل متراژ"
                            onChange={(e) => handleRangeChange(e, "meterage")}
                            className="form-control"
                            value={searchParams.get("meterage_min") || ""}
                        />
                    </div>
                    <div>
                        <label className="form-label">تا:</label>
                        <input
                            type="number"
                            name="meterage_max"
                            placeholder="حداکثر متراژ"
                            onChange={(e) => handleRangeChange(e, "meterage")}
                            className="form-control"
                            value={searchParams.get("meterage_max") || ""}
                        />
                    </div>
                </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white border rounded-2 mb-3">
                <div
                    className="d-flex justify-content-between align-items-center p-2 cursor-pointer"
                    onClick={() => toggleShowFilterOptionHandler("price")}
                >
                    <p className={`m-0 ${showFilters.price ? "text-primary fw-bold" : "text-dark"}`}>
                        قیمت
                    </p>
                    <ImArrowUp2 className={`${showFilters.price ? "rotate-180" : ""}`} />
                </div>

                <div className={`px-3 pb-3 ${showFilters.price ? "d-block" : "d-none"}`}>
                    <div className="mb-2">
                        <label className="form-label">از:</label>
                        <input
                            type="number"
                            name="price_min"
                            placeholder="حداقل قیمت"
                            onChange={(e) => handleRangeChange(e, "price")}
                            className="form-control"
                            value={searchParams.get("price_min") || ""}
                        />
                    </div>
                    <div>
                        <label className="form-label">تا:</label>
                        <input
                            type="number"
                            name="price_max"
                            placeholder="حداکثر قیمت"
                            onChange={(e) => handleRangeChange(e, "price")}
                            className="form-control"
                            value={searchParams.get("price_max") || ""}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}