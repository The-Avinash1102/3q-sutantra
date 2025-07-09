import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  GET_CART_DATA,
  GET_CUSTOMERS,
  GET_ORDERS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS,
  GET_SHOPS,
  ADD_NEW_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  ADD_NEW_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_PRODUCT_COMMENTS,
  ON_LIKE_COMMENT,
  ON_LIKE_REPLY,
  ON_ADD_REPLY,
  ON_ADD_COMMENT,
  GET_PRODUCT_LIST,
  UPDATE_PRODUCT_IN_LIST,
  DELETE_PRODUCT_IN_LIST,
  ADD_NEW_PRODUCT_IN_LIST,
  DELETE_ALL_ORDERS,
  IMPORT_CUSTOMERS,
  DELETE_ALL_CUSTOMERS,
} from "./actionTypes";
import {
  getCartDataFail,
  getCartDataSuccess,
  getCustomersFail,
  getCustomersSuccess,
  getOrdersFail,
  getOrdersSuccess,
  getProductDetailFail,
  getProductDetailSuccess,
  getProductsFail,
  getProductsSuccess,
  getShopsFail,
  getShopsSuccess,
  addOrderFail,
  addOrderSuccess,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,
  addCustomerFail,
  addCustomerSuccess,
  updateCustomerSuccess,
  updateCustomerFail,
  deleteCustomerSuccess,
  deleteCustomerFail,
  getProductCommentsSuccess,
  getProductCommentsFail,
  onLikeCommentSuccess,
  onLikeCommentFail,
  onLikeReplySuccess,
  onLikeReplyFail,
  onAddReplySuccess,
  onAddReplyFail,
  onAddCommentSuccess,
  onAddCommentFail,
  getProductListSuccess,
  getProductListFail,
  updateProductInListSuccess,
  updateProductInListFail,
  deleteProductInListSuccess,
  deleteProductInListFail,
  addProductInListSuccess,
  addProductInListFail,
  deleteAllOrdersSuccess,
  deleteAllOrdersFail,
  importCustomerSuccess,
  importCustomerFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCartData,
  getProducts,
  getShops,
  getProductDetail,
  getProductComents as getProductComentsApi,
  onLikeComment as onLikeCommentApi,
  onLikeReply as onLikeReplyApi,
  onAddReply as onAddReplyApi,
  onAddComment as onAddCommentApi,
} from "helpers/fakebackend_helper";
import {
  getOrders,
  addNewOrder,
  updateOrder,
  deleteOrder,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  addNewCustomer,
  deleteAllOrdersCall,
  importCustomers,
  deleteEveryCustomer,
} from "helpers/backend_helper";
import { addNewProductInList, deleteProductInList, getProductList, updateProductInList } from "helpers/backend_helper";
import { showToastError, showToastSuccess } from "helpers/toastBuilder";

function* fetchProducts() {
  try {
    const response = yield call(getProducts);
    yield put(getProductsSuccess(response));
  } catch (error) {
    yield put(getProductsFail(error));
  }
}

function* fetchProductDetail({ productId }) {
  try {
    const response = yield call(getProductDetail, productId);
    yield put(getProductDetailSuccess(response));
  } catch (error) {
    yield put(getProductDetailFail(error));
  }
}

function* fetchOrders() {
  try { 
    const response = yield call(getOrders);
    console.log('ordersData ', response);
    yield put(getOrdersSuccess(response.data));
  } catch (error) {
    yield put(getOrdersFail(error));
  }
}

function* fetchCartData() {
  try {
    const response = yield call(getCartData);
    yield put(getCartDataSuccess(response));
  } catch (error) {
    yield put(getCartDataFail(error));
  }
}

function* fetchCustomers() {
  try {
    const response = yield call(getCustomers);
    yield put(getCustomersSuccess(response.data.customers));
  } catch (error) {
    yield put(getCustomersFail(error));
  }
}

function* onUpdateCustomer({ payload: customer }) {
  try {
    const response = yield call(updateCustomer, customer);
    yield put(updateCustomerSuccess(response));
  } catch (error) {
    yield put(updateCustomerFail(error));
  }
}

function* onDeleteCustomer({ payload: id }) {
  try {
    const response = yield call(deleteCustomer, id);
    yield put(deleteCustomerSuccess(id));
  } catch (error) {
    yield put(deleteCustomerFail(error));
  }
}

function* onAddNewCustomer({ payload: customer }) {
  try {
    const response = yield call(addNewCustomer, customer);

    yield put(addCustomerSuccess(response));
  } catch (error) {
    yield put(addCustomerFail(error));
  }
}

function* fetchShops() {
  try {
    const response = yield call(getShops);
    yield put(getShopsSuccess(response));
  } catch (error) {
    yield put(getShopsFail(error));
  }
}

function* onUpdateOrder({ payload: order }) {
  try {
    const response = yield call(updateOrder, order);
    yield put(updateOrderSuccess(response.data));
  } catch (error) {
    yield put(updateOrderFail(error));
  }
}

function* onDeleteOrder({ payload: order }) {
  try {
    const response = yield call(deleteOrder, order);
    showToastSuccess("Order deleted successfully", "Success");
    yield put(deleteOrderSuccess(order._id));
  } catch (error) {
    showToastError("Order failed to delete. Try Again", "Error");
    yield put(deleteOrderFail(error));
  }
}

