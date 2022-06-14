import { ProductCardContainer, Footer, Name, Price } from './product-card.styles';
import Button, { BUTTON_TYPE } from '../button/button';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({product}) => {
    const cartItems = useSelector(selectCartItems);
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const addProduct = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE.inverted} onClick={addProduct}>Add to cart</Button>
        </ProductCardContainer>
    );
};

export default ProductCard;