import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Option  extends PureComponent {

    handleOptionClick = index => () => {
        const { options, handleClick } = this.props;
        handleClick(options[index]);
    }

    renderOptions = () => {
        const { options, activeOption } = this.props;
        return options.map((opt, index) => {
            return <li onClick={this.handleOptionClick(index)} className={`option ${activeOption === opt ? 'active' : ''}`} key={opt}>{opt}</li>
        })
    }

    render() {
        return (
            <div className="option" data-qa="option">
                <ul>
                    {this.renderOptions()}
                </ul>
            </div>
        )
    }
}

Option.propTypes = {
    handleClick: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Option;
