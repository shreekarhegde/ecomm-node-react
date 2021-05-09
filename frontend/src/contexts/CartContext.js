import React, { createContext, useReducer } from 'react';
import { API } from '../constants/api-endpoints';
import ApiService from '../Services/api.config';
import { UserService } from '../Services/storage.service';
import { CartReducer, sumItems } from './CartReducer';

export const CartContext = createContext();

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

const CartContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(CartReducer, initialState);

	const increase = async (payload) => {
		console.log('payload', payload);
		try {
			const cartData = await UserService.getUserCart();
			const cartID = cartData._id;
			const cartObj = { cartID: cartID, increment: true };
			await ApiService.patch(API.cart, cartObj);
			dispatch({ type: 'INCREASE', payload });
		} catch (error) {
			throw Error(error);
		}
	};

	const decrease = async (payload) => {
		const cartData = await UserService.getUserCart();
		const cartID = cartData._id;
		const cartObj = { cartID: cartID, increment: false };	
		try{
			await ApiService.patch(API.cart, cartObj);
			dispatch({ type: 'DECREASE', payload });
		}catch(error){
			throw Error(error)
		}
	};

	const addProduct = async (payload) => {
		try {
			const cartData = await UserService.getUserCart();
			console.log('cartData', cartData);
			const cartID = cartData._id;
			const itemID = payload._id;
			const cartObj = { cartID: cartID, itemID: itemID, count: 1 };
			await ApiService.post(API.addToCart, cartObj);
			dispatch({ type: 'ADD_ITEM', payload });
		} catch (error) {
			throw Error(error);
		}
	};

	const removeProduct = async (payload) => {
		try {
			const cartData = await UserService.getUserCart();
			const cartID = cartData._id;
			await ApiService.delete(API.cartItems+ '/?cartID=' + cartID);
			dispatch({ type: 'REMOVE_ITEM', payload });
		} catch (error) {
			throw Error(error);
		}
	};

	const clearCart = async() => {
		try {
			const cartData = await UserService.getUserCart();
			const cartID = cartData._id;
			await ApiService.delete(API.cartItems+ '/?cartID=' + cartID);
			dispatch({ type: 'CLEAR' });
		} catch (error) {
			throw Error(error);
		}
	};

	const handleCheckout = async() => {
		console.log('CHECKOUT', state);
		try {
			const cartData = await UserService.getUserCart();
			const cartID = cartData._id;
			Promise.all([
				ApiService.patch(API.cart+`/${cartID}`, {isPurchased: true }),
				ApiService.delete(API.cartItems+ '/?cartID=' + cartID),
				ApiService.post(API.cart+`/${cartID}/complete`)
			]).then(res => {
				console.log('response',res);
				dispatch({ type: 'CHECKOUT' });
			}).catch(error => {
				console.log('error', error);
			})
		} catch (error) {
			throw Error(error);
		}
		dispatch({ type: 'CHECKOUT' });
	};

	const contextValues = {
		removeProduct,
		addProduct,
		increase,
		decrease,
		clearCart,
		handleCheckout,
		...state,
	};

	return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
