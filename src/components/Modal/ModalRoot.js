import React from "react";
import { connect } from "react-redux";

import Modal from 'react-bootstrap/Modal';
import loginModal from "./loginModal";
import registerModal from "./registerModal";
import { MODAL_TEMPLATE_MAP } from '../../redux/types/modal.type';

const modalMap = {
	[MODAL_TEMPLATE_MAP['LOGIN']]: loginModal,
	[MODAL_TEMPLATE_MAP['REGISTER']]: registerModal
};

const mapStateToProps = (state) => ({
	...state.modal,
});

class ModalContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: props.modalProps.open,
		};
		this.closeModal = this.closeModal.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.modalProps.open !== this.props.modalProps.open) {
			this.setState({
				modalIsOpen: nextProps.modalProps.open,
			});
		}
	}

	closeModal() {
		this.props.hideModal();
	}

	render() {
		if (!this.props.modalTemplateName) {
			return null;
		}

		const SpecifiedModal = modalMap[this.props.modalTemplateName];

		return (
			<div>
				<Modal
					show={this.state.modalIsOpen}
					onHide={this.closeModal}
					centered
				>
					<SpecifiedModal
						closeModal={this.closeModal}
						{...this.props.modalProps}
					/>
				</Modal>
			</div>
		);
	}
}

export default connect(mapStateToProps, null)(ModalContainer);
