import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../lib/types/screen";

const initialState: ProductsPageState = {
  founder: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setFounder: (state, action) => {
      state.founder= action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setFounder, setChosenProduct, setProducts } =
  productsPageSlice.actions;

const  ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer