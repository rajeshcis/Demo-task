import Video from "../models/video";


/**
 * Add new video
 * @param {title, thumbnailUrl, snapshotUrl, description } req
 * @param {json} res
 */
export const add = (req, res) => {
    const { title, thumbnailUrl, snapshotUrl, description } = req.body;

    const newVideo = new Video({
        title,
        thumbnailUrl,
        snapshotUrl,
        description
    });


    newVideo.save(function(err) {
        if (err) {
            res.json({ error: true,  message: "Error while adding video" });
        } else {
            res.json({ error: false, data: newVideo, message: "Video added successfully" });
        }
    });
};

/**
 * Update video info
 * @param {title, thumbnailUrl, snapshotUrl, description} req
 * @param {json} res
 */
export const update = (req, res) => {
    const { id } = req.params
    const { title, thumbnailUrl, snapshotUrl, description } = req.body;
    const refs = {
        _id: id
    };

    const updates = {
        title,
        thumbnailUrl,
        snapshotUrl,
        description
    };

    Video.update(refs, updates, function(err, id) {
        if (err) {
            return res.json({ error: true, message: 'Error while video edit' });
        } else {
            res.json({ error: false, data: id, message: "Updated successfully" });
        }
    });
};

/**
 * Remove video
 * @param {refs} req
 * @param {json} res
 */
export const remove = (req, res) => {
    const { id } = req.params;
    Video.deleteOne({ _id: id }, function(err, resp) {
        if (err) {
            return res.json({ error: true, data: err, message: "Error while video delete" });
        } else {
            res.json({ error: false, data: id, message: "Video deleted successfully" });
        }
    });
};

/**
 * Get all videos
 * @param {json} res
 * @param {func} next
 */
export const videos = (req, res, next) => {
    Video.find({}, function(err, data) {
        if (err) {
            res.json({ error: true, data: err, message: "Error while get videos" });
        }

        res.json({ error: false, data: data});
    });
};

/**
 * Get one video
 * @param {json} res
 * @param {func} next
 */
export const getVideo = (req, res, next) => {
    const { id } = req.params;
    Video.findOne({_id: id}, function(err, data) {
        if (err) {
            res.json({ error: true, data: err, message: "Error while get video" });
        }

        res.json({ error: false, data: data});
    });
};