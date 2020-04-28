import { modalTypes } from "../types";

const initialState = {
	modalTemplateName: null,
	modalProps: {
		open: false,
	},
};

export default function modal(state = initialState, action) {
	switch (action.type) {
		case modalTypes.SHOW_MODAL:
			return {
				modalProps: {...action.modalProps, open: true},
				modalTemplateName: action.modalTemplateName,
				type: action.type,
			};
		case modalTypes.HIDE_MODAL:
			return initialState;
		default:
			return state;
	}
}
