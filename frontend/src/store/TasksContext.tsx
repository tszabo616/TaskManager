import { createContext } from 'react';

import type { Task } from '../types/Task';

type GetCurrentTasks = () => Task[];
type GetTasks = (
    setErrorMessage: SetErrorMessage,
    setIsLoading: SetIsLoading
) => void;
type SetErrorMessage = (error: string) => void;
type SetIsLoading = (isLoading: boolean) => void;

interface ITasksContext {
    tasks: Task[];
    getTasks: GetTasks;
    getCurrentTasks: GetCurrentTasks;
}

export const TasksContext = createContext<ITasksContext | null>(null);
