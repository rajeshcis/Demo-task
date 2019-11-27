import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addVideo, resetStore } from "../../actions/video";
import NewVideo from "../../components/videos/New";

const NewVideoContainer = props => <NewVideo {...props} />;

const mapStateToProps = (state = {}, ownProps) => {
  return {};
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ addVideo, resetStore }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(NewVideoContainer);
