import PropTypes from 'prop-types';
import { FaTrashCan } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';

import classes from './DeleteButton.module.css';

interface DeleteButtonProps {
    className?: string;
    onClick: () => void;
    type?: 'submit' | 'reset' | 'button' | undefined;
}

export default function DeleteButton({
    className = '',
    onClick,
    type = undefined,
}: DeleteButtonProps) {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={`${classes.Button} ${className}`}
            data-tooltip-id='delete-button'
            data-tooltip-content='Delete'>
            <FaTrashCan size='16px' />
            <Tooltip
                id='delete-button'
                style={{
                    backgroundColor: 'rgb(87, 87, 87)',
                    color: '#F5F5F5',
                    padding: '8px',
                }}
            />
        </button>
    );
}

DeleteButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
};
