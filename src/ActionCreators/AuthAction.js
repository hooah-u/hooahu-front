import { ServerEndPoint } from "../Configs/Server";
import * as Request from "../Utils/WebRequest";
export const TOKEN_EXPIRED = "TOKEN_EXPIRED";

export const SUCCEED_TO_SIGNIN = "SUCCEED_TO_SIGNIN";
export const FAILED_TO_SIGNIN = "FAILED_TO_SIGNIN";

export const SUCCEED_TO_POST_CHANGE_PROFILE = "SUCCEED_TO_POST_CHANGE_PROFILE";
export const FAILED_TO_POST_CHANGE_PROFILE = "FAILED_TO_POST_CHANGE_PROFILE";

export const SUCCEED_TO_SIGNUP = "SUCCEED_TO_SIGNUP";
export const FAILED_TO_SIGNUP = "FAILED_TO_SIGNUP";

export const SUCCEED_TO_SIGNOUT = "SUCCEED_TO_SIGNOUT";

export const postSignUp = params => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          full_name: params.first_name + " " + params.last_name,
          nickname: params.nickname,
          email: params.email,
          password: params.password,
          type: params.type,
          c_type: params.c_type,
          w_type: params.w_type,
          area: params.area,
          camp: params.camp,
          reason: params.reason,
          profile_url: params.picture === "" ? "" : params.picture,
          is_facebook: params.fbToken === "" ? false : true,
          access_token: params.fbToken === "" ? "" : params.fbToken
        })
      });
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_SIGNUP,
        payload: responseJson.token
      });
      return responseJson.token;
    } catch (error) {
      dispatch({
        type: FAILED_TO_SIGNUP,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const postChangeProfile = params => {
  return async dispatch => {
    try {
      let response = Request.postData(`api/user/update/profile`, params).then(
        result => {
          switch (result) {
            case "token_expired":
              return dispatch({ type: TOKEN_EXPIRED });

            default:
              dispatch({
                type: SUCCEED_TO_POST_CHANGE_PROFILE,
                payload: result
              });
              return result;
          }
        }
      );
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_CHANGE_PROFILE,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const postSignIn = params => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: params.email,
          password: params.password,
          is_facebook: params.is_facebook ? true : false,
          access_token: params.access_token ? params.access_token : null
        })
      });
      if (response.status === 406) {
        await dispatch({
          type: FAILED_TO_SIGNIN,
          payload: null
        });
        return "failed";
      } else {
        let responseJson = await response.json();
        await dispatch({
          type: SUCCEED_TO_SIGNIN,
          payload: responseJson.token
        });
        return responseJson.token;
      }
    } catch (error) {
      dispatch({
        type: FAILED_TO_SIGNIN,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const signOut = () => {
  return async dispatch => {
    dispatch({
      type: SUCCEED_TO_SIGNOUT
    });
    return "signOut";
  };
};
