import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-black mt-4">
      <Container>
        <Row className="py-4">
          <Col md={6} className="text-center text-md-left">
            <p className="mb-0">© {new Date().getFullYear()} Модуль расписания</p>
          </Col>
          <Col md={6} className="text-center text-md-right">
            <a href="https://facebook.com" className="text-white me-2">Facebook</a>
            <a href="https://twitter.com" className="text-white me-2">Twitter</a>
            <a href="https://instagram.com" className="text-white">Instagram</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
