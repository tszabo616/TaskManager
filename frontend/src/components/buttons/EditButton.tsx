import PropTypes from 'prop-types';
import { FaPenToSquare } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';

import classes from './EditButton.module.css';

interface EditButtonProps {
    className?: string;
    onClick: () => void;
    type?: 'submit' | 'reset' | 'button' | undefined;
}

export default function EditButton({
    className = '',
    onClick,
    type = undefined,
}: EditButtonProps) {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={`${classes.Button} ${className}`}
            data-tooltip-id='edit-button'
            data-tooltip-content='Edit'>
            <FaPenToSquare size='16px' />
            <Tooltip
                id='edit-button'
                style={{
                    backgroundColor: 'rgb(87, 87, 87)',
                    color: '#F5F5F5',
                    padding: '8px',
                }}
            />
        </button>
    );
}

EditButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
};
