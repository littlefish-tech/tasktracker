import React, { useState, useContext, useEffect } from 'react';
import TaskContext from '../../context/task/taskContext';

const TaskForm = () => {
    const taskContext = useContext(TaskContext);

    const { addTask, updateTask, clearCurrent, current } = taskContext;

    useEffect(() => {
        if (current !== null) {
            setTask(current);
        } else {
            setTask({
                taskname: '',
                assigner: '',
                deadline: "",
                description: '',
                type: "normal"
            });
        }
    }, [taskContext, current]);

    const [task, setTask] = useState({
        taskname: '',
        assigner: '',
        deadline: "",
        description: '',
        type: "normal"
    });


    const { taskname, assigner, description, deadline, type } = task;

    const onChange = e =>
        setTask({ ...task, [e.target.name]: e.target.value });


    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addTask(task);
        } else {
            updateTask(task);
        }
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>
                {current ? 'Edit Task' : 'Add Task'}
            </h2>
            <input
                type='text'
                placeholder='TaskName'
                name='taskname'
                value={taskname}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Task Assigner'
                name='assigner'
                value={assigner}
                onChange={onChange}
            />
            <input
                type='date'
                placeholder='Deadline'
                name='deadline'
                value={deadline}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Description'
                name='description'
                value={description}
                onChange={onChange}
            />
            <h5>Task Type</h5>
            <input
                type='radio'
                name='type'
                value='normal'
                checked={type === 'normal'}
                onChange={onChange}
            />{' '}
      Normal{' '}
            <input
                type='radio'
                name='type'
                value='urgent'
                checked={type === 'urgent'}
                onChange={onChange}
            />{' '}
      Urgent
            <div>
                <input
                    type='submit'
                    value={current ? 'Update Task' : 'Add Task'}
                    className='btn btn-primary btn-block'
                />
            </div>
            {current && (
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>
                        Clear
          </button>
                </div>
            )}
        </form>
    );
};

export default TaskForm;