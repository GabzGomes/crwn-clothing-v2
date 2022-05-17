import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import './checkout-item.styles.scss';

const CheckoutItem = memo(({item}) => {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const { name, imageUrl, price, quantity } = item;

    const handleClearItem = (item) => dispatch(clearItemFromCart(cartItems, item));
    const handleRemoveItem = (item) => dispatch(removeItemFromCart(cartItems, item));
    const handleAddItem = (item) => dispatch(addItemToCart(cartItems, item));

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'>
                <div className='arrow' onClick={()=>handleRemoveItem(item)}>&#10094;</div>
                <span className='value'>{quantity} </span> 
                <div className='arrow' onClick={()=>handleAddItem(item)}>&#10095;</div>
            </span>
            <span className='price'> {price} </span>
            <span className='remove-button' onClick={()=>handleClearItem(item)}> &#10005; </span>
        </div>
    );
})

export default CheckoutItem;