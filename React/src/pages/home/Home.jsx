import { Card } from "antd";
import { API_GETHOUSE , API_RECOMMENDER } from "../../services/apiServices";
import NavScrollExample from "./NavScrollExample";
import { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import HomeMap from "./HomeMap";
import CustomNavlink from "../../ui/CustomNavlink";
import { BeatLoader } from "react-spinners";

export default function Home() { 
    const [houses, setHouses] = useState([])
    const navigate = useNavigate()
    const[loading,setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        let resp = API_GETHOUSE()
        resp.then((res) => {
            if (res.status === 200) {
                console.log("success");        
                console.log(res.data);  
                setHouses(res.data)   
                setIsLoading(false)
   
            } else {
                console.log("false"); 
                setIsLoading(false)
       
            }
        })
    }, [])


    return (
        <>

        {loading ?         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <BeatLoader style={{display:"flex",justifyContent:"center"}}/>
            </div>
        : (
            <>
            <HomeMap houses={houses} />
            <Container fluid>
                <h4>آگهی های اخیر</h4>
                <Row>
                    {houses.slice(-15).map((house, index) => (
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
            </>
        )}
            
            {/* <NavScrollExample />
            <div className="fixed-sidebar">
                <div className="sidebar-cont">

                
                <h4 >دسته ها</h4>
                <ul>
                    <li><NavLink to={`/category="فروش آپارتمان"`}>فروش آپارتمان</NavLink></li>
                    <li><NavLink to={`/category="فروش خانه و ویلا"`}>فروش خانه و ویلا</NavLink></li>
                    <li><NavLink to={`/category="اجاره آپارتمان"`}>اجاره آپارتمان</NavLink></li>
                    <li><NavLink to={`/category="اجاره خانه و ویلا"`}>اجاره خانه و ویلا</NavLink></li>
                    <li><NavLink to={"/garden"}>فروش باغ</NavLink></li>

                    <CustomNavlink to={"/a"} children={"فروش"}/>
                    <CustomNavlink to={"/"} children={"hhh"}/> 
                    
                </ul>
                </div>
            </div>
            <div className="main-content">
                <HomeMap houses={houses}/>
                <Container fluid>
                    <h4>آگهی های اخیر</h4>
                    <Row>
                        {houses.slice(-15).map((house, index) => (
                            <Col key={index} md={4} className="mb-4">
                                <Card>
                                    <div>{house.title}</div>
                                    <img src={house.image} style={{width: "200px", height: "200px"}} />
                                    <button onClick={()=> navigate(`/house/${house.id}`)}>مشاهده ملک</button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div> */}
        </>
    )
}
