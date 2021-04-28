import React from "react";
import "./MenuBar.scss";
import Navbar from "react-bootstrap/Navbar";
import { tak } from "./tak.jpeg";
import Cart from "../Cart/Cart";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
export default function MenuBar() {
  return (
    <Navbar bg="dark" variant="dark" className="menu-bar">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="https://i.extraimages.net/images/2021/04/21/tak.jpg"
            width="50px"
            height="50px"
            margin-right="20px "
            className="d-inline-block align-top"
            alt=""
          />
          <h2>React Bootstrap</h2>
        </Navbar.Brand>
        <NavOptions />
        <Cart />
      </Container>
    </Navbar>
  );
}

function NavOptions() {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="#">Menu</Nav.Link>
      <Nav.Link href="#">Orders</Nav.Link>
      <Nav.Link href="#">About Us</Nav.Link>
    </Nav>
  );
}
