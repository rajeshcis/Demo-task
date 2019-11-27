import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteVideo, getVideos } from "../../actions/video";
import Videos from "../../components/videos";

class VideosContainer extends Component {
  componentDidMount() {
    this.props.getVideos();
  }
  render() {
    return <Videos {...this.props} />;
  }
}

const mapStateToProps = (state = {}, ownProps) => {
  return {
    videos: state.videos.videos,
    videoDeleted: state.videos.videoDeleted
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getVideos, deleteVideo }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(VideosContainer);
