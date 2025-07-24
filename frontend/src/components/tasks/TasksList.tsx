import { useContext, useEffect, useState } from 'react';

import TaskItem from './TaskItem';
import classes from './TasksList.module.css';
import { TasksContext } from '../../store/TasksContext';
import Loading from '../../ui/Loading';
import NoTasks from './NoTasks';

export default function TasksList() {
    const tasksCtx = useContext(TasksContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        tasksCtx?.getTasks(() => {}, setIsLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tasks = tasksCtx?.getCurrentTasks() || [];

    return (
        <div className={classes.container}>
            <div className={classes.titleContainer}>
                <h1 className={classes.title}>Current Tasks</h1>
            </div>

            {isLoading ? <Loading /> : null}

            {!isLoading && tasks.length
                ? tasks.map(el => (
                      <TaskItem
                          key={`task-item-${el.id}`}
                          title={el.title || ''}
                      />
                  ))
                : <NoTasks />}
        </div>
    );
}
