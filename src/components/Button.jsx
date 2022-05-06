import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Button.scss';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const Button = ({
	onClick,
	className,
	children,
	startIcon,
	endIcon,
	isLoading,
}) => {
	const baseClass = 'button';
	const buttonClass = () => {
		const customClass = `${baseClass} ${className || ''}
		${isLoading ? `${baseClass}--loading` : ''}`;
		return customClass;
	};

	return (
		<button type="button" className={buttonClass()} onClick={onClick}>
			{startIcon && <FontAwesomeIcon icon={startIcon} />}

			<div className={`${baseClass}__content`}>
				{isLoading && (
					<div className={`${baseClass}__content__spinner`}>
						<FontAwesomeIcon icon={faSync} spin={isLoading} />
					</div>
				)}
				<div className={`${baseClass}__content__text`}>{children}</div>
			</div>
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
	isLoading: PropTypes.bool,
};

Button.defaultProps = {
	onClick: () => {},
	children: null,
	className: '',
	startIcon: null,
	endIcon: null,
	isLoading: false,
};

export default Button;
