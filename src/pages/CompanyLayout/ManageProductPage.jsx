import React, { useMemo, useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import LoadingComponent from "../../components/LoadingComponent";
import ProductList from "../../components/MainLayout/ProductPage/ProductList";

import { GET_COMPANY_PRODUCTS } from "../../queries/product";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { handleHttpError } from "../../utils/errorHandler";
import { NavLink } from "react-router-dom";

import { useAuth0 } from "../../hooks/auth0";
import useAppContext from "../../contexts/AppContext";

import { NotificationManager } from "react-notifications";
import { PRODUCT_DELETE } from "../../queries/product";


const ManageProductPage = ({history}) => {
	const { loading: isLoadingAuth } = useAuth0();
	const context = useAppContext();
	const user = context.state ? context.state.user : null;

	const [shouldExecute, executeQuery] = useState(false);
	const { loading: isLoadingProducts, error, data, refetch} = useQuery(GET_COMPANY_PRODUCTS, {
		skip: !shouldExecute,
		variables: {company_id: user && user.company ? user.company.id : null},
	});

	useEffect(() => {
		if (isLoadingAuth || isLoadingProducts || !user || !user.company) return;
	
		executeQuery(true);
	}, [isLoadingAuth, isLoadingProducts, user, user.company, refetch]);

	useEffect(() => {
		if (shouldExecute)
			refetch();
	}, [shouldExecute, refetch])
	const [deleteProduct] = useMutation(
		PRODUCT_DELETE
		//, { context: { headers: { toto: "titi" } } }  --- TO ADD CUSTOM HEADERS
	);

	const products = data ? data.product : [];

	const onDeleteProduct = (product) => {
		//console.log('del product', product);
		if (window.confirm('Etes vous sur de vouloir supprimer ce produit?')) {
			deleteProduct({variables: {product_id: product.id}})
			.then(() => {
				refetch();
				NotificationManager.success(`${product.name}`, "Suppression du produit");
			})
			.catch((error) => {
				NotificationManager.warning(error.message, "Attention");
			});
		}
	};


	return (
		<Container className="company-manage-product">
			<Button variant="info" size="sm" as={NavLink} to={"/company/dashboard"}>
				Retourner au tableau de bord
			</Button>
			<h1>Gérer mes produits sur le marché:</h1>
			<Container className="product-list-container">
				{isLoadingProducts && <LoadingComponent />}
				{!isLoadingProducts && !!error && handleHttpError(error)}
				{!isLoadingProducts && !error && products && <ProductList products={products} history={history} showDelete={true} onDeleteProduct={onDeleteProduct}/>}
			</Container>
		</Container>
	);
};

export default ManageProductPage;
