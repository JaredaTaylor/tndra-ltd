import { CheckoutItemContainer, ImageContainer, Name, Quantity, Arrow, Img, Value, RemoveButton, Price } from './checkout-item.styles';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({cartItem}) => {
    //const { addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems); 
    const {name, imageUrl, price, quantity} = cartItem;
    const dispatch = useDispatch();

    const deleteItemHandler = () => dispatch(deleteItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <Img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={deleteItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;