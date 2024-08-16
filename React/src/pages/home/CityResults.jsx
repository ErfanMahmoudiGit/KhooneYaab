import { authState, handle_variables } from "../login/Redux/authSlice"; // Update with the correct path
import { useSelector, useDispatch } from "react-redux";
import { Card } from 'antd';
import { Col, Row, Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function CityResults(){
    const { cityResults , selectedCity } = useSelector(authState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    return (
        <Container fluid>
            <h4>آگهی های استان {selectedCity}</h4>
            <Button onClick={()=> navigate('/')}>رفتن به صفحه اصلی</Button>
            <Row>
                {cityResults.map((house, index) => (
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
}