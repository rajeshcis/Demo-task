import React, { Component } from "react";
import VideoForm from "./VideoForm";

class EditVideo extends Component {
  submit = values => {
    const id = values._id;
    delete values._id;
    this.props.updateVideo(id, values).then(() => {
      this.props.history.push("/");
    });
  };
  render() {
    return (
      <div className="container">
        <VideoForm onSubmit={this.submit} video={this.props.video} />
      </div>
    );
  }
}

export default EditVideo;