function* onDeleteAllOrders() {
  try {
    console.log('datacheck');
    const response = yield call(deleteAllOrdersCall);
    showToastSuccess("All Orders deleted successfully", "Success");
    yield put(deleteAllOrdersSuccess());
  } catch {
    yield put(deleteAllOrdersFail());
    showToastError("Orders failed to delete. Try Again", "Error");
  }
}

function* onAddNewOrder({ payload: order }) {
  try {
    const response = yield call(addNewOrder, order);
    yield put(addOrderSuccess(response.data));
  } catch (error) {
    yield put(addOrderFail(error));
  }
}

function* getProductComents() {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(getProductComentsApi);
    yield put(getProductCommentsSuccess(response));
  } catch (error) {
    yield put(getProductCommentsFail(error));
  }
}

function* onLikeComment({ payload: { commentId, productId } }) {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(onLikeCommentApi, commentId, productId);
    yield put(onLikeCommentSuccess(response));
  } catch (error) {
    yield put(onLikeCommentFail(error));
  }
}

function* onLikeReply({ payload: { commentId, productId, replyId } }) {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(onLikeReplyApi, commentId, productId, replyId);
    yield put(onLikeReplySuccess(response));
  } catch (error) {
    yield put(onLikeReplyFail(error));
  }
}

function* onAddReply({ payload: { commentId, productId, replyText } }) {
  try {
    const response = yield call(onAddReplyApi, commentId, productId, replyText);
    yield put(onAddReplySuccess(response));
  } catch (error) {
    yield put(onAddReplyFail(error));
  }
}

function* onAddComment({ payload: { productId, commentText } }) {
  try {
    const response = yield call(onAddCommentApi, productId, commentText);
    yield put(onAddCommentSuccess(response));
  } catch (error) {
    yield put(onAddCommentFail(error));
  }
}

function* fetchProductList() {
  try {
    const response = yield call(getProductList);
    yield put(getProductListSuccess(response.data.products));
  } catch (error) {
    yield put(getProductListFail(error));
  }
}

function* onUpdateProductInList({ payload: product }) {
  try {
    const response = yield call(updateProductInList, product);
    yield put(updateProductInListSuccess(product));
  } catch (error) {
    yield put(updateProductInListFail(error));
  }
}

function* onDeleteProductInList({ payload: product }) {
  try {
    console.log('deleteproduct ', product);
    const response = yield call(deleteProductInList, product);
    yield put(deleteProductInListSuccess(product));
    showToastSuccess("Product deleted successfully", "Success");
  } catch (error) {
    yield put(deleteProductInListFail(error));
    showToastError("Product failed to get deleted", "Error");
  }
}

function* onAddNewProductInList({ payload: product }) {
  try {
    const response = yield call(addNewProductInList, product);
    yield put(addProductInListSuccess(response));
  } catch (error) {
    yield put(addProductInListFail(error));
  }
}

function* onImportCustomers({ payload: customers }) {
  try {
    const response = yield call(importCustomers, customers);
    yield put(importCustomerSuccess(response.data));
  } catch (error) {
    yield put(importCustomerFail(error));
  }
}

function* onDeleteAllCustomers() {
  try {
    const response = yield call(deleteEveryCustomer);
    yield put(deleteAllCustomersSuccess());
  } catch (error) {
    yield put(deleteAllCustomersFail(error));
  }
}

function* ecommerceSaga() {
  yield takeEvery(GET_PRODUCTS, fetchProducts);
  yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail);
  yield takeEvery(GET_ORDERS, fetchOrders);
  yield takeEvery(GET_CART_DATA, fetchCartData);
  yield takeEvery(GET_CUSTOMERS, fetchCustomers);
  yield takeEvery(ADD_NEW_CUSTOMER, onAddNewCustomer);
  yield takeEvery(UPDATE_CUSTOMER, onUpdateCustomer);
  yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer);
  yield takeEvery(IMPORT_CUSTOMERS, onImportCustomers);
  yield takeEvery(DELETE_ALL_CUSTOMERS, onDeleteAllCustomers);
  yield takeEvery(GET_SHOPS, fetchShops);
  yield takeEvery(ADD_NEW_ORDER, onAddNewOrder);
  yield takeEvery(UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
  yield takeEvery(GET_PRODUCT_COMMENTS, getProductComents);
  yield takeEvery(ON_LIKE_COMMENT, onLikeComment);
  yield takeEvery(ON_LIKE_REPLY, onLikeReply);
  yield takeEvery(ON_ADD_REPLY, onAddReply);
  yield takeEvery(ON_ADD_COMMENT, onAddComment);
  yield takeEvery(GET_PRODUCT_LIST, fetchProductList);
  yield takeEvery(UPDATE_PRODUCT_IN_LIST, onUpdateProductInList);
  yield takeEvery(DELETE_PRODUCT_IN_LIST, onDeleteProductInList);
  yield takeEvery(ADD_NEW_PRODUCT_IN_LIST, onAddNewProductInList);
  yield takeEvery(DELETE_ALL_ORDERS, onDeleteAllOrders);
}

export default ecommerceSaga;
