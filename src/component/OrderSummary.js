import React from 'react';

export default function OrderSummary(props) {
	return (
		<div className="row py-5 p-4 bg-white rounded shadow-sm">
	        <div className="col-lg-6">
	          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
	          <div className="p-4">
	            <p className="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
	            <div className="input-group mb-4 border rounded-pill p-2">
	              <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" className="form-control border-0" />
	              <div className="input-group-append border-0">
	                <button id="button-addon3" type="button" className="btn btn-dark px-4 rounded-pill">
	                	<i className="fa fa-gift mr-2"></i>Apply coupon
	                </button>
	              </div>
	            </div>
	          </div>
	          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for seller</div>
	          <div className="p-4">
	            <p className="font-italic mb-4">If you have some information for the seller you can leave them in the box below</p>
	            <textarea name="" cols="30" rows="2" className="form-control"></textarea>
	          </div>
	        </div>
	        <div className="col-lg-6">
	          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
	          <div className="p-4">
	            <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
	            <ul className="list-unstyled mb-4">
	              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>$390.00</strong></li>
	              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>$10.00</strong></li>
	              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax</strong><strong>$0.00</strong></li>
	              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
	                <h5 className="font-weight-bold">$400.00</h5>
	              </li>
	            </ul><a href="#" className="btn btn-dark rounded-pill py-2 btn-block">Procceed to checkout</a>
	          </div>
	        </div>
	    </div>
	);
}