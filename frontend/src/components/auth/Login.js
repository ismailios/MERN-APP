import React from "react";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as actions from "../../store/auth/actions";

const Login = () => {
  const { errors, register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEventSubmit = ({ email, password }) => {
    dispatch(actions.login(email, password)).then((res) => {
      history.push("/");
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: 15 }}>
      <form onSubmit={handleSubmit(handleEventSubmit)}>
        <div className="form-group mb-2">
          <input
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Email invalid",
              },
            })}
            type="email"
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
            ref={register({
              minLength: {
                value: 6,
                message: "Username must have at least 6 characters",
              },
            })}
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="alert alert-danger mt-2">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
