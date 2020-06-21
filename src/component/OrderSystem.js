import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Navbar from './Navbar';
import {CategoryList} from './Category';
import Cart from './Cart';
import {CartProvider} from '../context/Cart';

export default class OrderSystem extends React.Component {
	render() {
		return (
			<CartProvider>
				<BrowserRouter>
					<Navbar />
					<div className="row order-system-wrapper margin-0">
						<div className="col-md-7">
							<CategoryList />
						</div>
						<div className="col-md-5 cart-list-wrapper">
							<Cart />
						</div>
					</div>
				</BrowserRouter>
			</CartProvider>
		);
	}
}