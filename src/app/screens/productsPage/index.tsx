import React from "react";
import { Routes, Route } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";

import "../../../css/product.css";
import { CartItem } from "../../lib/types/search";
import Products from "./Product";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd } = props;

  return (
    <div className={"products-page"}>
      <Routes>
        <Route path="/:productId" element={<ChosenProduct onAdd={onAdd} />} />
        <Route path="/" element={<Products onAdd={onAdd} />} />
      </Routes>
    </div>
  );
}