import { Col, Container, Row } from "react-bootstrap";
import ReportCard from "./ReportCard";
import { FaUserLarge } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { PiEyeFill } from "react-icons/pi";
import { BsFillHousesFill } from "react-icons/bs";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GiLadder } from "react-icons/gi";


export default function DefaultDashboard(){
    return(
        <Container className='mt-5'>
            <Row className='d-flex '>
            <Col md={4}>
            <ReportCard text="پربازدید ترین ها" icon={<PiEyeFill size={80} className='p-2 text-danger'/>}/>

            </Col>
            <Col md={4}>
            <ReportCard text="آگهی های نردبان شده" icon={<GiLadder size={80} className='p-2 text-danger' />}/>

            </Col>
            
            <Col md={4}>
            <ReportCard text="دسته بندی ها"  icon={<BiSolidCategoryAlt size={80} className='p-2 text-danger'/>}/>

            </Col>
            </Row>
            <Row className="mt-4">
            
            <Col md={4}>
            <ReportCard text="تعداد کاربران" count="6" icon={<FaUserLarge size={80} className='p-2 text-danger'/>}/>

            </Col>
            <Col md={4}>
            <ReportCard text="تعداد آگهی های ثبت شده" count="1212" icon={<BsFillHousesFill size={80} className='p-2 text-danger'/>}/>

            </Col>
            <Col md={4}>
            <ReportCard text="تعداد استان ها" count="31" icon={<FaCity size={80} className='p-2 text-danger'/>}/>

            </Col>
            </Row>
            </Container>
           

    )
}