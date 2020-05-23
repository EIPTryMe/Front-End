/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

import React, { createContext, useContext, useReducer } from "react";

export const initialContext = {
	state: {
		user: {},
		params: {
			cartLength: 0
		},
	},
	setUser: (payload = {}) => {},
	changeParams: (payload = {}) => {},
	logout: () => {},
};

const CHANGE_PARAMS = "CHANGE_PARAMS";
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

export const AppContext = createContext(initialContext);

const newContextState = (context, newState) => ({
	...context,
	state: {
		...context.state,
		...newState,
	},
});

const logout = () => {};

export const reducer = (context, action) => {
	switch (action.type) {
		case LOGOUT: {
			logout(action.dispatch);
			return newContextState(context, { user: null });
		}
		case SET_USER: {
			return newContextState(context, {
				user: { ...context.state.user, ...action.payload },
			});
		}
		case CHANGE_PARAMS: {
			return newContextState(context, {
				params: { ...context.state.params, ...action.payload },
			});
		}
		default: {
			return context;
		}
	}
};

export const AppContextProvider = ({ children }) => {
	const [context, dispatch] = useReducer(reducer, {
		...initialContext,
		state: {
			...initialContext.state,
			user: null,
		},
	});

	const contextProviderValue = {
		...context,
		logout: () => dispatch({ type: LOGOUT }),
		setUser: (payload) => dispatch({ type: SET_USER, payload }),
		changeParams: (payload) =>
			dispatch({
				type: CHANGE_PARAMS,
				payload,
			}),
	};

	return <AppContext.Provider value={contextProviderValue}>{children}</AppContext.Provider>;
};

export default () => useContext(AppContext);
