import React from 'react';

import CartTable from './CartTable';
import OrderSummary from './OrderSummary';

export default class Cart extends React.Component {
	render() {
		return (
			<div className="px-4 px-lg-0">
			  <p className="font-weight-bold title-text">Your Cart</p>

			  <div className="pb-5">
			    <div className="container">
			      <div className="row">
			        <div className="col-lg-12 bg-white shadow-sm mb-5">
			          <div className="table-responsive">
			            <CartTable />
			          </div>
			        </div>
			      </div>

			      <OrderSummary />

			    </div>
			  </div>
			</div>
		);
	}
}