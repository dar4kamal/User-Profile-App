import React, { useState, Fragment } from "react";
import { Button } from "react-bootstrap";
import EditEmail from "./editForms/EditEmail";
import EditGender from "./editForms/EditGender";
import EditName from "./editForms/EditName";

const ProfileItem = ({ title, type, data, setuserdata, userdata }) => {
	const [modalShow, setModalShow] = useState(false);

	const RenderSwitch = ({ type, setuserdata, userdata }) => {
		switch (type) {
			case "name":
				return (
					<EditName
						setuserdata={setuserdata}
						userdata={userdata}
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>
				);
			case "email":
				return (
					<EditEmail
						setuserdata={setuserdata}
						userdata={userdata}
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>
				);
			case "gender":
				return (
					<EditGender
						setuserdata={setuserdata}
						userdata={userdata}
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>
				);
			default:
				return <div></div>;
		}
	};

	return (
		<Fragment>
			<div className="bg-light" style={{ border: "none" }}>
				<small>{title}</small>
				<Button
					variant="danger"
					className="float-right"
					onClick={() => setModalShow(true)}
				>
					Edit
				</Button>
				{data.hasOwnProperty("country") ? (
					data.city === "" ? (
						<p>Please add address</p>
					) : (
						<p>
							{data.city},{data.country}
						</p>
					)
				) : (
					<p>{data}</p>
				)}
				<RenderSwitch
					type={type}
					setuserdata={setuserdata}
					userdata={userdata}
				/>
			</div>
		</Fragment>
	);
};

export default ProfileItem;
