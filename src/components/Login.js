import axios from "axios";
import React, { Fragment, useState } from "react";
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
		<Fragment>
			<Link to="/">
				<i className="fas fa-arrow-left"></i>
			</Link>

			<h4 className="large text-primary">log in to your account</h4>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Please enter your email"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Please enter your password"
						name="password"
						value={password}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			{errors ? (
				errors.map((e) => {
					return <Alert key={e.msg} msg={e.msg} />;
				})
			) : (
				<div></div>
			)}
		</Fragment>
	);
};

export default Login;
