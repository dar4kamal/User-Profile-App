import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

const backendApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";
const cloudinaryApiBaseUrl =
	"https://api.cloudinary.com/v1_1/dar4kamal/image/upload";
const cloudinaryApiPreset = "default_preset";

const EditName = (props) => {
	const { userdata, setuserdata } = props;
	const [image, setImage] = useState("");
	const onChange = (e) => {
		setImage(e.target.files[0]);
	};

	const uploadImage = async (formData) => {
		// console.log("begin uploading");
		// cloudinary api to upload images
		delete axios.defaults.headers.common["x-auth-token"];
		const res = await axios.post(cloudinaryApiBaseUrl, formData);
		// console.log("done uploading");
		return res.data.secure_url;
	};
	const onSubmit = async () => {
		const formData = new FormData();
		formData.append("file", image);
		formData.append("upload_preset", cloudinaryApiPreset);
		try {
			const imageUrl = await uploadImage(formData);

			// console.log("begin uploading to our backend");
			// our backend api endpoint to update imageUrl
			const token = localStorage.getItem("token");
			axios.defaults.headers.common["x-auth-token"] = token;
			const { data } = await axios.post(
				`${backendApiBaseUri}/api/users/image`,
				{
					imageUrl,
				}
			);
			// console.log("done uploading to our backend");
			setImage(data);
			setuserdata({ ...userdata, imageUrl: data });
			props.onHide();
		} catch (err) {
			console.error(err);
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
				<div className="form-group">
					<input type="file" name="image" onChange={onChange} />
				</div>
				<button onClick={onSubmit} className="btn center">
					Upload Image
				</button>
			</Modal.Body>
		</Modal>
	);
};

export default EditName;
