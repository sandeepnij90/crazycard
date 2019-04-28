import React from 'react';
import { connect } from 'react-redux';
import CardList from './CardList';

const CardListContainer = ({ availableCards, changeView }) => {
    return (
        <CardList availableCards={availableCards} changeView={changeView} />
    )
};

const mapStateToProps = state => {
    return {
        availableCards: state.availableCards
    }
}

export default connect(mapStateToProps)(CardListContainer);