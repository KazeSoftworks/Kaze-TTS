import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';

const Button = ({ onClick }) => {
	return (
		<button type="button" className="header__login-button" onClick={onClick}>
			<FontAwesomeIcon icon={faTwitch} /> LOGIN
		</button>
	);
};

Button.propTypes = {
	onClick: PropTypes.func,
};

Button.defaultProps = {
	onClick: () => {},
};

export default Button;
