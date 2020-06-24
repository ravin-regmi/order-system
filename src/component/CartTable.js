import React from 'react';

import {CartContext, CartProvider} from '../context/Cart';

export default function CartTable(props) {
	
	// const cart = useCart(); 
	// console.log("cart.cart", cart.cart)

	const categoryList = [];
	props.categoryList.forEach(category => {
		categoryList[category.id] = category;
	});

	const cart = React.useContext(CartContext);
	const cartHtml = cart.cart.map(item => {
		return item 
			? <CartItem key={item.id} cartItem={item} category={categoryList[item.product.category_id]} 
				quantityChange={quantityChange} removeProduct={removeProduct} categoryChange={props.categoryChange} /> 
			: null;
	});

	function quantityChange(product, quantity) {
		cart.updateCart(product, quantity);
	}

	function removeProduct(product) {
		cart.deleteCart(product);
	}

	let cartCount = 0;
	cart.cart.forEach(_ => ++cartCount);

	return (
		<table className="table" style={{marginTop:'.5rem'}}>
          <thead>
            <tr>
              <CartTableHead name="Product" />
              <CartTableHead name="Price" />
              <CartTableHead name="Quantity" />
              <CartTableHead name="Remove" />
            </tr>
          </thead>
          <tbody>
          	{cartCount > 0 ? cartHtml : (<tr><td className="text-muted font-weight-normal font-italic d-block">Cart Empty</td></tr>)}
          </tbody>
        </table>
	);
}

function CartTableHead({name}) {
	return (
		<th scope="col" className="border-0 bg-light">
        	<div className="px-3 text-uppercase">{name}</div>
      	</th>
	);
}

class CartItem extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {quantity: this.props.cartItem.quantity};
		this.quantityChange = this.quantityChange.bind(this);
		this.increaseQuantity = this.increaseQuantity.bind(this);
		this.decreaseQuantity = this.decreaseQuantity.bind(this);
		this.removeProduct = this.removeProduct.bind(this);
		this.categoryClick = this.categoryClick.bind(this);
	}

	quantityChange(e) {
		this.setState({quantity: +e.target.value}, this.props.quantityChange(this.props.cartItem.product, this.state.quantity));
	}

	increaseQuantity() {
		this.setState(prevState => 
			({quantity: prevState.quantity+1})
		, () => {
			this.props.quantityChange(this.props.cartItem.product, this.state.quantity)
		});
	}

	decreaseQuantity() {
		this.setState(prevState => 
			({quantity: prevState.quantity-1})
		, () => {
			if (this.state.quantity < 1) {
				this.removeProduct();
			} else {
				this.props.quantityChange(this.props.cartItem.product, this.state.quantity)
			}
		});
	}

	removeProduct() {
		this.props.removeProduct(this.props.cartItem.product);
	}

	categoryClick(e) {
		e.preventDefault();
		this.props.categoryChange(+e.target.getAttribute('value'));
	}
	
	render() {
		return (
			<tr>
              <th scope="row" className="border-0" style={{paddingLeft:0}}>
                <div className="p-2">
                  <img src={this.props.cartItem.product.image} alt={this.props.cartItem.product.name} width="70"
                   className="img-fluid rounded shadow-sm" />
                  <div className="d-inline-block align-middle">
                    <p className="mb-0">
                     <a href="#" className="text-dark d-inline-block align-middle">{this.props.cartItem.product.name}</a>
                    </p>
                    <span className="text-muted font-weight-normal font-italic d-block" style={{fontSize:'13px'}}>
                    Category: <a href="#" value={this.props.category.id} onClick={this.categoryClick}>{this.props.category.name}</a>
                    </span>
                  </div>
                </div>
              </th>
              <td className="border-0 align-middle">
              	<div className="d-inline-block align-middle">
              		<p className="font-weight-bold">{this.props.cartItem.product.currency + parseFloat(this.props.cartItem.product.price)*this.state.quantity}</p>
              		<small className="text-muted">Rate: {this.props.cartItem.product.currency + this.props.cartItem.product.price}</small>
              	</div>
              </td>
              <td className="border-0 align-middle">
              	<button className="btn btn-info more-btn btn-sm" onClick={this.increaseQuantity}>+</button>
              	<input className="form-control" value={this.state.quantity} onChange={this.quantityChange} />
              	<button className="btn btn-info less-btn btn-sm" onClick={this.decreaseQuantity}>-</button>
              </td>
              <td className="border-0 align-middle">
              	<button className="border-0" onClick={this.removeProduct} style={{background: 'none'}}>
              		<i className="fa fa-trash" style={{color: 'red'}}></i>
              	</button>
              </td>
            </tr>
		);
	}
}