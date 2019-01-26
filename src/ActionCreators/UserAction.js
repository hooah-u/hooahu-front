import { ServerEndPoint } from "../Configs/Server";
import * as Request from "../Utils/WebRequest";

export const SUCCEED_TO_GET_USER = "SUCCEED_TO_GET_USER";
export const FAILED_TO_GET_USER = "FAILED_TO_GET_USER";
export const TOKEN_EXPIRED = "TOKEN_EXPIRED";

export const SUCCEED_TO_CHECKNAME = "SUCCEED_TO_CHECKNAME";
export const FAILED_TO_CHECKNAME = "FAILED_TO_CHECKNAME";

export const SUCCEED_TO_GET_USER_BY_USER_ID = "SUCCEED_TO_GET_USER_BY_USER_ID";
export const FAILED_TO_GET_USER_BY_USER_ID = "FAILED_TO_GET_USER_BY_USER_ID";

export const SUCCEED_TO_GET_FEED_BY_USER_ID = "SUCCEED_TO_GET_FEED_BY_USER_ID";
export const FAILED_TO_GET_FEED_BY_USER_ID = "FAILED_TO_GET_FEED_BY_USER_ID";

export const getUser = params => {
  return async dispatch => {
    try {
      let response = Request.getData(`api/user/me`, params).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({ type: SUCCEED_TO_GET_USER, payload: result.result[0] });
            return result.result[0];
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_USER,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const checkEmail = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + `api/auth/email/test?email=${params.email}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_CHECKNAME,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_CHECKNAME,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const getUserByUserID = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + `api/user/info/${params.user_id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": params.token
          }
        }
      );
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_GET_USER_BY_USER_ID,
        payload: responseJson.result[0]
      });
      return responseJson.result[0];
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_USER_BY_USER_ID,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const getFeedByUserID = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + `api/post/user/${params.user_id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": params.token
          }
        }
      );
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_GET_FEED_BY_USER_ID,
        payload: responseJson.result
      });
      return responseJson.result;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_FEED_BY_USER_ID,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};
