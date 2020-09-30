import axios from "axios";
import React, { Fragment, useState } from "react";
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

	const email = localStorage.getItem("email");
	if (email) axios.defaults.headers.common["x-user-data"] = email;

	const resendCode = async () => {
		try {
			await axios.post(`${ApiBaseUri}/api/auth/forgetPass`, { email }, config);
		} catch (err) {
			setErrors(err.response.data.errors);
		}
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
		<Fragment>
			<Link to="/reset">
				<i className="fas fa-arrow-left"></i>
			</Link>

			<h4 className="large text-primary">Confirmation Code</h4>

			<p> Insert your 4-digit Code here:</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
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
				<Link
					to="/reset"
					className="float-left"
					onClick={async () => {
						await resendCode();
					}}
				>
					Resend Code
				</Link>
				<Link to="/forget" className="float-right">
					Change Email
				</Link>
				<input
					type="submit"
					className="btn btn-primary mt-5"
					value="Continue"
				/>
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

export default ResetPassword;
