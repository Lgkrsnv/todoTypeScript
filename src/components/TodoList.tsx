import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import { RootState } from '..';
import {TodoItem} from './TodoItem';


const TodoList:FC = () => {

	const todos = useSelector((state: RootState) => state.todos.todos)
	console.log('todos', todos);
	
	return (
		<div>
			<ul>
				{todos && todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
			</ul>
		</div>
	)
}
export default TodoList;