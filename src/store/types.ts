export interface iTodo {
	id: string,
	text: string,
	completed: boolean
}
export interface iTodosState {
		todos: iTodo[],
		status: string | null,
		error: string | null,
}
export type TodosSliceState = { state: iTodosState } 

// First approach: define the initial state using that type
export const todosInitialState:  iTodosState = {
	todos: [],
	status: null,
	error: null,
}