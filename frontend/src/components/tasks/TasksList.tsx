import TaskItem from './TaskItem';
import classes from './TasksList.module.css';

const tasks = [
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' },
    { id: 3, title: 'Task 3' },
];

export default function TasksList() {
    return (
        <div className={classes.container}>
            <div className={classes.titleContainer}>
                <h1 className={classes.title}>Current Tasks</h1>
            </div>

            {tasks.map(el => (
                <TaskItem key={`task-item-${el.id}`} title={el.title || ''} />
            ))}
        </div>
    );
}
