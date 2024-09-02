import { Button, Col, Container, Row } from "react-bootstrap"
import { MdApartment } from "react-icons/md";
import { FcHome } from "react-icons/fc";

import {useNavigate } from 'react-router-dom';

export default function SelectSellCategory(){
    const navigate = useNavigate()
    return(
        <>
        <Container className="p-4">
            {/* <Row style={{direction : "ltr"}}>
                <Button className="backprimaryButton" onClick={()=> navigate('/')}>بازگشت به صفحه اصلی</Button>

            </Row> */}
            <div className="d-flex flex-row justify-content-between m-3 align-items-center">
                <h6>دسته بندی مورد نظر خود را انتخاب کنید</h6>
                <Button className="backprimaryButton" onClick={()=> navigate('/')}>بازگشت به صفحه اصلی</Button>
            </div>
       
            <div className='g-5 d-flex justify-content-center align-items-center' style={{marginTop:"80px"}}>
                <Col xs="12" md="3" className=" m-4">
                    <div  className="d-flex flex-column justify-content-center align-items-center card-bookmark"
                        style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', height:"200px",backgroundColor:"#ffffff",
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)"}}
                        onClick={()=>{navigate('/category/BuyHome')}}
                        >
                            <div className='iconBox rounded-4 bg-green hv-center'>
                            <FcHome size={80} className='p-2 text-white' />
                        </div>
                        <span className='ps-4 fw-bold'>فروش خانه و ویلا</span>
                        </div>
                </Col>
                <Col xs="12" md="3" className="m-4">
                    <div  className="d-flex flex-column justify-content-center align-items-center card-bookmark"
                        style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', height:"200px",backgroundColor:"#ffffff",
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)" }}
                        onClick={()=>{navigate('/category/BuyApartment')}}
                        >
                            <div className='iconBox rounded-4 bg-green hv-center'>
                            <MdApartment size={80} className='p-2 text-danger' />
                        </div>
                        <span className='ps-4 fw-bold '>فروش آپارتمان</span>
                    </div>
                </Col>
        </div>
        </Container>
               
    </>
    )
}