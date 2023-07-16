import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export let WishContext = createContext(0);

export default function WishContextProvider(props) {
  let [wishData, setWishData] = useState([]);
  let [isChanging, setIsChanging] = useState(false);
  let headers = { token: localStorage.getItem("userToken") };

  let wishing = async (elem, productID) => {
    let element = elem.target;
    if (elem.target.children[0]) {
      element = elem.target.children[0];
    }
    if (element.classList.contains("fa-regular")) {
      element.classList.replace("fa-regular", "fa-solid");
      element.classList.add("fa-beat");
      await postWish(productID);
    } else {
      element.classList.replace("fa-solid", "fa-regular");
      element.classList.remove("fa-beat");
      deleteWish(productID);
    }
  };

  let getWishinglist = async () => {
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .catch((err) => {})
      .then((res) => res);
    setWishData(data.data);
  };

  let postWish = async (id) => {
    setIsChanging(true);
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        { headers }
      )
      .catch((err) => {})
      .then((res) => res);
    setWishData(data.data);
    setIsChanging(false);
  };

  let deleteWish = async (id) => {
    setIsChanging(true);
    let { data } = await axios
      .delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + id, {
        headers,
      })
      .catch((err) => {})
      .then((res) => res);

    setWishData(data.data);
    setIsChanging(false);
  };

  useEffect(() => {
    getWishinglist();
  }, []);

  useEffect(() => {
    getWishinglist();
  }, [isChanging]);
  return (
    <WishContext.Provider
      value={{ wishing, wishData, isChanging, getWishinglist }}
    >
      {props.children}
    </WishContext.Provider>
  );
}
