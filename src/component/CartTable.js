import React from 'react';

import {CartContext, CartProvider} from '../context/Cart';

export default function CartTable(props) {
	
	// const cart = useCart(); 
	// console.log("cart.cart", cart.cart)
	const cart = React.useContext(CartContext);
	const cartHtml = cart.cart.map(item => {
		return item ? <CartItem key={item.id} cartItem={item} quantityChange={quantityChange} removeProduct={removeProduct} /> : null;
	});

	function quantityChange(product, quantity) {
		cart.updateCart(product, quantity);
	}

	function removeProduct(product) {
		cart.deleteCart(product);
	}

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
          	{cartHtml}
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
                    <span className="text-muted font-weight-normal font-italic d-block" style={{fontSize:'13px'}}>Category: Watches</span>
                  </div>
                </div>
              </th>
              <td className="border-0 align-middle"><strong>$79.00</strong></td>
              <td className="border-0 align-middle">
              	<button className="btn btn-info more-btn btn-sm" onClick={this.increaseQuantity}>+</button>
              	<input className="form-control" value={this.state.quantity} onChange={this.quantityChange} />
              	<button className="btn btn-info less-btn btn-sm" onClick={this.decreaseQuantity}>-</button>
              </td>
              <td className="border-0 align-middle">
              	<button className="border-0" onClick={this.removeProduct} style={{background: 'none'}}>
              		<i className="fa fa-trash"></i>
              	</button>
              </td>
            </tr>
		);
	}
}