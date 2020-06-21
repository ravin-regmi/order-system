import React, {useState} from 'react';

const CartContext = React.createContext();

function CartProvider(props) {

	const [cart, setCart] = useState([]);

	//add product to cart
	const createCart = (product) => {
		const cartItem = {
			id: product.id,
			quantity: 1,
			product: product
		};
		setCart(prevState => {
			prevState[product.id] = cartItem;
			return [...prevState];
		});
		// setCart([
		// 	...cart,
		// 	cartItem
		// ]);
	}

	//update product to cart
	const updateCart = (product, quantity) => {
		if (cart[product.id]) {
			cart[product.id].quantity = quantity;
			setCart(cart);
		} else {
			createCart(product);
		}
	}

	//remove product from cart
	const deleteCart = (product) => {
		if (cart[product.id]) {
			setCart(prevState => {
				delete prevState[product.id];
				return [...prevState];
			});
		}
	}

	return (
		<CartContext.Provider value={{cart, createCart, updateCart, deleteCart}} {...props} />
	);
}

export {CartContext, CartProvider};
