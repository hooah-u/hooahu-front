import { ServerEndPoint } from "../Configs/Server";
import * as Request from "../Utils/WebRequest";

export const SUCCEED_TO_GET_CHOICE_COMMENT = "SUCCEED_TO_GET_CHOICE_COMMENT";
export const FAILED_TO_GET_CHOICE_COMMENT = "FAILED_TO_GET_CHOICE_COMMENT";

export const SUCCEED_TO_POST_CHOICE_COMMENT = "SUCCEED_TO_POST_CHOICE_COMMENT";
export const FAILED_TO_POST_CHOICE_COMMENT = "FAILED_TO_POST_CHOICE_COMMENT";

export const SUCCEED_TO_GET_LIKE_CHOICE_CHECK =
  "SUCCEED_TO_GET_LIKE_CHOICE_CHECK";
export const FAILED_TO_GET_LIKE_CHOICE_CHECK =
  "FAILED_TO_GET_LIKE_CHOICE_CHECK";

export const SUCCEED_TO_POST_LIKE_CHOICE = "SUCCEED_TO_POST_LIKE_CHOICE";
export const FAILED_TO_POST_LIKE_CHOICE = "FAILED_TO_POST_LIKE_CHOICE";

export const SUCCEED_TO_POST_DISLIKE_CHOICE = "SUCCEED_TO_POST_DISLIKE_CHOICE";
export const FAILED_TO_POST_DISLIKE_CHOICE = "FAILED_TO_POST_DISLIKE_CHOICE";

export const TOKEN_EXPIRED = "TOKEN_EXPIRED";

export const getChoiceComment = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + "api/choice/comment/" + params.id,
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
        type: SUCCEED_TO_GET_CHOICE_COMMENT,
        payload: responseJson.result
      });
      return responseJson.result;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_CHOICE_COMMENT,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const postChoiceComment = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + "api/choice/comment/" + params.id,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": params.token
          },
          body: JSON.stringify({
            comment: params.comment
          })
        }
      );
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_POST_CHOICE_COMMENT,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_CHOICE_COMMENT,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const getLikeChoiceCheck = params => {
  return async dispatch => {
    try {
      let response = Request.getData(
        `api/choice/check/${params.id}`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({
              type: SUCCEED_TO_GET_LIKE_CHOICE_CHECK,
              payload: result
            });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_LIKE_CHOICE_CHECK,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const postLikeChoice = params => {
  return async dispatch => {
    try {
      let response = Request.postData(
        `api/choice/like/${params.id}`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({ type: SUCCEED_TO_POST_LIKE_CHOICE, payload: result });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_LIKE_CHOICE,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const postDislikeChoice = params => {
  return async dispatch => {
    try {
      let response = Request.postData(
        `api/choice/dislike/${params.id}`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({ type: SUCCEED_TO_POST_DISLIKE_CHOICE, payload: result });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_DISLIKE_CHOICE,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};
