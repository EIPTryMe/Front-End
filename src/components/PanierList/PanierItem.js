import React, {Component} from "react";

export default class Panier extends Component {
    render() {
        const {panier} = this.props;
        return (
            <li className="items odd">
                <div className="infoWrap">
                    <div className="cartSection">
                        <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" alt=""
                             className="itemImg"/>
                        <p className="itemNumber">#QUE-007544-002</p>
                        <h3>{panier.name}</h3>
                        <p><input type="text" className="qty" placeholder="3"/> x $5.00</p>
                        <p className="stockStatus"> In Stock</p>
                    </div>
                    <div className="prodTotal cartSection">
                        <p>$15.00</p>
                    </div>
                    <div className="cartSection removeWrap">
                        <a href="/my-panier" className="remove">x</a>
                    </div>
                </div>
            </li>
        );
    }
}
