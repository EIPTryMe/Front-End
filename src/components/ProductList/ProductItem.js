import React, { Component } from "react";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

export default class Product extends Component {
	render() {
		const { product } = this.props;
		return (
			<Col xs="12" sm="6" md="4">
				<Card className="product-card">
					<Carousel interval={null}>
						<Carousel.Item>
							<Card.Img
								variant="top"
								src="https://via.placeholder.com/286x300/14213D/FFFFFF?text=Tryme+placeholder"
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
					<Card.Body>
						<Card.Title>
							{product.name}, {product.price_per_day}$/day
						</Card.Title>
						<Card.Text>{product.product_descriptions.name}</Card.Text>
						<Button variant="success">
							Add to Cart <FontAwesomeIcon icon={faCartPlus} />
						</Button>
					</Card.Body>
				</Card>
			</Col>
		);
	}
}
