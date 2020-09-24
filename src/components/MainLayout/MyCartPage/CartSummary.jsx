import React, { useState, useEffect } from "react";

import { useLazyQuery } from "@apollo/react-hooks";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { Formik } from "formik";
import * as Yup from "yup";
import { NotificationManager } from "react-notifications";

import formatPrice from "../../../utils/formatPrice";
import { TEST_PROMO } from "../../../queries/coupon";

const schema = Yup.object({
	code: Yup.string().required(),
});

function CartSummary(props) {
	const { carts } = props;

	const [discount, setDiscount] = useState(0);
	const [submittedCode, setSubmittedCode] = useState(null);

	useEffect(() => {
		if (carts && carts.length > 0 && carts[0].promo) {
			setDiscount(carts[0].promo.discount_value);
			setSubmittedCode(carts[0].promo.code);
		}
	}, [carts]);

	const initialValues = {
		code: "",
	};

	const onCompleted = ({ validateCoupon: { valid, discountedPrice, discountValue } }) => {
		console.log(valid, discountedPrice, discountValue);
		if (valid === false) {
			NotificationManager.warning("Ce code promotionnel n'existe pas", "Attention");
		} else {
			setDiscount(discountValue);
			NotificationManager.success(`La réduction a été appliquée`, "Code promotionnel validé");
		}
	};

	const onError = (error) => {
		NotificationManager.info("Code promotionnel invalide", "Information");
	};
	const [testPromotionCode] = useLazyQuery(TEST_PROMO, { onCompleted, onError });

	const onSubmit = (values) => {
		testPromotionCode({ variables: values });
	};

	const subTotal = formatPrice(
		carts.reduce((sum, cart) => sum + cart.product.price_per_month * cart.quantity, 0)
	);
	const subTotalMinusDiscount = formatPrice(subTotal - (subTotal * discount / 100));
	const shipping = formatPrice(0);
	const total = formatPrice(+subTotal + +shipping);

	const MainContent = ({ colSpan }) => (
		<td colSpan={colSpan}>
			<div className={`cart-summary-row ${discount > 0 ? "old-price" : ""}`}>
				<p className="title">Sous-total</p>
				<p className="value">{subTotal} €</p>
			</div>
			{discount > 0 && (
				<div className={`cart-summary-row ${discount > 0 ? "new-price" : ""}`}>
					<p className="title">Sous-total</p>
					<p className="value">{subTotalMinusDiscount} €</p>
				</div>
			)}
			<div className="cart-summary-row">
				<p className="title">Frais de transport</p>
				<p className="value">{shipping} €</p>
			</div>
			<div className="cart-summary-row">
				<p className="title">Total</p>
				<p className="value">{total} €</p>
			</div>
			<div className="cart-summary-row">
				<Formik
					validationSchema={schema}
					initialValues={initialValues}
					validateOnChange={true}
					validateOnBlur={false}
					onSubmit={onSubmit}
				>
					{({ handleSubmit, handleChange, values, touched, isValid, errors, setFieldTouched }) => (
						<Form noValidate onSubmit={handleSubmit}>
							<Form.Row>
								<Form.Group as={Col} controlId="validationFormikPromo">
									<Form.Label style={{ display: "block" }}>Appliquer une réduction :</Form.Label>
									<Form.Control
										type="text"
										name="code"
										placeholder={"Code promotionnel"}
										value={values.code}
										onChange={(e) => setFieldTouched("code") && handleChange(e)}
										isInvalid={touched.code && !!errors.code}
										isValid={touched.code && !errors.code}
										style={{ display: "inline-block", width: "auto", marginRight: 10 }}
									/>
									{discount > 0 && (
										<p className="text-success">
											Code promo <b>{submittedCode}</b> activé
										</p>
									)}
									<Button type="submit" variant="success" style={{ verticalAlign: "unset" }}>
										OK
									</Button>
								</Form.Group>
							</Form.Row>
						</Form>
					)}
				</Formik>
			</div>
		</td>
	);

	return (
		<React.Fragment>
			<tr className="cart-summary-table-row d-none d-md-table-row">
				<td colSpan={2} className="no-border"></td>
				<MainContent colSpan={3} />
			</tr>
			<tr className="cart-summary-table-row d-none d-sm-table-row d-md-none">
				<td colSpan={1} className="no-border"></td>
				<MainContent colSpan={1} />
			</tr>
			<tr className="cart-summary-table-row d-table-row d-sm-none">
				<MainContent colSpan={2} />
			</tr>
		</React.Fragment>
	);
}

export default CartSummary;
