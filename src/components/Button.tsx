import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEventHandler, ReactNode } from 'react';
import '@scss/Button.scss';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
	className: string;
	children: ReactNode;
	startIcon: IconProp;
	endIcon: IconProp;
	isLoading: boolean;
}

const Button = ({
	onClick,
	className,
	children,
	startIcon,
	endIcon,
	isLoading,
}: ButtonProps) => {
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

export default Button;
