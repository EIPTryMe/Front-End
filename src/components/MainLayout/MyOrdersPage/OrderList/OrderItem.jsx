import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

export default class Order extends Component {
    render() {
        const {order} = this.props;

        const created_at = new Date(order.created_at);

        const formattedAddress = `${order.address_line_1}, ${order.address_city} ${order.address_postal_code}, ${order.address_country}`;

        const products = order.order_items.map((orderItem) => {
            return orderItem.product.name + ' - ' + orderItem.price + '€';
        });

        return (
            <Accordion  defaultActiveKey="0">
                <Card className="text-white bg-dark">
                    <Card.Header>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Commande du {created_at.toLocaleString()}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Table striped bordered hover responsive="lg" variant="dark">
                                <tbody>
                                <td> {order.id}</td>
                                <td>{formattedAddress}</td>
                                <td> {products.map((text, index) => <p
                                    key={"text-order" + order.id + index}>{text}</p>)}</td>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}
