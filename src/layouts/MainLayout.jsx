import React from "react";
import { withRouter } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import HelmetComponent from "../components/HelmetComponent";
import NavBar from "../components/MainLayout/NavBar";

import useAppContext from '../contexts/AppContext';

const NavBarComponent = withRouter(NavBar);

const MainLayout = ({ title, children }) => {
	const context = useAppContext();

	return (
		<>
			<HelmetComponent title={title} />
			<NavBarComponent cartLength={context.state.params.cartLength} />
			<div className="layout main-layout">{children}</div>
			{/* <ModalRoot hideModal={() => dispatch(hideModal())} /> */}
			<NotificationContainer />
		</>
	);
};

export default MainLayout;