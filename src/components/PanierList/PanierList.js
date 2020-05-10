import React, {Component} from "react";
import PanierItem from "../PanierList/PanierItem";

export default class PanierList extends Component {
    render() {
        const {paniers} = this.props;
        return (
            <div className="cart">
                <div className="wrap cf">

                    <div className="heading cf">
                        <h1>Votre Panier</h1>
                        <a href="/Products" className="continue">Continue Shopping</a>
                    </div>
                </div>
                <div>
                    {
                        paniers.map((panier) => (
                            <ul className="cartWrap">
                                <PanierItem panier={panier}/>
                            </ul>
                        ))
                    }

                </div>
                <div>
                    <div className="subtotal cf">
                        <ul>
                            <li className="totalRow">
                                <span className="label"> Subtotal </span>
                                <span className="value"> $35.00 </span>
                            </li>

                            <li className="totalRow">
                                <span className="label"> Shipping </span>
                                <span className="value"> $5.00 </span>
                            </li>

                            <li className="totalRow">
                                <span className="label"> Tax </span>
                                <span className="value">$4.00</span>
                            </li>
                            <li className="totalRow final">
                                <span className="label">Total</span>
                                <span className="value">$44.00</span>
                            </li>
                            <li className="totalRow"><a href="/" className="btn continue"> Checkout </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
