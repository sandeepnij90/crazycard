import React from 'react';
import Form from '../Form'
import PropTypes from 'prop-types';
const Header = ({ changeView }) => {
    return (
        <div className="header">
            <div className="container">
                    <div className="header__intro">
                        <h1>Crazy Cards</h1>
                        <p>Review credit cards that are applicable to your credit status.</p>
                        <p>Simply fill in the form, and find which cards are available for you in seconds!</p>
                        <img src="http://www.sandeepnijjar.com/test/image.svg" />
                    </div>
                    <div className="header__form">
                        <Form changeView={changeView} />
                    </div>        
            </div>
        </div>
    )
}

Header.propTypes = {
    changeView: PropTypes.func
}

Header.defaultProps = {
    changeView: () => {}
}

export default Header;