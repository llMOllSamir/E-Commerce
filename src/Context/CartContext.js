import axios from "axios";
import React, { createContext, useState } from "react";

export let CartContext = createContext(0);

export default function CartContextProvider(props) {
  let [cartCounter, setCartCounter] = useState(0);
  let addCartItem = (id) => {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => res)
      .catch((err) => err);
  };

  let getCartCounter = async () => {
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .catch(() => {
        setCartCounter(0);
      });
    setCartCounter(data.numOfCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        addCartItem,
        cartCounter,
        setCartCounter,
        getCartCounter,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
