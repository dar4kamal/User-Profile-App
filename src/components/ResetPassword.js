import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Alert from "./Alert";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const ResetPassword = () => {
	const [formData, setFormData] = useState({
		otpCode: "",
	});
	const [errors, setErrors] = useState([]);
	const [otpVerified, setOtpVerified] = useState(false);
	const { otpCode } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const resendCode = async () => {
		try {
			const email = localStorage.getItem("email");
			await axios.post(`${ApiBaseUri}/api/auth/forgetPass`, { email }, config);
		} catch (err) {
			setErrors(err.response.data.errors);
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const email = localStorage.getItem("email");
		if (email) axios.defaults.headers.common["x-user-data"] = email;
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const { data } = await axios.post(
				`${ApiBaseUri}/api/auth/resetPass`,
				formData,
				config
			);
			if (data.msg) {
				setOtpVerified(true);
			}
		} catch (err) {
			setErrors(err.response.data.errors);
		}
	};

	if (otpVerified) return <Redirect to="/edit-password" />;
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
					<Link to="/reset">
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
					Confirmation Code
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
						Verification
					</h4>
					<h4
						className="large pt-1 text-center"
						style={{
							fontSize: 12,
						}}
					>
						Insert your 4-digit Code here:
					</h4>
				</div>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group pt-3 pl-4 pr-4">
						<input
							type="text"
							className="form-control"
							name="otpCode"
							value={otpCode}
							maxLength="4"
							min="0"
							max="9999"
							step="1"
							pattern="[0-9]{4}"
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<input
						type="submit"
						className="btn btn-primary mt-3 mr-2 ml-3 float-none"
						style={{ width: "90%" }}
						value="Continue"
					/>
					<div className="pt-2">
						<Link
							to="/reset"
							className="float-left pl-4"
							onClick={async () => {
								await resendCode();
							}}
						>
							<small>Resend Code</small>
						</Link>
						<Link to="/forget" className="float-right pr-4">
							<small>Change Email</small>
						</Link>
					</div>
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

export default ResetPassword;
