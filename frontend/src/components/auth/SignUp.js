import React, { useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from "../../store/auth/actions";

import { useHistory } from "react-router-dom";
const SignUp = () => {
  const { errors, register, watch, handleSubmit } = useForm();
  const passwordRef = useRef({});
  passwordRef.current = watch("password", "");

  const dispatch = useDispatch();
  let History = useHistory();

  const submitEventHandler = ({ username, email, password }) => {
    dispatch(actions.signUp(username, email, password)).then((res) => {
      History.push("/login");
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: 15 }}>
      <form onSubmit={handleSubmit(submitEventHandler)}>
        <div className="form-group mb-2">
          <input
            type="username"
            className="form-control"
            ref={register({
              required: "Username is required",
              minLength: {
                value: 2,
                message: "Username must have at least 2 characters",
              },
            })}
            name="username"
            placeholder="username"
          />
          {errors.username && (
            <p className="alert alert-danger mt-2">{errors.username.message}</p>
          )}
        </div>
        <div className="form-group mb-2">
          <input
            type="email"
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Email invalid",
              },
            })}
            className="form-control"
            name="email"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="alert alert-danger mt-2">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            ref={register({
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
            name="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="alert alert-danger mt-2">{errors.password.message}</p>
          )}
        </div>
        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            ref={register({
              validate: (value) =>
                value === passwordRef.current || "The passwords do not match",
            })}
            name="password_repeat"
            placeholder="Password Confirmation"
          />
        </div>
        {errors.password_repeat && (
          <p className="alert alert-danger mt-2">
            {errors.password_repeat.message}
          </p>
        )}
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
