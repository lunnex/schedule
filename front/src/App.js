import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import About from './components/about';
import Contacts from './components/contacts';
import MainContent from './components/mainContent'; 
import Footer from './components/footer';

const App = () => {
  return (
    <Router>
      <Header />
      <ContentWrapper />
    </Router>
  );
};

const ContentWrapper = () => {
  return (
    <div>

      <Routes>
        <Route exact path="/" element={<MainContent />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contacts />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
