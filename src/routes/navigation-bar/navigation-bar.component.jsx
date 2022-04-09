import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';

import { SignOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    const signOutHandler= async () => {
        await SignOutUser();
    }

    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to="/">
                    <CrwnLogo/>
                </Link>
                <div className='nav-links-container'>
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    { currentUser ? 
                        (<span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>)
                        : (<Link className="nav-link" to="/auth">SiGN-IN</Link>)
                    }
                    <CartIcon />
                </div>
                { isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </>
    );
}

export default Navigation;