import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect, withRouter } from "react-router-dom";

import history from "./utils/history";

import HomePage from "./pages/MainLayout/HomePage";
import ProductPage from "./pages/MainLayout/ProductPage";
import ProductDetailsPage from "./pages/MainLayout/ProductDetailsPage";

import MyCartPage from "./pages/MainLayout/MyCartPage";
import MyProfilePage from "./pages/MainLayout/MyProfilePage";
import MyOrdersPage from "./pages/MainLayout/MyOrdersPage";
import TrackDeliveryPage from "./pages/MainLayout/TrackDeliveryPage";

import CheckoutOnePage from "./pages/CheckoutLayout/CheckoutOnePage";
import CheckoutSuccessPage from "./pages/CheckoutLayout/CheckoutSuccessPage";
import CheckoutCancelPage from "./pages/CheckoutLayout/CheckoutCancelPage";

import DashboardPage from "./pages/CompanyLayout/DashboardPage";
import AddProductPage from "./pages/CompanyLayout/AddProductPage";
import ManageProductPage from "./pages/CompanyLayout/ManageProductPage";
import SalesPage from "./pages/CompanyLayout/SalesPage";

import { AppContextProvider } from "./contexts/AppContext";

import MainLayout from "./layouts/MainLayout";
import CheckoutLayout from "./layouts/CheckoutLayout";
import CompanyLayout from "./layouts/CompanyLayout";

import AppRoute from "./components/Route/AppRoute";
import AppPrivateRoute from "./components/Route/AppPrivateRoute";


//LOGIN AUTH0
import { Auth0Provider } from "./hooks/auth0";
import { config, onRedirectCallback } from "./constants/auth0";
//LOGIN AUTH0

//GRAPHQL
import { client } from "./constants/graphql";
import { ApolloProvider } from "@apollo/react-hooks";
//GRAPHQL

import { NotificationManager } from "react-notifications";

NotificationManager.clear = function() {
	this.listNotify = [];
}

const RouteListener = withRouter(({history}) => {
	useEffect(() => {
		const unlisten = history.listen(() => {
			NotificationManager.clear();
		});
		return () => {
			unlisten();
		}
	}, [history]);

	return null;
});

const Routes = () => {
	return (
		<>
			<RouteListener/>
			<Switch>
				<AppRoute exact path="/" layout={MainLayout} component={HomePage} title="Home" />
				<AppRoute exact path="/products" layout={MainLayout} component={ProductPage} title="Produits" />
				<AppPrivateRoute path="/my-cart" layout={MainLayout} component={MyCartPage} title="Mon panier" />
				<AppRoute path="/products/:product_id" layout={MainLayout} component={ProductDetailsPage} title="Détail produit" />
				<AppPrivateRoute path="/profile/me" layout={MainLayout} component={MyProfilePage} title="Mon profil" />
				<AppPrivateRoute path="/profile/orders" layout={MainLayout} component={MyOrdersPage} title="Mes commandes" />
				<AppPrivateRoute path="/track_delivery/:order_id" layout={MainLayout} component={TrackDeliveryPage} title="Suivre mon colis" />

				<AppPrivateRoute path="/company/dashboard" layout={CompanyLayout} component={DashboardPage} title="Mon entreprise | Dashboard" />
				<AppPrivateRoute path="/company/add_product" layout={CompanyLayout} component={AddProductPage} title="Mon entreprise | Nouveau produit" />
				<AppPrivateRoute path="/company/manage_product" layout={CompanyLayout} component={ManageProductPage} title="Mon entreprise | Gestion produits" />
				<AppPrivateRoute path="/company/sales" layout={CompanyLayout} component={SalesPage} title="Mon entreprise | Mes ventes" />

				<AppPrivateRoute path="/checkout/step-1" layout={CheckoutLayout} component={CheckoutOnePage} title="Etape 1" />
				<AppPrivateRoute path="/checkout/success" layout={CheckoutLayout} component={CheckoutSuccessPage} title="Commande validée" />
				<AppPrivateRoute path="/checkout/cancel" layout={CheckoutLayout} component={CheckoutCancelPage} title="Commande annulée" />
				<Redirect from="*" to="/" />
			</Switch>
		</>
	);
};

// Router must wrap everything so it can redirects.
const App = () => {
	return (
		<Router history={history}>
			<AppContextProvider>
				<ApolloProvider client={client}>
					<Auth0Provider
						domain={config.domain}
						client_id={config.clientId}
						audience={config.audience}
						redirect_uri={window.location.origin}
						onRedirectCallback={onRedirectCallback}
					>
						<Routes />
					</Auth0Provider>
				</ApolloProvider>
			</AppContextProvider>
		</Router>
	);
};

export default App;
