/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

import React, { createContext, useContext, useReducer } from "react";

export const initialContext = {
	state: {
		initialized: false,
		connected: null,
		user: {},
		params: {},
	},
	changeParams: (payload = {}) => {},
	setInitialized: (payload) => {},
	setConnected: (payload) => {},
	logout: () => {},
};

const CHANGE_PARAMS = "CHANGE_PARAMS";
const SET_INITIALIZED = "SET_INITIALIZED";
const SET_CONNECTED = "SET_CONNECTED";
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
		case CHANGE_PARAMS: {
			return newContextState(context, {
				params: { ...context.state.params, ...action.payload },
			});
		}
		case SET_INITIALIZED: {
			return newContextState(context, { initialized: action.payload });
		}
		case SET_CONNECTED: {
			return newContextState(context, { connected: action.payload });
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
		changeParams: (payload) =>
			dispatch({
				type: CHANGE_PARAMS,
				payload,
			}),
		setInitialized: (payload) =>
			dispatch({
				type: SET_INITIALIZED,
				payload,
			}),
		setConnected: (payload) =>
			dispatch({
				type: SET_CONNECTED,
				payload,
			}),
	};

	return <AppContext.Provider value={contextProviderValue}>{children}</AppContext.Provider>;
};

export default () => useContext(AppContext);
