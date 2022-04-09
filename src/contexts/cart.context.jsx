import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: () => {}
});

export const CartProvider = ({children}) => {
    const [ isCartOpen, setIsCartOpen ] = useState(null);
    var value = { isCartOpen, setIsCartOpen };
    
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}