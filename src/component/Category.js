import React from 'react';

import Product from './Product';

class CategoryList extends React.Component {

	render() {

		const categoryHtml = this.props.categoryList.map(category => {
			if (this.props.categoryFilter && category.id !== +this.props.categoryFilter) {
				return null;
			}
			return <Category key={category.id} category={category} products={this.props.products[category.id]} />
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