import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";

import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
	return (
		<Router>
			<Fragment>
				<Container>
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/forget" component={ForgetPassword} />
						<Route exact path="/reset" component={ResetPassword} />
					</Switch>
				</Container>
			</Fragment>
		</Router>
	);
};

export default App;
