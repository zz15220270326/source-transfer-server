import { Router } from 'express';

import * as controller from '../controllers/Video';
import { uploadSingleVideo, uploadMultipleVideos } from '../middlewares';

const router = Router();

router.post('/transfer', controller.transferVideoFile);
router.get('/video-list', controller.getVideoList);
router.delete('/remove-video/:videoName', controller.removeVideoFile);
router.get('/:videoName', controller.getVideoFile);
router.post('/upload-file', uploadSingleVideo, controller.uploadVideoFile);

export default router;
