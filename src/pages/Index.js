import React from "react";
import HomeMenu from "../components/HomeMenu";
import TopMenu from "../components/TopMenu";
import { NavLink, useNavigate } from "react-router-dom";
import { Carousel } from "antd";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div id="index">
      {/* <TopMenu data={true} /> */}

      <HomeMenu />

      <div className="banner">
        <Carousel autoplay>
          <div>
            <img
              src="./img/b1.jpg"
              alt=""
              onClick={() => {
                navigate("/portfolio");
              }}
            />
          </div>
          <div>
            <img
              src="./img/b2.jpg"
              alt=""
              onClick={() => {
                navigate("/portfolio");
              }}
            />
          </div>
          <div>
            <img
              src="./img/b3.jpg"
              alt=""
              onClick={() => {
                navigate("/portfolio");
              }}
            />
          </div>
          <div>
            <img
              src="./img/b4.jpg"
              alt=""
              onClick={() => {
                navigate("/portfolio");
              }}
            />
          </div>
          <div>
            <img
              src="./img/b5.jpg"
              alt=""
              onClick={() => {
                navigate("/portfolio");
              }}
            />
          </div>
        </Carousel>
      </div>

      <div className="welcome">
        <p>welcome to</p>
        <strong>NAM IHOME</strong>
        <button type="button">
          <p>
            <NavLink to={"/portfolio"}>
              View our work{" "}
              <span>
                <i className="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </p>
        </button>
      </div>
    </div>
  );
};

export default Index;
