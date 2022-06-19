import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon';
import CartDropdown from '../../components/cart-drop-down/cart-drop-down';
import { NavContainer, NavLink, NavLinks, LogoContainer } from './nav.styles';
import { useDispatch } from 'react-redux';
import { signoutStart } from '../../store/user/user.action';

const Nav = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    //const { isCartOpen } = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen);
    const signOutUser = () => dispatch(signoutStart());

    return (
        <>
            <NavContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon />
                    
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavContainer>
            <Outlet />
        </>
    );
};

export default Nav;