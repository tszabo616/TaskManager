import PropTypes from 'prop-types';

import classes from './TextInput.module.css';

interface TextInputProps {
    className?: string;
    containerClassName?: string;
    error: boolean;
    errorText: string;
    label?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'password' | 'email' | undefined;
    value: string;
}

export default function TextInput({
    className = '',
    containerClassName = '',
    error = false,
    errorText = '',
    label = '',
    onChange,
    type=undefined,
    value = '',
}: TextInputProps) {
    return (
        <div className={`${classes.inputContainer} ${containerClassName}`}>
            {label ? (
                <label className={classes.inputLabel}>{label}</label>
            ) : null}
            <input
                type={type || 'text'}
                className={`${classes.textInput} ${className}`}
                onChange={onChange}
                value={value}
            />
            {error ? (
                <label className={classes.error}>{errorText}</label>
            ) : null}
        </div>
    );
}

TextInput.propTypes = {
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
};
