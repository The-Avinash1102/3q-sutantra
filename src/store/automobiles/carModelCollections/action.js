import { ADD_CAR_MODEL_COLLECTION, ADD_CAR_MODEL_COLLECTION_FAIL, ADD_CAR_MODEL_COLLECTION_SUCCESS, DELETE_CAR_MODEL_COLLECTION, DELETE_CAR_MODEL_COLLECTION_FAIL, DELETE_CAR_MODEL_COLLECTION_SUCCESS, GET_CAR_MODEL_COLLECTIONS, GET_CAR_MODEL_COLLECTIONS_FAIL, UPDATE_CAR_MODEL_COLLECTION, UPDATE_CAR_MODEL_COLLECTION_FAIL, UPDATE_CAR_MODEL_COLLECTION_SUCCESS } from "./actionTypes";


export const getCarModelCollections = () => ({
    type: GET_CAR_MODEL_COLLECTIONS,
  });
  
  export const getCarModelCollectionsSuccess = carModels => ({
    type: GET_CAR_MODEL_COLLECTIONS,
    payload: carModels,
  });
  
  export const getCarModelCollectionsFail = error => ({
    type: GET_CAR_MODEL_COLLECTIONS_FAIL,
    payload: error,
  });
  
  export const addCarModelCollection = (collection, history) => ({
    type: ADD_CAR_MODEL_COLLECTION,
    payload: { collection, history },
  });
  
  export const addCarModelCollectionSuccess = collection => ({
    type: ADD_CAR_MODEL_COLLECTION_SUCCESS,
    payload: collection,
  });
  
  export const addCarModelCollectionFail = error => ({
    type: ADD_CAR_MODEL_COLLECTION_FAIL,
    payload: error,
  });
  
  export const updateCarModelCollection = (collection, history) => ({
    type: UPDATE_CAR_MODEL_COLLECTION,
    payload: { collection, history },
  });
  
  export const updateCarModelCollectionSuccess = collection => ({
    type: UPDATE_CAR_MODEL_COLLECTION_SUCCESS,
    payload: collection,
  });
  
  export const updateCarModelCollectionFail = error => ({
    type: UPDATE_CAR_MODEL_COLLECTION_FAIL,
    payload: error,
  });
  
  export const deleteCarModelCollection = (collectionId, history) => ({
    type: DELETE_CAR_MODEL_COLLECTION,
    payload: { collectionId, history },
  });
  
  export const deleteCarModelCollectionSuccess = collectionId => ({
    type: DELETE_CAR_MODEL_COLLECTION_SUCCESS,
    payload: collectionId,
  });
  
  export const deleteCarModelCollectionFail = error => ({
    type: DELETE_CAR_MODEL_COLLECTION_FAIL,
    payload: error,
  });