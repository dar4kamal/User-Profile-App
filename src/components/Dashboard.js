import React, { useState, useEffect, Fragment } from "react";
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
		<Fragment>
			<Link to="/" className="float-right">
				<i className="fa fa-power-off"></i>
			</Link>
			<div className="text-center">MY PROFILE</div>
			<div>
				<img
					className="round-img my-1"
					src={imageUrl}
					alt=""
					onClick={() => {
						setModalShowImage(true);
					}}
				/>
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
				<div className="bg-light" style={{ border: "none" }}>
					<button
						className="btn btn-primary float-right m-1"
						style={{ width: "100%" }}
						onClick={() => {
							setModalShow(true);
						}}
					>
						Change Password
					</button>
					<button
						className="btn btn-danger float-right m-1"
						style={{ width: "100%" }}
						onClick={() => {
							setModalShowAccount(true);
						}}
					>
						Remove Account
					</button>
				</div>
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
		</Fragment>
	);
};

export default Dashboard;
