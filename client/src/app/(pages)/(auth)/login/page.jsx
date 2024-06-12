"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { loginfunction } from "@/app/lib/Services/api";
import { CircleUser, Fingerprint } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { useForm } from "react-hook-form";
import "./login.css";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await loginfunction(data.email, data.password);
      if (response && response.exists) {
        const { token } = response;
        const { _id } = response.user;
        sessionStorage.setItem("auth_token", token);
        if (response.user.role === 'admin' || response.user.role === 'institute admin' || response.user.role === 'super admin') {
          sessionStorage.setItem("adminId", _id);
        }
        else {
          sessionStorage.setItem("userId", _id);
        }

        setTimeout(() => {
          toast.success("Login Successful");
          router.push('/dashboard');
        }, 500);
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
          <form className="my-form" onSubmit={handleSubmit(onSubmit)}>
            <span className="login-welcome-row">
              <Image src='/astronaut.jpg' width={80} height={80} className="login-welcome" alt="main logo img" />
              <h1>LogIn</h1>
            </span>
            <div>
              <div className="text-field">
                <label htmlFor="email">User email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email", { required: "Email is Required.", pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid." } })}
                  placeholder="Enter email"
                  autoComplete="off"
                  required
                />
                <CircleUser color="#1D3A70" strokeWidth={1.5} />
              </div>
              <div className="validation-wrapper">
                {errors.email && <p className="validation-error">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <div className="text-field">
                <label htmlFor="password">Enter Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  {...register("password", { required: "Password is Required", minLength: { value: 2, message: "Password too short" } })}
                  placeholder="Enter Your Password"
                  required
                />
                <Fingerprint color="#1D3A70" strokeWidth={1.5} />
              </div>
              <div className="validation-wrapper">
                {errors.password && <p className="validation-error">{errors.password.message}</p>}
              </div>
            </div>
            <div className="Verify_Otp">
              <button
                type="submit"
                className="my-form__button"
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