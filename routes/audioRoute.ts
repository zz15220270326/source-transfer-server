import { Router } from 'express';

import * as controller from '../controllers/Audio';
import { uploadMultipleVideos, uploadSingleVideo } from '../middlewares';

const router = Router();

router.get('/', controller.showIndexContent);
router.post('/', controller.showIndexContent);
router.post('/transfer-ncm-to-mp3', uploadSingleVideo, controller.transferNcmAudio);
router.post('/transfer-ncm-to-mp3s', uploadMultipleVideos, controller.transferNcmVideos);
router.get('/get-audio-list', controller.getPaginationAudioList);
router.post('/get-audio-list', controller.getPaginationAudioList);
router.delete('/remove-audio/:id', controller.removeAudio);

export default router;
