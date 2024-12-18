import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/userActions";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";

const cx = classNames.bind(styles);

const Register = () => {

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(32)
    .required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(formOptions);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const [signupAttempted, setSignupAttempted] = useState(false);

  const submitForm = (data) => {
    setSignupAttempted(true);
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (signupAttempted) {
      if (success) {
        navigate('/login');
      } else if (error) {
        toast('Email already exists!');
      }
      console.log(success,error);
    }
  }, [success, error, signupAttempted, navigate]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("box")}>
        <form className={cx("form")} onSubmit={handleSubmit(submitForm)}>
          <h2>Sign up</h2>
          <div className={cx("inputBox")}>
            <input type="email" required="required" {...register("email")} />
            <span>Email</span>

            <i></i>
          </div>
          <p className={cx("valid-error-message")}>{errors.email?.message}</p>
          <div className={cx("inputBox")}>
            <input type="text" required="required" {...register("username")} />
            <span>Username</span>
            <i></i>
          </div>
          <p className={cx("valid-error-message")}>
            {errors.username?.message}
          </p>
          <div className={cx("inputBox")}>
            <input
              type="password"
              required="required"
              {...register("password")}
            />
            <span>Password</span>
            <i></i>
          </div>
          <p className={cx("valid-error-message")}>
            {errors.password?.message}
          </p>
          <div className={cx("links")}>
            <Link to="/login" className={cx("link")}>
              Login
            </Link>
          </div>
          <input type="submit" value="Register" className={cx("btn-submit")} />
          <ToastContainer
          style={{ position: 'fixed', top:"10%" }}
          />
        </form>
      </div>
    </div>
  );
};
export default Register;
