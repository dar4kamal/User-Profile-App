import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Alert from "../Alert";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const ChangePassword = () => {
	const [formData, setFormData] = useState({
		newPassword: "",
		passwordConfirm: "",
	});
	const [loaded, setLoaded] = useState(false);
	const [errors, setErrors] = useState([]);

	const { newPassword, passwordConfirm } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
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
				`${ApiBaseUri}/api/auth/editPass`,
				formData,
				config
			);

			if (data.msg) {
				const res = await axios.post(
					`${ApiBaseUri}/api/users/login`,
					{ email, password: newPassword },
					config
				);
				localStorage.setItem("token", res.data.token);
				setLoaded(true);
			}
		} catch (err) {
			setErrors(err.response.data.errors);
		}
	};
	if (loaded) return <Redirect to="/dashboard" />;

	return (
		<Fragment>
			<h1 className="large text-primary">Change Password</h1>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<label> Password</label>
					<input
						type="password"
						placeholder="Password"
						name="newPassword"
						value={newPassword}
						required
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<label> Re-type Password</label>
					<input
						type="password"
						placeholder="Confirm Password"
						name="passwordConfirm"
						required
						value={passwordConfirm}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
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

export default ChangePassword;
