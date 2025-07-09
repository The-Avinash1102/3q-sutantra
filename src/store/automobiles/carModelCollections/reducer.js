import { ADD_CAR_MODEL_COLLECTION_SUCCESS, DELETE_CAR_MODEL_COLLECTION_SUCCESS, GET_CAR_MODEL_COLLECTIONS_FAIL, GET_CAR_MODEL_COLLECTIONS_SUCCESS, UPDATE_CAR_MODEL_COLLECTION_FAIL, UPDATE_CAR_MODEL_COLLECTION_SUCCESS } from "./actionTypes";

const INIT_STATE = {
    collections: [],
  };

  const CARMODELCOLLECTION = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_CAR_MODEL_COLLECTIONS_SUCCESS:
        return {
          ...state,
          collections: action.payload,
        };
  
      case GET_CAR_MODEL_COLLECTIONS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case UPDATE_CAR_MODEL_COLLECTION_SUCCESS:
        return {
          ...state,
          collections: state.collections.map(collection =>
            collection._id === action.payload._id.toString()
              ? { ...collection, ...action.payload }
              : collection
          ),
        };
  
      case UPDATE_CAR_MODEL_COLLECTION_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case DELETE_CAR_MODEL_COLLECTION_SUCCESS:
        return {
          ...state,
          collections: state.collections.filter(
            collection => collection._id.toString() !== action.payload.toString()
          ),
        };
      case ADD_CAR_MODEL_COLLECTION_SUCCESS:
        return {
          ...state,
          collections: [...state.collections, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default CARMODELCOLLECTION;