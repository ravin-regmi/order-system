import React from 'react';

import Modal from './Modal';
import {CartContext} from '../context/Cart'

const defaultImg = "https://images.all-free-download.com/images/graphiclarge/small_mouse_macro_515329.jpg";

export default function Product(props) {

	const cart = React.useContext(CartContext);

	function addToCart(e) {
		e.preventDefault();
		cart.createCart(props.product);
	}
	
	const [cartBtnText, cartBtnClass] = (cart.cart[props.product.id]) ? ['In Cart', 'btn-success disabled'] : ['Add To Cart', 'btn-primary'];
	
	return (
		<div className="card mb-4 product-wrapper">
		  <img className="card-img-top" src={props.product.image ?? defaultImg} alt="{props.product.name}" 
		  	style={{maxWidth:'206px',maxHeight:'137px'}} />
		  <div className="card-body padding-0">
		    <h5 className="card-title">{props.product.name}</h5>
		    <p className="card-text margin-0">{props.product.info}</p>
		    <p className="font-italic badge badge-warning text-danger">{props.product.currency + ' ' + props.product.price}</p>
		    <div className="action-wrapper">
		    	<Modal product={props.product} />
		    	<button className={`btn ${cartBtnClass} btn-sm pull-right`} onClick={(e) => addToCart(e)} >{cartBtnText}</button>
		    </div>
		  </div>
		</div>
	);
}