"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { loginfunction } from "@/app/lib/Services/api";
import { Phone, Fingerprint } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginfunction(email, password);
      console.log(response);
      if (response && response.exists) {
        const { token } = response;
        sessionStorage.setItem("auth_token", token);

        setTimeout(() => {
          toast.success("Login Successful");
          router.push('/dashboard');
        }, 1000);
      } else {
        console.log("Fetching error");
        toast.error("Login Failed")
        router.push('/');
      }
    } catch (error) {
      console.log("Server Error", error);
      toast.error("Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <span className="centering">
          <form className="my-form">
            <span className="login-welcome-row">
              <img src='/astronaut.jpg' className="login-welcome" alt="main logo img" />
              <h1>LogIn</h1>
            </span>
            <div className="text-field">
              <label htmlFor="email">User email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                autoComplete="off"
                required
              />
              <Phone color="#1D3A70" strokeWidth={1.5} />
            </div>
            <div className="text-field">
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                maxLength={6}
              />
              <Fingerprint color="#1D3A70" strokeWidth={1.5} />
            </div>
            <div className="Verify_Otp">
              <button
                type="submit"
                className="my-form__button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Verify User'}
              </button>
            </div>
          </form>
          <div id="sign-in-button"></div>
        </span>
      </div>
    </>
  );
};

export default Login;
