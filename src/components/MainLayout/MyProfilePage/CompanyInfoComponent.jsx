import React from "react";
import useAppContext from "../../../contexts/AppContext";

const CompanyInfoComponent = () => {
	const context = useAppContext();

	const { user } = context.state;

	if (!user || !user.company) {
		return null;
	}

	return (
		<React.Fragment>
			<h1 className="mt-3">Mes informations entreprises</h1>

			<div className="my-informations">
				<div className="line">
					<p className="line-title">Nom Entreprise: </p>
					<p className="line-content">{user.company.name}</p>
				</div>
				<div className="line">
					<p className="line-title">Email:</p>
					<p className="line-content">{user.company.email}</p>
				</div>
				<div className="line">
					<p className="line-title">Adresse Entreprise:</p>
					<p className="line-content">{user.company.address}</p>
				</div>
				<div className="line">
					<p className="line-title">SIREN:</p>
					<p className="line-content">{user.company.siren}</p>
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
	);
};

export default CompanyInfoComponent;
