import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Add a new item to the cart
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      // Remove an item from the cart
      return state.filter((item, index) => index !== action.index);
    case "UPDATE":
      // Update the quantity and price of an item in the cart
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            qty: parseInt(action.qty) + item.qty,
            price: action.price + item.price,
          };
        }
        return item;
      });
    case "DROP":
      // Clear the cart
      return [];
    default:
      console.log("Error in Reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

