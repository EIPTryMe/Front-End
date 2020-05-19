import React, { Component } from "react";

import waveSVG from "../../assets/img/Home/wave.svg";
import arrowDownSVG from "../../assets/img/Home/arrowDown.svg";
import { imagePlaceholderOrange, imagePlaceholderWhite } from "../../constants/image";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { NAVBAR_HEIGHT } from "../../constants/navbar";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export default class Home extends Component {
	render() {
		const Benefit = (props) => (
			<Col sm="12" md="4">
				<div className="benefit">
					<img src={props.picto} alt="" />
					<p>{props.text}</p>
				</div>
			</Col>
		);

		return (
			<React.Fragment>
				<header className="header">
					<div className="overlay"></div>
					<Container>
						<Row>
							<Col xs="12" md="6">
								<h1>TryMe</h1>
								<p className="description">
									TryMe est une plateforme qui permet aux entreprises de proposer
									des produits ou services à louer
								</p>
							</Col>
							<Col xs="12" md="6">
								<div className="rightPart">
									<Button
										variant="orange"
										className="text-white bounce"
										size="lg"
										href="/products"
									>
										Découvrez nos offres
									</Button>
								</div>
							</Col>
						</Row>
					</Container>
					<div className="wave">
						<img className="wave-img" src={waveSVG} alt="" />
					</div>
					<AnchorLink
						href="#benefits"
						offset={NAVBAR_HEIGHT}
						className="arrow-down-container"
					>
						<img className="arrow-down" src={arrowDownSVG} alt="" />
					</AnchorLink>
				</header>

				<section className="benefits" id="benefits">
					<Container>
						<h1 className="mb-5">Nos avantages</h1>
						<Row>
							<Benefit
								picto={imagePlaceholderOrange}
								text="Plus de 100 produits disponible"
							/>
							<Benefit picto={imagePlaceholderWhite} text="Pas de frais cachés" />
							<Benefit
								picto={imagePlaceholderOrange}
								text="Période de location flexible"
							/>
							<Benefit
								picto={imagePlaceholderWhite}
								text="Plus de 100 produits disponible"
							/>
							<Benefit picto={imagePlaceholderOrange} text="Pas de frais cachés" />
							<Benefit
								picto={imagePlaceholderWhite}
								text="Période de location flexible"
							/>
						</Row>
					</Container>
				</section>

				<footer className="footer">
					<div className="my-container">
						<span>&copy; Copyright 2020, TryMe</span>
						<a href="mailto:tryme_2021@labeip.epitech.eu" className="text-white">
							Nous contacter: tryme_2021@labeip.epitech.eu
						</a>
					</div>
					{/* Icons made by
					<a href="http://fontawesome.io/" title="Dave Gandy">
						Dave Gandy
					</a>
					from
					<a href="https://www.flaticon.com/" title="Flaticon">
						www.flaticon.com
					</a> */}
				</footer>
			</React.Fragment>
		);
	}
}
