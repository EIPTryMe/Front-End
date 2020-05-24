import React from "react";
import { useAuth0 } from "../../hooks/auth0";
import { NavLink } from "react-router-dom";

import LoadingComponent from "../../components/LoadingComponent";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import { useMutation } from "@apollo/react-hooks";
import { PRODUCT_ADD } from "../../queries/product";
import { NotificationManager } from "react-notifications";

import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
	name: Yup.string().required(),
	stock: Yup.number().min(1).required(),
	price_per_month: Yup.number().min(5).required(),
});

const SalesPage = () => {
	const { loading, user } = useAuth0();

	const [addProduct] = useMutation(PRODUCT_ADD);

	if (loading || !user) {
		return <LoadingComponent />;
	}

	const initialValues = {
		name: "",
		stock: 0,
		price_per_month: 0,
	};

	const onSubmit = (values) => {
		addProduct({ variables: values })
			.then((data) => {
				NotificationManager.success(
					`Votre produit est maintenant sur le marché`,
					"Produit ajouté"
				);
			})
			.catch((error) => {
				NotificationManager.warning(error.message, "Attention");
			});
	};

	return (
		<Container className="company-add-product">
			<Button variant="info" size="sm" as={NavLink} to={"/company/dashboard"}>
				Retourner au tableau de bord
			</Button>
			<h1>Ajouter un produit sur le marché:</h1>

			<Formik
				validationSchema={schema}
				initialValues={initialValues}
				validateOnChange={true}
				validateOnBlur={false}
				onSubmit={onSubmit}
			>
				{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					isValid,
					errors,
					setFieldTouched,
				}) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>Nom du produit:</Form.Label>
								<Form.Control
									type="text"
									name="name"
									placeholder={"Nom du produit"}
									value={values.name}
									onChange={(e) => setFieldTouched("name") && handleChange(e)}
									isInvalid={touched.name && !!errors.name}
									isValid={touched.name && !errors.name}
								/>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>Quantité en stock:</Form.Label>
								<Form.Control
									type="text"
									name="stock"
									placeholder={"Quantité en stock"}
									value={values.stock}
									onChange={(e) => setFieldTouched("stock") && handleChange(e)}
									isInvalid={touched.stock && !!errors.stock}
									isValid={touched.stock && !errors.stock}
								/>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>Prix par mois:</Form.Label>
								<Form.Control
									type="text"
									name="price_per_month"
									placeholder={"Prix par mois"}
									value={values.price_per_month}
									onChange={(e) =>
										setFieldTouched("price_per_month") && handleChange(e)
									}
									isInvalid={touched.price_per_month && !!errors.price_per_month}
									isValid={touched.price_per_month && !errors.price_per_month}
								/>
							</Form.Group>
						</Form.Row>
						<Button type="submit" variant="success">
							Ajouter
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default SalesPage;
