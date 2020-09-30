import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const EditAddress = (props) => {
	const { userdata, setuserdata } = props;
	const [formData, setFormData] = useState({
		country: "",
		city: "",
	});
	// const [countries, setCountries] = useState([]);
	// const [cities, setCities] = useState([]);

	const { country, city } = formData;
	// const getAddress = async (type) => {
	// 	try {
	// 		const { data } = await axios.get(`${ApiBaseUri}/api/users/${type}`);

	// 		if (data) {
	// 			if (type === "country") setCountries(data.countries);
	// 			if (type === "city") setCities(data.cities);
	// 		}
	// 	} catch (err) {
	// 		console.log(err.response.data.errors);
	// 	}
	// };
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// useEffect(() => {
	// 	getAddress("country");
	// }, []);
	// useEffect(() => {
	// 	getAddress("city");
	// }, []);

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
							placeholder="Enter your Country"
							name="country"
							value={country}
							onChange={(e) => onChange(e)}
							required
						/>
						{/* <select
							value={country}
							onChange={(e) => onChange(e)}
							required
							name="country"
						>
							{countries.map((c) => {
								return (
									<option key={c} value={c}>
										{c}
									</option>
								);
							})}
						</select> */}
					</div>
					<div className="form-group">
						<label> City </label>
						{/* <select
							value={city}
							onChange={(e) => onChange(e)}
							required
							name="city"
						>
							{cities.map((c) => {
								return (
									<option key={c} value={c}>
										{c}
									</option>
								);
							})}
						</select> */}
						<input
							type="text"
							placeholder="Enter your City"
							name="city"
							value={city}
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

export default EditAddress;
