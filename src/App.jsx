import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import history from "./utils/history";

import HomePage from "./pages/MainLayout/HomePage";
import ProductPage from "./pages/MainLayout/ProductPage";
import MyCartPage from "./pages/MainLayout/MyCartPage";
import MyProfilePage from "./pages/MainLayout/MyProfilePage";
import MyOrdersPage from "./pages/MainLayout/MyOrdersPage";

import CheckoutOnePage from "./pages/CheckoutLayout/CheckoutOnePage";
import CheckoutSuccessPage from "./pages/CheckoutLayout/CheckoutSuccessPage";
import CheckoutCancelPage from "./pages/CheckoutLayout/CheckoutCancelPage";

import { AppContextProvider } from "./contexts/AppContext";

import MainLayout from "./layouts/MainLayout";
import CheckoutLayout from "./layouts/CheckoutLayout";

import AppRoute from "./components/Route/AppRoute";

const Routes = () => {
	return (
		<Switch>
			<AppRoute exact path="/" layout={MainLayout} component={HomePage} title="Home" />
			<AppRoute path="/products" layout={MainLayout} component={ProductPage} title="Produits" />
			<AppRoute path="/my-cart" layout={MainLayout} component={MyCartPage} title="Mon panier" private={true} />
			<AppRoute path="/my-profile" layout={MainLayout} component={MyProfilePage} title="Mon profil" private={true} />
			<AppRoute path="/my-orders" layout={MainLayout} component={MyOrdersPage} title="Mes commandes" private={true} />

			<AppRoute path="/checkout/step-1" layout={CheckoutLayout} component={CheckoutOnePage} title="Etape 1" private={true} />
			<AppRoute path="/checkout/success" layout={CheckoutLayout} component={CheckoutSuccessPage} title="Commande validée" private={true} />
			<AppRoute path="/checkout/cancel" layout={CheckoutLayout} component={CheckoutCancelPage} title="Commande annulée" private={true} />			
			<Redirect from="*" to="/" />
		</Switch>
	);
};

const App = () => (
	<AppContextProvider>
		<Router history={history}>
			<Routes />
		</Router>
	</AppContextProvider>
);

export default App;
