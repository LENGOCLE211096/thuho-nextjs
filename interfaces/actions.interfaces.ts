export enum actionTypes {
  LOAD_DATA = "LOAD_DATA",
  LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS",
  LOAD_DATA_FAILED = "LOAD_DATA_FAILED",
  LOADING = "LOADING",
  START_CLOCK = "START_CLOCK",
  TICK_CLOCK = "TICK_CLOCK",
  INQUIRY_RESULT_CODE = "INQUIRY_RESULT_CODE",
  ERROR_STATE = "ERROR_STATE",
  RESET = "RESET",
  REDIRECT_STATE = "REDIRECT_STATE",
}

export type Action =
  | Loading
  | LoadData
  | LoadDataSuccess
  | LoadDataFailed
  | StartClock
  | TickClock
  | InquiryResultCode
  | ErrorState
  | Reset
  | Redirect

export interface ErrorState {
  type: actionTypes.ERROR_STATE
  error: boolean
}

export interface StartClock {
  type: actionTypes.START_CLOCK
}

export interface TickClock {
  type: actionTypes.TICK_CLOCK
  light: boolean
  ts: number
}

export interface LoadData {
  type: actionTypes.LOAD_DATA
  req: any
}

export interface LoadDataSuccess {
  type: actionTypes.LOAD_DATA_SUCCESS
  data: any
}

export interface LoadDataFailed {
  type: actionTypes.LOAD_DATA_FAILED
}

export interface Loading {
  type: actionTypes.LOADING
  load: boolean
}

export interface InquiryResultCode {
  type: actionTypes.INQUIRY_RESULT_CODE
  code: string
}

export interface Reset {
  type: actionTypes.RESET
}

export interface Redirect {
  type: actionTypes.REDIRECT_STATE
}
