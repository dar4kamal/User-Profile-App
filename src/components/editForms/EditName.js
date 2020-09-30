import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const EditName = (props) => {
	const { userdata, setuserdata } = props;
	const [formData, setFormData] = useState({
		newName: "",
	});

	const { newName } = formData;
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		props.onHide();
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const { data } = await axios.put(
				`${ApiBaseUri}/api/users`,
				formData,
				config
			);

			if (data.msg) {
				localStorage.setItem("token", data.token);
				setuserdata({ ...userdata, name: newName });
			}
		} catch (err) {
			console.log(err.response.data.errors);
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
					Edit Full Name
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Enter your new name"
							name="newName"
							value={newName}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<input type="submit" className="btn btn-primary" value="Edit" />
				</form>
			</Modal.Body>
		</Modal>
	);
};

export default EditName;
