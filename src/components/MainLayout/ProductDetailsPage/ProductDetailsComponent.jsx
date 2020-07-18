import React, { useMemo } from "react";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@apollo/react-hooks";
import ReactStars from "react-rating-stars-component";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

import { ADD_TO_CART } from "../../../queries/cart";

import formatPrice from "../../../utils/formatPrice";

import { NotificationManager } from "react-notifications";

function ProductDetailsComponent(props) {
	const { product } = props;
	const [addToCart] = useMutation(
		ADD_TO_CART
		//, { context: { headers: { toto: "titi" } } }  --- TO ADD CUSTOM HEADERS
	);

	const onAddCart = (product) => {
		const { id: product_id } = product;

		addToCart({
			variables: { product_id },
		})
			.then((added) => {
				NotificationManager.success(`${product.name} x 1`, "Ajout au panier");
			})
			.catch((error) => {
				NotificationManager.warning(error.message, "Attention");
			});
	};

	const price_per_month_formatted = useMemo(() => formatPrice(product.price_per_month), [
		product.price_per_month,
	]);

	const reviews = useMemo(() => {
		if (!product) return null;

		return product.reviews;
	}, [product]);

	const averageRating = useMemo(() => {
		if (!product) return null;
		const {
			aggregate: {
				avg: { score },
				count,
			},
		} = product.reviews_aggregate;

		return { score, count };
	}, [product]);

	return (
		<>
			<Row>
				<Col sm={6}>
					<Carousel m="1" interval={null}>
						<Carousel.Item>
							<Card.Img
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
								variant="top"
								src="https://via.placeholder.com/286x300/FCA311/FFFFFF?text=Tryme+placeholder"
							/>
						</Carousel.Item>
						<Carousel.Item>
							<Card.Img
								variant="top"
								src="https://via.placeholder.com/286x300/000000/FFFFFF?text=Tryme+placeholder"
							/>
						</Carousel.Item>
					</Carousel>
				</Col>
				<Col sm={6}>
					<Card w={100}>
						<Card.Body>
							<Card.Title>{product.name}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
							<Card.Text className="product-item-description">
								{product.description || "Description placeholder"}
							</Card.Text>
							<Card.Text className="product-item-price">
								A partir de <b>€{price_per_month_formatted}</b> par mois
							</Card.Text>
							<Card.Text className="product-item-price">Stock: {product.stock}</Card.Text>

							<Card.Text className="product-item-price">
								{" "}
								<FontAwesomeIcon icon={faUmbrella} /> Garantie 1 ans
							</Card.Text>

							<Card.Text className="product-item-price">
								{" "}
								<FontAwesomeIcon icon={faTruck} /> livrer en 7-10 jours{" "}
							</Card.Text>

							<Button variant="success" className="mt-3" onClick={() => onAddCart(product)}>
								Add to Cart <FontAwesomeIcon icon={faCartPlus} />
							</Button>
						</Card.Body>
					</Card>
					<Card w={100} className="mt-3">
						<Card.Body>
							<Card.Title>Les avis ({averageRating.count})</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								Note moyenne: {averageRating.score}
							</Card.Subtitle>
							{reviews &&
								reviews.map((review, idx) => {
									const created_at = new Date(review.created_at);

									return (
										<Card key={`review-detail-${idx}`} className="mt-3">
											<Card.Body>
												<Card.Subtitle className="mb-3">
													<u>Anonyme</u> le {created_at.toLocaleString()} :
												</Card.Subtitle>
												<Card.Text>{review.description}</Card.Text>
												<div className="d-flex align-items-center">
													<ReactStars
														key={`rating-${idx}`}
														count={5}
														size={24}
														activeColor="#ffd700"
														value={review.score}
														isHalf={true}
														edit={false}
													/>
													<span>({review.score})</span>
												</div>
											</Card.Body>
										</Card>
									);
								})}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
}

export default ProductDetailsComponent;
