import React from "react";
import { useAuth0 } from "../../hooks/auth0";

import LoadingComponent from "../../components/LoadingComponent";
import Container from "react-bootstrap/Container";

const MyProfilePage = () => {
	const { loading, user } = useAuth0();

	if (loading || !user) {
		return <LoadingComponent />;
	}

	//FOR TESTING
	user.company = {
		name: "EIP",
		siret: "000198765467",
		address: "123 rue test",
		phone: "+33612345678",
	};

	return (
		<Container className="my-profile">
			<h1>Mes informations personnelles</h1>

			<div className="my-informations">
				<div className="line">
					<p className="line-title">Avatar:</p>
					<p className="line-content">
						<img src={user.picture} alt="Avatar" />
					</p>
				</div>
				<div className="line">
					<p className="line-title">Firstname:</p>
					<p className="line-content">{user.firstname || user.nickname}</p>
				</div>
				<div className="line">
					<p className="line-title">Lastname:</p>
					<p className="line-content">{user.lastname}</p>
				</div>
				<div className="line">
					<p className="line-title">Email:</p>
					<p className="line-content">{user.email}</p>
				</div>
				<div className="line">
					<p className="line-title">Adresse:</p>
					<p className="line-content">{user.adress}</p>
				</div>
				<div className="line">
					<p className="line-title">Téléphone:</p>
					<p className="line-content">{user.tel}</p>
				</div>
			</div>

			{user.company && (
				<React.Fragment>
					<h1 className="mt-3">Mes informations entreprises</h1>

					<div className="my-informations">
						<div className="line">
							<p className="line-title">Nom Entreprise: </p>
							<p className="line-content">{user.company.name}</p>
						</div>
						<div className="line">
							<p className="line-title">Adresse Entreprise:</p>
							<p className="line-content">{user.company.address}</p>
						</div>
						<div className="line">
							<p className="line-title">SIRET:</p>
							<p className="line-content">{user.company.siret}</p>
						</div>
						<div className="line">
							<p className="line-title">Téléphone:</p>
							<p className="line-content">{user.company.phone}</p>
						</div>
					</div>
				</React.Fragment>
			)}

			<code>{JSON.stringify(user, null, 4)}</code>
			{console.log(JSON.stringify(user, null, 4))}
		</Container>
	);
};

export default MyProfilePage;
