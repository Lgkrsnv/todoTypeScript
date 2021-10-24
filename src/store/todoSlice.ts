import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {
	todosInitialState
} from './types';

interface togglePayload {
	id: string,
	completed: boolean,
}
interface gotTodosData {

	"userId": number,
	"id": number,
	"title": string,
	"completed": boolean

}
export const fetchTodos = createAsyncThunk<gotTodosData[] | undefined, void, {}>(
	'todos/fetchTodos',
	async function (_, { rejectWithValue }) {
		try {
			const response: AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=7');
			if (response.status >= 200 && response.status < 300) {
				return response.data as gotTodosData[];
			}
		} catch (error) {
			return rejectWithValue(error)
		}

	}
)
export const todoSlice = createSlice({
	name: 'todos',
	initialState: todosInitialState,
	reducers: {
		addTodo(state, action: PayloadAction<string>) {
			console.log(action);

			state.todos.push({
				id: new Date().toISOString(),
				text: action.payload,
				completed: false,
			})
		},
		removeTodo(state, action: PayloadAction<string>) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload)
		},
		toggleTodo(state, action: PayloadAction<togglePayload>) {
			state.todos = state.todos.map(todo => {
				if (todo.id === action.payload.id) {
					todo.completed = action.payload.completed;
					return todo;
				}
				return todo;
			})
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTodos.pending, (state) => {
			state.status = 'loading';
			state.error = null;
		})
		builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
			state.error = null;
			state.status = 'fulfilled'

			const todos = payload?.map(todo => {
				return ({
					id: todo.id.toString(),
					text: todo.title,
					completed: todo.completed
				})
			})
			if (todos) {
				state.todos = todos;
			}
		})
		builder.addCase(fetchTodos.rejected, (state, action) => {
			console.log(action, 'action');
			
		  if (action.payload) {
			  state.status = 'rejected'
		     state.error = typeof action.payload === 'string' ? action.payload : 'Error'
		  } else {
		    state.error = action.error.message === 'string' ? action.error.message : 'Error'
		  }
		})
	},
})

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;