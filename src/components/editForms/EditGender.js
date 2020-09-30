import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const EditGender = (props) => {
	const { userdata, setuserdata } = props;
	const [formData, setFormData] = useState({
		newGender: "",
	});

	const { newGender } = formData;
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
			const { data } = await axios.put(
				`${ApiBaseUri}/api/users`,
				formData,
				config
			);

			if (data.msg) {
				localStorage.setItem("token", data.token);
				setuserdata({ ...userdata, gender: newGender });
				props.onHide();
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
					Edit Gender
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<label> Gender </label>
						<select
							value={newGender}
							onChange={(e) => onChange(e)}
							required
							name="newGender"
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>
					<input type="submit" className="btn btn-primary" value="Edit" />
				</form>
			</Modal.Body>
		</Modal>
	);
};

export default EditGender;
