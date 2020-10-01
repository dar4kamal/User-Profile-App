import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Alert from "../Alert";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const ChangePass = () => {
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
		<div
			style={{
				backgroundColor: "#53D7BC",
				borderTopRightRadius: "25px",
				borderTopLeftRadius: "25px",
			}}
		>
			<div className="pt-5">
				<h1
					className="large pt-5 pl-4 pb-4"
					style={{
						color: "white",
						fontSize: 26,
					}}
				>
					Change Password
				</h1>
			</div>
			<div
				className="bg-light"
				style={{ borderTopRightRadius: "25px", borderTopLeftRadius: "25px" }}
			>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group pt-4 pl-4 pr-4">
						<label>New Password</label>
						<input
							type="password"
							className="form-control"
							placeholder="Password"
							name="newPassword"
							value={newPassword}
							required
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group pt-3 pl-4 pr-4">
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
					<input
						type="submit"
						className="btn btn-primary mt-3 mr-2 ml-3 float-none"
						style={{ width: "90%" }}
						value="Change Password"
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

export default ChangePass;
