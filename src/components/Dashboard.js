import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import axios from "axios";
import ProfileItem from "./ProfileItem";
import EditPassword from "./editForms/EditPassword";
import EditImage from "./editForms/EditImage";
import RemoveAccount from "./editForms/RemoveAccount";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const Dashboard = () => {
	const [modalShow, setModalShow] = useState(false);
	const [modalShowImage, setModalShowImage] = useState(false);
	const [modalShowAccount, setModalShowAccount] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [userData, setUserData] = useState({});

	const { name, email, address, gender, imageUrl } = userData;

	const token = localStorage.getItem("token");
	if (token) axios.defaults.headers.common["x-auth-token"] = token;

	const fetchData = async () => {
		const { data } = await axios.get(`${ApiBaseUri}/api/users`);
		setUserData(data.userData);
		localStorage.setItem("email", data.userData.email);
		setLoaded(true);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return !loaded ? (
		<Spinner />
	) : (
		<div className="bg-light">
			<div className="p-5">
				<Link to="/" className="float-right" style={{ color: "black" }}>
					<i className="fa fa-m fa-power-off"></i>
				</Link>
				<div className="text-center text-dark">
					<strong>MY PROFILE</strong>
				</div>
			</div>

			<div className="text-center">
				<img
					style={{
						borderRadius: "50% 50%",
						width: "40%",
						heigth: "40%",
						border: "1px solid black",
					}}
					src={imageUrl}
					className="mr-3 ml-3 mb-3"
					alt=""
					onClick={() => {
						setModalShowImage(true);
					}}
				/>
				<h1
					className="large"
					style={{
						color: "black",
						fontSize: 26,
					}}
				>
					<strong>{name}</strong>
				</h1>

				<ProfileItem
					title="Full Name"
					data={name}
					type="name"
					userdata={userData}
					setuserdata={setUserData}
				/>
				<ProfileItem
					title="Email"
					data={email}
					type="email"
					userdata={userData}
					setuserdata={setUserData}
				/>
				<ProfileItem
					title="Address"
					data={address}
					type="address"
					userdata={userData}
					setuserdata={setUserData}
				/>
				<ProfileItem
					title="Gender"
					data={gender}
					type="gender"
					userdata={userData}
					setuserdata={setUserData}
				/>

				<button
					className="btn btn-primary mt-1 mr-2 ml-3 float-none"
					style={{ width: "90%" }}
					onClick={() => {
						setModalShow(true);
					}}
				>
					Change Password
				</button>
				<button
					className="btn btn-danger mt-1 mr-2 ml-3 mb-3 float-none"
					style={{ width: "90%" }}
					onClick={() => {
						setModalShowAccount(true);
					}}
				>
					Remove Account
				</button>
				<EditImage
					userdata={userData}
					setuserdata={setUserData}
					show={modalShowImage}
					onHide={() => setModalShowImage(false)}
				/>
				<EditPassword show={modalShow} onHide={() => setModalShow(false)} />
				<RemoveAccount
					show={modalShowAccount}
					onHide={() => setModalShowAccount(false)}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
