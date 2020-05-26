import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import NavDropdown from "react-bootstrap/NavDropdown";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import { useAuth0 } from "../../hooks/auth0";

import useAppContext from "../../contexts/AppContext";

const NavBar = (props) => {
	const { loading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const { location, cartLength } = props;
	const context = useAppContext();

	const { user } = context.state;

	const ButtonLogin = () => (
		<Button variant="outline-light" className="mr-sm-2" onClick={() => loginWithRedirect({})}>
			Connexion / Inscription
		</Button>
	);

	const dropdownTitle = user ? (
		<span>
			<img className="avatar" src={user.picture} alt="" /> {user.name}
		</span>
	) : '';

	const onLogout = (e) => {
		e.preventDefault();

		logout({ returnTo: window.location.origin });
	};

	return (
		<Navbar
			collapseOnSelect
			expand="md"
			bg="blue"
			variant="dark"
			className="main-nav"
			sticky="top"
		>
			<Navbar.Brand href="/">TryMe</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto" activeKey={location.pathname}>
					<Nav.Link as={NavLink} exact to="/">
						Accueil
					</Nav.Link>
					<Nav.Link as={NavLink} exact to="/products">
						Produits
					</Nav.Link>
				</Nav>
				<Nav activeKey={location.pathname}>
					{loading && <Spinner animation="border" variant="light" size="sm" />}
					{!loading && !isAuthenticated && <ButtonLogin />}
					{!loading && isAuthenticated && (
						<React.Fragment>
							{user && user.company && (
								<Nav.Link as={NavLink} exact to="/company/dashboard">
									Mon entreprise
								</Nav.Link>
							)}
							<Nav.Link as={NavLink} exact to="/my-cart">
								Mon panier{" "}
								{cartLength > 0 ? (
									<Badge variant="danger" pill>
										{cartLength}
									</Badge>
								) : null}
							</Nav.Link>
							<NavDropdown
								title={dropdownTitle}
								id="collasible-nav-dropdown"
								active={location.pathname.includes("/profile/")}
							>
								<NavDropdown.Item as={NavLink} exact to="/profile/me">
									Mon profil
								</NavDropdown.Item>
								<NavDropdown.Item as={NavLink} exact to="/profile/orders">
									Mes commandes
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item
									as={NavLink}
									exact
									to="/logout"
									onClick={onLogout}
								>
									Déconnexion
								</NavDropdown.Item>
							</NavDropdown>
						</React.Fragment>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
