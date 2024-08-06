import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_GETHOUSE_DETAILS } from "../../services/apiServices";
import { Col, Container, Row } from "react-bootstrap";
import { MapContainer ,TileLayer, Marker,Popup, useMapEvent} from 'react-leaflet'

export default function HomeDetails() { 
    const params =useParams()
    let houseId = params.id;
    console.log(houseId);
    const[detail,setDetail] = useState([])
    
    useEffect(()=>{
        let resp = API_GETHOUSE_DETAILS(houseId)
        resp.then((res) => {
            console.log("res: ",res);
            
            if (res.status === 200) {
                console.log("success");        
                console.log(res.data);  
                setDetail(res.data)
                // setHouses(res.data)      
            } else {
                console.log("false");        
            }
        })
    },[])
    console.log(detail?.latitude);


    // {
    //     "id": 1,
    //     "time": "2001-01-01",
    //     "facilities": "[1,1,1]",
    //     "direction": "",
    //     "document_type": "\u062a\u06a9\u200c\u0628\u0631\u06af",
    //     "status": "\u0628\u0627\u0632\u0633\u0627\u0632\u06cc \u0634\u062f\u0647",
    //     "latitude": 36.684268897818,
    //     "longitude": 48.474297523499,
    //     "priorities": "[1,1,1]"
    // }


    
    
    return(
        <>
        <Container className="bg-light">
            <Row className="d-flex p-5">
                <Row className="mb-4">  
                     <span>{detail.city} / {detail.category} / {detail.title}</span>
                </Row>
                <Col md={6} >
                    <h2>{detail.title}</h2>
                    <p className="caption ">اطلاعات ملک</p>
                    <Col className=" border p-4 rounded" style={{border:"#94a3b8"}}>
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <p>قیمت کل</p>
                        <p>{detail.price} تومان</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <p>قیمت هر متر</p>
                        <p>{detail.price_per_meter} تومان</p>
                    </div>
                    {/* <Row>قیمت هر متر : {detail.price_per_meter} تومان</Row> */}
                    <hr />
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <p>متراژ</p>
                        <p>{detail.meterage}</p>
                    </div>
                    {/* <Row>متراژ : {detail.meterage}</Row> */}
                    <hr />
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <p>طبقه</p>
                        <p>{detail.floor} از {detail.all_floors}</p>
                    </div>
                    {/* <Row>طبقه : {detail.floor} از {detail.all_floors}</Row> */}
                    <hr />
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <p>تعداد اتاق</p>
                        <p>{detail.rooms}</p>
                    </div>
                    {/* <Row>تعداد اتاق : {detail.rooms}</Row> */}
                    <hr />
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <p>سال ساخت</p>
                        <p>{detail.build_date}</p>
                    </div>
                    {/* <Row>سال ساخت : {detail.build_date}</Row> */}
                    
                    </Col>
                    <Row>توضیحات  : {detail.description}</Row>
                    
                </Col>
                <Col md={6}>
                    <img className="rounded" src={detail.image} alt="" style={{width:"300px", height:"300px"}} />
                </Col>
            </Row>


            {detail.latitude && detail.longitude ? (
                 <section>
                 <div className="appLayout w-100">
                 <div className="mapContainer" >
                 <MapContainer className="map" zoom={6} scrollWheelZoom={true} center={[detail?.latitude,detail?.longitude]} >
                     <TileLayer
                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                     />
                     
                         <Marker key={detail.id} position={[detail?.latitude,detail?.longitude]} > 
                             <Popup>
                                 {detail.latitude}
                             </Popup>
                         </Marker>
     
                 </MapContainer>
     
             </div>		   
             </div>
             </section>

            ): null}
           

        
        

      
        
        
        </Container>
        </>
    )
}