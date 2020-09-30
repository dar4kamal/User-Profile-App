import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
		gender: "male",
	});
	const [loaded, setLoaded] = useState(false);
	const [errors, setErrors] = useState([]);

	const { name, email, password, passwordConfirm, gender } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		console.log(e.target.name, e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
	};
	if (loaded) return <Redirect to="/dashboard" />;

	return (
		<Fragment>
			<Link to="/">
				<i className="fas fa-arrow-left"></i>
			</Link>
			<h1 className="large text-primary">Register new account</h1>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<label> Full Name</label>
					<input
						type="text"
						placeholder="Full name"
						name="name"
						value={name}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<label> Email</label>
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						required
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<label> Password</label>
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						required
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<label> Re-type Password</label>
					<input
						type="password"
						placeholder="Confirm Password"
						name="passwordConfirm"
						required
						value={passwordConfirm}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<label> Gender </label>
					<select
						value={gender}
						onChange={(e) => onChange(e)}
						required
						name="gender"
					>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
		</Fragment>
	);
};

export default Register;
