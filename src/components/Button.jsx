import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Button.scss';

const Button = ({ onClick, className, children, startIcon, endIcon }) => {
	return (
		<button type="button" className={`button ${className}`} onClick={onClick}>
			{startIcon && <FontAwesomeIcon icon={startIcon} />}
			{children}
			{endIcon && <FontAwesomeIcon icon={endIcon} />}
		</button>
	);
};

const FontAwesomeIconShape = PropTypes.shape({
	icon: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.arrayOf(
				PropTypes.oneOfType([PropTypes.string, PropTypes.number])
			),
		])
	),
	iconName: PropTypes.string,
	prefix: PropTypes.string,
});

Button.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.node,
	className: PropTypes.string,
	startIcon: FontAwesomeIconShape,
	endIcon: FontAwesomeIconShape,
};

Button.defaultProps = {
	onClick: () => {},
	children: null,
	className: '',
	startIcon: null,
	endIcon: null,
};

export default Button;
