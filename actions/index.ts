import { actionTypes } from "../interfaces"
import * as actionIs from "../interfaces/actions.interfaces"

export function loadData(req: any) {
  return { type: actionTypes.LOAD_DATA, req }
}

// export function loadDataFailed(err: boolean): actionIs.LoadDataFailed {
//   return { type: actionTypes.LOAD_DATA_FAILED, err}
// }

export function loadDataSuccess(data: actionIs.LoadDataSuccess) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data,
  }
}

export function loadDataFailed() {
  return {
    type: actionTypes.LOAD_DATA_FAILED,
  }
}

export function reset() {
  return {
    type: actionTypes.RESET,
  }
}

export function loadingData(load: boolean) {
  return {
    type: actionTypes.LOADING,
    load,
  }
}

export function inquiryResultCode(code: string) {
  return {
    type: actionTypes.INQUIRY_RESULT_CODE,
    code,
  }
}

export function errorState(err: boolean) {
  return {
    type: actionTypes.ERROR_STATE,
    err,
  }
}

export function redirectPage() {
  return {
    type: actionTypes.REDIRECT_STATE,
  }
}
