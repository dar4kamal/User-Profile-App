import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
		gender: "male",
	});
	const [loaded, setLoaded] = useState(false);
	const [errors, setErrors] = useState([]);

	const { name, email, password, passwordConfirm, gender } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const { data } = await axios.post(
				`${ApiBaseUri}/api/users/register`,
				formData,
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
				borderTopRightRadius: "25px",
				borderTopLeftRadius: "25px",
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

				<h1
					className="large pl-4 pb-4"
					style={{
						color: "white",
						fontSize: 26,
					}}
				>
					Register new account
				</h1>
			</div>
			<div
				className="bg-light"
				style={{ borderTopRightRadius: "25px", borderTopLeftRadius: "25px" }}
			>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group pt-3 pl-4 pr-4">
						<label> Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full name"
							name="name"
							value={name}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="form-group pl-4 pr-4">
						<label> Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Email Address"
							name="email"
							value={email}
							required
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group pl-4 pr-4">
						<label> Password</label>
						<input
							type="password"
							className="form-control"
							placeholder="Password"
							name="password"
							value={password}
							required
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group pl-4 pr-4">
						<label> Re-type Password</label>
						<input
							type="password"
							className="form-control"
							placeholder="Confirm Password"
							name="passwordConfirm"
							required
							value={passwordConfirm}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group pl-4 pr-4">
						<label> Gender </label>
						<select
							value={gender}
							className="form-control"
							onChange={(e) => onChange(e)}
							required
							name="gender"
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>
					<input
						type="submit"
						className="btn btn-primary mt-3 mr-2 ml-3 mb-3 float-none"
						style={{ width: "90%" }}
						value="Register"
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

export default Register;
