import{ useState } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { MdRecommend } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { GiVillage } from "react-icons/gi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Layout, Menu } from 'antd';
import { Button} from "react-bootstrap";
import { NavLink } from "react-router-dom";
const { Header, Content, Sider } = Layout;
import Form from 'react-bootstrap/Form';
import NewDropdown from '../../ui/NewDropDown';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaRegUser } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { authState, handle_variables } from '../login/Redux/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { API_SEARCH } from "../../services/apiServices";
import LoginStep1 from '../login/LoginStep1';
import { FiUserCheck } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';

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
      getItem('فروش آپارتمان', 'BuyApartment', <GoHomeFill  />, null, '/category/BuyApartment'),
      getItem('اجاره آپارتمان', 'RentApartment', <GoHomeFill />, null, '/category/RentApartment'),
      getItem('فروش خانه و ویلا', 'BuyHome', <GiVillage />, null, '/category/BuyHome'),
      getItem('اجاره خانه و ویلا', 'RentHome', <GiVillage />, null, '/category/RentHome'),
    ]),
    getItem('ثبت آگهی', 'register_announcement', <FaPen />, null, '/register_announcement'),
    getItem('آگهی های من', 'register_announcement', <TeamOutlined />, null, '/register_announcement'),
    getItem('پیشنهاد دهنده ملک', 'recommender', <MdRecommend />, null, '/recommender'),    
    getItem('نشان شده ها', 'bookmarks', <FaBookmark />, null, '/bookmarks'),    
  ];

const NewLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const[searchValue,setSearchValue] = useState("")
  let navigate = useNavigate()
  const { loginModalStep1  , is_verified_user,name } = useSelector(authState);
  console.log("name",name);
  console.log("is_verified_user: ",is_verified_user);
  const dispatch = useDispatch();


  function handleSearch(){
    dispatch(handle_variables({ seachedValue : searchValue }))

    let resp = API_SEARCH(searchValue)
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
        <Layout
            style={{
                minHeight: '100vh',
                color:"black",
                backgroundColor: '#f8f9fa', 

            }}
        >
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
                        defaultOpenKeys={['categories']} // Set the 'دسته بندی ها' key to be open by default
                    />
            </Sider>
        <Layout>
            <Header
            style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-between',
            position: 'sticky',
            top: 0,
            zIndex:1001,
            color:'#001529',
            backgroundColor: '#f8f9fa', 
            }}
        >   
            <div className='d-flex gap-2'>
                <Form className='d-flex me-5'>
                    <Form.Group style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Form.Control
                        type="search"
                        placeholder="جستجو"
                        style={{
                        borderRadius: '8px',
                        paddingRight: '15px', 
                        paddingBottom:"15px",
                        height:"35px",
                        width:"180px"

                        }}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSearch(); 
                        }
                        }}
                    />
                    <AiOutlineSearch
                        style={{
                        fontSize: '22px',
                        color: '#757575',
                        position: 'absolute',
                        left: '10px', 
                        }}
                    />
                    </Form.Group>
                </Form>
                <NewDropdown  />
            </div>
            {is_verified_user == true ? (
            <span className='d-flex align-items-center gap-2'>{name}<FiUserCheck /></span>
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
                        color:"#001529",
                        backgroundColor:"#f8f9fa"
                        }}
                    >
                    <span>ورود</span>
                    <FaRegUser />
                    </Button>
                </NavLink>
            )}            
        </Header>
        <Content
            style={{
                margin: '0 16px',
            }}
        >
            <Outlet /> {/* This will render child routes */}
        </Content>
    </Layout>
    </Layout>
        {loginModalStep1 && <LoginStep1 />}
    </>
  );
};
export default NewLayout;