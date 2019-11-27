import React, { Component } from "react";
import VideoForm from "./VideoForm";

class NewVideo extends Component {
  componentWillMount() {
    this.props.resetStore("GET_VIDEO", {});
  }
  submit = values => {
    this.props.addVideo(values).then(() => {
      this.props.history.push("/");
    });
  };
  render() {
    return (
      <div className="container">
        <VideoForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default NewVideo;
