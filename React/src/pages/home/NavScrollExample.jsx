import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { API_SEARCH } from "../../services/apiServices";
import { Tooltip } from "antd";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaRegUser } from "react-icons/fa6";


import { useNavigate } from 'react-router-dom';
import {
  Nav,
  Button,
  Dropdown,
  Navbar,
  NavDropdown,
  Modal,
  Row,
  Col,
} from "react-bootstrap";

import { Link, NavLink } from "react-router-dom";
function NavScrollExample() {
    const[searchValue,setSearchValue] = useState("")
    let navigate = useNavigate()
    function handleSearch(){
      // e.preventDefault()
        console.log(searchValue)
        const params = new URLSearchParams(window.location.search);
        params.set('q', searchValue); // Set the query parameter
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        navigate(newUrl); 
                // Or use window.history.pushState({}, '', newUrl); if not using React Router

        let resp = API_SEARCH(searchValue)
            resp.then((res) => {
                if (res.status === 200) {
                    console.log("success");        
                } else {
                    console.log("false");        

                }
                })
                
    }
    function handleLogin (){
        console.log("login");
        // navigate("/login")
    }
  return (
    

   
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
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{display: "flex" , justifyContent:"center" ,alignItems:"center" ,   maxHeight: '100px' }}
            navbarScroll
          >
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
                    <span>ثبت آگهی</span> 
                  </Button>
                </NavLink>

          <NavLink
            to="/login"
            onClick={handleLogin}
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
     </Nav>
          
          
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavScrollExample;