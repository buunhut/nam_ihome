import React from "react";
import "./app.scss";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Detail from "./pages/Detail";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import BackToTop from "./components/BackToTop";
import OverlayMenu from "./components/OverlayMenu";
import Tool from "./components/Tool";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:ten" element={<Detail />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/tool" element={<Tool />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <OverlayMenu />
      <BackToTop />
    </BrowserRouter>
  );
};

export default App;
