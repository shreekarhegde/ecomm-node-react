import React, { useContext, useState } from 'react';
import { API, BACKEND_URL } from '../constants/api-endpoints';
import { useHistory } from 'react-router';
import ApiService from '../Services/api.config';
import { TokenService } from '../Services/storage.service';
import { UserService } from '../Services/storage.service';

const AuthContext = React.createContext();

export function UseAuth() {
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
			userResponse = await ApiService.post(BACKEND_URL + API.user, user);
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
			userResponse = await ApiService.post(BACKEND_URL + API.login, user);
			setCurrentUser(userResponse.data.user);
			UserService.saveUser(userResponse.data.user);
			TokenService.saveToken(userResponse.data.accessToken);
			ApiService.setHeader();
			setLoading(false);
		} catch (error) {
			throw Error(error);
		}
	}

	async function logOut() {
		const patchObj = { token: '' };
		const userID = UserService.getUser()._id;
		try {
			ApiService.setHeader();
			await ApiService.patch(BACKEND_URL + API.user + '/' + userID, patchObj);
			TokenService.removeToken();
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
