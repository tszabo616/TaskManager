import { useContext, useEffect, useState } from 'react';

import TaskItem from './TaskItem';
import classes from './TasksList.module.css';
import { TasksContext } from '../../store/TasksContext';
import Loading from '../ui/Loading';
import NoTasks from './NoTasks';
import AddButton from '../buttons/AddButton';
import AddModal from '../modals/AddModal';

export default function TasksList() {
    const tasksCtx = useContext(TasksContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddModalShown, setIsAddModalShown] = useState(false);

    useEffect(() => {
        tasksCtx?.getTasks(() => {}, setIsLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tasks = tasksCtx?.getCurrentTasks() || [];

    function handleCloseAddModal() {
        setIsAddModalShown(false);
    }

    function handleShowAddModal() {
        setIsAddModalShown(true);
    }

    return (
        <div className={classes.container}>
            {isAddModalShown && <AddModal onClose={handleCloseAddModal} />}
            <div className={classes.titleContainer}>
                <div style={{ width: '10%' }}></div>
                <h1 className={classes.title}>Current Tasks</h1>
                <div className={classes.buttonContainer}>
                    <AddButton onClick={handleShowAddModal} />
                </div>
            </div>

            {isLoading ? <Loading /> : null}

            {!isLoading && tasks.length
                ? tasks.map(el => (
                      <TaskItem
                          key={`task-item-${el.id}`}
                          id={el.id || 0}
                          title={el.title || ''}
                      />
                  ))
                : <NoTasks />}
        </div>
    );
}
