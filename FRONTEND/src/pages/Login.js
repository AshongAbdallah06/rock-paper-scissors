import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Logo from "../components/Logo";

const Login = () => {
	const Schema = yup.object().shape({
		email: yup
			.string()
			.required("This field is required")
			.matches(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Please enter a valid email address"
			),
		password: yup
			.string()
			.required("This field is required")
			.min(8, "Password must be at least 8 characters")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
				"Please enter a strong password"
			),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(Schema),
	});

	const [error, setError] = useState({ email: "", password: "" });

	const onsubmit = async (data) => {
		try {
			const response = await Axios.post(
				"https://rock-paper-scissors-app-iybf.onrender.com/api/user/login",
				{
					email: data?.email,
					password: data?.password,
				}
			);

			const user = await response.data;

			if (user) {
				setError({ email: "", password: "" });
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem("token", JSON.stringify(user.token));
			}
			window.location.href = "/";
		} catch (err) {
			const errors = err.response?.data?.error;

			if (error) {
				setError({ email: errors.email, password: errors.password });
			} else {
				setError({ email: null, password: null });
			}
		}
	};

	return (
		<form
			className="auth-form"
			onSubmit={handleSubmit(onsubmit)}
		>
			<Logo />

			<Link
				to="/signup"
				className="link-item links"
			>
				Signup
			</Link>
			<h1>Login</h1>

			<div className="form-group">
				<label>Email</label>
				<input
					type="text"
					{...register("email")}
				/>
				<p>{errors?.email?.message || error?.email}</p>
			</div>

			<div className="form-group">
				<label>Password</label>
				<input
					type="password"
					{...register("password")}
				/>
				<p>{errors?.password?.message || error?.password}</p>
			</div>

			<button className="login-btn">Login</button>
		</form>
	);
};

export default Login;
