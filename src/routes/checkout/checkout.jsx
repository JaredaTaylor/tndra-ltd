//import Categories from '../../components/categories/categories';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';
import { useContext } from 'react';
import { CartContext } from '../../context/cart';
import CheckoutItem from '../../components/checkout-item/checkout-item';

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Decription</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {
        cartItems.map((item) => {
          return (
            <CheckoutItem key={item.id} cartItem={item} />
          );
        })
      }
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;