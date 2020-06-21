import React, {useState} from 'react';

import Modal from './Modal';
import {CartContext} from '../context/Cart'

const defaultImg = "https://images.all-free-download.com/images/graphiclarge/small_mouse_macro_515329.jpg";

export default function Product(props) {

	const [showModal, setShowModal] = useState(false);

	const cart = React.useContext(CartContext);

	function productDetail(e, id) {
		e.preventDefault();
		setShowModal(true);
	}

	function addToCart(e) {
		e.preventDefault();
		cart.createCart(props.product);
	}
	
	const [cartBtnText, cartBtnClass] = (cart.cart[props.product.id]) ? ['In Cart', 'btn-success disabled'] : ['Add To Cart', 'btn-primary'];

	const removeModal = () => { setShowModal(false); }

	const modalHtml = showModal ? <Modal product={props.product} removeModal={removeModal} /> : null;
	
	return (
		<>
			<div className="card mb-4 product-wrapper">
			  <img className="card-img-top" src={props.product.image ?? defaultImg} alt="{props.product.name}" 
			  	style={{maxWidth:'206px',maxHeight:'137px'}} />
			  <div className="card-body padding-0">
			    <h5 className="card-title">{props.product.name}</h5>
			    <p className="card-text">{props.product.info}</p>
			    <div className="action-wrapper">
			    	<button className="btn btn-info btn-sm" onClick={(e) => productDetail(e, props.product.id)}>View Details</button>
			    	<button className={`btn ${cartBtnClass} btn-sm pull-right`} onClick={(e) => addToCart(e)} >{cartBtnText}</button>
			    </div>
			  </div>
			</div>
			{modalHtml}
		</>
	);
}