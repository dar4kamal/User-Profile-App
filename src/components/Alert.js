import React from "react";

const Alert = ({ msg }) => {
	return (
		<div className={`alert alert-danger`} style={{ margin: "10vh 2vh 0 2vh" }}>
			{msg}
		</div>
	);
};

export default Alert;
