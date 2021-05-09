import React, { useContext } from 'react';
import ProductItem from './PorductItem';
import { ProductsContext } from '../../contexts/ProductsContext';
import styles from './ProductsGrid.module.scss';

const ProductsGrid = () => {
	const { products } = useContext(ProductsContext);
	return (
		<div className={styles.p__container}>
			<div className='row'>
				<div className='col-sm-8'>
					<div className='py-3'>{products.length} Products</div>
				</div>
			</div>
			<div className={styles.p__grid}>
				{products.map((product) => (
					<ProductItem key={product._id} product={product} />
				))}
			</div>
			<div className={styles.p__footer}></div>
		</div>
	);
};

export default ProductsGrid;
