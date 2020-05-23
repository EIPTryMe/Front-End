import React from "react";
import { withRouter } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import HelmetComponent from "../components/HelmetComponent";
import NavBar from "../components/MainLayout/NavBar";

const NavBarComponent = withRouter(NavBar);

const MainLayout = ({ title, children }) => {
	return (
		<>
			<HelmetComponent title={title} />
			<NavBarComponent />
			<div className="layout main-layout">{children}</div>
			{/* <ModalRoot hideModal={() => dispatch(hideModal())} /> */}
			<NotificationContainer />
		</>
	);
};

export default MainLayout;