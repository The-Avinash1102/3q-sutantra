import { ADD_COLLECTION_SUCCESS, DELETE_COLLECTION_SUCCESS, GET_COLLECTIONS_FAIL, GET_COLLECTIONS_SUCCESS, UPDATE_COLLECTION_FAIL, UPDATE_COLLECTION_SUCCESS } from "./actionTypes";

const INIT_STATE = {
    collections: [],
  };

  const COLLECTION = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_COLLECTIONS_SUCCESS:
        return {
          ...state,
          collections: action.payload,
        };
  
      case GET_COLLECTIONS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case UPDATE_COLLECTION_SUCCESS:
        return {
          ...state,
          collections: state.collections.map(collection =>
            collection._id === action.payload._id.toString()
              ? { ...collection, ...action.payload }
              : collection
          ),
        };
  
      case UPDATE_COLLECTION_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case DELETE_COLLECTION_SUCCESS:
        return {
          ...state,
          collections: state.collections.filter(
            collection => collection._id.toString() !== action.payload.toString()
          ),
        };
      case ADD_COLLECTION_SUCCESS:
        return {
          ...state,
          collections: [...state.collections, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default COLLECTION;