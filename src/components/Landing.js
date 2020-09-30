import React, { Fragment } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Landing = () => {
	const token = localStorage.getItem("token");
	if (token) localStorage.removeItem("token");
	const email = localStorage.getItem("email");
	if (email) localStorage.removeItem("email");

	return (
		<Fragment>
			<div>
				<img
					variant="top"
					src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?size=338&ext=jpg"
					alt="home"
					width="90%"
					heigth="90%"
					className="rounded mx-auto d-block mb-4"
				/>
			</div>
			<div className="bg-light">
				<Card
					className="text-center mt-4"
					style={{ width: "100%", border: "none" }}
				>
					<Card.Body>
						<Card.Title>Welcome to our app!</Card.Title>
						<Card.Text>
							This is the first version of user profile app.
						</Card.Text>
						<Card.Text>Please sign in or create an account below</Card.Text>
						<Link
							to="/login"
							style={{ width: "100%" }}
							variant="primary"
							className="btn btn-primary m-2"
						>
							Log in
						</Link>
						<Link
							to="/register"
							style={{ width: "100%" }}
							variant="primary"
							className="m-2 btn btn-primary"
						>
							Create New Account
						</Link>
					</Card.Body>
				</Card>
			</div>
		</Fragment>
	);
};

export default Landing;
