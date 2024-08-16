import React from 'react';
import { Card } from 'antd';
import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authState, handle_variables } from "../login/Redux/authSlice"; // Update with the correct path
import { useSelector, useDispatch } from "react-redux";

const SearchResults = () => {
    const navigate = useNavigate();
    const { loginModalStep1  , searchResults , seachedValue} = useSelector(authState);
    console.log(searchResults);
    

    return (
        <Container fluid>
            <h4>نتایج جستجو برای {seachedValue}</h4>
            <Row>
                {searchResults.map((house, index) => (
                    <Col key={index} md={4} className="mb-4">
                        <Card>
                            <div>{house.title}</div>
                            <img src={house.image} style={{ width: "200px", height: "200px" }} alt={house.title} />
                            <button onClick={() => navigate(`/house/${house.id}`)}>مشاهده ملک</button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SearchResults;
