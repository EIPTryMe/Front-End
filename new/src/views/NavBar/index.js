import React from "react";
import { useDispatch } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { MODAL_TEMPLATE_MAP } from "../../redux/types/modal.type";
import { showModal } from "../../redux/actions/modal.action";

import { useAuth0 } from "../../hooks/auth0";

const showModalDispatched = (template) =>
	showModal({ modalProps: {}, modalTemplateName: template });

const NavBar = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const dispatch = useDispatch();

	return (
		<Navbar bg="primary" variant="dark">
			<Navbar.Brand href="#home">Navbar</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="#home">Home</Nav.Link>
				<Nav.Link href="#features">Features</Nav.Link>
				<Nav.Link href="#pricing">Pricing</Nav.Link>
			</Nav>
			<Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				<Button
					variant="outline-light"
					className="mr-sm-2"
					onClick={() =>
						dispatch(showModalDispatched(MODAL_TEMPLATE_MAP["LOGIN"]))
					}
				>
					Connexion
				</Button>
				<Button
					variant="outline-light"
					onClick={() =>
						dispatch(showModalDispatched(MODAL_TEMPLATE_MAP["REGISTER"]))
					}
				>
					Inscription
				</Button>
				<div>
					{!isAuthenticated &&
						(
							<Button
								variant="outline-light"
								className="mr-sm-2"
								onClick={() => loginWithRedirect({})}
							>
								Connexion AUTH0
							</Button>
						)}
					{isAuthenticated && <button onClick={() => logout()}>Log out</button>}
				</div>
			</Form>
		</Navbar>
	);
};

export default NavBar;
