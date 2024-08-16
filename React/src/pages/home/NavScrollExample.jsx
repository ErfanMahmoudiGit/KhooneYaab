import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { API_SEARCH } from "../../services/apiServices";
import { Tooltip } from "antd";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaRegUser } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import { authState, handle_variables } from '../login/Redux/authSlice'; // Update with the correct path

import { useNavigate } from 'react-router-dom';
import { Nav, Button, Navbar } from "react-bootstrap";
import LoginStep1 from '../login/LoginStep1';
import { Link, NavLink } from "react-router-dom";
import StateDropdown from '../../ui/StateDropdown';
function NavScrollExample() {
  const[searchValue,setSearchValue] = useState("")
  let navigate = useNavigate()
  const { loginModalStep1  , searchResults , is_verified_user,name ,seachedValue} = useSelector(authState);
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
    <div>
    <Navbar expand="lg" className="bg-body-tertiary m-0 main-head">
      <Container fluid className='main-head' >
        {/* <Navbar.Brand href="#">چارخونه</Navbar.Brand> */}
        <img className="nav-logo-2" src="/logo.jpg" />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Form className='d-flex me-5'>
          <Form.Group style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Form.Control
            type="search"
            placeholder="جستجو"
            style={{
              borderRadius: '20px',
              paddingRight: '30px', 
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
              fontSize: '25px',
              color: '#757575',
              position: 'absolute',
              left: '10px', 
            }}
          />
        </Form.Group>
          </Form>
          <StateDropdown />
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{display: "flex" , justifyContent:"center" ,alignItems:"center" ,   maxHeight: '100px' }}
            navbarScroll
          >
             <NavLink
                  to="/recommender"
                >
                  <Button
                  className='bg-body-tertiary'
                    style={{
                      color: "black",
                      fontSize: "15.4px",
                      padding: 15,
                      fontWeight: 500,
                      border: "none",
                    }}
                  >
                   
                        <Tooltip
                          placement="right"
                          color={"#cbd5e1"}
                          title=" با وارد کردن ملک درخواستی، پیشنهادات ارخونه را دریافت کنید"
                        >
                            پیشنهاد دهنده ملک 
                        </Tooltip>
                      
                  </Button>
                </NavLink>

          <NavLink
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                  
                  }}
                >
                  <Button
                  className='bg-body-tertiary'
                    style={{
                      color: "black",
                      fontSize: "15.4px",
                      padding: 15,
                      fontWeight: 500,
                      border: "none",
                    }}
                  >
                   
                        <Tooltip
                          placement="right"
                          color={"#cbd5e1"}
                          title="آگهی های ثبت شده خود را از این قسمت مشاهده کنید"
                        >
                          آگهی های من 
                        </Tooltip>
                      
                  </Button>
                </NavLink>
          <NavLink
                  to="/register_announcement"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  
                  // }}
                >
                  <Button
                  className='bg-body-tertiary'
                    style={{
                      color: "black",
                      fontSize: "15.4px",
                      padding: 15,
                      fontWeight: 500,
                      border: "none",
                    }}
                  >
                    <span>ثبت آگهی</span> 
                  </Button>
                </NavLink>
                {is_verified_user == true ? (
                  <span className='d-flex align-items-center gap-2'>{name}<FiUserCheck /></span>
                ) : (
                  <NavLink
                  onClick={ ()=>{
      
                    dispatch(handle_variables({ loginModalStep1: true }))
                  }
      
                  }  
                >
                <Button
                  className='bg-body-tertiary'
                    style={{
                      color: "black",
                      fontSize: "15.4px",
                      fontWeight: 500,
                      border: "none",
                      display: "flex",
                      justifyContent : "center",
                      alignContent:"center",
                      alignItems:"center",
                      gap:"4px"
                    }}
                >
                  <span>ورود</span>
                  <FaRegUser />
                </Button>
              </NavLink>
                )}

        
     </Nav>
          
          
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    

   <LoginStep1 />
    </>
   
  )
}

export default NavScrollExample;