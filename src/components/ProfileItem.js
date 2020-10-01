import React, { useState } from "react";
import EditAddress from "./editForms/EditAddress";
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
			case "address":
				return (
					<EditAddress
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
		<div className="">
			<div>
				<small className="float-left pl-3">{title}</small>
				<h5
					className="float-right p-1 pr-3"
					style={{ color: "#1e3dc7" }}
					onClick={() => setModalShow(true)}
				>
					<small>Edit</small>
				</h5>
			</div>
			<div className="">
				{data.hasOwnProperty("country") ? (
					data.city === "" ? (
						<p
							className="text-left"
							style={{ paddingTop: "20px", paddingLeft: "15px" }}
						>
							<strong>Please add address</strong>
						</p>
					) : (
						<p
							className="text-left"
							style={{ paddingTop: "20px", paddingLeft: "15px" }}
						>
							<strong>
								{data.city},{data.country}
							</strong>
						</p>
					)
				) : (
					<p
						className="text-left"
						style={{ paddingTop: "20px", paddingLeft: "15px" }}
					>
						<strong>{data}</strong>
					</p>
				)}
			</div>

			<RenderSwitch type={type} setuserdata={setuserdata} userdata={userdata} />
		</div>
	);
};

export default ProfileItem;
