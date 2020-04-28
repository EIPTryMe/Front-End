import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import { useAuth0 } from "../../hooks/auth0";

import './navbar.scss';

const NavBar = (props) => {
	const { loading, isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
	const { location } = props;

	const ButtonLogin = () => (
		<Button variant="outline-light" className="mr-sm-2" onClick={() => loginWithRedirect({})}>
			Connexion / Inscription
		</Button>
	);

	const dropdownTitle = user ? <span>
		<img className="avatar" src={user.picture} alt=""/> {user.name}
	</span> : null;

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="main-nav">
			<Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto" activeKey={location.pathname}>
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/products">Products</Nav.Link>
				</Nav>
				<Nav activeKey={location.pathname}>
					{loading && <Spinner animation="border" variant="light" size="sm" />}
					{!loading && !isAuthenticated && <ButtonLogin />}
					{!loading && isAuthenticated && (
						<NavDropdown title={dropdownTitle} id="collasible-nav-dropdown">
							<NavDropdown.Item href="/my-profile">Mon profil</NavDropdown.Item>
							<NavDropdown.Item href="/my-orders">Mes commandes</NavDropdown.Item>
							<NavDropdown.Item href="/my-messages">Mes messages</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/" onClick={() => logout()}>Déconnexion</NavDropdown.Item>
						</NavDropdown>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
