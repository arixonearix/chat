import {combineReducers} from "redux";
import TypeReducers from './types';

const allReducers = combineReducers({
    types: TypeReducers
});

export default allReducers;