import React from "react";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";

import NavBar from "./views/NavBar/NavBar";
import ModalRoot from "./components/Modal/ModalRoot";

import history from "./utils/history";

import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import Orders from "./views/Orders/Orders";
import NoMatch from "./views/NoMatch/NoMatch";
import Product from "./views/Product/Products";
import Panier from "./views/Panier/Panier";
import { hideModal } from "./redux/actions/modal.action";

const NavBarWithRouter = withRouter(NavBar);

const App = () => {
	const dispatch = useDispatch();
	return (
		<Router history={history}>
			<NavBarWithRouter />
			<div className="content-wrapper">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/my-cart" component={Panier}  />
					<Route path="/products" component={Product} />
					<PrivateRoute path="/my-profile" component={Profile} />
					<PrivateRoute path="/my-orders" component={Orders} />
					{/* <PrivateRoute path="/my-messages" component={Messages} /> */}
					<Route component={NoMatch} />
				</Switch>
			</div>
			<ModalRoot hideModal={() => dispatch(hideModal())} />
		</Router>
	);
};

export default App;
