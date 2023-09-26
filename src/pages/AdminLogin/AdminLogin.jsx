import React, { useEffect } from "react";
import axios from "axios";
import Title from "../../components/Title/Title";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import classes from "./AdminLogin.module.css";
const AdminLogin = () => {
  const [user, setUser] = useState();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const getUser = async () => {
    const users = await axios.get("http://localhost:3004/user");
    setUser(users.data);
    console.log(users.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = () => {
    if (
      user.some((item) => item.login === login && item.password === password)
    ) {
      localStorage.setItem("user", "userData");
      navigate("/");
    } else {
      alert(false);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Title title="Admin Panel" />
        <div className={classes.formbox}>
          <form>
            <div>
              <label htmlFor="login">Login</label> <br />
              <input
                type="text"
                id="login"
                name="login"
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className={classes.inputBox}>
              <label htmlFor="password">Password</label> <br />
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={classes.submitBox}>
              <button className={classes.submit} onClick={() => handleSubmit()}>
                Sign in{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
