import PropTypes from 'prop-types';
import type { FormEvent } from 'react';

import classes from './Modal.module.css';
import Button from '../buttons/Button';
import BaseModal from './BaseModal';
import ErrorLabel from '../ui/ErrorLabel';
import Loading from '../ui/Loading';

interface ConfirmModalProps {
    hasError: boolean;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    title?: string;
}

export default function ConfirmModal({
    hasError,
    isLoading,
    onClose,
    onSubmit,
    title = '',
}: ConfirmModalProps) {
    return (
        <BaseModal onClose={onClose}>
            <form className={classes.Form} onSubmit={onSubmit}>
                <h1>{title}</h1>
                {hasError && (
                    <div className={classes.errorContainer}>
                        <ErrorLabel>
                            Something went wrong. Try again.
                        </ErrorLabel>
                    </div>
                )}
                {!isLoading && (
                    <Button type='submit' onClick={() => {}}>
                        Confirm
                    </Button>
                )}
                {isLoading && <Loading />}
            </form>
        </BaseModal>
    );
}

ConfirmModal.propTypes = {
    hasError: PropTypes.bool,
    isLoading: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
};
