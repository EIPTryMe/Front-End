import { modalTypes } from "../types";

export const showModal = ({ modalProps, modalTemplateName }) => (dispatch) => {
	dispatch({
		type: modalTypes.SHOW_MODAL,
		modalProps,
		modalTemplateName,
	});
};

export const hideModal = () => (dispatch) => {
	dispatch({
		type: modalTypes.HIDE_MODAL,
	});
};
