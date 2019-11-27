import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    snapshotUrl: { type: String, required: true },
    description: { type: String, required: true }
});

export default mongoose.model('videos', VideoSchema);