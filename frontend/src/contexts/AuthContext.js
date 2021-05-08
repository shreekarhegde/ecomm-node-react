import React, { useContext, useState } from 'react';
import axios from 'axios';
import { API, BACKEND_URL } from '../constants/api-endpoints';

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

	async function signUp(email, password) {
		user = {
			email: email,
			password: password,
		};
		try {
			userResponse = await axios.post(BACKEND_URL + API.createUser, user);
			console.log('userResponse', userResponse);
			setCurrentUser(userResponse);
			setLoading(false);
			console.log('userResponse', userResponse);
		} catch (error) {
			console.log('error', error);
		}
	}

	const value = {
		currentUser,
		signUp,
	};
	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
