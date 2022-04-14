import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-Item.component';
import { Button } from '../button/button.component';
import './cart-dropdown.styles.scss';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems,  isCartOpen, toggleCartDropdown } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate('/checkout');
        toggleCartDropdown(!isCartOpen)
    }
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length 
                    ? (cartItems.map((item)=> <CartItem key={item.id} cartItem={item}/>))
                    : (<span className='empty-message'>Your cart is empty.</span>)
                }
            </div>
            <Button onClick={goToCheckout}>Go to CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;