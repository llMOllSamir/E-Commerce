import React, { useContext } from 'react'
import styles from "./Navbar.module.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';


export default function NavBar({userData,logOut}) {

  let {cartCounter} = useContext(CartContext)

 
  
  return (
    <>
    <Navbar   fixed='top' collapseOnSelect bg="dark" variant='dark' expand="md">
    <Container >
      <Navbar.Brand >
        <Link to={"/home"} className='nav-link d-flex align-items-center justify-content-center' >
           <i className="fa-solid fa-cart-shopping fa-flip-horizontal text-success fs-3 "></i>
           <h1 className='font-brand h4 d-inline-block'>Online Shopping</h1>
           </Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {userData?<Nav  className="me-auto">
          <Nav.Link><Link to={"/home"} className='nav-link '> Home </Link> </Nav.Link>
         <Nav.Link> <Link to={"/products"} className='nav-link' > Products </Link> </Nav.Link>
         <Nav.Link> <Link to={"/brands"} className='nav-link' > Brands </Link> </Nav.Link>
         <Nav.Link> <Link to={"/categories"} className='nav-link' > Categories </Link> </Nav.Link>
        </Nav>:""}
        
        <Nav className='ms-auto'>
          {userData?<>
        <NavDropdown title={userData.name} className='fw-bold' id="collasible-nav-dropdown">
        <NavDropdown.Item ><Link to={"/cart"} className='nav-link text-dark px-0'>
           <i className="fa-solid fa-cart-shopping"></i>
         Cart <span className='badge bg-success '>{cartCounter}</span> </Link>
         </NavDropdown.Item>
            <NavDropdown.Item >
            <Link to={"favourite"} className='nav-link text-dark px-0'> <i className="fa-solid fa-heart"></i> Favourite </Link>
            </NavDropdown.Item>
            <NavDropdown.Item >
            <Link to={"allorders"} className='nav-link text-dark px-0'> <i className="fa-solid fa-hand-holding-dollar"></i> Orders </Link>
            </NavDropdown.Item>
            <NavDropdown.Item ><Link to={"/setting"} className='nav-link text-dark px-0'> <i className="fa-sharp fa-solid fa-gear fa-spin"></i> Setting </Link></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logOut} >
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </NavDropdown.Item>
          </NavDropdown></>:<><Link to={"/login"} className='nav-link'> Login </Link>
        <Link to={"/register"} className='nav-link'> Sign Up </Link></>}

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    </>
  )
}
