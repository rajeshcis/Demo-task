import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getVideo, updateVideo } from "../../actions/video";
import EditVideo from "../../components/videos/Edit";

class EditVideoContainer extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getVideo(id);
  }
  render() {
    return <EditVideo {...this.props} />;
  }
}
const mapStateToProps = (state = {}, ownProps) => {
  return {
    video: state.videos.video
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ updateVideo, getVideo }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(EditVideoContainer);
