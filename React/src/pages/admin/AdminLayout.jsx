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
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
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
    getItem('داشبورد', 'categories', <BiSolidCategoryAlt />, [
      getItem('فروش', 'BuyApartment', <GoHomeFill  className='me-4'/>, null, '/selectSellCategory'),
      getItem('اجاره ', 'RentHome', <GiVillage className='me-4'/>, null, '/selectRentCategory'),
    ]),
    getItem('آمار نظرات', 'register_announcement', <FaPen />, null, '/register_announcement'),
    getItem('گزارش ماهانه', 'my_registered', <TeamOutlined />, null, '/my_registered'),
  ];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
 

  


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
                    {/* <NewFilters onSearch={handleSearch} />  */}
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
            {/* <div className='d-flex gap-2 align-items-center'>
                <img src={'/logo.png'} style={{width:"200px", height:"50px"}}/>
                <Form className='d-flex me-5'>
                    <Form.Group style={{ position: 'relative', display: 'flex', alignItems: 'center' }} id='search_box'>
                    <Form.Control
                        type="search"
                        placeholder="جستجو"
                        
                        style={{
                        borderRadius: '8px',
                        paddingRight: '40px', 
                        paddingBottom:"20px",
                        paddingTop:"15px",
                        height:"40px",
                        width:"300px",
                        backgroundColor:"#ffffff",
                        // backgroundColor:"#ebebee",
                        color:"#ebebee",
                        

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
                        fontSize: '24px',
                        color: '#757575',
                        position: 'absolute',
                        right: '10px', 

                        }}
                    />
                    </Form.Group>
                </Form>
                <NewDropdown  />
            </div>
              */}
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
\    </>
  );
};
export default AdminLayout;