import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
	const token = localStorage.getItem("token");
	if (token) localStorage.removeItem("token");
	const email = localStorage.getItem("email");
	if (email) localStorage.removeItem("email");

	return (
		<div className="w-100" style={{ backgroundColor: "#53D7BC" }}>
			<div>
				<img
					variant="top"
					src="https://www.edgybrain.com/wp-content/uploads/mobile-app.png"
					alt="home"
					width="90%"
					heigth="90%"
					className="rounded mx-auto d-block mb-4"
				/>
			</div>
			<div
				className="bg-light pt-2"
				style={{ borderTopRightRadius: "25px", borderTopLeftRadius: "25px" }}
			>
				<div
					className="text-center mt-4"
					style={{ width: "100%", border: "none" }}
				>
					<div>
						<h4 className="">
							<strong>Welcome to our app!</strong>
						</h4>
						<div style={{ lineHeight: 0.3 }} className="p-2">
							<p>This is the first version of user profile app.</p>
							<p>Please sign in or create an account below</p>
						</div>
						<div className="p-1 w-60">
							<Link
								to="/login"
								style={{ width: "90%" }}
								variant="primary"
								className="btn btn-primary m-2"
							>
								Log in
							</Link>
							<Link
								to="/register"
								style={{ width: "90%" }}
								variant="primary"
								className="m-2 btn btn-primary"
							>
								Create New Account
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
