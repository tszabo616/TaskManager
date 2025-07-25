import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import type { FormEvent } from 'react';

import { TasksContext } from '../../store/TasksContext';
import classes from './TaskItem.module.css';
import DeleteButton from '../buttons/DeleteButton';
import ConfirmModal from '../modals/ConfirmModal';
import CompletedButton from '../buttons/CompletedButton';
import EditButton from '../buttons/EditButton';
import EditModal from '../modals/EditModal';

const env = import.meta.env;

interface TaskItemProps {
    id: number | string;
    title: string;
}

export default function TaskItem({ id, title = '' }: TaskItemProps) {
    const tasksCtx = useContext(TasksContext);
    const [isConfirmModalShown, setIsConfirmModalShown] = useState(false);
    const [isConfirmLoading, setIsConfirmLoading] = useState(false);
    const [hasConfirmError, setHasConfirmError] = useState(false);
    const [isEditModalShown, setIsEditModalShown] = useState(false);

    function handleComplete() {
        const url = `${env.VITE_BE_URL}/tasks/${id}`;
        const bodyObj = {
            is_completed: true,
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
                        // setErrorMessage(err);
                        if (data && data.error) {
                            console.log(data);
                            // setErrorMessage(data.error);
                        }
                        throw new Error(err);
                    });
                }
            })
            .catch(() => {
                // setIsConfirmLoading(false);
            });
    }

    function handleDelete(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsConfirmLoading(true);
        const url = `${env.VITE_BE_URL}/tasks/${id}`;
        fetch(url, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    tasksCtx?.removeTask(parseInt(`${id}`));
                } else {
                    return res.json().then(data => {
                        const err = 'Error!';
                        // setErrorMessage(err);
                        if (data && data.error) {
                            console.log(data);
                            // setErrorMessage(data.error);
                        }
                        throw new Error(err);
                    });
                }
            })
            .catch(() => {
                setIsConfirmLoading(false);
            })
            .finally(() => {
                setIsConfirmLoading(false);
                setIsConfirmModalShown(false);
            });
    }

    function handleCloseConfirmModal() {
        setIsConfirmModalShown(false);
    }

    function handleShowConfirmModal() {
        setHasConfirmError(false);
        setIsConfirmModalShown(true);
    }

    function handleCloseEditModal() {
        setIsEditModalShown(false);
    }

    function handleShowEditModal() {
        setIsEditModalShown(true);
    }

    return (
        <div className={classes.container}>
            {isConfirmModalShown && (
                <ConfirmModal
                    title='Delete Task'
                    onClose={handleCloseConfirmModal}
                    onSubmit={handleDelete}
                    isLoading={isConfirmLoading}
                    hasError={hasConfirmError}
                />
            )}
            {isEditModalShown && (
                <EditModal
                    id={parseInt(`${id}`)}
                    onClose={handleCloseEditModal}
                    title={title}
                />
            )}
            <p className={classes.title}>{title}</p>
            <div className={classes.buttonsContainer}>
                <CompletedButton onClick={handleComplete} />
                <EditButton onClick={handleShowEditModal} />
                <DeleteButton onClick={handleShowConfirmModal} />
            </div>
        </div>
    );
}

TaskItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
};
