import { createContext, useReducer } from "react";

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	totalAmount: 0,
});

const CART_CONTEXT_TYPES = {
	TOGGLE_CART_DROPDOWN: "TOGGLE_CART_DROPDOWN",
	SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_VALUES = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	totalAmount: 0,
};

const useCartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_CONTEXT_TYPES.TOGGLE_CART_DROPDOWN:
			return { ...state, isCartOpen: payload };
		case CART_CONTEXT_TYPES.SET_CART_ITEMS:
			return { ...state, ...payload };
		default:
			throw new Error(`Unhandled type ${type}`);
	}
};

const addCartItem = (cartItems, productToAdd) => {
	const existingItem = cartItems.find((item) => item.id === productToAdd.id);

	if (existingItem) {
		return cartItems.map((item) =>
			item.id === productToAdd.id
				? { ...item, quantity: item.quantity + 1 }
				: item
		);
	}
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToAdd) => {
	const existingItem = cartItems.find((item) => item.id === productToAdd.id);

	if (existingItem.quantity > 1) {
		return cartItems.map((item) =>
			item.id === productToAdd.id
				? { ...item, quantity: item.quantity - 1 }
				: item
		);
	}

	return cartItems.filter((item) => item.id !== productToAdd.id);
};

const clearItem = (cartItems, productToClear) => {
	return cartItems.filter((item) => item.id !== productToClear.id);
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(useCartReducer, INITIAL_VALUES);
	const { isCartOpen, cartItems, cartCount, totalAmount } = state;

	const updateCartItems = (newCartItems) => {

		const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		const newTotalAmount = newCartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
			
        console.log(newCartItems, newCartCount, newTotalAmount)

		dispatch({
			type: "SET_CART_ITEMS",
			payload: { 
                cartItems : newCartItems, 
                cartCount: newCartCount, 
                totalAmount: newTotalAmount },
		});
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItems(newCartItems);
	};
	const removeItemFromCart = (productToRemove) => {
		const newCartItems = removeCartItem(cartItems, productToRemove);
		updateCartItems(newCartItems);
	};
	const clearItemFromCart = (productToClear) => {
		const newCartItems =  clearItem(cartItems, productToClear);
        updateCartItems(newCartItems);
    }
	const toggleCartDropdown = (toggle) =>
		dispatch({ type: "TOGGLE_CART_DROPDOWN", payload: toggle });

	var value = {
		isCartOpen,
		toggleCartDropdown,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartItems,
		cartCount,
		totalAmount,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
