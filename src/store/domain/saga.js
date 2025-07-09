import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  DOMAIN_AVAILABILITY,
  DOMAIN_SUGGESTION,
  BUY_DOMAIN,
  DOMAIN_ORDERID,
} from "./actionType";
import {
  domainAvailabilitySuccess,
  domainAvailabilityFail,
  domainSuggestionSuccess,
  domainSuggestionFail,
  buyDomainSuccess,
  buyDomainFail,
  domainOrderIdSuccess,
  domainOrderIdFail,
} from "./action";
import { buyDomainApi, domainAvailabilityApi, domainSuggestionApi, onDomainOrderId } from "helpers/backend_helper";

function* domainAvailability({ payload: siteName }) {
  try {
    const response = yield call(domainAvailabilityApi, siteName);
    yield put(domainAvailabilitySuccess(response));
  } catch (error) {
    yield put(domainAvailabilityFail(error));
  }
}

function* domainSuggestion({ payload: siteName }) {
  try {
    const response = yield call(domainSuggestionApi, siteName);
    yield put(domainSuggestionSuccess(response));
  } catch (error) {
    yield put(domainSuggestionFail(error));
  }
}

function* onbuyDomain({ payload: { domain, paymentId } }) {
  try {
    const response = yield call(buyDomainApi, domain, paymentId);
    yield put(buyDomainSuccess(response));
  } catch (error) {
    yield put(buyDomainFail(error));
  }
}

function* fetchDomainOrderId({ payload: { domain, amount } }) {
  try {
    const response = yield call(onDomainOrderId, domain, amount);
    yield put(domainOrderIdSuccess(response));
  } catch (error) {
    yield put(domainOrderIdFail(error));
  }
}

function* domainSaga() {
  yield takeEvery(DOMAIN_AVAILABILITY, domainAvailability);
  yield takeEvery(DOMAIN_SUGGESTION, domainSuggestion);
  yield takeEvery(BUY_DOMAIN, onbuyDomain);
  yield takeEvery(DOMAIN_ORDERID, fetchDomainOrderId);
}

export default domainSaga;
