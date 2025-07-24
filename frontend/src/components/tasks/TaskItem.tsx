import PropTypes from 'prop-types';

import classes from './TaskItem.module.css';

interface TaskItemProps {
    title: string;
}

export default function TaskItem({ title = '' }: TaskItemProps) {

    return (
        <div className={classes.container}>
            <p className={classes.title}>{title}</p>

        </div>
    );
}

TaskItem.propTypes = {
    title: PropTypes.string,
};
