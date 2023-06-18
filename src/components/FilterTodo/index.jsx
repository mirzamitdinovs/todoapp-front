import React from 'react';

const FilterTodo = ({ filterTodos }) => {
	return (
		<div>
			<select
				onChange={(e) => filterTodos(e.target.value)}
				className='p-2 border px-3 rounded-lg'
			>
				<option value={'all'}>All</option>
				<option value={'incomplete'}>Incompleted</option>
				<option value={'completed'}>Completed</option>
			</select>
		</div>
	);
};

export default FilterTodo;
