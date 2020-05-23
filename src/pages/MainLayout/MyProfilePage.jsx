import React from "react";
import { useAuth0 } from "../../hooks/auth0";

import LoadingComponent from "../../components/LoadingComponent";
import Container from "react-bootstrap/Container";

import UserInfoComponent from "../../components/MainLayout/MyProfilePage/UserInfoComponent";
import CompanyInfoComponent from "../../components/MainLayout/MyProfilePage/CompanyInfoComponent";

const MyProfilePage = () => {
	const { loading, user } = useAuth0();

	if (loading || !user) {
		return <LoadingComponent />;
	}

	return (
		<Container className="my-profile">
			<h1>Mes informations personnelles</h1>
			<UserInfoComponent />
			
			<CompanyInfoComponent />
		</Container>
	);
};

export default MyProfilePage;
