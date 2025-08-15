import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");

  console.log(info);

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    if (!value) return;
    setInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const onLogin = () => {
    if (info.name === "LouisHuynh" && info.pass === "123123") {
      localStorage.setItem("login", true);
      navigate("/portfolio");

      //   alert("đăng nhập thành công");
    }
  };

  useEffect(() => {
    const localLogin = localStorage.getItem("login");

    if (localLogin) {
      navigate("/portfolio");
    }
  }, []);

  return (
    <div id="login">
      <h1> Login</h1>
      <form action="">
        <div className="inputItem">
          <input
            type="text"
            placeholder="Username"
            name="name"
            onChange={onchangeInput}
          />
        </div>
        <div className="inputItem">
          <input
            type="password"
            placeholder="Password"
            name="pass"
            onChange={onchangeInput}
          />
        </div>
        <button type="button" onClick={onLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
