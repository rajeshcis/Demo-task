import React, { Component } from "react";
import ReactPaginate from 'react-paginate';
import { VideoList } from "./VideoList";
import VideoPlayer from "./VideoPlayer";

class Videos extends Component {

  state = {
    currentPage: 0,
    perPage: 2,
    offset: 0,
    isModalOpen: false,
    videoUrl: null
  }

  createVideoList = video => {
    return (
      <VideoList
        key={video._id}
        video={video}
        deleteVideo={this.props.deleteVideo}
        toggleModalPopup={this.toggleModalPopup}
      />
    );
  };


  handlePageClick = data => {
    let selected = data.selected;
    let { perPage } = this.state
    let offset = Math.ceil(selected * perPage);
    this.setState({ offset: offset })
  }

  toggleModalPopup = (url) => {
    const { isModalOpen } = this.state
    this.setState({
      isModalOpen: !isModalOpen,
      videoUrl: url
    })
  }

  render() {
    let { videos } = this.props;
    const { offset, perPage, isModalOpen, videoUrl } = this.state
    const videoList = videos.slice(offset, offset + perPage).map(video => {
      return this.createVideoList(video);
    });

    return (
      <div>
        <br />
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Thumbnail Url</th>
              <th scope="col">Snapshot Url</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{videoList}</tbody>
        </table>

        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={videos.length / 2}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          nextClassName={'page-link'}
          previousClassName={'page-link'}
          activeClassName={'active'}
        />
        <VideoPlayer
          isModalOpen={isModalOpen}
          videoUrl={videoUrl}
          toggleModalPopup={this.toggleModalPopup}
        />
      </div>
    );
  }
}

export default Videos;
