import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API, BACKEND_URL } from '../constants/api-endpoints';

const AuthContext = React.createContext();

export function UseAuth() {
	console.log('AuthContex', AuthContext);
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	let user = {};
	let userResponse = {};
	function signUp(email, password) {
		console.log('email', email);
		console.log('password', password);
		user = {
			email: email,
			password: password,
		};
		axios
			.post(BACKEND_URL + API.createUser, user)
			.then((res) => {
				console.log('res', res);
				userResponse = res;
			})
			.catch((err) => {
				console.log('error', err);
			});
	}

	useEffect(() => {
		console.log('use effect', userResponse);
		setCurrentUser(userResponse);
		setLoading(false);
	}, []);

	const value = {
		currentUser,
		signUp,
	};
	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
