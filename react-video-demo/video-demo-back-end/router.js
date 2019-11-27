import * as video from './controllers/video';

const router = (app) => {
    /**
     * Video API
     */
    app.put('/api/videos/:id', video.update);
    app.post('/api/videos', video.add);
    app.delete('/api/videos/:id', video.remove);
    app.get('/api/videos/:id', video.getVideo);
    app.get('/api/videos', video.videos);
};

export default router;