import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes"
import { profileSuccess, profileError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeProfile
} from "../../../helpers/fakebackend_helper"
import { putJwtProfile } from "helpers/backend_helper"
import { showToastError, showToastSuccess } from "helpers/toastBuilder"

const fireBaseBackend = getFirebaseBackend()

function* editProfile({ payload: { user, id } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.editProfileAPI,
        user.username,
        user.idx
      )
      yield put(profileSuccess(response))      
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(putJwtProfile, {
        user,
        id
      })
      yield put(profileSuccess(response));
      showToastSuccess("User Profile updated successfully","Success")
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeProfile, {
        username: user.username,
        idx: user.idx,
      })
      yield put(profileSuccess(response))
    }
  } catch (error) {
    yield put(profileError(error))
    showToastError("User profile failed to update","Error")
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
