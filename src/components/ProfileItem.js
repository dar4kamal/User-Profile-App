import React, { Fragment } from "react";

const ProfileItem = ({ title, data }) => {
	return (
		<Fragment>
			<div className="bg-light" style={{ border: "none" }}>
				<small>{title}</small>
				<button
					className="btn btn-danger float-right"
					onClick={() => {
						alert(`change ${title}`);
					}}
				>
					Edit
				</button>
				{data.country ? (
					<p>
						{data.city},{data.country}
					</p>
				) : (
					<p>{data}</p>
				)}
			</div>
		</Fragment>
	);
};

export default ProfileItem;
