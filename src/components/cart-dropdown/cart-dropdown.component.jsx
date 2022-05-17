import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-Item.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector';
import { toggleCartDropdown } from '../../store/cart/cart.action';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate('/checkout');
        dispatch(toggleCartDropdown(!isCartOpen))
    }
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length 
                    ? (cartItems.map((item)=> <CartItem key={item.id} cartItem={item}/>))
                    : (<span className='empty-message'>Your cart is empty.</span>)
                }
            </div>
            <Button onClick={goToCheckout} buttonType={BUTTON_TYPE_CLASSES.base}>CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;