import React, { Component } from 'react';
import PropType from 'prop-types';
import Card from './Card';
import { Button } from '../common';

class CardList extends Component {

    constructor() {
        super();
        this.state= {
            selectedKeys: [],
            totalCredit: 0
        }
    }

    handleSelectCard = key => () => {
        let credit = 0
        this.props.availableCards.forEach(({cardKey, creditAvailable}) => {
            if (cardKey === key) {
                credit = creditAvailable
            }
        }) 

        if (this.state.selectedKeys.includes(key)) {
            const updatedKeys = this.state.selectedKeys.filter(val => val !== key );
            this.setState({
                selectedKeys: [...updatedKeys],
                totalCredit: this.state.totalCredit -= credit
            });
            
        } else {
            this.setState({ 
                selectedKeys: [...this.state.selectedKeys, key],
                totalCredit: this.state.totalCredit += credit
            })
        }
    }

    renderCards = () => {
        return this.props.availableCards.map(({ cardKey, cardTitle, apr, balanceTransferOfferDuration, purchaseOfferDuration, creditAvailable}) => {
            return (<Card 
                key={cardKey}
                cardTitle={cardTitle}
                apr={apr}
                balanceTransferOfferDuration={balanceTransferOfferDuration}
                purchaseOfferDuration={purchaseOfferDuration}
                creditAvailable={creditAvailable}
                handleClick={this.handleSelectCard(cardKey)}
                isSelected={this.state.selectedKeys.includes(cardKey)}
            />)
        })
    } 

    changeView = () => {
        this.props.changeView();
    }

    render() {
        return (
            <div data-qa="card-list" className="card-list container">
                <h1>Cards</h1>
                <p>Review credit cards that are applicable to your credit status.</p>
                <p>Select one or more cards to view the total amount of credit available</p>
                <div className="cards">
                    {this.renderCards()}
                </div>
                <div className="action-bar">
                <p>Your total amount of credit available &pound;{this.state.totalCredit}</p> <Button className="button" text="Continue" onClick={() => {}}/> </div>
                <a onClick={this.changeView}>Edit details</a>
            </div>
        )
    }
}

CardList.propTypes = {
    availableCards: PropType.array,
    changeView: PropType.func
}

CardList.defaultProps = {
    availableCards: [],
    changeView: () => {}
}


export default CardList;