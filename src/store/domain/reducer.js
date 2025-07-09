import {
    DOMAIN_AVAILABILITY_SUCCESS,
    DOMAIN_AVAILABILITY_FAIL,
    DOMAIN_SUGGESTION_SUCCESS,
    DOMAIN_SUGGESTION_FAIL,
    DOMAIN_CLEAN_UP,
    BUY_DOMAIN_SUCCESS,
    BUY_DOMAIN_FAIL,
    DOMAIN_ORDERID_SUCCESS,
    DOMAIN_ORDERID_FAIL,
    DOMAIN_PAYMENT_CLEANUP,
  } from "./actionType";
  
  const INIT_STATE = {
    domainAvailability: {},
    domainSuggestion: [],
    domainPayment: [],
    domainOrderId: {},
  };
  
  const Domain = (state = INIT_STATE, action) => {
    switch (action.type) {
      case DOMAIN_AVAILABILITY_SUCCESS:
        return {
          ...state,
          domainAvailability: action.payload,
        };
  
      case DOMAIN_AVAILABILITY_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case DOMAIN_SUGGESTION_SUCCESS:
        return {
          ...state,
          domainSuggestion: action.payload.data,
        };
  
      case DOMAIN_SUGGESTION_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case DOMAIN_CLEAN_UP:
        return {
          ...state,
          domainSuggestion: [],
          domainAvailability: {},
        };
  
      case BUY_DOMAIN_SUCCESS:
        return {
          ...state,
          domainPayment: action.payload,
        };
  
      case BUY_DOMAIN_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case DOMAIN_ORDERID_SUCCESS:
        return {
          ...state,
          domainOrderId: action.payload,
        };
  
      case DOMAIN_ORDERID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case DOMAIN_PAYMENT_CLEANUP:
        return {
          ...state,
          domainOrderId: {},
          domainPayment: [],
        };
  
      default:
        return state;
    }
  };
  
  export default Domain;
  