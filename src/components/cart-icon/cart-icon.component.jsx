import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { toggleCartDropdown } from '../../store/cart/cart.action';

import './cart-icon.styles.scss';

const CartIcon = () => {
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount)
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        dispatch(toggleCartDropdown(!isCartOpen))
    }
    return (
        <div className='cart-icon-container' onClick={toggleDropdown}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    );
}

export default CartIcon;