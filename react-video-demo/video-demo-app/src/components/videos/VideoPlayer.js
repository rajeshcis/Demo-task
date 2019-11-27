
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

const VideoPlayer = (props) => {
  const {
    className,
    isModalOpen,
    toggleModalPopup,
    videoUrl
  } = props;

  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={toggleModalPopup} className={className}>
        <ModalBody>
          <video width="460" height="265" controls>
            <source src={videoUrl} />
            Your browser does not support the video tag.
</video>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default VideoPlayer;