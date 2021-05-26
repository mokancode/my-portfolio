import { combineReducers } from 'redux';
import navReducer from './navReducer';
import stylesReducer from './stylesReducer';

export default combineReducers({
    navbar: navReducer,
    styles: stylesReducer
})