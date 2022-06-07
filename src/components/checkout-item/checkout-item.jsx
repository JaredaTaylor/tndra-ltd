import { CheckoutItemContainer, ImageContainer, Name, Quantity, Arrow, Img, Value, RemoveButton, Price } from './checkout-item.styles';
import { useContext } from 'react';
import { CartContext } from '../../context/cart';

const CheckoutItem = ({cartItem}) => {
    const { addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext);
    const {name, imageUrl, price, quantity} = cartItem;

    const deleteItemHandler = () => deleteItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);

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