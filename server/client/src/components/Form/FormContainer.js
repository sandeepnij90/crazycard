import React from 'react';
import { connect } from 'react-redux'
import Form from './Form';
import { updateUserDetails, getCards } from '../../actions';

const FormContainer = ({ updateUserDetails, userDetails , getCards, changeView }) => {
    return (
        <Form updateUserDetails={updateUserDetails} userDetails={userDetails} getCards={getCards} changeView={changeView} />
    )
}

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserDetails: details => dispatch(updateUserDetails(details)),
        getCards: details => dispatch(getCards(details))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
