import React, { useState } from "react";
import SignIn from "./UI/Signin";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducer/useSlicer";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const submitForm = async (val) => {
    const { email, password } = val;
    const req = { email: email, password: password };
    // console.log(req);
    try {
      setLoading(true);
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const data = await response.json();
      // console.log(data);
      if (response.ok && data.token) {
        dispatch(
          login({
            ...val,
            data: data.token,
            isLoggedin: true,
            error: null,
          })
        );
        navigate("/dashboard");
      }
      if (!response.ok || data.error) {
        throw new Error("User not found");
      }
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(true);
      // console.log("here", err.message);
      dispatch(
        login({
          ...val,
          error: err.message,
          isLoggedin: false,
          data: null,
        })
      );
      setLoginError(err.message);
      setLoading(false);
      // }
    }
  };

  return (
    <div>
      <SignIn
        getData={submitForm}
        loginError={loginError}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Login;
