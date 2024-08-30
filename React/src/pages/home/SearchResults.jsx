import React from 'react';
import { Card } from 'antd';
import { Col, Row, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authState, handle_variables } from "../login/Redux/authSlice"; // Update with the correct path
import { useSelector, useDispatch } from "react-redux";
import { FaChevronLeft, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";

const SearchResults = () => {
    const navigate = useNavigate();
    const [loading, setIsLoading] = useState(false);

    const { loginModalStep1  , searchResults , seachedValue} = useSelector(authState);
    // console.log(searchResults);
    
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    

    return (
        <Container fluid>
            <div className="d-flex flex-row justify-content-between m-3">
            <h4>نتایج جستجو برای {seachedValue}</h4>
                <Button className="back-btn" onClick={()=> navigate('/')}>رفتن به صفحه اصلی</Button>
            </div>

         
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <BeatLoader />
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                    {searchResults.length == 0 ? (
                        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' , marginTop:"20px"}}>
                              هیچ آگهی نشان شده ای وجود ندارد
                        </div>
                    ):(
                        searchResults.map((house, index) => (
                            <div key={index} className="d-flex flex-column justify-contemt-center align-items-center" style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{house.title}</h3>
                                <img style={{width:"150px" , height:"150px" , borderRadius: '8px'}} src={house.image ? house.image : '/1.png'}></img>
                                <div style={{ fontSize: '14px', color: '#666' }}>آگهی در {house.city}</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>املاک <FaChevronLeft size={12} /> {house.category}</div>


                                <p style={{ fontSize: '14px', color: '#666' }}>{formatNumber(house.price)} تومان</p>
                                <button onClick={() => navigate(`/house/${house.id}`)} className="smsButton"> مشاهده ملک</button>
                            </div>
                        ))
                    )}
                </div>
            )}
            {/* <h4>نتایج جستجو برای {seachedValue}</h4>
            <Row>
                {searchResults.map((house, index) => (
               

                    <Col key={index} md={4} className=" mb-4">
                        <Card className="d-flex flex-column justify-content-center align-items-center">
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{house.title}</h3>
                            <img style={{width:"150px" , height:"150px" , borderRadius: '8px'}} src={house.image ? house.image : '/1.png'}></img>                            
                           <div style={{ fontSize: '14px', color: '#666' }}>آگهی در {house.city}</div>
                               <div style={{ fontSize: '14px', color: '#666' }}>املاک <FaChevronLeft size={12} /> {house.category}</div>


                        <p style={{ fontSize: '14px', color: '#666' }}>{formatNumber(house.price)} تومان</p>
                                <button onClick={() => navigate(`/house/${house.id}`)} className="smsButton"> مشاهده ملک</button>
                        </Card>
                    </Col>
                ))}
            </Row> */}
        </Container>
    );
};

export default SearchResults;
