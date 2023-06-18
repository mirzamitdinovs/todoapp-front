import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import { ADD_TODO, UPDATE_TODO } from '../../services';
import { toast } from 'react-toastify';
const AddTodo = ({ addTodo, updateTodo }, ref) => {
	const [oldTodo, setOldTodo] = useState(null);
	const titleRef = useRef(null);
	const completedRef = useRef(null);

	const [toggle, setToggle] = useState(false);

	useImperativeHandle(
		ref,
		() => ({
			open: (todo) => {
				setOldTodo(todo);
				titleRef.current.value = todo.title;
				completedRef.current.value = todo.completed
					? 'completed'
					: 'incomplete';
				setToggle(true);
			},
		}),
		[]
	);

	const openModal = () => {
		setToggle(true);
	};

	useEffect(() => {
		titleRef.current.focus();
	}, [toggle]);

	const closeModal = () => {
		// setValues({
		// 	title: '',
		// 	completed: false,
		// });
		setToggle(false);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const title = titleRef.current.value;
		const completed = completedRef.current.value;
		if (oldTodo) {
			const uTodo = {
				title: titleRef.current.value,
				completed: completedRef.current.value,
				date: oldTodo.date,
				id: oldTodo.id,
			};
			const res = await UPDATE_TODO(oldTodo.id, uTodo);
			if (res.status === 200) {
				updateTodo(uTodo);
				toast.success(res.data);
			}
		} else {
			const res = await ADD_TODO({
				title: title,
				completed: completed === 'completed' ? true : false,
			});
			if (res.status === 201) {
				addTodo(res.data);
				toast.success('Todo created!');
			}
		}
		closeModal();
	};

	return (
		<div>
			<button
				onClick={openModal}
				className='bg-yellow-500 py-2 px-5 rounded-lg'
			>
				Add Task
			</button>
			<div
				className={`top-0 left-0 right-0 bottom-0 absolute z-10 flex justify-center items-center ${
					!toggle && 'hidden'
				}`}
			>
				<div className='w-[400px] z-40 bg-white py-5 px-10 rounded-lg'>
					<div className='flex justify-between items-center'>
						<h3 className='text-green-500 font-bold text-xl'>
							{oldTodo ? 'Update' : 'Add'} Todo
						</h3>
						<div
							onClick={closeModal}
							className='p-2 bg-gray-200 rounded-lg cursor-pointer'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</div>
					</div>
					<form onSubmit={onSubmit} className='bg-white rounded  pt-6 mb-4'>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='title'
							>
								Title
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								id='title'
								type='text'
								ref={titleRef}
								placeholder='Enter Todo Title'
							/>
						</div>
						<div className='mb-6'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='password'
							>
								Status
							</label>
							<select
								ref={completedRef}
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
							>
								<option value={'completed'}>Completed</option>
								<option value={'incomplete'}>Incomplete</option>
							</select>
						</div>
						<div className='flex items-center '>
							<button
								className='bg-blue-500 hover:bg-blue-700 mr-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
								type='submit'
							>
								{oldTodo ? 'Update' : 'Add'} Task
							</button>
							<button
								className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
								type='button'
								onClick={closeModal}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
				<div
					onClick={closeModal}
					className='bg-black bg-opacity-50 z-30 h-screen w-full absolute'
				></div>
			</div>
		</div>
	);
};

export default forwardRef(AddTodo);
