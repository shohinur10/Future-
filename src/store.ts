import { Action, configureStore, Middleware, ThunkAction } from "@reduxjs/toolkit";
import HomePageReducer from "./app/screens/homePage/slice";
import ProductsPageReducer from "./app/screens/productsPage/slice";
import OrdersPageReducer from "./app/screens/ordersPage/slice";
import reduxLogger from "redux-logger";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductsPageReducer,
    ordersPage: OrdersPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger as Middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
