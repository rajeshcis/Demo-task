import _ from "lodash";
import Constants from "../constants";
const defaultState = {
  videos: [],
  video: {}
};
const updateVideList = (state, id) => {
  const { videos } = state;
  _.remove(videos, video => {

    return video._id === id;
  });

  state.videos = videos;
  return state;
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case Constants.VIDEOS:
      return { ...state, videos: action.payload.data };
    case Constants.DELETE_VIDEO:
      const updatedList = updateVideList(state, action.payload.data);
      return { ...updatedList, videoDeleted: action.payload };
    case Constants.GET_VIDEO:

      return { ...state, video: action.payload.data };
    default:
      return state;
  }
};
