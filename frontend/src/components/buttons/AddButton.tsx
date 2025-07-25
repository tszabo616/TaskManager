import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';

import classes from './AddButton.module.css';

interface AddButtonProps {
    className?: string;
    onClick: () => void;
    type?: 'submit' | 'reset' | 'button' | undefined;
}

export default function AddButton({
    className = '',
    onClick,
    type = undefined,
}: AddButtonProps) {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={`${classes.Button} ${className}`}
            data-tooltip-id='add-button'
            data-tooltip-content='Add Task'>
            <FaPlus size='16px'/>
            <Tooltip
                id='add-button'
                style={{
                    backgroundColor: 'rgba(87, 87, 87, 1)',
                    color: '#F5F5F5',
                    padding: '8px',
                }}
            />
        </button>
    );
}

AddButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
};
