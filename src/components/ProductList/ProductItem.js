import React, {Component} from "react";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Product extends Component {
    render() {
        const {product} = this.props;
        return (
                <li className="product fl-l">
                    <div className="container-prod">
                        <div className="image"
                             style={{backgroundImage: "url(https://cdn.futura-sciences.com/buildsv6/images/wide1920/6/5/2/652a7adb1b_98148_01-intro-773.jpg)"}}> </div>
                        <div className="container-information">
                            <div className="title">
                                {product.name}, {product.price_per_day}$/day
                            </div>
                            <div className="description"> {product.product_descriptions.name} </div>
                        </div>

                        <div className="buttons cf">
                            Add to Cart <FontAwesomeIcon icon={faCartPlus}/>
                        </div>
                    </div>
                </li>

        );
    }
}
