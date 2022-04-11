import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-Item.component';
import { Button } from '../button/button.component';
import './cart-dropdown.styles.scss';
import { Link , useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems,  isCartOpen, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate('/checkout');
        setIsCartOpen(!isCartOpen)
    }
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length 
                    ? (cartItems.map((item)=> <CartItem key={item.id} cartItem={item}/>))
                    : (<span>Your cart is empty</span>)
                }
            </div>
            <Button onClick={goToCheckout}>Go to CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;