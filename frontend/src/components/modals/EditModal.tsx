import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import classes from './Modal.module.css';
import { TasksContext } from '../../store/TasksContext';
import Button from '../buttons/Button';
import BaseModal from './BaseModal';
import ErrorLabel from '../ui/ErrorLabel';
import Loading from '../ui/Loading';
import TextInput from '../forms/TextInput';

const env = import.meta.env;

interface IForm {
    title: string;
}

const validationSchema = yup.object().shape({
    title: yup.string().required('Required'),
});

interface EditModalProps {
    id: number;
    onClose: () => void;
    title: string;
}

export default function EditModal({ id, onClose, title }: EditModalProps) {
    const tasksCtx = useContext(TasksContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { title },
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data: IForm) => {
        setIsLoading(true);
        const { title } = data || {};

        const url = `${env.VITE_BE_URL}/tasks/${id}`;
        const bodyObj = {
            title,
        };
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(bodyObj),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (res.ok) {
                    tasksCtx?.getTasks(
                        () => {},
                        () => {}
                    );
                } else {
                    return res.json().then(data => {
                        const err = 'Error!';
                        setErrorMessage(err);
                        if (data && data.error) {
                            setErrorMessage(data.error);
                        }
                        throw new Error(err);
                    });
                }
            })
            .catch(() => {
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
                onClose();
            });
    };

    return (
        <BaseModal onClose={onClose}>
            <form className={classes.Form} onSubmit={handleSubmit(onSubmit)}>
                <h1>Edit Task</h1>
                {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}

                <Controller
                    name='title'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            label='Title'
                            containerClassName={classes.textInput}
                            error={!!errors.title}
                            errorText={
                                errors?.title?.message
                                    ? errors.title.message
                                    : ''
                            }
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                {!isLoading && (
                    <Button type='submit' onClick={() => {}}>
                        Submit
                    </Button>
                )}
                {isLoading && <Loading />}
            </form>
        </BaseModal>
    );
}

EditModal.propTypes = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
};
