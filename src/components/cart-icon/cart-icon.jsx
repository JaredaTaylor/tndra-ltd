import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCartOpen, selectCartQuantity } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
    //const { isCartOpen, setIsCartOpen, cartQuantity } = useContext(CartContext);
    const dispatch = useDispatch();

    const cartQuantity = useSelector(selectCartQuantity);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartQuantity}</ItemCount>
        </CartIconContainer>
    )
};

export default CartIcon;