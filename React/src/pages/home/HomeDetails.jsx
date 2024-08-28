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
import { FaChevronLeft } from 'react-icons/fa';
import { BeatLoader } from "react-spinners";

export default function HomeDetails() { 
    const params =useParams()
    let houseId = params.id;
    console.log(houseId);
    const[detail,setDetail] = useState([])
    const[show,setShow] = useState(false)
    const [loading, setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true)
        const fetchHouseDetails = async () => {
            try {
                let res = await API_GETHOUSE_DETAILS(houseId);
                console.log("res: ", res);
                
                if (res.status === 200) {
                    console.log("success");
                    console.log(res.data);
                    await setDetail(res.data);
                    setIsLoading(false)
                } else {
                    console.log("false");
                    setIsLoading(false)
                }
            } catch (error) {
                console.error("Error fetching house details:", error);
                setIsLoading(false)
            }
        };

        fetchHouseDetails();
    },[])

    // {
    //     "id": 1,
    //     "time": "2001-01-01",
    // }

  
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    console.log(show);
    
    return(
        <>
         {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <BeatLoader />
                </div>
            ) : (
                <Container className="bg-light">
                <Row className="d-flex p-5">
                    <Row className="mb-4">  
                        <span>{detail.city} <FaChevronLeft /> {detail.category} <FaChevronLeft /> {detail.title}</span>
                    </Row>
                    <Row className=" d-flex justiy-content-between">
                        <Col xs={12} md={6} className="d-flex flex-column  mb-2">
                            <h2>{detail.title}</h2>
                        </Col>
                        <Col xs={12} md={6} className="d-flex flex-column align-items-center mb-2">
                            <h3>ویژگی ها و امکانات</h3>
                            <div className="d-flex gap-5">
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <div><GrElevator className={detail?.elevator == 1 ? "" : "text-secondary"}/></div>
                                    <div className={detail?.elevator == 1 ? "" : "text-secondary"}>آسانسور</div>
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <div><FaCarAlt className={detail?.parking == 1 ? "" : "text-secondary"}/></div>
                                    <div className={detail?.parking == 1 ? "" : "text-secondary"}>پارکینگ</div>
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <div><LuWarehouse className={detail?.warehouse == 1 ? "" : "text-secondary"}/></div>
                                    <div className={detail?.warehouse == 1 ? "" : "text-secondary"}>انباری</div>
                                </div>
                            </div>                      
                        </Col>
                    </Row>
                    <Row >
                        <p className="caption ">اطلاعات ملک</p>
                    </Row>
                    <Row>
                    <Col lg={6}>
                        <Col className=" border p-4 rounded" style={{border:"#94a3b8"}}>
                        <div className="d-flex justify-content-between align-items-center pt-1">
                            {detail.category == "فروش آپارتمان" || detail.category == "فروش خانه و ویلا" ? (
                                <p>قیمت کل</p>
                            ):(
                                <p>ودیعه</p>
                            )}
                            <p>{detail.price} تومان</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center pt-1">
                            {detail.category == "فروش آپارتمان" || detail.category == "فروش خانه و ویلا" ? (
                                <p>قیمت هر متر</p>
                            ):(
                                <p>کرایه</p>
                            )}
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
                            <p>{detail.all_floors} از {detail.floor}</p>
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
                        <Col sm={12} className="d-flex flex-column align-items-center mb-2 ">
                            <img
                                src={detail?.image ? detail?.image : '/1.png'}
                                // style={{width:"500px", height:"400px"}}          
                                className="rounded custom-size"
                                alt={detail.title}
                            />
                            {/* <img className="rounded" src={detail.image} alt="" style={{width:"500px", height:"400px"}} /> */}
                        </Col>
                        <Row className="d-flex justify-content-around gap-2">
    
                       
                        <Button onClick={()=>setShow(true)} className="mt-3 login-button">نمایش جزییات</Button>
                        <Button onClick={()=>setShow(true)} className="mt-3 login-button">اطلاعات تماس</Button>
                        </Row>
                        <Col>
                        </Col>
                        {show && (
             
                            <Modal
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                show={show}
                            >
                                <Modal.Header>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    ویژگی ها و امکانات
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Container className="p-4">
                                    <h3>ویژگی ها</h3>
                                    <div className="d-flex justify-content-between align-items-center pt-1">
                                        <p>نوع سند</p>
                                        <p>{detail?.document_type ? detail.document_type : '-'}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center pt-1">
                                        <p>جهت ساختمان</p>
                                        <p>{detail?.direction ? detail.direction : '-'}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center pt-1">
                                        <p>وضعیت واحد</p>
                                        <p>{detail?.status ? detail.status : '-'}</p>
                                    </div>
    
                                    <h3>امکانات</h3>
                                    <div className="d-flex justify-content-between align-items-center pt-1">
                                        <p>آسانسور</p>
                                        <p>{detail?.elevator ==1 ? "دارد" : "ندارد"}</p>
                                        
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center pt-1">
                                        <p>پارکینگ</p>
                                        <p>{detail?.parking ==1 ? "دارد" : "ندارد"}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center pt-1">
                                        <p>انباری</p>
                                        <p>{detail?.warehouse ==1 ? "دارد" : "ندارد"}</p>
                                    </div>
                                </Container>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button onClick={()=>setShow(false)} className="smsButton">بستن</Button>
                                </Modal.Footer>
                            </Modal>
         )}
                       
                    </Col>
    
                    </Row>
                   
    
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
            نزدیک به : {detail?.school == 1 && <span><FaSchool /> مدرسه</span>} {detail?.hospital == 1 && <span><FaHospital /> بیمارستان</span>}{detail?.park == 1 && <span><FaTree /> پارک</span>} 
    
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

            )
        }
       
        
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