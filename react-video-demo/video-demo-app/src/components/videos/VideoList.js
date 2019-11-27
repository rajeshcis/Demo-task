import React from "react";
import { Link } from "react-router-dom";

export const VideoList = props => {
  const { deleteVideo, video,
    toggleModalPopup } = props;
  return (
    <tr key={video._id}>
      <td>{video.title}</td>
      <td>{video.description}</td>
      <td>{video.thumbnailUrl}</td>
      <td onClick={() => toggleModalPopup(video.thumbnailUrl)}><img alt="thumbnail" style={{ width: '25%', height: '25%' }} className="snapshotUrl-icon" src={video.snapshotUrl} /></td>
      <td>
        <Link to={`/videos/${video._id}/edit`}>Update</Link>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-light"
          onClick={e => {
            deleteVideo(video._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
