import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ cardTitle, apr, balanceTransferOfferDuration, purchaseOfferDuration, creditAvailable, handleClick, isSelected }) => {
    return (
        <div className={`card ${isSelected ? 'active' : ''}`} data-qa="card" onClick={handleClick}>
            <div className="card__title">{cardTitle}</div>
            <div className="card__apr">APR <strong>{apr}%</strong></div>
            <div className="card__balance-transfer-offer-duration">Balance transfer offer duration: <strong>{balanceTransferOfferDuration} months</strong></div>
            <div className="card__purchase-offer-duration">Balance purchase offer duration: <strong>{purchaseOfferDuration} months</strong></div>
            <div className="card__credit-available">Credit available <strong>£{creditAvailable}</strong></div>
        </div>
    )
}

Card.propTypes = {
    cardTitle: PropTypes.string,
    apr: PropTypes.number,
    balanceTransferOfferDuration: PropTypes.number,
    purchaseOfferDuration: PropTypes.number,
    creditAvailable: PropTypes.number,
    handleClick: PropTypes.func,
    isSelected: PropTypes.bool,
}

Card.defaultProps = {
    cardTitle: '',
    apr: 0,
    balanceTransferOfferDuration: 0,
    purchaseOfferDuration: 0,
    creditAvailable: 0,
    handleClick: () => {},
    isSelected: false,
}

export default Card;