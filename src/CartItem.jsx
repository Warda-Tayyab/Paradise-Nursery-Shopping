import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Assuming your action creators are correctly set
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items); // Get cart items from the Redux store
    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.cost.slice(1)) * item.quantity), 0).toFixed(2);
    };

    // Handle the continue shopping button
    const handleContinueShopping = (e) => {
        if (onContinueShopping) {
            onContinueShopping(e); // Call the parent component function for continuing shopping
        }
    };

    // Increment the quantity of the item in the cart
    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    // Decrement the quantity of the item in the cart
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            handleRemove(item); // Remove the item if quantity becomes 0
        }
    };

    // Remove an item from the cart
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Calculate total cost based on quantity for a specific item
    const calculateTotalCost = (item) => {
        return (parseFloat(item.cost.slice(1)) * item.quantity).toFixed(2); // Remove dollar sign for calculation
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="continue_shopping_btn" style={{ marginTop: '20px', color: 'black' }}>
                <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;
