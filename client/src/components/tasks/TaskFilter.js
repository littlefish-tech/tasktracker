import React, { useContext, useRef, useEffect } from 'react';
import TaskContext from '../../context/task/taskContext';

const TaskFilter = () => {
    const taskContext = useContext(TaskContext);
    const text = useRef('');

    const { filterTasks, clearFilter, filtered } = taskContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if (text.current.value !== '') {
            filterTasks(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <input
                ref={text}
                type='text'
                placeholder='Filter Your Tasks...'
                onChange={onChange}
            />
        </form>
    );
};

export default TaskFilter;