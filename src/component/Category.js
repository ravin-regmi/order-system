import React from 'react';

import Product from './Product';

class CategoryList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {categoryList: [], productList: []};
	}

	componentDidMount() {
		async function fetchData(that) {
			
			const categoryFile = await fetch('/storage/category.json');
			const categoryArr = await categoryFile.json();

			const productFile = await fetch('/storage/product.json');
			const productArr = await productFile.json();

			that.setState({categoryList: categoryArr, productList: productArr});
		}
		fetchData(this);
	}

	render() {
		let productArrCat = []; 
		this.state.productList.forEach(product => {
			if (!productArrCat[product.category_id]) {
				productArrCat[product.category_id] = [];
			}
			productArrCat[product.category_id].push(product);
		});
		const categoryHtml = this.state.categoryList.map(category => {
			return <Category key={category.id} category={category} products={productArrCat[category.id]} />
		});
		
		  
		return (
			<>
			<div className="category-list-wrapper">
				{categoryHtml}
			</div>
			</>
		);
	}
}

function Category(props) {

	return (
		<div className="container category-wrapper">
			<p className="font-weight-bold title-text">{props.category.name}</p>
			<div className="row margin-0">
			{
				(!props.products || props.products.length < 1)
				? <p>No items available</p>
				:
				(
				props.products.map(product => {
					return <Product key={product.id} product={product} />
				})
				)
			}
			</div>
		</div>
	);
}

export {CategoryList, Category};