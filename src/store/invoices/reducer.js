import {
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_INVOICE_DETAIL_SUCCESS,
  GET_INVOICE_DETAIL_FAIL,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAIL,
  DELETE_ALL_INVOICE_SUCCESS,
  DELETE_ALL_INVOICE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  invoices: [],
  invoiceDetail: {},
  error: {},
}

const Invoices = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
      }

    case GET_INVOICES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_INVOICE_DETAIL_SUCCESS:
      return {
        ...state,
        invoiceDetail: action.payload,
      }

    case GET_INVOICE_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.filter(
          invoice => invoice._id.toString() !== action.payload.toString()
        ),
      };

    case DELETE_INVOICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_ALL_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: [],
      };

    case DELETE_ALL_INVOICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state
  }
}

export default Invoices
