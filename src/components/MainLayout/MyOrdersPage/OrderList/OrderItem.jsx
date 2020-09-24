import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import SetReviewComponent from "./SetReviewComponent";
import formatPrice from "../../../../utils/formatPrice";

export default class Order extends Component {
	render() {
		const { order, history } = this.props;

		const created_at = new Date(order.created_at);

		const formattedAddress = `${order.address_line_1}, ${order.address_city} ${order.address_postal_code}, ${order.address_country}`;

		const sum = formatPrice(order.order_items.reduce((sum, orderItem) => sum + orderItem.price, 0));

		const goToTrackDelivery = () => history.push(`/track_delivery/${order.id}`);

		return (
			<Accordion>
				<Card className="text-white bg-dark mb-1">
					<Card.Header>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							Commande du {created_at.toLocaleString()} - Total : {sum}€
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							{order.order_deliveries &&
								order.order_deliveries[0] &&
								order.order_deliveries[0].delivery_status === "pending" && (
									<Button variant="light" className="mb-2" onClick={goToTrackDelivery}>
										Suivre mon colis
									</Button>
								)}
							<Card.Text className="mb-2">Adresse de facturation: {formattedAddress}</Card.Text>
							<Table striped bordered hover responsive="lg" variant="dark">
								<thead>
									<tr>
										<th>#ID</th>
										<th>Produit</th>
										<th>Prix</th>
										<th>Avis</th>
									</tr>
								</thead>
								<tbody>
									{order.order_items.map((order_item) => {
										const str = order_item.review ? order_item.review.description : null;
										const length = 40;
										const reviewDescription = str
											? str.length > length
												? str.substring(0, length - 3) + "..."
												: str
											: null;

										return (
											<tr key={"order_item-" + order_item.id}>
												<td>{order_item.id}</td>
												<td>{order_item.product.name}</td>
												<td>{order_item.price}€</td>
												<td>
													{!order_item.review ? (
														<SetReviewComponent orderItem={order_item} />
													) : (
														<p>{reviewDescription}</p>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		);
	}
}
