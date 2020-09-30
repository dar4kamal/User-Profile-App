import axios from "axios";
import React, { Fragment, useState } from "react";
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
		<Fragment>
			<Link to="/login">
				<i className="fas fa-arrow-left"></i>
			</Link>

			<h4 className="large text-primary">Reset your password</h4>
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
				<input
					type="submit"
					className="btn btn-primary"
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
		</Fragment>
	);
};

export default ForgetPassword;
