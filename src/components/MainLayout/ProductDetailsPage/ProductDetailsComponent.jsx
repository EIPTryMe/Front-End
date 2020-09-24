import React, { useMemo, useState } from "react";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@apollo/react-hooks";
import ReactStars from "react-rating-stars-component";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { useQuery } from "@apollo/react-hooks";
import { SUGGESTIONS_GET } from "../../../queries/suggestion";

import { ADD_TO_CART } from "../../../queries/cart";
import useAppContext from "../../../contexts/AppContext";

import formatPrice from "../../../utils/formatPrice";

import { NotificationManager } from "react-notifications";

function ProductDetailsComponent(props) {
	const { product, history } = props;
	const [addToCart] = useMutation(
		ADD_TO_CART
		//, { context: { headers: { toto: "titi" } } }  --- TO ADD CUSTOM HEADERS
	);
	const context = useAppContext();
	const [isAdding, setIsAdding] = useState(false);

	const onAddCart = (product) => {
		const { id: product_id } = product;
		if (isAdding) return;
		setIsAdding(true);
		addToCart({
			variables: { product_id },
		})
			.then(() => {
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

	const { loading: isLoadingSuggestion, data, error } = useQuery(SUGGESTIONS_GET);

	const suggestions = useMemo(() => {
		if (!data) {
			return null;
		}
		return data.suggestion;
	}, [data]);

	const goToProductDetails = (p) =>
		product.id !== p.id ? history.push("/products/" + p.id, { product: p }) : null;

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
					{!isLoadingSuggestion && suggestions && suggestions.length > 0 && (
						<Card w={100} className="mt-4">
							<Card.Body>
								<Card.Title>Suggestions</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Vous pourriez aimer...</Card.Subtitle>
								{suggestions.map((suggestion) => (
									<Card key={`suggestion-${suggestion.id}`} className="mt-3">
										<Card.Body>
											<Card.Title onClick={() => goToProductDetails(suggestion.product)}>
												{suggestion.product.name}
											</Card.Title>
											<Card.Subtitle>{suggestion.product.price_per_month}€</Card.Subtitle>
											<Card.Text>{suggestion.product.description}</Card.Text>
											{suggestion.product.product_specifications.map((p) => (
												<Card.Text key={`suggestion-${suggestion.id}-spec-${p.id}`}>
													{p.name}
												</Card.Text>
											))}
											{isAdding && <Spinner animation="border" variant="success" />}
											{!isAdding && (
												<Button
													variant="success"
													className="mt-3"
													onClick={() => onAddCart(suggestion.product)}
												>
													Add to Cart <FontAwesomeIcon icon={faCartPlus} />
												</Button>
											)}
										</Card.Body>
									</Card>
								))}
							</Card.Body>
						</Card>
					)}
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
							{product.product_specifications && product.product_specifications.length > 0 && (
								<>
									<br />
									<b>Les spécifications:</b>
									<ul>
										{product.product_specifications.map((pps) => (
											<li key={`p-${product.id}-spec-${pps.id}`}>{pps.name}</li>
										))}
									</ul>
								</>
							)}
							{isAdding && <Spinner animation="border" variant="success" />}
							{!isAdding && (
								<Button variant="success" className="mt-3" onClick={() => onAddCart(product)}>
									Add to Cart <FontAwesomeIcon icon={faCartPlus} />
								</Button>
							)}
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
