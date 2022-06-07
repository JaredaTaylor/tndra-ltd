import { ProductCardContainer, Footer, Name, Price } from './product-card.styles';
import Button, { BUTTON_TYPE } from '../button/button';
import { useContext } from 'react';
import { CartContext } from '../../context/cart';

const ProductCard = ({product}) => {
    const { addItemToCart} = useContext(CartContext);
    const { name, price, imageUrl } = product;
    const addProduct = () => addItemToCart(product);

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