import { combineReducers } from 'redux'

import alert from './alert.reducer';
import authentication from './authentication.reducer';
import modal from './modal.reducer';

const reducers = {
    alert,
    authentication,
    modal
};

export default combineReducers(reducers);
