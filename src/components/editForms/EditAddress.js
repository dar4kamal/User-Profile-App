import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const EditAddress = (props) => {
	const { userdata, setuserdata } = props;
	const [formData, setFormData] = useState({
		country: "",
		city: "",
	});

	const { country, city } = formData;
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
			const newAddress = formData;
			const { data } = await axios.put(
				`${ApiBaseUri}/api/users`,
				{ newAddress },
				config
			);
			if (data.msg) {
				localStorage.setItem("token", data.token);
				setuserdata({ ...userdata, address: newAddress });
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
					Edit Address
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<label> Country </label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter your Country"
							name="country"
							value={country}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="form-group">
						<label> City </label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter your City"
							name="city"
							value={city}
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

export default EditAddress;
