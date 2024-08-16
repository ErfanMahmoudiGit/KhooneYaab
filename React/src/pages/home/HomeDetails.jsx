import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_GETHOUSE_DETAILS } from "../../services/apiServices";
import { Button, Col, Container, Row ,Modal } from "react-bootstrap";
import { MapContainer ,TileLayer, Marker,Popup} from 'react-leaflet'
import { GrElevator } from "react-icons/gr";
import { FaCarAlt } from "react-icons/fa";
import { LuWarehouse } from "react-icons/lu";
import { Tabs, Tab, Box } from '@mui/material';
import React from 'react';
import { FaSchool, FaHospital , FaTree } from 'react-icons/fa';

export default function HomeDetails() { 
    const params =useParams()
    let houseId = params.id;
    console.log(houseId);
    const[detail,setDetail] = useState([])
    const[show,setShow] = useState(false)

    
    useEffect(()=>{
        const fetchHouseDetails = async () => {
            try {
                let res = await API_GETHOUSE_DETAILS(houseId);
                console.log("res: ", res);
                
                if (res.status === 200) {
                    console.log("success");
                    console.log(res.data);
                    await setDetail(res.data);
                    // setHouses(res.data)      
                } else {
                    console.log("false");
                }
            } catch (error) {
                console.error("Error fetching house details:", error);
            }
        };

        fetchHouseDetails();
        // let resp = API_GETHOUSE_DETAILS(houseId)
        // resp.then((res) => {
        //     console.log("res: ",res);
            
        //     if (res.status === 200) {
        //         console.log("success");        
        //         console.log(res.data);  
        //          setDetail(res.data)
        //         // setHouses(res.data)      
        //     } else {
        //         console.log("false");        
        //     }
        // })
    },[])
    // let facilities = detail?.facilities;
    let elevator = 0
    let parking = 1
    let warehouse = 1

    // {
    //     "id": 1,
    //     "time": "2001-01-01",
    // }

    const prioritiesString = detail?.priorities;
    let prioritiesArray = [];
    if (prioritiesString) {
        try {
            prioritiesArray = JSON.parse(prioritiesString);
        } catch (error) {
            console.error("Error parsing priorities:", error);
        }
    }
    const school = prioritiesArray[0];
    const hospital = prioritiesArray[1];
    const park = prioritiesArray[2];

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    console.log(show);
    
    return(
        <>
        <Container className="bg-light">
            <Row className="d-flex p-5">
                <Row className="mb-4">  
                    <span>{detail.city} / {detail.category} / {detail.title}</span>
                </Row>
                <Col lg={6} >
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
                    
                </Col>
                <Col lg={6}>
                    <Col sm={12} className="d-flex flex-column align-items-center mb-2">
                        <h3>ویژگی ها و امکانات</h3>
                        <div className="d-flex gap-5">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div><GrElevator className={elevator == 1 ? "" : "text-secondary"}/></div>
                            <div className={elevator == 1 ? "" : "text-secondary"}>آسانسور</div>
                        </div>
                      
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div><FaCarAlt className={parking == 1 ? "" : "text-secondary"}/></div>
                            <div className={parking == 1 ? "" : "text-secondary"}>پارکینگ</div>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div><LuWarehouse className={warehouse == 1 ? "" : "text-secondary"}/></div>
                            <div className={warehouse == 1 ? "" : "text-secondary"}>انباری</div>
                        </div>
                        </div>
                        
                    </Col>
                    <Col sm={12} className="d-flex flex-column align-items-center mb-2">
                        <img className="rounded" src={detail.image} alt="" style={{width:"500px", height:"400px"}} />
                    </Col>
                    <Button onClick={()=>setShow(true)} className="mt-3">نمایش جزییات</Button>
                    <Col>
                    </Col>
                    {show && (
         
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
            <Row className="d-flex pe-5 ps-5">
            <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab  label="توضیحات"/>
        <Tab label="موقعیت مکانی" />
        <Tab label="زنگ خطرهای قبل از معامله"/>
      </Tabs>
      <TabPanel value={value} index={0}>
      {detail?.description?.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ))}
      </TabPanel>
      <TabPanel value={value} index={1} >
        <div className={"d-flex align-items-center gap-4"}>
        نزدیک به : {school == 1 && <span><FaSchool /> مدرسه</span>} {hospital == 1 && <span><FaHospital /> بیمارستان</span>}{park == 1 && <span><FaTree /> پارک</span>} 

        </div>
      {detail.latitude && detail.longitude ? (
                
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

                

            ): null}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h3>روش‌های رایج کلاهبرداری در املاک</h3>
        <p>- دریافت بیعانه</p>
        <p>- دریافت پول به بهانهٔ ارسال عکس و بازدید </p>
        <p>- اجاره یا فروش همزمان ملک به چند نفر</p>
        <p>- اجاره یا فروش ملک با سند یا شرایط مشکل‌دار</p>
        <h4>در این موارد به شدت احتیاط کنید</h4>
        <p>آگهی‌گذار درخواست بیعانه دارد</p>
        <p>قیمت ملک پایین و وسوسه‌کننده‌ است</p>
        <p>آگهی‌گذار به جای چت دیوار، مکالمه در خارج دیوار را پیشنهاد می‌کند</p>
        <p>وضعیت سند مشخص نیست</p>

      </TabPanel>
    </Box>

            </Row>
           

        
        </Container>
        
        </>
    )
}
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  };