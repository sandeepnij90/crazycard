import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, disabled, onClick, className, title }) => {
    return (
        <button className={className} data-qa="button" disabled={disabled} onClick={onClick} title={title}>{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    title: PropTypes.string
}

Button.defaultProps = {
    disabled: false,
    className: '',
    title: ''
}

export default Button;