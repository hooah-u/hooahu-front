import { ServerEndPoint } from "../Configs/Server";
import * as Request from "../Utils/WebRequest";

export const TOKEN_EXPIRED = "TOKEN_EXPIRED";

export const SUCCEED_TO_GET_FEED = "SUCCEED_TO_GET_FEED";
export const FAILED_TO_GET_FEED = "FAILED_TO_GET_FEED";

export const SUCCEED_TO_GET_FEED_BY_TAG_NAME =
  "SUCCEED_TO_GET_FEED_BY_TAG_NAME";
export const FAILED_TO_GET_FEED_BY_TAG_NAME = "FAILED_TO_GET_FEED_BY_TAG_NAME";

export const SUCCEED_TO_GET_IMAGE_BY_TAG_NAME =
  "SUCCEED_TO_GET_IMAGE_BY_TAG_NAME";
export const FAILED_TO_GET_IMAGE_BY_TAG_NAME =
  "FAILED_TO_GET_IMAGE_BY_TAG_NAME";

export const SUCCEED_TO_POST_FEED = "SUCCEED_TO_POST_FEED";
export const FAILED_TO_POST_FEED = "FAILED_TO_POST_FEED";

export const SUCCEED_TO_DELETE_FEED = "SUCCEED_TO_DELETE_FEED";
export const FAILED_TO_DELETE_FEED = "FAILED_TO_DELETE_FEED";

export const SUCCEED_TO_POST_COMMENT = "SUCCEED_TO_POST_COMMENT";
export const FAILED_TO_POST_COMMENT = "FAILED_TO_POST_COMMENT";

export const SUCCEED_TO_POST_LIKE = "SUCCEED_TO_POST_LIKE";
export const FAILED_TO_POST_LIKE = "FAILED_TO_POST_LIKE";

export const SUCCEED_TO_POST_DISLIKE = "SUCCEED_TO_POST_DISLIKE";
export const FAILED_TO_POST_DISLIKE = "FAILED_TO_POST_DISLIKE";

export const SUCCEED_TO_GET_TAG_RANK = "SUCCEED_TO_GET_TAG_RANK";
export const FAILED_TO_GET_TAG_RANK = "FAILED_TO_GET_TAG_RANK";

export const SUCCEED_TO_GET_TAG_USER = "SUCCEED_TO_GET_TAG_USER";
export const FAILED_TO_GET_TAG_USER = "FAILED_TO_GET_TAG_USER";

export const SUCCEED_TO_SEARCH_TAG = "SUCCEED_TO_SEARCH_TAG";
export const FAILED_TO_SEARCH_TAG = "FAILED_TO_SEARCH_TAG";

export const getAllFeed = params => {
  return async dispatch => {
    try {
      let response = Request.getData(
        `api/post/all?index=${params.index}&rank=${params.rank}`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            dispatch({ type: TOKEN_EXPIRED });
            return "token_expired";

          default:
            dispatch({ type: SUCCEED_TO_GET_FEED, payload: result });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_FEED,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const getFeed = params => {
  return async dispatch => {
    try {
      let response = Request.getData(
        `api/post?post_type=${params.type}&index=${params.index}&rank=${
          params.rank
        }`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({ type: SUCCEED_TO_GET_FEED, payload: result });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_FEED,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const getFeedsByTagName = params => {
  return async dispatch => {
    try {
      let response = Request.getData(
        `api/post/tag?title=${params.tag_name}&index=${
          params.index
        }&post_type=${1}`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({
              type: SUCCEED_TO_GET_FEED_BY_TAG_NAME,
              payload: result
            });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_FEED_BY_TAG_NAME,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const searchTag = params => {
  return async dispatch => {
    try {
      let response = Request.getData(
        `api/post/search/tag?title=${
          params.tag_name === "" ? null : params.tag_name
        }`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({
              type: SUCCEED_TO_SEARCH_TAG,
              payload: result
            });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_SEARCH_TAG,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const getImageByTagName = params => {
  return async dispatch => {
    try {
      let response = Request.getData(
        `api/post/tag/image?title=${params.tag_name}&all=${params.all}`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({
              type: SUCCEED_TO_GET_IMAGE_BY_TAG_NAME,
              payload: result
            });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_IMAGE_BY_TAG_NAME,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const postFeed = params => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": params.token
        },
        body: JSON.stringify({
          content: params.content,
          post_type: params.type,
          tags: params.tags,
          pic_list: params.pic_list
        })
      });
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_POST_FEED,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_FEED,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const deleteFeed = params => {
  return async dispatch => {
    try {
      let response = Request.postData(
        `api/post/delete/${params.id}`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({ type: SUCCEED_TO_DELETE_FEED, payload: result });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_DELETE_FEED,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const postComment = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + "api/post/comment/" + params.post_id,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": params.token
          },
          body: JSON.stringify({
            content: params.content
          })
        }
      );
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_POST_COMMENT,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_COMMENT,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const postLike = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + "api/post/like/" + params.post_id,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": params.token
          }
        }
      );
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_POST_LIKE,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_LIKE,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const disLike = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + "api/post/like/" + params.post_id,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": params.token
          }
        }
      );
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_POST_DISLIKE,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_DISLIKE,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const getTagRank = params => {
  return async dispatch => {
    try {
      let response = Request.getData(`api/post/tag/rank`, params).then(
        result => {
          switch (result) {
            case "token_expired":
              return dispatch({ type: TOKEN_EXPIRED });

            default:
              dispatch({
                type: SUCCEED_TO_GET_TAG_RANK,
                payload: result.result
              });
              return result.result;
          }
        }
      );
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_TAG_RANK,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const getTagUser = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + `api/user/tag?title=${params.tag_name}`,
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
        type: SUCCEED_TO_GET_TAG_USER,
        payload: responseJson.result
      });
      return responseJson.result;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_TAG_USER,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};
