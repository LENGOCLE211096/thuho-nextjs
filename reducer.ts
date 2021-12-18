import { HYDRATE } from "next-redux-wrapper"
import { Action, actionTypes, AppState } from "./interfaces"

export const initialState: AppState = {
  error: false,
  inquiryData: undefined,
  loading: false,
  inquiryResultCode: "00000",
  redirect: false,
}

const reducer = (
  state = initialState,
  action: Action | { type: typeof HYDRATE; payload: AppState }
): AppState => {
  switch (action.type) {
    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ inquiryData: action.data },
      }
    case actionTypes.LOAD_DATA_FAILED:
      return {
        ...state,
        ...{ inquiryData: undefined },
      }
    case actionTypes.LOADING:
      return {
        ...state,
        ...{ loading: action.load },
      }
    case actionTypes.INQUIRY_RESULT_CODE:
      return {
        ...state,
        ...{ inquiryResultCode: action.code },
      }
    case actionTypes.RESET:
      return {
        ...state,
        ...{ inquiryResultCode: "00000" },
      }
    default:
      return state
  }
}

export default reducer
