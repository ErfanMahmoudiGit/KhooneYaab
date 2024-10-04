import React, { useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import SearchBar from '../admin/SearchBar';
const { Header, Content, Sider } = Layout;
import{ useState } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { MdRecommend } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { GiVillage } from "react-icons/gi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Button, Modal} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaRegUser } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { authState, handle_variables } from '../login/Redux/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { API_SEARCH , API_LOGOUT_USER} from "../../services/apiServices";
import LoginStep1 from '../login/LoginStep1';
import { FaBookmark } from 'react-icons/fa';
import { CiLogout } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import CityModal from '../../ui/CityModal';
import cookieService from '../cookieService';
import { toast } from 'react-toastify';

function getItem(label, key, icon, children, link) {
    return {
      key,
      icon,
      children,
      label: link ? <NavLink to={link}>{label}</NavLink> : label,
    };
}


const items = [
    getItem('دسته بندی ها', 'categories', <BiSolidCategoryAlt />, [
      getItem('فروش', 'BuyApartment', <GoHomeFill  className='me-4'/>, null, '/selectSellCategory'),
      getItem('اجاره ', 'RentHome', <GiVillage className='me-4'/>, null, '/selectRentCategory'),
    ]),
    getItem('ثبت آگهی', 'register_announcement', <FaPen />, null, '/register_announcement'),
    getItem('آگهی های من', 'my_registered', <TeamOutlined />, null, '/my_registered'),
    getItem('پیشنهاد ملک', 'recommender', <MdRecommend />, null, '/recommender'),    
    getItem('نشان شده ها', 'bookmarks', <FaBookmark />, null, '/bookmarks'),    
  ];

const TestLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [cityModal, setCityModal] = useState(false);
  const [userObject, setUserObject] = useState({});
  const [name, setName] = useState('');
  const[searchValue,setSearchValue] = useState("")
  const token = cookieService.getCookie('TOKEN');
  const refreshTok = cookieService.getCookie('REFRESH');
  const [isLoggedIn, setIsLoggedIn] = useState(!!cookieService.getCookie('TOKEN')); // Track login status

  useEffect(()=>{
    const NAME = cookieService.getCookie('NAME');
    setName(NAME)
  },[])

  // useEffect(()=>{
  //   const userData = localStorage.getItem('userData');
  //   if (userData) {
  //     // Parse the JSON string into an object
  //     const parsedUserData = JSON.parse(userData);
  //     setUserObject(parsedUserData)
  //     setName(parsedUserData.name)
  //   } else {
  //     console.log('No user data found in localStorage');
  //   }
  // },[isLoggedIn,name])
  
  const handleLogOut = async () => {
    // toast.success("hi")
    console.log("refreshTok",refreshTok);
    
    const res = await API_LOGOUT_USER({refresh : refreshTok});
    console.log(res);
    if(res.status == 200){
      toast.success("از خونه یاب خارج شدید")
      
      cookieService.removeCookie('REFRESH');
      cookieService.removeCookie('TOKEN');
      cookieService.removeCookie('NAME');
      localStorage.removeItem("TOKEN")
      localStorage.removeItem("userData")
      setName(null); // Reset name after logout
      setIsLoggedIn(false);
    }
    
  }
  console.log("Retrieved NAME cookie:", cookieService.getCookie('NAME'));
  console.log("name",name);


  let navigate = useNavigate()
  const { loginModalStep1  , 
    is_verified_user ,selectedCityId  , selectedCity,
    seachedValue , owner_id} = useSelector(authState);

  console.log("name",name);
  const dispatch = useDispatch();
  function handleSearch(filters){
    dispatch(handle_variables({ seachedValue : searchValue }))
    let body = {
        
    }

    let resp = API_SEARCH(searchValue ,body ,selectedCityId)
      resp.then((res) => {
          if (res.status === 200) {
            console.log("search",res.data);
            dispatch(handle_variables({ searchResults: res.data }))
            navigate('/search')
  
          } else {
              console.log("false");        

          }
          })
              
  }
  return (
    <>
      <Layout>
        <Header
          style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent:'space-between',
              top: 0,
              color:'#001529',
              backgroundColor: '#f8f9fa', 
              }}
        >
          <div className='d-flex align-items-center gap-4'>
              <h4 className='mt-3' style={{color:"#ac2323"}}>خونه یاب</h4>
              <SearchBar />
          </div>

          <div className='d-flex gap-4 align-items-center '>
                                  
              <span onClick={()=>setCityModal(true)} style={{cursor:"pointer"}} ><FaLocationDot className='ps-1' />{selectedCity ? selectedCity: '31 شهر'}</span>
              {token ? (
              <span className='d-flex align-items-center gap-2'>
                  {cookieService.getCookie('NAME')}
                  <CiLogout size={24} onClick={handleLogOut} style={{cursor:"pointer"}}/>                  
              </span>
              ) : (
                  <NavLink
                      onClick={ ()=>{
                          dispatch(handle_variables({ loginModalStep1: true }))
                      }}  
                      >
                      <Button
                          style={{
                          fontSize: "15.4px",
                          fontWeight: 500,
                          border: "none",
                          display: "flex",
                          justifyContent : "center",
                          alignContent:"center",
                          alignItems:"center",
                          gap:"4px",
                          color:"#001529",
                          backgroundColor:"#e0e0e2",
                          }}
                      >
                      <span>ورود</span>
                      <FaRegUser /> 
                      </Button>
                  </NavLink>
              )}     
              </div>  
          
        </Header>
        <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint="lg"
                  style={{
                      position: 'sticky',
                      color:"black",
                      backgroundColor: '#f8f9fa', 
                      top: 0,
                      height: '100vh', // Optional: Makes sure the Sider takes up the full viewport height
                      overflowY: 'auto', // Optional: Enables scrolling within the Sider if needed
                  }}
          
              >
                  <div className="demo-logo-vertical" />
                      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} 
                          style={{    
                              color:'#001529',
                              backgroundColor: '#f8f9fa', 
                          }}
                          defaultOpenKeys={['categories']} 
                      />
                              {/* <img src={'/logo.png'} style={{width:"100px", height:"30px"}}/> */}

              </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
            }}
          >
              <Content
              style={{
                  margin: '0 16px',
              }}
          >
              <Outlet /> {/* This will render child routes */}
          </Content>  
          </Layout>
        </Layout>
      </Layout>
      {loginModalStep1 && <LoginStep1 />}
      {cityModal ? (
        <Modal
        className={"Auth-modal"}
        show={cityModal}
        centered
    >
        <Modal.Body className="custom-modal-body1" style={{height:"80vh"}}>
          <h3 className='text-center'>انتخاب شهر</h3>
          <CityModal setCityModal={setCityModal} />
        </Modal.Body>
        </Modal>
      ) : (
        null
      )}

    </>
    
  );
};
export default TestLayout;