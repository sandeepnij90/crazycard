import React, { Component } from 'react';
import Header from '../Header';
import CardList from '../CardList';
import './styles.scss';

class App extends Component {
    constructor(){
        super();
        this.state = {
            view: 'details'
        }
    }

    changeView = view => () => {
        this.setState({view})
    }

    renderView = () => {
        return this.state.view === 'details' ? <Header changeView={this.changeView('cards')} /> : <CardList changeView={this.changeView('details')} />
    }

    render() {
        return (
            <div className="crazy-cards">
                {this.renderView()}
            </div>
        )
    }
}

export default App;