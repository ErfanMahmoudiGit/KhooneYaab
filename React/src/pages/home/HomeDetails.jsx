import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_GETHOUSE_DETAILS } from "../../services/apiServices";
import { Button, Col, Container, Row ,Modal } from "react-bootstrap";
import { MapContainer ,TileLayer, Marker,Popup} from 'react-leaflet'
import { GrElevator } from "react-icons/gr";
import { FaCarAlt } from "react-icons/fa";
import { LuWarehouse } from "react-icons/lu";

export default function HomeDetails() { 
    const params =useParams()
    let houseId = params.id;
    console.log(houseId);
    const[detail,setDetail] = useState([])
    const[show,setShow] = useState(false)
    
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
    // let facilities = detail?.facilities;
    let elevator = 0
    let parking = 1
    let warehouse = 1
    // console.log(elevator);
    // console.log(parking);
    // console.log(warehouse);
    


    // {
    //     "id": 1,
    //     "time": "2001-01-01",
    //     "priorities": "[1,1,1]"
    // }


    console.log(show);
    
    
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
                    <hr />
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <p>متراژ</p>
                        <p>{detail.meterage}</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <p>طبقه</p>
                        <p>{detail.floor} از {detail.all_floors}</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <p>تعداد اتاق</p>
                        <p>{detail.rooms}</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <p>سال ساخت</p>
                        <p>{detail.build_date}</p>
                    </div>                    
                    </Col>
                    <Row>توضیحات  : {detail.description}</Row>
                    
                </Col>
                <Col md={6}>
                    <Col sm={12}>
                        <img className="rounded" src={detail.image} alt="" style={{width:"300px", height:"300px"}} />
                    </Col>
                    <Col sm={12}>
                        <h3>ویژگی ها و امکانات</h3>
                        <div className="d-flex gap-5">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div><GrElevator /></div>
                            <div>آسانسور</div>
                        </div>
                      
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div><FaCarAlt /></div>
                            <div>پارکینگ</div>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div><LuWarehouse /></div>
                            <div>انباری</div>
                        </div>
                        </div>
                        
                    </Col>
                    <Col>
                    <Button onClick={()=>setShow(true)}>نمایش جزییات</Button>
                    </Col>
                    {show && (
    //                      <Modal
    //                         style={{
    //                         overlay: {
    //                             position: "fixed",
    //                             top: 0,
    //                             left: 0,
    //                             right: 0,
    //                             bottom: 0,
    //                             backgroundColor: "rgba(255, 255, 255, 0.75)",
    //                         },
    //                         content: {
    //                             position: "absolute",
    //                             top: "40px",
    //                             left: "40px",
    //                             right: "40px",
    //                             bottom: "40px",
    //                             border: "1px solid #ccc",
    //                             background: "#fff",
    //                             overflow: "auto",
    //                             WebkitOverflowScrolling: "touch",
    //                             borderRadius: "4px",
    //                             outline: "none",
    //                             padding: "20px",
                            
    //                         },
    //                         }}
    //                         className={"Auth-modal"}
    //                         show={show}
    //                         onHide={() =>
    //                         setShow(false)
    //                         }
    //                         size={"lg"}
    //                         centered
    //                     >
    //                         <Modal.Header>
    //                     <Modal.Title>
    //                         titlte
    //                     </Modal.Title>
    //                     <i
    //                         className={"fa fa-close pointer-cursor"}
    //                         // onClick={()=>dispatch(handle_variables({video:{title:"" , link:"" , open:false }}))}
    //                     />
    //                     </Modal.Header>
    //                         <Modal.Body className={"login-pill"}>
    //                             body
    //                         </Modal.Body>
    //                         <Modal.Footer>
    //      <Button onClick={()=>setShow(false)}>بستن</Button>
    //    </Modal.Footer>
    //                     </Modal> 

                   
   <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          ویژگی ها و امکانات
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="p-4">
        <h3>ویژگی ها</h3>

        {detail?.document_type ? (
            <div className="d-flex justify-content-between align-items-center pt-1">
                    <p>نوع سند</p>
                    <p>{detail.document_type}</p>
                </div>
        ): null}
        {detail?.direction ? (
            <div className="d-flex justify-content-between align-items-center pt-1">
                    <p>جهت ساختمان</p>
                    <p>{detail.direction}</p>
                </div>
        ): null}
        {detail?.status ? (
            <div className="d-flex justify-content-between align-items-center pt-1">
                    <p>وضعیت واحد</p>
                    <p>{detail.status}</p>
                </div>
        ): null}
                <h3>امکانات</h3>
                <div className="d-flex justify-content-between align-items-center pt-1">
                    <p>آسانسور</p>
                    <p>{elevator ==1 ? "دارد" : "ندارد"}</p>
                    
                </div>
                <div className="d-flex justify-content-between align-items-center pt-1">
                    <p>پارکینگ</p>
                    <p>{parking ==1 ? "دارد" : "ندارد"}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-1">
                    <p>انباری</p>
                    <p>{warehouse ==1 ? "دارد" : "ندارد"}</p>
                </div>

        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setShow(false)}>بستن</Button>
      </Modal.Footer>
    </Modal>
     )}
                   
                </Col>

            </Row>


            {detail.latitude && detail.longitude ? (
                <Col md={6}>
                     <section>
                 <div className="appLayout w-100">
                 <div className="mapContainer" >
                 <MapContainer className="map" zoom={16} scrollWheelZoom={true} center={[detail?.latitude,detail?.longitude]} >
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

                </Col>
                

            ): null}
           

        
        

      
        
        
        </Container>
        </>
    )
}