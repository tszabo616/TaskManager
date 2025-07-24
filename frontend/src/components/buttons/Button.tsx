import PropTypes from 'prop-types';
import type { JSX } from 'react';

import classes from './Button.module.css';

type ButtonProps = {
    children: JSX.Element | string | number;
    className?: string;
    onClick: () => void;
    type?: 'submit' | 'reset' | 'button' | undefined;
};

export default function Button({
    className = '',
    onClick,
    type = undefined,
    children = '',
}: ButtonProps) {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={`${classes.Button} ${className}`}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
};
