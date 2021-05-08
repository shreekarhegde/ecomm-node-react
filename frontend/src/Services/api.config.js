import axios from 'axios';
import { BACKEND_URL } from '../constants/api-endpoints';
import { TokenService } from './storage.service';

const ApiService = {
	init() {
		axios.defaults.baseURL = BACKEND_URL;
	},

	setHeader() {
		axios.defaults.headers.common['Authorization'] = `Bearer ${TokenService.getToken()}`;
	},

	removeHeader() {
		axios.defaults.headers.common = {};
	},

	get(resource) {
		return axios.get(resource);
	},

	post(resource, data) {
		return axios.post(resource, data);
	},

	put(resource, data) {
		return axios.put(resource, data);
	},

	patch(resource, data) {
		return axios.patch(resource, data);
	},

	delete(resource) {
		return axios.delete(resource);
	},

	/**
	 * Perform a custom Axios request.
	 *
	 * data is an object containing the following properties:
	 *  - method
	 *  - url
	 *  - data ... request payload
	 *  - auth (optional)
	 *    - username
	 *    - password
	 **/
	customRequest(data) {
		return axios(data);
	},
};

export default ApiService;
