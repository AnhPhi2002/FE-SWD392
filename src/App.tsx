import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Header from "./components/share/header";
import Home from "./pages/home";
import About from "./pages/about";
import Footer from "./components/share/footer";
import Login from "./pages/login";
import Profile from "./pages/profile";

function App() {
  const isLogin = true;
  return (
    <Router>
      {isLogin && (
        <div>
          <Header />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )}
      {!isLogin && (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
