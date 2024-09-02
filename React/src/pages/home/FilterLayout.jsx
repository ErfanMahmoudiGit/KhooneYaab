import{ useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
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
import { FiUserCheck } from 'react-icons/fi';
import NewFilters from './NewFilters';

const FilterLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate()
  const { loginModalStep1  , is_verified_user,name ,seachedValue } = useSelector(authState);
  const[searchValue,setSearchValue] = useState("")
//   console.log("name",name);
//   console.log("is_verified_user: ",is_verified_user);
  const dispatch = useDispatch();



  function handleSearch(filters){
    dispatch(handle_variables({ searchedValue : searchValue }))
    console.log('filters',filters);
    

    const body = {
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        min_meterage: filters.min_meterage || '',
        max_meterage: filters.max_meterage || '',
        room_count: filters.room_count || ''
      };

      console.log("seachedValue in filter layot",seachedValue);
      
    let resp = API_SEARCH(seachedValue ,body)
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
            width={250}
                style={{
                    position: 'sticky',
                    color:"black",
                    backgroundColor: '#f8f9fa', 
                    top: 0,
                    height: '100vh', // Optional: Makes sure the Sider takes up the full viewport height
                    overflowY: 'auto', // Optional: Enables scrolling within the Sider if needed
                }}
        
            >
                <div className="demo-logo-vertical w-[25%]" />
                    {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} 
                        style={{    
                            color:'#001529',
                            backgroundColor: '#f8f9fa', 
                        }}
                        defaultOpenKeys={['categories']} // Set the 'دسته بندی ها' key to be open by default
                    /> */}
                    <NewFilters onSearch={handleSearch} /> 
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
            <img src={'/logo.png'} style={{width:"200px", height:"50px"}}/>

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
    </>
  );
};
export default FilterLayout;