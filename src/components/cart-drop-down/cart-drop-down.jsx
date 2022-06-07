import { CartDropownContainer, EmptyMessage, CartItems } from './cart-drop-down.styles';
import Button from '../button/button'
import CartItem from '../cart-item/cart-item';
import { useContext } from 'react';
import { CartContext } from '../../context/cart';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => (<CartItem key={item.id} cartItem={item} />))
                    ) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </CartDropownContainer>
    )
}

export default CartDropdown;