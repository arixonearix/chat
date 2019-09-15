import React from 'react';
import {connect} from "react-redux";
import {makeLogin} from '../actions/actions';
import LoginButton from "../components/LoginButton";
import Holder from '../components/Holder';

function mapStateToProps(state) {

    return {
        ...state
    };
}

export default connect(mapStateToProps, null) (Holder);