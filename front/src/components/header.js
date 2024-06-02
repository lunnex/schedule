// src/Header.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">Модуль расписания</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Домашняя страница</Nav.Link>
            <Nav.Link as={NavLink} to="/about">О модуле</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Контакты</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
