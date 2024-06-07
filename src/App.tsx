import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet
} from 'react-router-dom';
import Header from './components/share/header';
import Home from './pages/home';
import About from './pages/about';
import Footer from './components/share/footer';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
    
        </div>
        <Footer/>  
      </div>
    </Router>
  );
}

export default App;
