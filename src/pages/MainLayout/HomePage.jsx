import React from "react";

import waveSVG from "../../assets/img/Home/wave.svg";
import arrowDownSVG from "../../assets/img/Home/arrowDown.svg";
import { imagePlaceholderOrange, imagePlaceholderWhite } from "../../constants/image";
import benefitOne from "../../assets/img/Home/LP-avantages-1.jpg";
import benefitTwo from "../../assets/img/Home/LP-avantages-2.jpg";
import benefitThree from "../../assets/img/Home/LP-avantages-3.jpg";
import howOne from "../../assets/img/Home/picto-how-1.jpg";
import howTwo from "../../assets/img/Home/picto-how-2.jpg";
import howThree from "../../assets/img/Home/picto-how-3.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { NAVBAR_HEIGHT } from "../../constants/navbar";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const HomePage = () => {
	const Benefit = (props) => (
		<Col sm="12" md="4">
			<div className="benefit">
				<img src={props.picto} alt="" />
				<p>{props.text}</p>
			</div>
		</Col>
	);

	const HowTo = (props) => (
		<Col sm="12" md="4">
			<div className="how-to">
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
								TryMe est une plateforme qui permet aux entreprises de proposer des produits ou
								services à louer
							</p>
						</Col>
						<Col xs="12" md="6">
							<div className="rightPart">
								<Button variant="orange" className="text-white bounce" size="lg" href="/products">
									Découvrez nos offres
								</Button>
							</div>
						</Col>
					</Row>
				</Container>
				<div className="wave">
					<img className="wave-img" src={waveSVG} alt="" />
				</div>
				<AnchorLink href="#benefits" offset={NAVBAR_HEIGHT} className="arrow-down-container">
					<img className="arrow-down" src={arrowDownSVG} alt="" />
				</AnchorLink>
			</header>

			<section className="benefits" id="benefits">
				<Container>
					<h1 className="mb-5">Nos avantages</h1>
					<Row>
						<Benefit picto={benefitOne} text="Plus de 100 produits disponible" />
						<Benefit picto={benefitTwo} text="Pas de frais cachés" />
						<Benefit picto={benefitThree} text="Période de location flexible" />
					</Row>
				</Container>
			</section>
			<section className="how-tos" id="how-to">
				<Container>
					<h1 className="mb-5">Comment ça marche ?</h1>
					<Row>
						<HowTo picto={howOne} text="Je trouve mon produit idéal" />
						<HowTo picto={howTwo} text="Je le loue" />
						<HowTo picto={howThree} text="Je le possède*" />
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
};

export default HomePage;
