import React, { userReducer } from 'react';
import axios from "axios";
import taskReducer from "./taskReducer";
import TaskContext from "./taskContext";

import {
    GET_TASKS,
    CLEAR_TASKS,
    ADD_TASK,
    DELETE_TASK,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_TASK,
    FILTER_TASKS,
    CLEAR_FILTER,
    TASK_ERROR,

} from "../types";

const TaskState = props => {
    const initialState = {
        tasks: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(taskReducer, initialState);

    //GET all tasks

    const getTasks = async () => {
        try {
            const res = await axios.get("/api/tasks");
            dispatch({
                type: GET_TASKS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: TASK_ERROR,
                payload: err.response.msg
            });
        }
    }

    const addTask = async task => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/tasks', task, config);

            dispatch({
                type: ADD_TASK,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: TASK_ERROR,
                payload: err.response.msg
            });
        }
    };


    const deleteTask = async id => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            dispatch({
                type: DELETE_TASK,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: TASK_ERROR,
                payload: err.response.msg
            });
        }
    };

    //update task

    const updateTask = async task => {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        };
        try {
            const res = await axios.put(`/api/tasks/${task._id}`,
                task,
                config);
            dispatch({
                type: UPDATE_TASK,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: TASK_ERROR,
                payload: err.response.msg
            });
        }
    };

    //clear task

    const clearTasks = () => {
        dispatch({ type: CLEAR_TASKS });
    };

    //set current task
    const setCurrent = task => {
        dispatch({ type: SET_CURRENT, payload: task })
    };

    // Clear Current Task
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter tasks
    const filterTasks = text => {
        dispatch({ type: FILTER_TASKS, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                current: state.current,
                filter: state.filter,
                error: state.error,
                getTasks,
                addTask,
                deleteTask,
                updateTask,
                clearTasks,
                setCurrent,
                clearCurrent,
                filterTasks,
                clearFilter
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
};

export default TaskState;