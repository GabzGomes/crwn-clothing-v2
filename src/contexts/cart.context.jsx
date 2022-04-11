import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: ()=>{},
    cartCount: 0,
    removeItemFromCart: ()=>{},
    clearItemFromCart: ()=>{},
    totalAmount:0
});

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find((item)=> item.id === productToAdd.id);

    if(existingItem) {
        return cartItems.map((item) => 
            item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    }
    return [...cartItems,{ ...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find((item)=> item.id === productToAdd.id);

    if(existingItem.quantity > 1) {
        return cartItems.map((item) => 
            item.id === productToAdd.id ? { ...item, quantity: item.quantity - 1 } : item
        );
    }
    
    return cartItems.filter((item)=> item.id !== productToAdd.id)
}

const clearItem = (cartItems, productToClear) => {    
    return cartItems.filter((item)=> item.id !== productToClear.id)
}

export const CartProvider = ({children}) => {
    const [ isCartOpen, setIsCartOpen ] = useState(null);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ totalAmount, setTotalAmount ] = useState(0)

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);

        if(cartItems.length > 0){
            const newAmount = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity) , 0)
            setTotalAmount(newAmount);
        } else {
            setTotalAmount(0)
        }
        
    },[cartItems]);
    
    const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd)); 
    const removeItemFromCart = (productToAdd) => setCartItems(removeCartItem(cartItems, productToAdd));
    const clearItemFromCart = (productToClear) => setCartItems(clearItem(cartItems, productToClear));

    var value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, totalAmount };
    
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}