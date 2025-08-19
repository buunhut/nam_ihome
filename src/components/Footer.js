import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };
  return (
    <footer>
      <ul>
        <li onClick={handleToTop}>
          <NavLink to={"/portfolio"}>Nhà Đất</NavLink>
        </li>
        {/* <li onClick={handleToTop}>
          <NavLink to={"/blog"}>Phân Tích</NavLink>
        </li> */}
        <li onClick={handleToTop}>
          <NavLink to={"/contact"}>Liên Hệ</NavLink>
        </li>
      </ul>
      <p>Copyright 2025 © NAM IHOME</p>
    </footer>
  );
};

export default Footer;
