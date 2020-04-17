import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import NavBar from "./views/NavBar";
import ModalRoot from "./components/Modal/ModalRoot";

import { useAuth0 } from './hooks/auth0';

import Home from "./views/Home/index";
import AuthClient from "./views/AuthClient/index";
import NoMatch from "./views/NoMatch/index";

import { hideModal } from "./redux/actions/modal.action";

const App = () => {
	const { loading } = useAuth0();
	const dispatch = useDispatch();

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/auth_client" component={AuthClient} />
				{/* <Route path="/products" component={ProductPage} /> */}

				<Route component={NoMatch} />
			</Switch>
			<ModalRoot hideModal={() => dispatch(hideModal())} />
		</Router>
	);
};

export default App;
