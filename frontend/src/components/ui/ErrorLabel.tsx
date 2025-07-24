import PropTypes from 'prop-types';
import type { JSX } from 'react';

import classes from './ErrorLabel.module.css';

interface ErrorLabelProps {
    children: JSX.Element | string | number;
    className?: string;
}

export default function ErrorLabel({
    children = '',
    className = '',
}: ErrorLabelProps) {
    return <p className={`${classes.error} ${className}`}>{children}</p>;
}

ErrorLabel.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
};
