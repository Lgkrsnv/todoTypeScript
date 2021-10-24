import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todoSlice'
export const Form: FC = () => {
	const dispatch = useDispatch()
	const [input, setInput] = useState<string>('')
	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		dispatch(addTodo(input));
		setInput('')
	}
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	}
	return (
		<form onSubmit={handleSubmit}>
			<input onChange={handleChange} value={input} /><button disabled={input.length === 0}>ADD</button>
		</form>
	)
}
