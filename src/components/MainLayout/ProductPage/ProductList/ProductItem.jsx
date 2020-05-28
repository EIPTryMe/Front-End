import React, { useMemo, useState } from "react";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@apollo/react-hooks";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { ADD_TO_CART } from "../../../../queries/cart";

import formatPrice from "../../../../utils/formatPrice";

import { NotificationManager } from "react-notifications";

import useAppContext from "../../../../contexts/AppContext";
import { useAuth0 } from "../../../../hooks/auth0";


function ProductItem(props) {
	const { product, history, showDelete = false, onDeleteProduct = () => {} } = props;
	const context = useAppContext();
	const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
	const [isAdding, setIsAdding] = useState(false);

	const [addToCart] = useMutation(
		ADD_TO_CART
		//, { context: { headers: { toto: "titi" } } }  --- TO ADD CUSTOM HEADERS
	);

	

	const onAddCart = (product) => {
		const { id: product_id } = product;
		if (isAdding) return;
		setIsAdding(true);
		addToCart({
			variables: { product_id },
		})
			.then((added) => {
				context.changeParams({ cartLength: context.state.params.cartLength + 1 });
				setIsAdding(false);
				NotificationManager.success(`${product.name} x 1`, "Ajout au panier");
			})
			.catch((error) => {
				setIsAdding(false);
				NotificationManager.warning(error.message, "Attention");
			});
	};

	const price_per_month_formatted = useMemo(() => formatPrice(product.price_per_month), [
		product.price_per_month,
	]);

	const goToProductDetails = () => history.push("/products/" + product.id, { product: product });

	if (loading)
		return null;
	return (
		<Col xs="12" sm="6" md="4">
			<Card className="product-card">
				<Carousel interval={null}>
					<Carousel.Item>
						<Card.Img
							className="product-img"
							variant="top"
							src={
								product.picture
									? product.picture.url
									: "https://via.placeholder.com/286x300/14213D/FFFFFF?text=Tryme+placeholder"
							}
						/>
					</Carousel.Item>
					<Carousel.Item>
						<Card.Img
							className="product-img"
							variant="top"
							src="https://via.placeholder.com/286x300/FCA311/FFFFFF?text=Tryme+placeholder"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<Card.Img
							className="product-img"
							variant="top"
							src="https://via.placeholder.com/286x300/000000/FFFFFF?text=Tryme+placeholder"
						/>
					</Carousel.Item>
				</Carousel>
				<Card.Body onClick={goToProductDetails} style={{ cursor: "pointer" }}>
					<Card.Title className="product-item-title">
						<b>{product.name}</b>
					</Card.Title>
					<Card.Text className="product-item-description">
						{product.product_descriptions.name || "Description placeholder"}
					</Card.Text>
					<Card.Text className="product-item-price">
						A partir de <b>€{price_per_month_formatted}</b> par mois
					</Card.Text>
					<Card.Text className="product-item-price">Stock: {product.stock}</Card.Text>
				</Card.Body>
				{!showDelete && (
					<Card.Footer>
						{isAdding && <Spinner animation="border" variant="success" />}
						{!isAdding && (
							<Button variant="success" onClick={() => isAuthenticated ? onAddCart(product) : loginWithRedirect({redirect_uri: window.location.origin + '/products'})}>
								Ajouter au panier <FontAwesomeIcon icon={faCartPlus} />
							</Button>
						)}
					</Card.Footer>
				)}
				{showDelete && (
					<Card.Footer>
						<Button variant="danger" onClick={() => onDeleteProduct(product)}>
							Supprimer ce produit <FontAwesomeIcon icon={faCartPlus} />
						</Button>
					</Card.Footer>
				)}
			</Card>
		</Col>
	);
}

export default ProductItem;
