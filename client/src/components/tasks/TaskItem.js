import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TaskContext from '../../context/task/taskContext';

const TaskItem = ({ task }) => {
    const taskContext = useContext(TaskContext);
    const { deleteTask, setCurrent, clearCurrent } = taskContext;

    const { _id, taskname, assigner, deadline, description, type } = task;

    const onDelete = () => {
        deleteTask(_id);
        clearCurrent();
    };

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {taskname}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' +
                        (type === 'urgent' ? 'badge-success' : 'badge-primary')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {assigner && (
                    <li>
                        <i className='fas fa-user-edit' /> {assigner}
                    </li>
                )}
                {deadline && (
                    <li>
                        <i className='fas fa-business-time' /> {deadline}
                    </li>
                )}
                {description && (
                    <li>
                        <i className='fas fa-info' /> {description}
                    </li>
                )}
            </ul>
            <p>
                <button
                    className='btn btn-dark btn-sm'
                    onClick={() => setCurrent(task)}
                >
                    Edit
        </button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>
                    Delete
        </button>
            </p>
        </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object.isRequired
};

export default TaskItem;