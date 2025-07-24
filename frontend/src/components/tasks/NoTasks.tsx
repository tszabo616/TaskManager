import classes from './NoTasks.module.css';

export default function TaskItem() {
    return (
        <div className={classes.container}>
            <p className={classes.title}>No tasks available...</p>
        </div>
    );
}
