import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import axios from "axios";
import ProfileItem from "./ProfileItem";

const ApiBaseUri = "https://fathomless-mountain-35942.herokuapp.com";

const Dashboard = () => {
	const [loaded, setLoaded] = useState(false);
	const [userData, setUserData] = useState({});

	const { name, email, address, gender, imageUrl } = userData;

	const token = localStorage.getItem("token");
	if (token) axios.defaults.headers.common["x-auth-token"] = token;

	const fetchData = async () => {
		const { data } = await axios.get(`${ApiBaseUri}/api/users`);
		setUserData(data.userData);
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
					src="https://res.cloudinary.com/dar4kamal/image/upload/v1601398993/Paul-18-512_vvclwb.png"
					alt=""
					onClick={() => {
						alert("change Image");
					}}
				/>
				<ProfileItem title="Full Name" data={name} />
				<ProfileItem title="Email" data={email} />
				<ProfileItem title="Address" data={address} />
				<ProfileItem title="Gender" data={gender} />
				<div className="bg-light" style={{ border: "none" }}>
					<button
						className="btn btn-primary float-right m-1"
						style={{ width: "100%" }}
						onClick={() => {
							alert("change password");
						}}
					>
						Change Password
					</button>
					<button
						className="btn btn-danger float-right m-1"
						style={{ width: "100%" }}
						onClick={() => {
							alert("remove account");
						}}
					>
						Remove Account
					</button>
				</div>
			</div>
		</Fragment>
	);
};

export default Dashboard;