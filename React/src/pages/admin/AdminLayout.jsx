import React from 'react';
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import{ useState } from 'react';
import { Outlet } from 'react-router-dom';
import LayersIcon from '@mui/icons-material/Layers';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { NavLink } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";

function getItem(label, key, icon, children, link) {
    return {
      key,
      icon,
      children,
      label: link ? <NavLink to={link}>{label}</NavLink> : label,
    };
}

const items = [
    getItem('داشبورد', 'dashboard', <DashboardIcon />, null, '/admin/dashboard'),
    getItem('گزارشات', 'reports', <BarChartIcon />, [
      getItem('استان ها', 'cities', <FaCity  className='me-4'/>, null, '/admin/cities'),
      getItem('نظرات', 'comments', <FaRegCommentDots  className='me-4'/>, null, '/admin/comments'),
    ]),
    // getItem('بازدیدها', 'views', <IoMdEye />, null, '/admin/views'),
   
  ];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
 
  return (
    <>
      <Layout style={{ margin: '0' }}>
        <Header
          style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent:'space-between',
              top: 0,
            //   zIndex:10001,
              color:'#001529',
              backgroundColor: '#f8f9fa', 
              }}
        >
            <div className='d-flex align-items-center gap-4'>
                <h4 className='mt-3' style={{color:"#ac2323"}}>داشبورد مدیریتی خونه یاب</h4>
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
                          defaultOpenKeys={['reports']} 
                      />
              </Sider>
          <Layout
            style={{
              padding: '0',
              margin: '0',

            //   padding: '0 24px 24px',
            }}
          >
              <Content 
              style={{
                  margin: '0 16px',
                //   margin: '0',
                //   backgroundColor:"red"
              }}
          >
            
              <Outlet /> 
          </Content>
          </Layout>
        </Layout>
      </Layout>

    </>
    
  );
};
export default AdminLayout;