import React from 'react';
import TodoListItem from '../TodoListItem';

const TodoList = ({ todos, deleteTodo, toggleTodo, openUpdateModal }) => {
	console.log('todos: ', todos);
	return (
		<>
			{todos.map((todo) => (
				<TodoListItem
					todo={todo}
					key={todo.id}
					deleteTodo={deleteTodo}
					toggleTodo={toggleTodo}
					openUpdateModal={openUpdateModal}
				/>
			))}
		</>
	);
};

export default TodoList;
