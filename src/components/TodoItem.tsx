import React, { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux'
import { iTodo } from '../store/types';
import { removeTodo, toggleTodo } from '../store/todoSlice'
interface ITodoItemProps {
	todo: iTodo
}
export const TodoItem: FC<ITodoItemProps> = ({ todo }) => {
	const dispatch = useDispatch();
	const changeHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {

		dispatch(toggleTodo({ id, completed: e.target.checked }))
	}
	const deleteHandler = (id: string): void => {
		dispatch(removeTodo(id));
	}
	return (
		<>
			<li>
				{todo.text}<input type='checkbox' checked={todo.completed} onChange={(e) => changeHandler(e, todo.id)}>
				</input>
				<button onClick={() => deleteHandler(todo.id)}>DELETE</button>
			</li>
		</>
	)
}
