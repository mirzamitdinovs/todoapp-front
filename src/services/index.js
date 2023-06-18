import axios from 'axios';
const url = 'http://localhost:5000/todos';

export const GET_TODOS = async (status) => {
	try {
		const res = await axios.get(`${url}/${status}`);
		return res.data;
	} catch (err) {
		console.log('err: ', err.message);
	}
};

export const DELETE_TODO = async (id) => {
	try {
		const res = await axios.delete(`${url}/${id}`);
		return res;
	} catch (err) {
		console.log('err: ', err.message);
	}
};
export const TOGGLE_TODO = async (id) => {
	try {
		const res = await axios.put(`${url}/toggle/${id}`);
		return res;
	} catch (err) {
		console.log('err: ', err.message);
	}
};
export const ADD_TODO = async (todo) => {
	try {
		const res = await axios.post(`${url}`, todo);
		return res;
	} catch (err) {
		console.log('err: ', err.message);
	}
};
export const UPDATE_TODO = async (id, todo) => {
	try {
		const res = await axios.put(`${url}/${id}`, todo);
		return res;
	} catch (err) {
		console.log('err: ', err.message);
	}
};
