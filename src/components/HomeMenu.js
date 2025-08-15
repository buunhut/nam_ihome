import React from "react";
import { useDispatch } from "react-redux";
import { updateOverlay } from "../redux/dataSlice";

const HomeMenu = () => {
  const dispatch = useDispatch();
  const handleClickOpenMenu = () => {
    dispatch(updateOverlay(true));
  };
  return (
    <div id="homeMenu">
      <div className="bar" onClick={handleClickOpenMenu}>
        <i className="fa-solid fa-bars"></i>
        Menu
      </div>
      <div className="brandName">
        <img src="./img/iconMenuW.png" alt="" />

        <p>invest - realty</p>
      </div>
      <div className="iconContact">
        <a
          href="https://www.facebook.com/NamiHome.Official/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="https://www.youtube.com/@namihomesaigon" target="_blank">
          <i className="fa-brands fa-youtube"></i>
        </a>
        <a href="mailto:namihome.saigon@gmail.com">
          <i className="fa-solid fa-envelope"></i>
        </a>
        <a href="tel:+84903052135">
          <i className="fa-solid fa-phone"></i>
        </a>
      </div>
    </div>
  );
};

export default HomeMenu;
