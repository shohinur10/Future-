import React, { useEffect } from "react";

import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";

import { Product } from "../../lib/types/product";
import ProductService from "../../services/ProductService";

import MemberService from "../../services/MemberService";
import { Member } from "../../lib/types/member";

import "../../../css/home.css";
import { AppDispatch } from "../../../store";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advsertisement";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { ProductCategory } from "../../lib/enums/product.enum";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const product = new ProductService();

    // 🔥 Popular Dishes
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews", // ✅ Use correct value your API expects
        productCategory:  ProductCategory.BEDROOM,
        search: "",
      })
      .then((data) => dispatch(setPopularDishes(data)))
      .catch((err) => console.log("Popular dishes error:", err));

    // 🔥 NEW ARRIVES
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt", // ✅ Adjust based on backend needs
        productCategory:   ProductCategory.BEDROOM,
        search: "",
      })
      .then((data) => dispatch(setNewDishes(data)))
      .catch((err) => console.log("New dishes error:", err));

    // 🔥 Top Users
    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => dispatch(setTopUsers(data)))
      .catch((err) => console.log("Top users error:", err));
  }, [dispatch]);

  return (
    <div className="homepage">
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}

