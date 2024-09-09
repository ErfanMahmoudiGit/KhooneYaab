import { Col, Container, Row } from 'react-bootstrap';
import ReportCard from './ReportCard';

export default function AdminViews(){
    return(
        <Container className='mt-5'>
            <Row className='d-flex '>
            <Col md={4}>
            <ReportCard text="پربازدید ترین ها"/>

            </Col>
            <Col md={4}>
            <ReportCard text="نردبان شده ها"/>

            </Col>
            <Col md={4}>
            <ReportCard text="پربازدید ترین ها"/>

            </Col>
            </Row>
            </Container>
           

    )
}