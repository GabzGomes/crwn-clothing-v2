import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({item}) => {
    const { addItemToCart , clearItemFromCart, removeItemFromCart } = useContext(CartContext);
    const { name, imageUrl, price, quantity } = item;

    const handleClearItem = (item) => clearItemFromCart(item);
    const handleRemoveItem = (item) => removeItemFromCart(item);
    const handleAddItem = (item) => addItemToCart(item);

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
}
export default CheckoutItem;