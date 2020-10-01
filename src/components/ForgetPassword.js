import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Alert from "./Alert";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const ForgetPassword = () => {
	const [formData, setFormData] = useState({
		email: "",
	});
	const [errors, setErrors] = useState([]);
	const [emailSent, setEmailSent] = useState(false);
	const { email } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const { data } = await axios.post(
				`${ApiBaseUri}/api/auth/forgetPass`,
				formData,
				config
			);
			if (data.email) {
				setEmailSent(true);
				localStorage.setItem("email", data.email);
			}
		} catch (err) {
			setErrors(err.response.data.errors);
		}
	};

	if (emailSent) return <Redirect to="/reset" />;
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
					<Link to="/login">
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
					Reset your password
				</h4>
			</div>
			<div
				className="bg-light"
				style={{ borderTopRightRadius: "25px", borderTopLeftRadius: "25px" }}
			>
				<div>
					<img
						variant="top"
						src="https://www.edgybrain.com/wp-content/uploads/mobile-app.png"
						alt="home"
						width="100%"
						heigth="100%"
						className="m-2 pr-4 pl-4 pt-3"
					/>
					<h4
						className="large pt-1 text-center"
						style={{
							fontSize: 21,
							color: "#0b324d",
						}}
					>
						Reset Password
					</h4>
					<h4
						className="large pt-1 text-center"
						style={{
							fontSize: 12,
						}}
					>
						Enter your email address
					</h4>
				</div>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group  pt-3 pl-4 pr-4">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Please enter your email"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<input
						type="submit"
						className="btn btn-primary mt-3 mr-2 ml-3 float-none"
						style={{ width: "90%" }}
						value="Reset Password"
					/>
				</form>
				{errors ? (
					errors.map((e) => {
						return <Alert key={e.msg} msg={e.msg} />;
					})
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
};

export default ForgetPassword;
