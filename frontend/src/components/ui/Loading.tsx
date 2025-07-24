import PropTypes from 'prop-types';

import classes from './Loading.module.css';

interface LoadingProps {
    className?: string;
}

export default function Loading({ className = '' }: LoadingProps) {
    return (
        <div className={classes.loadingContainer}>
            <div className={`${classes.loading} ${className}`}></div>
            <div className={`${classes.loadingReverse} ${className}`}></div>
        </div>
    );
}

Loading.propTypes = {
    className: PropTypes.string,
};
