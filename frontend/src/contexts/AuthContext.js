import React, { useContext, useState } from 'react';
import axios from 'axios';
import { API, BACKEND_URL } from '../constants/api-endpoints';
import { useHistory } from 'react-router';

const AuthContext = React.createContext();

export function UseAuth() {
	console.log('AuthContex', AuthContext);
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(false);
	let user = {};
	let userResponse = {};
	const history = useHistory();

	async function signUp(email, password) {
		user = {
			email: email,
			password: password,
		};
		try {
			userResponse = await axios.post(BACKEND_URL + API.user, user);
			console.log('userResponse: signUp', userResponse.data.user);
			setCurrentUser(userResponse.data.user);
			setLoading(false);
			console.log('userResponse', userResponse);
		} catch (error) {
			console.log('error', error);
			throw Error(error);
		}
	}

	async function logIn(email, password) {
		user = {
			email: email,
			password: password,
			strategy: 'local',
		};
		try {
			userResponse = await axios.post(BACKEND_URL + API.login, user);
			console.log('userResponse.data', userResponse.data.accessToken);
			setCurrentUser(userResponse.data.user);
			sessionStorage.setItem('accessToken', userResponse.data.accessToken);
			setLoading(false);
		} catch (error) {
			console.log('error', error);
			throw Error(error);
		}
	}

	async function logOut(userID) {
		const patchObj = { token: '' };
		const accessToken = sessionStorage.getItem('accessToken');
		console.log('accessToken', accessToken);
		const headers = { headers: { Authorization: `Bearer ${accessToken}` } };
		try {
			await axios.patch(BACKEND_URL + API.user + '/' + userID, patchObj, headers);
			sessionStorage.removeItem('accessToken');
			history.push('/login');
		} catch (error) {
			throw Error(error);
		}
	}

	const value = {
		currentUser,
		signUp,
		logIn,
		logOut,
	};
	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
