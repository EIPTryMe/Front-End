import React, { useMemo, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import LoadingComponent from "../../components/LoadingComponent";
import ProductList from "../../components/MainLayout/ProductPage/ProductList";

import { GET_COMPANY_PRODUCTS } from "../../queries/product";
import { useQuery } from "@apollo/react-hooks";
import { handleHttpError } from "../../utils/errorHandler";
import { NavLink } from "react-router-dom";

import { useAuth0 } from "../../hooks/auth0";
import useAppContext from "../../contexts/AppContext";

const ManageProductPage = ({history}) => {
	const { loading: isLoadingAuth } = useAuth0();
	const context = useAppContext();
	const user = context.state ? context.state.user : null;

	const [shouldExecute, executeQuery] = useState(false);
	const { loading: isLoadingProducts, error, data = { product: [] } } = useQuery(GET_COMPANY_PRODUCTS, {
		skip: !shouldExecute,
		variables: {company_id: user && user.company ? user.company.id : null},
	});

	useEffect(() => {
		if (isLoadingAuth || isLoadingProducts || !user || !user.company) return;
		executeQuery(true);
	}, [isLoadingAuth, isLoadingProducts, user]);

	const products = useMemo(() => data.product, [data.product]);

	return (
		<Container className="company-manage-product">
			<Button variant="info" size="sm" as={NavLink} to={"/company/dashboard"}>
				Retourner au tableau de bord
			</Button>
			<h1>Gérer mes produits sur le marché:</h1>
			<Container className="product-list-container">
				{isLoadingProducts && <LoadingComponent />}
				{!isLoadingProducts && !!error && handleHttpError(error)}
				{!isLoadingProducts && !error && products && <ProductList products={products} history={history} showDelete={true}/>}
			</Container>
		</Container>
	);
};

export default ManageProductPage;
