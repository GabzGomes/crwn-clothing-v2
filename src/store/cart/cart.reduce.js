import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_VALUES = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	totalAmount: 0,
};

export const cartReducer = (state = INITIAL_VALUES , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
			return { ...state, isCartOpen: payload };
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return { ...state, cartItems: payload };
		default:
			return state;
	}
};