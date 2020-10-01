import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Alert from "../Alert";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const RemoveAccount = (props) => {
	const [formData, setFormData] = useState({
		password: "",
	});
	const [removed, setRemoved] = useState(false);
	const [errors, setErrors] = useState([]);

	const { password } = formData;
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
			console.log(email, formData);
			const { data } = await axios.post(
				`${ApiBaseUri}/api/auth/remove`,
				formData,
				config
			);
			console.log(data.msg);
			if (data.msg) {
				setRemoved(true);
				props.onHide();
			}
		} catch (err) {
			setErrors(err.response.data.errors);
		}
	};

	if (removed) return <Redirect to="/" />;
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Remove Account
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<label>Password</label>
						<input
							className="form-control"
							type="password"
							placeholder="Enter your password"
							name="password"
							value={password}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<input
						type="submit"
						className="btn btn-danger mt-3 mr-2 ml-3 float-none"
						style={{ width: "90%" }}
						value="Remove Account"
					/>
				</form>
				{errors ? (
					errors.map((e) => {
						return <Alert key={e.msg} msg={e.msg} />;
					})
				) : (
					<div></div>
				)}
			</Modal.Body>
		</Modal>
	);
};

export default RemoveAccount;
