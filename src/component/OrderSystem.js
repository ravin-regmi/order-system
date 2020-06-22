import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Navbar from './Navbar';
import {CategoryList} from './Category';
import Cart from './Cart';
import {CartProvider} from '../context/Cart';

export default class OrderSystem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {categoryList: [], productList: [], categoryFilter: null, productFilter: ''};
		this.categoryChange = this.categoryChange.bind(this);
		this.productSearch = this.productSearch.bind(this);
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

	categoryChange(cat) {
		this.setState({categoryFilter: cat});
	}

	productSearch(prod) {
		this.setState({productFilter: prod});
	}

	render() {

		let productArrCat = []; 
		this.state.productList.forEach(product => {
			if (!productArrCat[product.category_id]) {
				productArrCat[product.category_id] = [];
			}
			let match = true;
			if (this.state.productFilter !== "") {
				const prodArr = product.name.split(' ');
				prodArr.forEach(item => {
					if (item.toLowerCase().indexOf(this.state.productFilter.toLowerCase()) > -1) {
						match = true;
						return;
					} else {
						match = false;
					}
				})
			}
			if (!match) {
				return;
			}
			productArrCat[product.category_id].push(product);
		});

		const categoryObj = {
			categoryList: this.state.categoryList,
			categoryFilter: this.state.categoryFilter,
			productFilter: this.state.productFilter
		}

		return (
			<CartProvider>
				<BrowserRouter>
					<Navbar categoryChange={this.categoryChange} productSearch={this.productSearch} {...categoryObj} />
					<div className="row order-system-wrapper margin-0">
						<div className="col-md-7">
							<CategoryList products={productArrCat} {...categoryObj} />
						</div>
						<div className="col-md-5 cart-list-wrapper">
							<Cart categoryList={this.categoryList} />
						</div>
					</div>
				</BrowserRouter>
			</CartProvider>
		);
	}
}