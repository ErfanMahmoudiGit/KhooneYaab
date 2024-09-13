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
import { API_SEARCH , API_REMOVE_USER} from "../../services/apiServices";
import LoginStep1 from '../login/LoginStep1';
import { FaBookmark } from 'react-icons/fa';
import { CiLogout } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import CityModal from '../../ui/CityModal';
import cookieService from '../cookieService';

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


// const items1 = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//   const key = String(index + 1);
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });
const TestLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [cityModal, setCityModal] = useState(false);
  const [userObject, setUserObject] = useState({});
  const[searchValue,setSearchValue] = useState("")
  const token = cookieService.getCookie('TOKEN');
  useEffect(()=>{
    const userData = localStorage.getItem('userData');
    if (userData) {
      // Parse the JSON string into an object
      const parsedUserData = JSON.parse(userData);
      setUserObject(parsedUserData)
    } else {
      console.log('No user data found in localStorage');
    }
  },[])
  
  

  let navigate = useNavigate()
  const { loginModalStep1  , 
    is_verified_user,name ,selectedCityId  , selectedCity,
    seachedValue , owner_id} = useSelector(authState);

  console.log("name",name);
  const dispatch = useDispatch();
  function handleSearch(filters){
    dispatch(handle_variables({ seachedValue : searchValue }))

    // const body = { 
    //     min_price :'',
    //     max_price : '',
    //     min_meterage : '',
    //     max_meterage : '',
    //     room_count: 3 
    // };
    // const body = {
    //     min_price: filters.min_price || '',
    //     max_price: filters.max_price || '',
    //     min_meterage: filters.min_meterage || '',
    //     max_meterage: filters.max_meterage || '',
    //     room_count: filters.room_count || ''
    //   };
    let body = {
        
    }
    // const res = await API_CATEGORY({ category: cat , state : selectedCityId});

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
          // style={{
          //   display: 'flex',
          //   alignItems: 'center',
          // }}
          style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent:'space-between',
              // position: 'relative',
              top: 0,
              // zIndex:10001,
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
              {/* <NewDropdown  /> */}
              {token ? (
              <span className='d-flex align-items-center gap-2'>
                  {userObject?.name}
                  <CiLogout size={24} onClick={()=>{
                      let data = {
                          user_id :  owner_id
                      }
                      let resp = API_REMOVE_USER(data)
                      resp.then((res) => {
                          if (res.status === 200) {
                          //   dispatch(handle_variables({ searchResults: res.data }))
                          //   navigate('/search')
                  
                          } else {
                              console.log("false");        
                
                          }
                          })
                  }}/>
                  {/* <FiUserCheck /> */}
                  
              </span>
              ) : (
                  <NavLink
                      onClick={ ()=>{
                          dispatch(handle_variables({ loginModalStep1: true }))
                      }}  
                      >
                      <Button
                      //   className='bg-body-tertiary'
                          style={{
                          //   color: "white",
                          fontSize: "15.4px",
                          fontWeight: 500,
                          border: "none",
                          display: "flex",
                          justifyContent : "center",
                          alignContent:"center",
                          alignItems:"center",
                          gap:"4px",
                          // color:"#ffffff",
                          color:"#001529",
                          // backgroundColor:"#942525",
                          backgroundColor:"#e0e0e2",
                          }}
                      >
                      <span>ورود</span>
                      <FaRegUser />
                      
                      
                      {/* <NavDropdown
                      title={<span style={{ fontSize: "16px" }}><FaRegUser /></span>}
                    >
                      <NavDropdown.Item
                        onClick={()=> {
                        }}
                      >
                        خروج
                      </NavDropdown.Item>
                    </NavDropdown> */}
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
            
            {/* <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              Content
            </Content> */}
          </Layout>
        </Layout>
      </Layout>
      {loginModalStep1 && <LoginStep1 />}
      {cityModal ? (
        <Modal
        className={"Auth-modal"}
        show={cityModal}
        // onHide={() =>
        //   dispatch(handle_variables({ loginModalStep1: false }))
        // }
        // size={"lg"}
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