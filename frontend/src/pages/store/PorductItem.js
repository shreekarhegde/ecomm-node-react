import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { formatNumber } from '../../helpers/utils';

const ProductItem = ({ product }) => {
	const { addProduct, cartItems, increase } = useContext(CartContext);

	const isInCart = (product) => {
		console.log('product', product);
		console.log('cartItems', cartItems);
		return !!cartItems.find((item) => item._id === product._id);
	};

	return (
		<div className='card card-body'>
			<img
				style={{ display: 'block', margin: '0 auto 10px', maxHeight: '200px' }}
				className='img-fluid'
				src={product.photo + '?v=' + product._id}
				alt=''
			/>
			<p>{product.name}</p>
			<h3 className='text-left'>{formatNumber(product.cost)}</h3>
			<div className='text-right'>
				{isInCart(product) && (
					<button onClick={() => increase(product)} className='btn btn-outline-primary btn-sm'>
						Add more
					</button>
				)}

				{!isInCart(product) && (
					<button onClick={() => addProduct(product)} className='btn btn-primary btn-sm'>
						Add to cart
					</button>
				)}
			</div>
		</div>
	);
};

export default ProductItem;
