import { Button,  Col,  Container, Form, Modal, Row } from 'react-bootstrap';
import {API_DELETE_HOUSE, API_GET_MY_BUILDINGS, API_GETHOUSE_DETAILS, API_TOGGLE_STATUS_BUILDING, API_UPDATE_BUILDING} from '../../services/apiServices'
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import HouseLineChart from './HouseLineChart';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneEdit } from "react-icons/ai";
import { PiToggleRight } from "react-icons/pi";
import cookieService from '../cookieService';
import { toast } from 'react-toastify';
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Switch } from 'antd';

export default function MyRegistered(){
    const [myRegisteredHouse,setMyRegisteredHouse] = useState([])
    const [loading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [owner_id, setOwner_id] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectedHouseId, setSelectedHouseId] = useState(null);
    const [selectedHouse, setSelectedHouse] = useState({
      id: '',
      title: '',
      description: '',
      meterage: '',
      price: '',
      build_date: ''
    });
    cookieService.getCookie('OWNER_ID'); 

  useEffect(()=>{
    const token = cookieService.getCookie('TOKEN');
    if(!token){
      toast.error("برای دسترسی به این صفحه ابتدا باید وارد شوید")
      navigate("/")
    }
  },[])

    console.log(owner_id);
    useEffect(()=>{
        const userData = localStorage.getItem('userData');
        if (userData) {
          // Parse the JSON string into an object
          const parsedUserData = JSON.parse(userData);
          console.log(parsedUserData.owner_id);
          setOwner_id(parsedUserData.owner_id)
          
        } else {
          console.log('No user data found in localStorage');
        }
      },[])
    
    const generateRandomData = (length) => {
        return Array.from({ length }, () => Math.floor(Math.random() * 41));
      };
      const handleToggle = async (id, prioritized) => {
        try {
          const res = await API_TOGGLE_STATUS_BUILDING(id);
          if (res.status === 200) {
            if (res.data.prioritized === 1) {
              toast.success("این آگهی با موفقیت نردبان شد");
            } else {
              toast.success("این آگهی با موفقیت غیر نردبان شد");
            }
          } else {
            console.error("Error toggling status");
          }
        } catch (error) {
          console.error("Error toggling status:", error);
        }
      }
      const handleUpdateHouse = async () => {
        try {
          let data = {
            // id:selectedHouse.id,
            title: selectedHouse.title,
            description: selectedHouse.description,
            meterage: selectedHouse.meterage,
            price: selectedHouse.price,
            build_date: parseInt(selectedHouse.build_date),
          }
          console.log("d",data);
          
          const res = await API_UPDATE_BUILDING(selectedHouse.id,data);
          if (res.status === 200) {
            console.log("update res");
            
            toast.success("آگهی مورد نظر با موفقیت به روز رسانی شد");
            setUpdateModal(false);
            
          }
        } catch (error) {
          console.error("Error updating house:", error);
        }
      };
      const deleteHouse = async (id) => {
        // setIsLoadinging(true);
        try {
          const res = await API_DELETE_HOUSE(id);
          if (res.status === 200) {
            toast.success("این آگهی با موفقیت حذف شد")
            setDeleteModal(false)  
            // setPage(0)
          } else {
            console.error("Error fetching houses");
          }
        } catch (error) {
          console.error("Error fetching houses:", error);
        } 
      };
    
    useEffect(()=>{
        setIsLoading(true)

        let resp = API_GET_MY_BUILDINGS({owner_id : cookieService.getCookie('OWNER_ID') })
        // setLoading(true)

          resp.then((res) => {
            console.log(res);
            
            if (res.status === 200) {
                console.log(res.data);
                setMyRegisteredHouse(res.data)
                setIsLoading(false)

                
            } else {
                console.log("false");  
                setIsLoading(false)
 
            }
          })     

    },[])
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    const fetchHouseDetails = async (id) => {
      try {
        const res = await API_GETHOUSE_DETAILS(id);
        if (res.status === 200) {
          setSelectedHouse(res.data);
        }
      } catch (error) {
        console.error("Error fetching house details:", error);
      }
    };
    const handleEditClick = (id) => {
      setUpdateModal(true);
      fetchHouseDetails(id);
    };
    return(
        <>
         <Container className='p-4 pt-0'>
         <div className="d-flex flex-row justify-content-between m-3 align-items-center">
                <h5>آگهی های ثبت شده شما</h5>
                    <Button className="backprimaryButton" onClick={()=> navigate('/')}>بازگشت به صفحه اصلی</Button>
                </div>
            {/* <h5>آگهی های ثبت شده شما</h5> */}
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <BeatLoader />
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: '16px' }}>
                {myRegisteredHouse.length == 0 ? (
                    <div style={{  height: '100vh' , marginTop:"20px"}}>
                          هیچ آگهی ثبت شده ای وجود ندارد
                    </div>
                ):(
                    myRegisteredHouse.map((house, index) => (
                        <div key={index} className='p-3' style={{ border: '1px solid #ddd',margin:"10px", borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{house.title}</h3>
                            <div className='d-flex justify-content-between'>
                            <div>

                                <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>آگهی در {house.city}</div>
 <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>زمان انتشار آگهی</div>
 <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>{house.time}</div>
                                {/* <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>املاک <FaChevronLeft size={12} /> {house.category}</div> */}
                                {/* <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>متراژ : {formatNumber(house.meterage)} متر</div> */}
                                {/* <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>{`${house.category == 'اجاره آپارتمان' || house.category == 'اجاره خانه و ویلا' ? 'ودیعه': 'قیمت'}`}: {formatNumber(house.price)}</div> */}
                                {/* <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>{`${house.category == 'اجاره آپارتمان' || house.category == 'اجاره خانه و ویلا' ? 'کرایه': 'قیمت هر متر'}`}: {formatNumber(house.price_per_meter)}</div> */}
                                <button onClick={() => navigate(`/house/${house.id}`)} className="smsButton"> مشاهده آگهی</button>
                            </div>
                       
                            <div className=' d-flex justify-content-center'>
                                <HouseLineChart data={generateRandomData(11)} /> 
                            </div>
                            </div>
                            <div className='d-flex gap-3'>
                            {/* <AiTwotoneEdit onClick={() => handleEditClick(house.id)} /> */}

                            <div style={{cursor:"pointer"}} onClick={() => handleEditClick(house.id)} className='mt-2'>ویرایش <AiTwotoneEdit /></div>
                            <div style={{cursor:"pointer"}} className='mt-2' 
                            onClick={() => {
                              setDeleteModal(true);
                              setSelectedHouseId(house.id);
                            }}>حذف <MdDelete /></div>
                            <div style={{cursor:"pointer"}} className='mt-2'>
                            <Switch size="small" defaultChecked={house?.prioritized} onChange={() => {
                            handleToggle(house?.id, house?.prioritized);
                          }} />
                            </div>
                            </div>

                        </div>
           
                    ))
                )}
            </div>
            )}
         </Container>
         {deleteModal && (
        <Modal
          className={"Auth-modal"}
          show={deleteModal}
          centered
        >
          <Modal.Body className="delete-modal">
            <Row className='d-flex justify-content-center'>آیا از حذف آگهی {selectedHouseId} اطمینان دارید؟</Row>
            <Row className="d-flex justify-content-center mt-3">
              <Col xs={6} md={4}>
                <Button type="submit" className="sendcodeBtn" onClick={() => deleteHouse(selectedHouseId)}>
                  {/* {isLoadinging ? <BeatLoader size={9} color={"black"} /> : "حذف"} */}حذف
                </Button>
              </Col>
              <Col xs={6} md={4}>
                <Button
                  type="button"
                  className="btn-login"
                  onClick={() => setDeleteModal(false)}
                >
                  بستن
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}

      {updateModal && (
        <Modal
          className={"Auth-modal update-modal"}
          show={updateModal}
          centered
          size='lg'
        >
          <Modal.Body>
            <Row className="d-flex justify-content-center p-3">
              <Col md={6} >
                <Form.Label className='filter-color'>عنوان آگهی</Form.Label>

                <input
                    type="text"
                    className="form-control"
                    value={selectedHouse.title}
                    onChange={(e) =>
                      setSelectedHouse({ ...selectedHouse, title: e.target.value })
                    }
                    placeholder="عنوان آگهی"
                />
                <Form.Label className='filter-color mt-2'>سال ساخت</Form.Label>

                <input
                  type="text"
                  className="form-control"
                  value={selectedHouse.build_date}
                  onChange={(e) =>
                    setSelectedHouse({ ...selectedHouse, build_date: e.target.value })
                  }
                  placeholder="سال ساخت آگهی"
                />
                <Form.Label className='filter-color mt-2'>متراژ</Form.Label>

                 <input
                  type="text"
                  className="form-control"
                  value={selectedHouse.meterage}
                  onChange={(e) =>
                    setSelectedHouse({ ...selectedHouse, meterage: e.target.value })
                  }
                  placeholder="متراژ آگهی"
                />
                <Form.Label className='filter-color mt-2'>قیمت</Form.Label>

                <input
                  type="text"
                  className="form-control"
                  value={selectedHouse.price}
                  onChange={(e) =>
                    setSelectedHouse({ ...selectedHouse, price: e.target.value })
                  }
                  placeholder="قیمت"
                />
              </Col>
              <Col md={6} >
                    <Form.Label className='filter-color '>توضیحات</Form.Label>
                        <textarea 
                        rows={11} 
                        className="form-control"
                  value={selectedHouse.description}
                  onChange={(e) =>
                    setSelectedHouse({ ...selectedHouse, description: e.target.value })
                  }
                  placeholder="توضیحات آگهی"
                  
                        >

                        </textarea>
                   
                </Col>            
                 
            </Row>
             <Row className="d-flex justify-content-center mt-3">
                  <Col xs={6} md={4}>   
                        <Button type="submit" className="sendcodeBtn" onClick={handleUpdateHouse}>به‌روزرسانی</Button>
                  </Col>
                            <Col xs={6} md={4}>
                                <Button
                                    type="button"
                                    className="btn-login"
                                    onClick={() => setUpdateModal(false)}
                                >
                                    بستن 
                                </Button>  
                            </Col>
                        </Row>
          </Modal.Body>
        </Modal>
      )}
        </>
    )
}