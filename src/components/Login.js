import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Alert from "./Alert";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [loaded, setLoaded] = useState(false);
	const [errors, setErrors] = useState([]);

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify({ email, password });
		try {
			const { data } = await axios.post(
				`${ApiBaseUri}/api/users/login`,
				body,
				config
			);
			localStorage.setItem("token", data.token);
			setLoaded(true);
		} catch (err) {
			setErrors(err.response.data.errors);
		}
	};

	if (loaded) return <Redirect to="/dashboard" />;
	return (
		<div
			style={{
				backgroundColor: "#53D7BC",
			}}
		>
			<div className="w-100">
				<div className="pt-5 pb-2 pl-4 mb-2">
					<Link to="/">
						<i
							className="fas fa-m fa-arrow-left"
							style={{ color: "white" }}
						></i>
					</Link>
				</div>

				<h4
					className="large pl-4 pb-4"
					style={{
						color: "white",
						fontSize: 26,
					}}
				>
					log in to your account
				</h4>
			</div>
			<div
				className="bg-light"
				style={{ borderTopRightRadius: "25px", borderTopLeftRadius: "25px" }}
			>
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="form-group pt-5 pl-4 pr-4">
						<label>Email</label>
						<input
							className="form-control"
							type="email"
							placeholder="Please enter your email"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="form-group pl-4 pr-4">
						<label>Password</label>
						<input
							className="form-control"
							type="password"
							placeholder="Please enter your password"
							name="password"
							value={password}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<Link to="/forget" className="float-right pr-4">
						<small>Forget Password?</small>
					</Link>
					<br />
					<input
						type="submit"
						className="btn btn-primary mt-3 mr-2 ml-3 float-none"
						style={{ width: "90%" }}
						value="Login"
					/>
				</form>
			</div>
			{errors ? (
				errors.map((e) => {
					return <Alert key={e.msg} msg={e.msg} />;
				})
			) : (
				<div></div>
			)}
		</div>
	);
};

export default Login;
