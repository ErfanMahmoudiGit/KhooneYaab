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

export default function NavExample(){
    return(
        <div className={"main-layout"}>
            <div className="main-head">
                <Navbar
                    collapseOnSelect
                    expand="lg"
                    variant="dark"
                    className={"head-nav-responsive"}
                >
                    <div className={"head-nav-imgs"}>
                        <NavLink to="/">
                            <div className="nav-logo-1 bg-logoHeader1" />
                            jnk
                        </NavLink>
                        <NavLink to="/">
                            <div
                            className="nav-logo-2 bg-logoHeader2"
                            src="/asset/img/logoHeader2.png"
                            />
                            n kjjjjjjj
                        </NavLink>
                    </div>
                </Navbar>
            </div>
        </div>
    )
}