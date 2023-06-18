import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTodo from './components/AddTodo';
import FilterTodo from './components/FilterTodo';
import TodoList from './components/TodoList';
import { DELETE_TODO, GET_TODOS, TOGGLE_TODO } from './services';
function App() {
	const ref = useRef(null);
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		getTodos('all');
	}, []);

	const getTodos = async (status) => {
		const res = await GET_TODOS(status);
		setTodos(res);
	};

	const deleteTodo = async (id) => {
		const res = await DELETE_TODO(id);
		if (res.status === 200) {
			setTodos(todos.filter((todo) => todo.id !== id));
			toast.success(res.data);
		}
	};

	const toggleTodo = async (id) => {
		const res = await TOGGLE_TODO(id);
		if (res.status === 200) {
			setTodos(
				todos.map((todo) => {
					if (todo.id === id) {
						return {
							...todo,
							completed: !todo.completed,
						};
					} else {
						return todo;
					}
				})
			);
			toast.success(res.data);
		}
		// todo.id==id? ({...todo, completed: !todo.completed}): todo)
	};

	const addTodo = (newTodo) => {
		setTodos([...todos, newTodo]);
	};

	const openUpdateModal = (todo) => {
		ref.current.open(todo);
	};

	const updateTodo = (todo) => {
		setTodos(todos.map((oldTodo) => (oldTodo.id === todo.id ? todo : oldTodo)));
	};

	const filterTodos = (t) => {
		getTodos(t);
	};

	return (
		<div className='bg-purple-500'>
			<div className=' h-screen mx-auto p-10 max-w-xl'>
				<h1 className='text-4xl font-bold text-center mb-20 uppercase'>
					Todo List
				</h1>
				<div className='flex justify-between'>
					<AddTodo ref={ref} addTodo={addTodo} updateTodo={updateTodo} />
					<FilterTodo filterTodos={filterTodos} />
				</div>

				<div>
					<TodoList
						todos={todos}
						deleteTodo={deleteTodo}
						toggleTodo={toggleTodo}
						openUpdateModal={openUpdateModal}
					/>
				</div>
				<ToastContainer />
			</div>
		</div>
	);
}

export default App;
