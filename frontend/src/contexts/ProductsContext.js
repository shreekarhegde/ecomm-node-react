import React, { createContext, useEffect, useState } from 'react';
import { API } from '../constants/api-endpoints';
import ApiService from '../Services/api.config';
export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
	let [products, setProducts] = useState([]);
	useEffect(() => {
		async function getItems() {
			ApiService.init();
			ApiService.setHeader();
			const response = await ApiService.get(API.item);
			const items = response.data;
			products = items.data;
			setProducts(products);
			console.log('products', products);
		}
		getItems();
	}, []);
	return <ProductsContext.Provider value={{ products }}>{children}</ProductsContext.Provider>;
};

export default ProductsContextProvider;
