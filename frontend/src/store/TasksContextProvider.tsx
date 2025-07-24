import { useState, useCallback } from 'react';
import type { JSX } from 'react';

import { TasksContext } from './TasksContext';
import type { Task } from '../types/Task';

const env = import.meta.env;

type SetErrorMessage = (error: string) => void;
type SetIsLoading = (isLoading: boolean) => void;

type TasksContextProviderProps = {
    children: JSX.Element | string | number;
};

export const TasksContextProvider = ({
    children,
}: TasksContextProviderProps) => {
    const [tasks, setTasks] = useState([]);

    const getCurrentTasks = useCallback(() => {
        return tasks.filter(function (task: Task) {
            return !task.is_completed;
        });
    }, [tasks]);

    const getTasks = useCallback(
        (setErrorMessage: SetErrorMessage, setIsLoading: SetIsLoading) => {
            const url = `${env.VITE_BE_URL}/tasks`;
            fetch(url, {
                method: 'GET',
            })
                .then(res => {
                    setIsLoading(false);
                    if (res.ok) {
                        return res.json();
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
                .then(data => {
                    setTasks(data);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        },
        []
    );

    const removeTask = useCallback(
        (id: number) => {
            setTasks(
                tasks.filter(function (task: Task) {
                    return task.id != id;
                })
            );
        },
        [tasks]
    );

    const contextValue = {
        tasks: tasks,
        getTasks: getTasks,
        getCurrentTasks: getCurrentTasks,
        removeTask: removeTask,
    };

    return (
        <TasksContext.Provider value={contextValue}>
            {children}
        </TasksContext.Provider>
    );
};
