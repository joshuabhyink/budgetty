import axios from "axios";

const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false,
};

const REQUEST_USER_DATA = "REQUEST_USER_DATA";
const ADD_PURCHASE = "ADD_PURCHASE";
const REMOVE_PURCHASE = "REMOVE_PURCHASE";

export const requestBudgetData = () => {
  let data = axios.get("/api/budget-data").then((res) => res.data);
  return {
    type: REQUEST_USER_DATA,
    payload: data,
  };
};

export const addPurchase = (price, description, category) => {
  let data = axios
    .post("/api/budget-data/purchase", { description, price, category })
    .then((res) => res.data);
  return {
    type: ADD_PURCHASE,
    payload: data,
  };
};

export const removePurchase = (id) => {
  let data = axios
    .delete("/api/budget-data/purchase/:id")
    .then((res) => res.data);
  return {
    type: REMOVE_PURCHASE,
    payload: data,
  };
};
export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_USER_DATA + "_PENDING":
      return { ...state, loading: true };
    case REQUEST_USER_DATA + "_FULFILLED":
      return { ...state, ...payload, loading: false };
    case REQUEST_USER_DATA + "_PENDING":
      return { ...state, ...payload, loading: true };
    case REQUEST_USER_DATA + "_FULFILLED":
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
}
