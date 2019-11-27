import Constants from "../constants";
import Api from "./api";

export const addVideo = data => {
  return function(dispatch) {
    return Api.post("/videos", data).then(function(res, err) {
      return dispatch({
        type: Constants.ADD_VIDEO,
        payload: res
      });
    });
  };
};

export const deleteVideo = id => {
  return function(dispatch) {
    Api.delete(`/videos/${id}`).then(function(res, err) {
      return dispatch({
        type: Constants.DELETE_VIDEO,
        payload: res.data
      });
    });
  };
};

export const updateVideo = (id, data) => {
  return function(dispatch) {
    return Api.put(`/videos/${id}`, data).then(function(res, err) {
      return dispatch({
        type: Constants.UPDATE_VIDEO,
        payload: res.data
      });
    });
  };
};

export const getVideos = id => {
  return function(dispatch) {
    Api.get(`/videos`).then(function(res, err) {
      return dispatch({
        type: Constants.VIDEOS,
        payload: res.data
      });
    });
  };
};

export const getVideo = id => {
  return function(dispatch) {
    Api.get(`/videos/${id}`).then(function(res, err) {
      return dispatch({
        type: Constants.GET_VIDEO,
        payload: res.data
      });
    });
  };
};

export const resetStore = (type, value) => {
  return function(dispatch) {
    return dispatch({
      type: type,
      payload: value
    });
  };
};
