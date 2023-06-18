import React from 'react';
import TodoListItem from '../TodoListItem';

const TodoList = ({ todos, deleteTodo, toggleTodo, openUpdateModal }) => {
	console.log('todos: ', todos);
	return (
		<>
			{todos.length ? (
				todos.map((todo) => (
					<TodoListItem
						todo={todo}
						key={todo.id}
						deleteTodo={deleteTodo}
						toggleTodo={toggleTodo}
						openUpdateModal={openUpdateModal}
					/>
				))
			) : (
				<div className='text-center mt-10 text-white text-lg'>
					<h3>No todos found!</h3>
				</div>
			)}
		</>
	);
};

export default TodoList;
