import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';

import classes from './CompletedButton.module.css';

interface CompletedButtonProps {
    className?: string;
    onClick: () => void;
    type?: 'submit' | 'reset' | 'button' | undefined;
}

export default function CompletedButton({
    className = '',
    onClick,
    type = undefined,
}: CompletedButtonProps) {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={`${classes.Button} ${className}`}
            data-tooltip-id='completed-button'
            data-tooltip-content='Mark Completed'>
            <FaCheck size='16px'/>
            <Tooltip
                id='completed-button'
                style={{
                    backgroundColor: 'rgba(87, 87, 87, 1)',
                    color: '#F5F5F5',
                    padding: '8px',
                }}
            />
        </button>
    );
}

CompletedButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
};
