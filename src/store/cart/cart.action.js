import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer';

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

const addItem = (cartItems, productToAdd) => {
    // find if prodToAdd in cartItems
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // if in, increment quantity and return new array with incremented value
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }
    // else create new array with added item and return
    
    return [...cartItems, {...productToAdd, quantity: 1}];
};

// removes 1 of said item from cart
const removeItem = (cartItems, product) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === product.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id)
    }

    return cartItems.map((cartItem) => cartItem.id === product.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
};

// completely removed item from cart
const deleteItem = (cartItems, product) => {
    return cartItems.filter((cartItem) => cartItem.id !== product.id)
};

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// removes 1 of said item from cart
export const removeItemFromCart = (cartItems, product) => {
    const newCartItems = removeItem(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// completely removed item from cart
export const deleteItemFromCart = (cartItems, product) => {
    const newCartItems = deleteItem(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

