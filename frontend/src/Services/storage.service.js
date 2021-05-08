import { API } from '../constants/api-endpoints';
import ApiService from './api.config';

const TOKEN_KEY = 'REACTAPP.TOKEN';
const USER = 'REACTAPP.USER';
const REFRESH_TOKEN_KEY = 'REACTAPP.REFRESH_TOKEN';

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/
const TokenService = {
	getToken() {
		return localStorage.getItem(TOKEN_KEY);
	},

	saveToken(accessToken) {
		localStorage.setItem(TOKEN_KEY, accessToken);
	},

	removeToken() {
		localStorage.removeItem(TOKEN_KEY);
	},

	getRefreshToken() {
		return localStorage.getItem(REFRESH_TOKEN_KEY);
	},

	saveRefreshToken(refreshToken) {
		localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
	},

	removeRefreshToken() {
		localStorage.removeItem(REFRESH_TOKEN_KEY);
	},
};

const UserService = {
	getUser() {
		let user = localStorage.getItem(USER);
		return JSON.parse(user);
	},
	isAdmin() {
		let user = this.getUser();
		return user != null ? user.role == 'admin' : false;
	},
	saveUser(user) {
		localStorage.setItem(USER, JSON.stringify(user));
	},
	async getUserCart() {
		ApiService.init();
		ApiService.setHeader();
		let userID = UserService.getUser()._id;
		let cartData = await ApiService.get(API.cart + '/?userID=' + `${userID}`);
		console.log('cartData', cartData);
		return cartData.data[0];
	},
	removeUser() {
		localStorage.removeItem(USER);
	},
};

export { TokenService, UserService };
