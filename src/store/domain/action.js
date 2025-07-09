import { BUY_DOMAIN, BUY_DOMAIN_FAIL, BUY_DOMAIN_SUCCESS, DOMAIN_AVAILABILITY, DOMAIN_AVAILABILITY_FAIL, DOMAIN_AVAILABILITY_SUCCESS, DOMAIN_CLEAN_UP, DOMAIN_ORDERID, DOMAIN_ORDERID_FAIL, DOMAIN_ORDERID_SUCCESS, DOMAIN_PAYMENT_CLEANUP, DOMAIN_SUGGESTION, DOMAIN_SUGGESTION_FAIL, DOMAIN_SUGGESTION_SUCCESS } from "./actionType";

//get domain
export const domainAvailability = siteName => ({
    type: DOMAIN_AVAILABILITY,
    payload: siteName,
  });
  
  export const domainAvailabilitySuccess = response => ({
    type: DOMAIN_AVAILABILITY_SUCCESS,
    payload: response,
  });
  
  export const domainAvailabilityFail = error => ({
    type: DOMAIN_AVAILABILITY_FAIL,
    payload: error,
  });
  
  //domain suggest
  export const domainSuggestion = siteName => ({
    type: DOMAIN_SUGGESTION,
    payload: siteName,
  });
  
  export const domainSuggestionSuccess = response => ({
    type: DOMAIN_SUGGESTION_SUCCESS,
    payload: response,
  });
  
  export const domainSuggestionFail = error => ({
    type: DOMAIN_SUGGESTION_FAIL,
    payload: error,
  });
  
  export const domainCleanup = () => ({
    type: DOMAIN_CLEAN_UP,
  });
  
  export const buyDomain = (domain, paymentId) => ({
    type: BUY_DOMAIN,
    payload: { domain, paymentId },
  });
  
  export const buyDomainSuccess = response => ({
    type: BUY_DOMAIN_SUCCESS,
    payload: response,
  });
  
  export const buyDomainFail = error => ({
    type: BUY_DOMAIN_FAIL,
    payload: error,
  });
  
  export const domainOrderId = (domain, amount) => ({
    type: DOMAIN_ORDERID,
    payload: { domain, amount },
  });
  
  export const domainOrderIdSuccess = response => ({
    type: DOMAIN_ORDERID_SUCCESS,
    payload: response,
  });
  
  export const domainOrderIdFail = error => ({
    type: DOMAIN_ORDERID_FAIL,
    payload: error,
  });
  
  //cleanup after domain payment
  export const domainPaymentCleanup=()=>({
    type:DOMAIN_PAYMENT_CLEANUP
  })
  