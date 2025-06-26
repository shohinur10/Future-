import { createSelector} from "reselect";
import {AppRootState} from "../../lib/types/screen";

const selectOrders = (state: AppRootState) => state.ordersPage;
export const retrievePausedOrders = createSelector(
    selectOrders,
    (OrdersPage) => OrdersPage.pausedOrders
);
export const retrieveProcessOrders = createSelector(
    selectOrders,
    (OrdersPage) => OrdersPage.processOrders
);
export const retrieveFinishedOrders = createSelector(
    selectOrders,
     (OrdersPage) => OrdersPage.finishedOrders
);