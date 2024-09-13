import { Button,  Container } from 'react-bootstrap';
import {API_GET_MY_BUILDINGS} from '../../services/apiServices'
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import HouseLineChart from './HouseLineChart';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { PiToggleRight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { authState } from '../login/Redux/authSlice';

export default function MyRegistered(){
    const [myRegisteredHouse,setMyRegisteredHouse] = useState([])
    const [loading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    // const { owner_id} = useSelector(authState);
    const [owner_id, setOwner_id] = useState({});


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
    useEffect(()=>{
        setIsLoading(true)

        let resp = API_GET_MY_BUILDINGS({owner_id : owner_id})
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
                // <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(1000px, 1fr))', gap: '16px' }}>
                //     {myRegisteredHouse.length == 0 ? (
                //         <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' , marginTop:"20px"}}>
                //               هیچ آگهی ثبت شده ای وجود ندارد
                //         </div>
                //     ):(
                //         myRegisteredHouse.map((house, index) => (
                //             <Row key={index} style={{ border: '1px solid #ddd', padding: '20px',margin:"10px", borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                //                 <Col md={4} >
                //                     <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{house.title}</h3>
                //                     <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>آگهی در {house.city}</div>
                //                     <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>املاک <FaChevronLeft size={12} /> {house.category}</div>
                //                     <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>متراژ : {formatNumber(house.meterage)} متر</div>
                //                     <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>{`${house.category == 'اجاره آپارتمان' || house.category == 'اجاره خانه و ویلا' ? 'ودیعه': 'قیمت'}`}: {formatNumber(house.price)}</div>
                //                     <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>{`${house.category == 'اجاره آپارتمان' || house.category == 'اجاره خانه و ویلا' ? 'کرایه': 'قیمت هر متر'}`}: {formatNumber(house.price_per_meter)}</div>
                //                     <button onClick={() => navigate(`/house/${house.id}`)} className="smsButton"> مشاهده آگهی</button>
                //                 </Col>
                //                 <Col md={2} className='d-flex justify-content-center'><img style={{width:"200px" , height:"200px" , borderRadius: '8px'}} src={house.image ? house.image : '/1.png'}></img></Col>
                //                 <Col md={1}></Col>
                //                 <Col md={4} className=' d-flex justify-content-center'>
                //                     <HouseLineChart data={generateRandomData(11)} /> {/* Generate 11 random data points */}

                //                 </Col>
                //                 <Col md={1}>
                //                 <p>ویرایش <AiTwotoneEdit /></p>
                //                 <p>حذف <MdDelete /></p>
                //                 </Col>

                //             </Row>
               
                //         ))
                //     )}
                // </div>
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
                                <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>املاک <FaChevronLeft size={12} /> {house.category}</div>
                                <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>متراژ : {formatNumber(house.meterage)} متر</div>
                                <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>{`${house.category == 'اجاره آپارتمان' || house.category == 'اجاره خانه و ویلا' ? 'ودیعه': 'قیمت'}`}: {formatNumber(house.price)}</div>
                                <div style={{ fontSize: '14px', color: '#666' ,marginBottom:"10px"}}>{`${house.category == 'اجاره آپارتمان' || house.category == 'اجاره خانه و ویلا' ? 'کرایه': 'قیمت هر متر'}`}: {formatNumber(house.price_per_meter)}</div>
                                <button onClick={() => navigate(`/house/${house.id}`)} className="smsButton"> مشاهده آگهی</button>
                            </div>
                           
                            <div className=' d-flex justify-content-center'>
                                <HouseLineChart data={generateRandomData(11)} /> {/* Generate 11 random data points */}

                            </div>
                            </div>
                            <div className='d-flex gap-3'>

                            <div className='mt-2'>ویرایش <AiTwotoneEdit /></div>
                            <div className='mt-2' onClick={()=> console.log(house.id)}>حذف <MdDelete /></div>
                            <div className='mt-2'>تغییر وضعیت <PiToggleRight /></div>
                            </div>

                        </div>
           
                    ))
                )}
            </div>
            )}
         </Container>
        </>
    )
}