import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const EditPassword = (props) => {
	const [formData, setFormData] = useState({
		oldPassword: "",
		newPassword: "",
		passwordConfirm: "",
	});

	const { oldPassword, newPassword, passwordConfirm } = formData;
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
			const email = localStorage.getItem("email");
			if (email) axios.defaults.headers.common["x-user-data"] = email;
			const { data } = await axios.post(
				`${ApiBaseUri}/api/auth/editPass`,
				formData,
				config
			);
			console.log(data.msg);
			if (data.msg) {
				props.onHide();
			}
		} catch (err) {
			console.log("error", err.response.data.errors);
		}
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Edit Password
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<label>Old Password</label>
						<input
							type="password"
							className="form-control"
							placeholder="Enter your old password"
							name="oldPassword"
							value={oldPassword}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="form-group">
						<label>New Password</label>
						<input
							type="password"
							className="form-control"
							placeholder="Enter your new password"
							name="newPassword"
							value={newPassword}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Re Type Password</label>
						<input
							className="form-control"
							type="password"
							placeholder="Retype Password"
							name="passwordConfirm"
							value={passwordConfirm}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<input
						type="submit"
						className="btn btn-primary mt-3 mr-2 ml-3 float-none"
						style={{ width: "90%" }}
						value="Edit"
					/>
				</form>
			</Modal.Body>
		</Modal>
	);
};

export default EditPassword;
