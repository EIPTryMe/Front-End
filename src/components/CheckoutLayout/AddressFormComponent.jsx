import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { Formik } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/react-hooks";
import { ORDER_PAYMENT, PAY_ORDER } from "../../queries/orders";
import { NotificationManager } from "react-notifications";

import { stripePublicKey } from "../../constants/stripe";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(stripePublicKey);

const schema = Yup.object({
	city: Yup.string().required(),
	country: Yup.string().required(),
	line1: Yup.string().required(),
	postalCode: Yup.string().required(),
	cgv: Yup.bool().oneOf([true]),
});

const AddressFormComponent = ({ title, history }) => {
	const initialValues = {
		city: "",
		country: "",
		line1: "",
		postalCode: "",
		cgv: false,
	};

	const [orderPayment] = useMutation(ORDER_PAYMENT);
	const [payOrder] = useMutation(PAY_ORDER);

	const onSubmit = (values) => {
		values["cgv"] = undefined;
		orderPayment({ variables: values })
			.then(({ data }) => {
				return data.orderPayment.order_id;
			})
			.then(async (order_id) => {
				if (!order_id) throw new Error("Order id is null");

				return await payOrder({ variables: { order_id } });
			})
			.then(async ({ data }) => {
				const { stripe_id } = data.payOrder;

				const stripe = await stripePromise;
				const { error } = await stripe.redirectToCheckout({
					sessionId: stripe_id,
				});
				if (error) throw error;
				NotificationManager.success(`Merci pour votre commande`, "Commande validée");
			})
			.catch((error) => {
				console.log(error);
				NotificationManager.warning(error.message, "Attention");
			});
	};

	return (
		<div className="address-component">
			<h3 className="title">{title}</h3>
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
							<Form.Group as={Col} controlId="validationFormikLine1">
								<Form.Label>Adresse ligne 1</Form.Label>
								<Form.Control
									type="text"
									name="line1"
									placeholder={"1234 Main St"}
									value={values.line1}
									onChange={(e) => setFieldTouched("line1") && handleChange(e)}
									isInvalid={touched.line1 && !!errors.line1}
									isValid={touched.line1 && !errors.line1}
								/>
								<Form.Control.Feedback>C'est correcte!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.line1}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} md="4" controlId="validationFormikCountry">
								<Form.Label>Pays</Form.Label>
								<Form.Control
									as="select"
									name="country"
									placeholder={"Choisir..."}
									value={values.country}
									onChange={(e) => setFieldTouched("country") && handleChange(e)}
									isInvalid={touched.country && !!errors.country}
									isValid={touched.country && !errors.country}
								>
									<option>Choisir...</option>
									<option>France</option>
								</Form.Control>
								<Form.Control.Feedback>C'est correcte!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.country}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group as={Col} md="4" controlId="validationFormikCity">
								<Form.Label>Ville</Form.Label>
								<Form.Control
									type="text"
									name="city"
									placeholder={"Ville"}
									value={values.city}
									onChange={(e) => setFieldTouched("city") && handleChange(e)}
									isInvalid={touched.city && !!errors.city}
									isValid={touched.city && !errors.city}
								/>
								<Form.Control.Feedback>C'est correcte!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.city}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group as={Col} md="4" controlId="validationFormikPostalCode">
								<Form.Label>Code postal</Form.Label>
								<Form.Control
									type="text"
									name="postalCode"
									placeholder={"Code postal"}
									value={values.postalCode}
									onChange={(e) =>
										setFieldTouched("postalCode") && handleChange(e)
									}
									isInvalid={touched.postalCode && !!errors.postalCode}
									isValid={touched.postalCode && !errors.postalCode}
								/>
								<Form.Control.Feedback>C'est correcte!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.postalCode}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="validationFormikCGV">
								<Form.Check>
									<Form.Check.Input
										type={"checkbox"}
										isInvalid={touched.cgv && !!errors.cgv}
										isValid={touched.cgv && !errors.cgv && values.cgv === true}
										name="cgv"
										value={values.cgv}
										onChange={(e) => setFieldTouched("cgv") && handleChange(e)}
									/>
									<Form.Check.Label>J'accepte les CGV</Form.Check.Label>
								</Form.Check>
							</Form.Group>
						</Form.Row>
						<Button type="submit" variant="success">
							Continuer
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default AddressFormComponent;
